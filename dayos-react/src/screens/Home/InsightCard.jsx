import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// --- SUBCOMPONENTES ---

function BlurRevealText({ text }) {
    const words = text.split(' ');

    const container = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.04,
                delayChildren: 0.05,
            },
        },
    };

    const word = {
        hidden: { opacity: 0, filter: 'blur(8px)', y: 4 },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
        },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: '#2D2D2D',
                lineHeight: 1.62,
            }}
        >
            {words.map((w, i) => (
                <motion.span
                    key={i}
                    variants={word}
                    style={{ display: 'inline-block', marginRight: '0.25em' }}
                >
                    {w}
                </motion.span>
            ))}
        </motion.div>
    );
}

function ThinkingPlaceholder() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[92, 78, 55].map((width, i) => (
                <motion.div
                    key={i}
                    animate={{ opacity: [0.25, 0.55, 0.25] }}
                    transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        delay: i * 0.18,
                        ease: 'easeInOut',
                    }}
                    style={{
                        height: 10,
                        width: `${width}%`,
                        borderRadius: 6,
                        background: '#E8E5E2',
                    }}
                />
            ))}
        </div>
    );
}

// --- MAIN ENTRADA ---

export default function InsightCard({ insight, dayState, entered, enterDelay = 220 }) {
    const [thinking, setThinking] = useState(true);
    const [textKey, setTextKey] = useState(0);
    const prevDayState = useRef(dayState);

    // Ao montar: thinking por 1.4s
    useEffect(() => {
        setThinking(true);
        const t = setTimeout(() => setThinking(false), 1400);
        return () => clearTimeout(t);
    }, []);

    // Ao trocar dayState: mini-reset de 1s
    useEffect(() => {
        if (prevDayState.current !== dayState) {
            prevDayState.current = dayState;
            setThinking(true);
            setTextKey(k => k + 1);
            const t = setTimeout(() => setThinking(false), 1000);
            return () => clearTimeout(t);
        }
    }, [dayState]);

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
            style={{
                margin: '14px 20px 0',
                borderRadius: 18,
                border: '1px solid rgba(244,162,97,0.22)',
                boxShadow: '0 2px 16px rgba(244,162,97,0.08)',
                overflow: 'hidden',
                background: '#FFFFFF',
            }}
        >
            {/* ─── TOPO: header gradient ─── */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(244,162,97,0.11) 0%, rgba(231,111,81,0.06) 100%)',
                padding: '12px 16px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                borderBottom: '1px solid rgba(244,162,97,0.15)',
            }}>
                {/* Ícone container gradiente */}
                <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: 7,
                    background: 'linear-gradient(135deg, #F4A261, #E76F51)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}>
                    <Sparkles size={12} color="#FFFFFF" strokeWidth={2} />
                </div>

                {/* Nome */}
                <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#2D2D2D',
                }}>
                    Orbhy
                </span>

                {/* Dots de "pensando" — visíveis enquanto thinking */}
                {thinking ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: 2 }}>
                        {[0, 1, 2].map(i => (
                            <motion.div
                                key={i}
                                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                                transition={{
                                    duration: 0.9,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: 'easeInOut',
                                }}
                                style={{
                                    width: 4,
                                    height: 4,
                                    borderRadius: '50%',
                                    background: '#F4A261',
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    /* Dot verde "ativo" — aparece quando não está thinking */
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        style={{
                            marginLeft: 'auto',
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            background: '#34D399',
                            boxShadow: '0 0 0 2.5px rgba(52,211,153,0.2)',
                            flexShrink: 0,
                        }}
                    />
                )}
            </div>

            {/* ─── CORPO: texto ─── */}
            <div style={{ padding: '14px 16px', minHeight: 64 }}>
                {thinking
                    ? <ThinkingPlaceholder />
                    : <BlurRevealText key={textKey} text={insight} />
                }
            </div>
        </motion.div>
    );
}
