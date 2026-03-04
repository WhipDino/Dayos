import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// --- SUBCOMPONENTES ---

function OrbLayer() {
    return (
        <div style={{
            position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1,
            borderRadius: '0 0 24px 24px',
        }}>
            <style>{`
        @keyframes orb1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(20px, -15px) scale(1.08); }
          66%  { transform: translate(-10px, 20px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes orb2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          40%  { transform: translate(-25px, 12px) scale(1.1); }
          75%  { transform: translate(15px, -20px) scale(0.92); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes orb3 {
          0%   { transform: translate(0px, 0px) scale(1); }
          50%  { transform: translate(18px, 22px) scale(1.05); }
          80%  { transform: translate(-20px, -8px) scale(1.12); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>

            {/* Orb 1 — grande, canto superior esquerdo, Dawn mais claro */}
            <div style={{
                position: 'absolute', top: -60, left: -40, width: 220, height: 220,
                borderRadius: '50%', background: 'rgba(255, 200, 130, 0.55)', filter: 'blur(50px)',
                animation: 'orb1 8s ease-in-out infinite',
            }} />

            {/* Orb 2 — médio, canto inferior direito, Sunrise mais intenso */}
            <div style={{
                position: 'absolute', bottom: -50, right: -30, width: 170, height: 170,
                borderRadius: '50%', background: 'rgba(220, 80, 50, 0.45)', filter: 'blur(45px)',
                animation: 'orb2 11s ease-in-out infinite', animationDelay: '-3s',
            }} />

            {/* Orb 3 — pequeno, centro-direito, quente */}
            <div style={{
                position: 'absolute', top: '30%', right: '15%', width: 100, height: 100,
                borderRadius: '50%', background: 'rgba(255, 160, 80, 0.40)', filter: 'blur(35px)',
                animation: 'orb3 14s ease-in-out infinite', animationDelay: '-7s',
            }} />
        </div>
    );
}

function LogoMark() {
    return (
        <div style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700,
            color: '#FFFFFF', letterSpacing: '-0.01em', userSelect: 'none',
        }}>
            Orbhy
            <span style={{ color: 'rgba(255,255,255,0.55)', marginLeft: 1 }}>.</span>
        </div>
    );
}

function AvatarButton({ entered, letter = 'J' }) {
    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={entered ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 25, delay: 0.1 }}
            whileTap={{ scale: 0.88 }}
            style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.35)',
                backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600, color: '#FFFFFF',
                cursor: 'pointer', outline: 'none', WebkitTapHighlightColor: 'transparent',
            }}
        >
            {letter}
        </motion.button>
    );
}

function DateLine({ date, entered }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={entered ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 350, damping: 30, delay: 0.15 }}
            style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                color: 'rgba(255,255,255,0.80)', marginBottom: 4, letterSpacing: '0.01em',
            }}
        >
            {date}
        </motion.div>
    );
}

function GreetingLine({ greeting, entered }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={entered ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.22 }}
            style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 26, fontWeight: 700,
                color: '#FFFFFF', lineHeight: 1.15, letterSpacing: '-0.02em',
            }}
        >
            {greeting}
        </motion.div>
    );
}


// --- MAIN HEADER COMPONENT ---

export default function HomeHeader({ greeting, date, userName, scrollContainerRef }) {
    const [entered, setEntered] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setEntered(true), 80);
        return () => clearTimeout(t);
    }, []);

    // Scroll-linked
    const { scrollY } = useScroll({ container: scrollContainerRef });

    // Header height: 148px → 72px conforme scroll 0→80px
    const headerHeight = useTransform(scrollY, [0, 80], [148, 72]);
    const smoothHeight = useSpring(headerHeight, { stiffness: 300, damping: 40, mass: 1 });

    // Saudação: opacity 1→0 e translateY 0→-8px conforme scroll 0→60px
    const greetingOpacity = useTransform(scrollY, [0, 60], [1, 0]);
    const greetingY = useTransform(scrollY, [0, 60], [0, -8]);
    const smoothGreetingOpacity = useSpring(greetingOpacity, { stiffness: 300, damping: 35 });
    const smoothGreetingY = useSpring(greetingY, { stiffness: 300, damping: 35 });

    // Data: opacity 1→0 um pouco antes da saudação
    const dateOpacity = useTransform(scrollY, [0, 40], [1, 0]);
    const smoothDateOpacity = useSpring(dateOpacity, { stiffness: 300, damping: 35 });

    // Logo: escala 1→0.9 conforme colapsa
    const logoScale = useTransform(scrollY, [0, 80], [1, 0.9]);
    const smoothLogoScale = useSpring(logoScale, { stiffness: 300, damping: 35 });

    return (
        <motion.div
            style={{
                height: smoothHeight,
                background: 'linear-gradient(135deg, #F4A261 0%, #E76F51 100%)',
                borderRadius: '0 0 24px 24px',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: 'max(16px, env(safe-area-inset-top))',
                flexShrink: 0,
            }}
        >
            <OrbLayer />

            <div style={{
                position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column',
                height: '100%', padding: '0 20px 20px',
            }}>
                {/* Linha superior: Logo + Avatar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: '0 0 auto' }}>
                    <motion.div style={{ scale: smoothLogoScale, transformOrigin: 'left center' }}>
                        <LogoMark />
                    </motion.div>
                    <AvatarButton entered={entered} letter={userName ? userName.charAt(0).toUpperCase() : 'J'} />
                </div>

                {/* Saudação + Data */}
                <motion.div
                    style={{
                        opacity: smoothGreetingOpacity,
                        y: smoothGreetingY,
                        marginTop: 'auto',
                        paddingBottom: 4,
                    }}
                >
                    <motion.div style={{ opacity: smoothDateOpacity }}>
                        <DateLine date={date || 'Terça, 4 de março'} entered={entered} />
                    </motion.div>
                    <GreetingLine greeting={greeting} entered={entered} />
                </motion.div>
            </div>
        </motion.div>
    );
}
