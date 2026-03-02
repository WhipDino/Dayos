import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

/* ═══════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════ */
const T = {
    bg: '#FAF8F5',
    surface: '#FFFFFF',
    surface2: '#F5F3F0',
    accent: '#F4A261',
    accentHover: '#E8955A',
    accentGlow: 'rgba(244,167,108,0.22)',
    accentLight: 'rgba(244,167,108,0.10)',
    dawn: '#F4A261',
    sunrise: '#E76F51',
    text: '#2D2D2D',
    text2: '#6B6B6B',
    text3: '#9B9790',
    border: '#ECEAE7',
}

const spring = [0.23, 1, 0.32, 1]

/* ═══════════════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════════════ */
const MinusIcon = () => (
    <svg viewBox="0 0 24 24" style={stepperSvgStyle}>
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
)

const PlusIcon = () => (
    <svg viewBox="0 0 24 24" style={stepperSvgStyle}>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
)

const ArrowIcon = () => (
    <svg style={{ width: 18, height: 18, stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }} viewBox="0 0 24 24">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
)

/* ═══════════════════════════════════════════════════
   PRESET BUTTONS
   ═══════════════════════════════════════════════════ */
const presets = [
    { h: 20, m: 0, label: '20:00' },
    { h: 21, m: 0, label: '21:00' },
    { h: 21, m: 30, label: '21:30' },
    { h: 22, m: 0, label: '22:00' },
    { h: 22, m: 30, label: '22:30' },
]

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function RecapTime({ onContinue, step = '3 de 5', progress = '60%' }) {
    const [hours, setHours] = useState(21)
    const [mins, setMins] = useState(0)

    const timeStr = useMemo(() => {
        return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
    }, [hours, mins])

    const adjustHours = (delta) => {
        setHours((h) => {
            let next = h + delta
            if (next > 23) next = 0
            if (next < 0) next = 23
            return next
        })
    }

    const adjustMins = (delta) => {
        setMins((m) => {
            let next = m + delta
            if (next >= 60) next = 0
            if (next < 0) next = 45
            return next
        })
    }

    const selectPreset = (h, m) => {
        setHours(h)
        setMins(m)
    }

    const handleSubmit = () => {
        if (onContinue) onContinue({ hours, mins, time: timeStr })
    }

    return (
        <div style={screenStyle}>

            {/* ── Topbar ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.4, ease: spring }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', marginBottom: 28 }}
            >
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: T.text }}>
                    DayOS<span style={{ display: 'inline-block', width: 5, height: 5, background: T.accent, borderRadius: '50%', marginLeft: 1, verticalAlign: 'middle', position: 'relative', top: -1 }} />
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: T.text3, background: T.surface2, padding: '5px 12px', borderRadius: 20 }}>
                    Passo {step}
                </span>
            </motion.div>

            {/* ── Progress bar ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                style={{ width: 'calc(100% - 48px)', height: 3, borderRadius: 1.5, background: T.border, margin: '0 24px 32px', overflow: 'hidden' }}
            >
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: progress }}
                    transition={{ delay: 0.3, duration: 0.8, ease: spring }}
                    style={{ height: '100%', borderRadius: 1.5, background: `linear-gradient(90deg, ${T.dawn}, ${T.sunrise})` }}
                />
            </motion.div>

            {/* ── Headline ── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6, ease: spring }}
                style={{ padding: '0 24px', marginBottom: 28 }}
                className="headline-area"
            >
                <h1 style={titleStyle}>
                    Quando você quer<br />seu <em style={gradientTextStyle}>recap noturno</em>?
                </h1>
                <p className="headline-subtitle" style={{ marginTop: 10, fontSize: 15, lineHeight: 1.5, color: T.text2, maxWidth: 300 }}>
                    Você recebe uma notificação pra revisar o dia.
                </p>
            </motion.div>

            {/* ── Time Picker ── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.65, ease: spring }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 20px' }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '100%' }}>

                    {/* Time display */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                        {/* Hours */}
                        <div style={digitGroupStyle}>
                            <motion.div
                                key={hours}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, ease: spring }}
                                style={digitsStyle}
                                className="time-digits"
                            >
                                {String(hours).padStart(2, '0')}
                            </motion.div>
                            <div style={timeLabelStyle}>hora</div>
                            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                                <motion.button whileTap={{ scale: 0.92 }} onClick={() => adjustHours(-1)} style={stepperBtnStyle} aria-label="Diminuir hora">
                                    <MinusIcon />
                                </motion.button>
                                <motion.button whileTap={{ scale: 0.92 }} onClick={() => adjustHours(1)} style={stepperBtnStyle} aria-label="Aumentar hora">
                                    <PlusIcon />
                                </motion.button>
                            </div>
                        </div>

                        {/* Colon */}
                        <div style={colonStyle}>:</div>

                        {/* Minutes */}
                        <div style={digitGroupStyle}>
                            <motion.div
                                key={mins}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, ease: spring }}
                                style={digitsStyle}
                                className="time-digits"
                            >
                                {String(mins).padStart(2, '0')}
                            </motion.div>
                            <div style={timeLabelStyle}>min</div>
                            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                                <motion.button whileTap={{ scale: 0.92 }} onClick={() => adjustMins(-15)} style={stepperBtnStyle} aria-label="Diminuir minutos">
                                    <MinusIcon />
                                </motion.button>
                                <motion.button whileTap={{ scale: 0.92 }} onClick={() => adjustMins(15)} style={stepperBtnStyle} aria-label="Aumentar minutos">
                                    <PlusIcon />
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Preset buttons */}
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                        {presets.map((p) => {
                            const isActive = p.h === hours && p.m === mins
                            return (
                                <motion.button
                                    key={p.label}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => selectPreset(p.h, p.m)}
                                    style={{
                                        ...presetBtnStyle,
                                        ...(isActive ? presetActiveStyle : {}),
                                    }}
                                >
                                    {p.label}
                                </motion.button>
                            )
                        })}
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: 14, lineHeight: 1.5, color: T.text2, textAlign: 'center', maxWidth: 300 }}>
                        🌙 Você receberá uma notificação às <strong>{timeStr}</strong> para uma conversa rápida de 2 minutos com a IA.
                    </p>
                </div>
            </motion.div>

            {/* ── Bottom CTA ── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: spring }}
                style={{ padding: '16px 24px 0', flexShrink: 0 }}
            >
                <motion.button
                    onClick={handleSubmit}
                    whileHover={{ y: -2, boxShadow: '0 14px 36px rgba(244,162,97,0.38), 0 4px 12px rgba(244,162,97,0.18)' }}
                    whileTap={{ scale: 0.98 }}
                    style={ctaStyle}
                >
                    <span style={ctaShineStyle} />
                    Organizar meu dia
                    <motion.span style={{ display: 'flex' }}>
                        <ArrowIcon />
                    </motion.span>
                </motion.button>
            </motion.div>

            {/* Responsive */}
            <style>{`
        @media (max-height: 700px) {
          .time-digits { font-size: 52px !important; }
          .headline-area h1 { font-size: 26px !important; }
        }
        @media (max-height: 580px) {
          .headline-subtitle { display: none !important; }
        }
      `}</style>
        </div>
    )
}

