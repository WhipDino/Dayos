import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
    uniform float time;
    uniform float amplitude;
    uniform float frequency;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewPosition;
    varying float vNoise;

    // Simplex noise (standard GLSL 3D simplex noise)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 = v - i + dot(i, C.xxx) ;

        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );

        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy; 
        vec3 x3 = x0 - D.yyy;      

        i = mod289(i);
        vec4 p = permute( permute( permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

        float n_ = 0.142857142857; 
        vec3  ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );    

        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );

        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);

        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
        vNormal = normalize(normalMatrix * normal);
        
        // Calculate noise based on position + time
        float noise = snoise(vec3(position.x * frequency + time, 
                                  position.y * frequency + time, 
                                  position.z * frequency + time));
                                  
        vNoise = noise;
        
        // Deform position along normal
        vec3 newPosition = position + normal * (noise * amplitude);
        vPosition = newPosition; // pass local pos for gradient
        
        vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
        vViewPosition = -mvPosition.xyz;
        
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const fragmentShader = `
    uniform float stateBlend;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewPosition;
    varying float vNoise;

    void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);

        // Core colors
        vec3 cAccent = vec3(244.0/255.0, 162.0/255.0, 97.0/255.0); // #F4A261
        vec3 cSunrise = vec3(231.0/255.0, 111.0/255.0, 81.0/255.0); // #E76F51
        
        // Slightly higher contrast colors for speaking
        vec3 cAccentSpeak = vec3(255.0/255.0, 182.0/255.0, 117.0/255.0);
        vec3 cSunriseSpeak = vec3(211.0/255.0, 61.0/255.0, 41.0/255.0);

        // Mix over state blend
        vec3 topColor = mix(cAccent, cAccentSpeak, stateBlend);
        vec3 bottomColor = mix(cSunrise, cSunriseSpeak, stateBlend);

        // Gradient based on local Y normal orientation
        // Using normal.y instead of position.y is safer for a rotating sphere to keep the gradient top->bottom
        float gradientFactor = smoothstep(-1.0, 1.0, normal.y + vNoise * 0.2);
        vec3 albedo = mix(bottomColor, topColor, gradientFactor);

        // Simple directional lighting (top-left) + ambient
        vec3 lightDir = normalize(vec3(-1.0, 1.0, 1.0));
        float diff = max(0.0, dot(normal, lightDir));
        float ambient = 0.5; // High ambient keeps it warm and soft
        vec3 diffuseLighting = albedo * (diff * 0.6 + ambient);

        // Fresnel (rim lighting)
        float fresnelTerm = pow(1.0 - max(0.0, dot(normal, viewDir)), 2.5);
        
        // Idle rim: #FAF8F5 (soft white)
        // Speaking rim: Mix with #6366F1 (dusk)
        vec3 rimIdle = vec3(250.0/255.0, 248.0/255.0, 245.0/255.0);
        vec3 rimSpeak = mix(rimIdle, vec3(99.0/255.0, 102.0/255.0, 241.0/255.0), 0.5); // dusk tint
        vec3 rimColor = mix(rimIdle, rimSpeak, stateBlend);

        vec3 finalColor = diffuseLighting + (rimColor * fresnelTerm * (0.6 + stateBlend * 0.3));

        gl_FragColor = vec4(finalColor, 1.0);
    }
`;

export function AIOrb({ state = 'idle', size = 250 }) {
    const mountRef = useRef(null);
    const stateRef = useRef(state);

    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.z = 4.8; // Adjusted view distance

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'low-power'
        });
        renderer.setSize(size, size);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Prevent StrictMode double canvas
        mountRef.current.innerHTML = '';
        mountRef.current.appendChild(renderer.domElement);

        // --- Main Blob ---
        const geometry = new THREE.SphereGeometry(1.2, 64, 64);

        const uniforms = {
            time: { value: 0 },
            amplitude: { value: 0.1 },
            frequency: { value: 1.0 },
            stateBlend: { value: 0.0 }
        };

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms,
            transparent: true,
            // flatShading: false is the default, ensuring smooth shading
        });

        const blob = new THREE.Mesh(geometry, material);
        scene.add(blob);

        // --- Animation State ---
        let frameId;
        const clock = new THREE.Clock();

        let simulatedTime = 0;
        let rotY = 0;

        // Base Idle state values
        let current = {
            amplitude: 0.10,
            frequency: 1.0,
            speed: 0.3,
            scale: 1.0,
            rotSpeed: 0.15,
            stateBlend: 0.0
        };

        const animate = () => {
            frameId = requestAnimationFrame(animate);
            const delta = Math.min(clock.getDelta(), 0.1);
            const t = clock.getElapsedTime();

            const isSpeaking = stateRef.current === 'speaking';

            // Targets according to current state
            const targets = {
                amplitude: isSpeaking ? 0.17 : 0.10,
                frequency: isSpeaking ? 1.3 : 1.0,
                speed: isSpeaking ? 0.45 : 0.3,
                scale: isSpeaking ? 1.15 : 1.0,
                rotSpeed: isSpeaking ? 0.25 : 0.15,
                stateBlend: isSpeaking ? 1.0 : 0.0
            };

            // Calculate interpolation factor depending on direction
            // Idle -> Speaking is faster (~0.8s) -> higher damp
            // Speaking -> Idle is slower (~1.2s) -> lower damp
            const dampingFactor = isSpeaking ? 0.04 : 0.02;

            // Interpolate values
            current.amplitude += (targets.amplitude - current.amplitude) * dampingFactor;
            current.frequency += (targets.frequency - current.frequency) * dampingFactor;
            current.speed += (targets.speed - current.speed) * dampingFactor;
            current.scale += (targets.scale - current.scale) * dampingFactor;
            current.rotSpeed += (targets.rotSpeed - current.rotSpeed) * dampingFactor;
            current.stateBlend += (targets.stateBlend - current.stateBlend) * dampingFactor;

            // Update time based on speed
            simulatedTime += delta * current.speed;

            // Apply uniforms
            uniforms.time.value = simulatedTime;
            uniforms.amplitude.value = current.amplitude;
            uniforms.frequency.value = current.frequency;
            uniforms.stateBlend.value = current.stateBlend;

            // Apply transformations
            blob.scale.setScalar(current.scale);

            rotY += current.rotSpeed * delta;
            blob.rotation.y = rotY;

            renderer.render(scene, camera);
        };

        animate();

        const currentMount = mountRef.current;
        return () => {
            cancelAnimationFrame(frameId);
            if (currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [size]);

    return (
        <div
            ref={mountRef}
            style={{
                width: size,
                height: size,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto'
            }}
        />
    );
}
