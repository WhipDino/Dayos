import { motion, useMotionValue, animate } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

function AnimatedNumber({ value, duration = 0.9, delay = 0 }) {
    const motionVal = useMotionValue(0);
    const [display, setDisplay] = useState(0);
    const prevValue = useRef(0);

    useEffect(() => {
        const controls = animate(motionVal, value, {
            duration,
            delay,
            ease: [0.23, 1, 0.32, 1],
            onUpdate: v => setDisplay(Math.round(v)),
        });
        prevValue.current = value;
        return controls.stop;
    }, [value, delay, motionVal]);

    return <span>{display}</span>;
}

function ProgressBar({ done, total, entered, delay }) {
    const pct = total > 0 ? (done / total) * 100 : 0;

    return (
        <div style={{
            height: 4,
            background: 'rgba(244,162,97,0.15)',
            borderRadius: 99,
            marginTop: 10,
            overflow: 'hidden',
        }}>
            <motion.div
                initial={{ width: '0%' }}
                animate={entered ? { width: `${pct}%` } : {}}
                transition={{
                    type: 'spring',
                    stiffness: 60,
                    damping: 14,
                    delay: delay / 1000 + 0.1,
                }}
                style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #F4A261, #E76F51)',
                    borderRadius: 99,
                }}
            />
        </div>
    );
}

export default function StatBlock({ done, total, freeTime, entered, enterDelay = 300, dayState }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={entered ? { opacity: 1, y: 0 } : {}}
            transition={{
                type: 'spring',
                stiffness: 320,
                damping: 28,
                delay: enterDelay / 1000,
            }}
            style={{ display: 'flex', gap: 10, margin: '14px 20px 0' }}
        >
            {/* Bloco esquerdo — progresso */}
            <div style={{
                flex: 1,
                borderRadius: 18,
                background: 'linear-gradient(135deg, rgba(244,162,97,0.10), rgba(231,111,81,0.06))',
                border: '1px solid rgba(244,162,97,0.20)',
                padding: 16,
            }}>
                <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 28,
                    fontWeight: 700,
                    color: '#2D2D2D',
                    lineHeight: 1,
                }}>
                    {entered && <AnimatedNumber value={done} delay={enterDelay / 1000 + 0.05} />}
                    {!entered && '0'}
                    <span style={{ fontSize: 16, color: '#9B9790', fontWeight: 500 }}>/{total}</span>
                </div>
                <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    color: '#9B9790',
                    marginTop: 4,
                }}>
                    tarefas hoje
                </div>
                <ProgressBar done={done} total={total} entered={entered} delay={enterDelay} />
            </div>

            {/* Bloco direito — tempo livre */}
            <div style={{
                flex: 1,
                borderRadius: 18,
                background: '#F5F3F0',
                border: '1px solid #ECEAE7',
                padding: 16,
                position: 'relative',
            }}>
                <Clock
                    size={16}
                    color="#9B9790"
                    strokeWidth={1.8}
                    style={{ position: 'absolute', top: 14, right: 14 }}
                />
                <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 28,
                    fontWeight: 700,
                    color: '#2D2D2D',
                    lineHeight: 1,
                }}>
                    {freeTime}
                </div>
                <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    color: '#9B9790',
                    marginTop: 4,
                }}>
                    tempo livre
                </div>
            </div>
        </motion.div>
    );
}
