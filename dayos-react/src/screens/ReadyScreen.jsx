import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ═══════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════ */
const T = {
    bg: '#FAF8F5',
    surface: '#FFFFFF',
    surface2: '#F5F3F0',
    accent: '#F4A261',
    accentHover: '#E8955A',
    dawn: '#F4A261',
    sunrise: '#E76F51',
    dusk: '#6366F1',
    success: '#34D399',
    text: '#2D2D2D',
    text2: '#6B6B6B',
    text3: '#9B9790',
    border: '#ECEAE7',
}

const spring = [0.23, 1, 0.32, 1]

/* ═══════════════════════════════════════════════════
   CONFETTI
   ═══════════════════════════════════════════════════ */
const confettiColors = ['#F4A261', '#E76F51', '#6366F1', '#34D399', '#FBBF24', '#FF6B6B', '#A78BFA']

function ConfettiPiece({ color, left, delay, duration }) {
    return (
        <motion.div
            initial={{ y: -20, rotate: 0, scale: 1, opacity: 1 }}
            animate={{ y: '110vh', rotate: 720, scale: 0.5, opacity: 0 }}
            transition={{ duration, delay, ease: 'linear' }}
            style={{
                position: 'absolute',
                left: `${left}%`,
                top: 0,
                width: 8, height: 8,
                borderRadius: 2,
                background: color,
            }}
        />
    )
}

function Confetti() {
    const [pieces] = useState(() =>
        Array.from({ length: 30 }, (_, i) => ({
            id: i,
            color: confettiColors[i % confettiColors.length],
            left: Math.random() * 100,
            delay: Math.random() * 0.8,
            duration: 2 + Math.random() * 2,
        }))
    )

    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 100 }}>
            {pieces.map((p) => (
                <ConfettiPiece key={p.id} {...p} />
            ))}
        </div>
    )
}

/* ═══════════════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════════════ */
const ArrowIcon = () => (
    <svg style={{ width: 18, height: 18, stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }} viewBox="0 0 24 24">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
)

/* ═══════════════════════════════════════════════════
   TAG ICONS
   ═══════════════════════════════════════════════════ */
const tagIcons = {
    calendar: (
        <svg viewBox="0 0 14 14" style={{ width: 14, height: 14, fill: 'none' }}>
            <rect x="1" y="2" width="12" height="11" rx="2" stroke={T.dusk} strokeWidth="1.2" />
            <rect x="1" y="2" width="12" height="3.5" rx="2" fill={T.dusk} opacity="0.2" />
            <line x1="4" y1="1" x2="4" y2="3" stroke={T.dusk} strokeWidth="1.2" strokeLinecap="round" />
            <line x1="10" y1="1" x2="10" y2="3" stroke={T.dusk} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    ),
    mail: (
        <svg viewBox="0 0 14 14" style={{ width: 14, height: 14, fill: 'none' }}>
            <rect x="1" y="3" width="12" height="9" rx="2" stroke="#EA4335" strokeWidth="1.2" />
            <path d="M1 5l6 4 6-4" stroke="#EA4335" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    ),
    ai: (
        <svg viewBox="0 0 14 14" style={{ width: 14, height: 14, fill: 'none' }}>
            <circle cx="7" cy="7" r="5" stroke={T.accent} strokeWidth="1.2" />
            <circle cx="7" cy="7" r="1.5" fill={T.accent} />
        </svg>
    ),
    moon: (
        <svg viewBox="0 0 14 14" style={{ width: 14, height: 14, fill: 'none' }}>
            <path d="M11 8a5 5 0 01-7-7 5 5 0 107 7z" stroke={T.text3} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function ReadyScreen({ userName = 'Usuário', recapTime = '21:00', onContinue }) {
    const [showConfetti, setShowConfetti] = useState(true)

    useEffect(() => {
        const t = setTimeout(() => setShowConfetti(false), 4000)
        return () => clearTimeout(t)
    }, [])

    const tags = [
        { icon: 'calendar', label: 'Google Calendar' },
        { icon: 'mail', label: 'Gmail' },
        { icon: 'ai', label: 'Briefing diário' },
        { icon: 'moon', label: `Recap às ${recapTime}` },
    ]

    return (
        <div style={screenStyle}>

            {/* Confetti */}
            <AnimatePresence>
                {showConfetti && <Confetti />}
            </AnimatePresence>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 0 }}>

                {/* Emoji */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: spring }}
                    style={{ fontSize: 64, lineHeight: 1, marginBottom: 24 }}
                >
                    ✨
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.6, ease: spring }}
                    style={titleStyle}
                >
                    Tudo pronto,<br />
                    <span style={gradientNameStyle}>{userName}</span>!
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.6, ease: spring }}
                    style={subtitleStyle}
                >
                    Seu assistente já conhece você. Vamos organizar seu primeiro dia.
                </motion.p>

                {/* Tags */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.6, ease: spring }}
                    style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, width: '100%', marginBottom: 40 }}
                >
                    {tags.map((tag, i) => (
                        <motion.div
                            key={tag.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + i * 0.08, duration: 0.4, ease: spring }}
                            style={tagStyle}
                        >
                            {tagIcons[tag.icon]}
                            {tag.label}
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6, ease: spring }}
                    style={{ width: '100%' }}
                >
                    <motion.button
                        onClick={onContinue}
                        whileHover={{ y: -2, boxShadow: '0 14px 36px rgba(244,162,97,0.38), 0 4px 12px rgba(244,162,97,0.18)' }}
                        whileTap={{ scale: 0.98 }}
                        style={ctaStyle}
                    >
                        <span style={ctaShineStyle} />
                        Ver meu primeiro dia
                        <motion.span style={{ display: 'flex' }}>
                            <ArrowIcon />
                        </motion.span>
                    </motion.button>
                </motion.div>

            </div>
        </div>
    )
}