/* ═══════════════════════════════════════════════════
   SHARED STYLE OBJECTS
   ═══════════════════════════════════════════════════ */
const screenStyle = {
    position: 'fixed', inset: 0,
    display: 'flex', flexDirection: 'column',
    paddingTop: 'calc(env(safe-area-inset-top, 16px) + 16px)',
    paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 20px)',
    maxWidth: 420, margin: '0 auto',
    left: 0, right: 0,
    background: T.bg,
}

const titleStyle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 30, fontWeight: 700,
    lineHeight: 1.12, letterSpacing: '-0.025em',
    color: T.text,
}

const gradientTextStyle = {
    fontStyle: 'normal',
    background: `linear-gradient(135deg, ${T.dawn} 0%, ${T.sunrise} 100%)`,
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
}

const digitGroupStyle = {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: 8,
}

const digitsStyle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 64, fontWeight: 700,
    letterSpacing: '-0.04em',
    color: T.text,
    lineHeight: 1,
    minWidth: 90, textAlign: 'center',
}

const timeLabelStyle = {
    fontSize: 12, fontWeight: 500,
    color: T.text3, textTransform: 'uppercase',
    letterSpacing: '0.08em',
}

const colonStyle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 56, fontWeight: 300,
    color: T.text3,
    lineHeight: 1, padding: '0 4px',
}

const stepperBtnStyle = {
    width: 36, height: 36,
    borderRadius: 12, border: `1.5px solid ${T.border}`,
    background: T.surface,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
}

const stepperSvgStyle = {
    width: 16, height: 16,
    stroke: T.text2, strokeWidth: 2,
    strokeLinecap: 'round', fill: 'none',
}

const presetBtnStyle = {
    padding: '8px 14px',
    borderRadius: 12,
    border: `1.5px solid ${T.border}`,
    background: T.surface,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14, fontWeight: 500,
    color: T.text2,
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    transition: 'all 0.2s',
}

const presetActiveStyle = {
    background: T.accentLight,
    borderColor: T.accent,
    color: T.accentHover,
    fontWeight: 600,
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