/* ═══════════════════════════════════════════════════
   SHARED STYLE OBJECTS
   ═══════════════════════════════════════════════════ */
const screenStyle = {
    position: 'fixed', inset: 0,
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center', alignItems: 'center',
    paddingTop: 'calc(env(safe-area-inset-top, 16px) + 16px)',
    paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 20px)',
    paddingLeft: 28, paddingRight: 28,
    maxWidth: 420, margin: '0 auto',
    left: 0, right: 0,
    background: T.bg,
}

const titleStyle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 32, fontWeight: 700,
    letterSpacing: '-0.025em',
    lineHeight: 1.1, textAlign: 'center',
    marginBottom: 12,
}

const gradientNameStyle = {
    background: `linear-gradient(135deg, ${T.dawn}, ${T.sunrise})`,
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
}

const subtitleStyle = {
    fontSize: 16, color: T.text2,
    textAlign: 'center', lineHeight: 1.5,
    maxWidth: 280, marginBottom: 36,
}

const tagStyle = {
    display: 'inline-flex', alignItems: 'center',
    gap: 6, height: 34,
    padding: '0 14px', borderRadius: 17,
    fontSize: 13, fontWeight: 500,
    background: T.surface,
    border: `1px solid ${T.border}`,
    color: T.text2,
    fontFamily: "'DM Sans', sans-serif",
}

const ctaStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 8, width: '100%', height: 56,
    border: 'none', borderRadius: 16,
    background: `linear-gradient(135deg, ${T.dawn} 0%, ${T.sunrise} 100%)`,
    color: 'white',
    fontFamily: "'Outfit', sans-serif",
    fontSize: 17, fontWeight: 600,
    letterSpacing: '-0.01em',
    cursor: 'pointer',
    boxShadow: '0 8px 28px rgba(244,162,97,0.30), 0 2px 8px rgba(244,162,97,0.15)',
    position: 'relative', overflow: 'hidden',
    WebkitTapHighlightColor: 'transparent',
}

const ctaShineStyle = {
    position: 'absolute', inset: 0, borderRadius: 16,
    background: 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, transparent 55%)',
    pointerEvents: 'none',
}
