import { useState, useRef, useEffect } from 'react'
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
    dusk: '#6366F1',
    success: '#34D399',
    text: '#2D2D2D',
    text2: '#6B6B6B',
    text3: '#9B9790',
    border: '#ECEAE7',
}

const spring = [0.23, 1, 0.32, 1]

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
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function NameInput({ onContinue, onBack, step = '1 de 5', progress = '20%' }) {
    const [name, setName] = useState('')
    const inputRef = useRef(null)
    const hasName = name.trim().length > 0
    const firstName = name.trim().split(' ')[0]

    useEffect(() => {
        // Auto-focus the input after animation
        const t = setTimeout(() => inputRef.current?.focus(), 600)
        return () => clearTimeout(t)
    }, [])

    const handleSubmit = () => {
        if (hasName && onContinue) onContinue(name.trim())
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && hasName) handleSubmit()
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button
                        onClick={onBack}
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: 40, height: 40, border: 'none', background: 'transparent',
                            cursor: 'pointer', marginLeft: -8, borderRadius: 12, outline: 'none', WebkitTapHighlightColor: 'transparent',
                            transition: 'background 0.15s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.04)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                        onMouseDown={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.08)'}
                        onMouseUp={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.04)'}
                        aria-label="Voltar"
                    >
                        <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, stroke: T.text, strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }}>
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: T.text }}>
                        DayOS<span style={{ display: 'inline-block', width: 5, height: 5, background: T.accent, borderRadius: '50%', marginLeft: 1, verticalAlign: 'middle', position: 'relative', top: -1 }} />
                    </span>
                </div>
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
                    {hasName ? (
                        <>
                            Oi, <em style={gradientTextStyle}>{firstName}</em>!<br />Que bom te ver.
                        </>
                    ) : (
                        <>Como você<br />se chama?</>
                    )}
                </h1>
                <p className="headline-subtitle" style={subtitleStyle}>
                    Vamos personalizar tudo para você.
                </p>
            </motion.div>

            {/* ── Center area with input ── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: spring }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 20px' }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, width: '100%' }}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Seu nome"
                        autoComplete="given-name"
                        autoCapitalize="words"
                        autoCorrect="off"
                        spellCheck="false"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={inputStyle}
                        onFocus={(e) => {
                            e.target.style.borderColor = T.accent
                            e.target.style.boxShadow = `0 4px 20px ${T.accentGlow}`
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = T.border
                            e.target.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
                        }}
                    />
                    <p style={{
                        fontSize: 14, fontWeight: 500, textAlign: 'center',
                        transition: 'all 0.3s',
                        color: hasName ? T.success : T.text3,
                    }}>
                        {hasName ? 'Perfeito!' : 'Digite seu nome para continuar.'}
                    </p>
                </div>
            </motion.div>

            {/* ── Bottom CTA ── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: spring }}
                style={{ padding: '16px 24px 0', flexShrink: 0 }}
            >
                <motion.button
                    onClick={handleSubmit}
                    disabled={!hasName}
                    whileHover={hasName ? { y: -2, boxShadow: '0 14px 36px rgba(244,162,97,0.38), 0 4px 12px rgba(244,162,97,0.18)' } : {}}
                    whileTap={hasName ? { scale: 0.98 } : {}}
                    style={{
                        ...ctaStyle,
                        ...(hasName ? {} : disabledCtaStyle),
                    }}
                >
                    {hasName && <span style={ctaShineStyle} />}
                    Continuar
                    <motion.span style={{ display: 'flex' }}>
                        <ArrowIcon />
                    </motion.span>
                </motion.button>
            </motion.div>

            {/* Responsive */}
            <style>{`
        @media (max-height: 680px) {
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

const subtitleStyle = {
    marginTop: 10,
    fontSize: 15, lineHeight: 1.5,
    color: T.text2, maxWidth: 300,
}

const inputStyle = {
    width: '100%', maxWidth: 340,
    height: 56, padding: '0 24px',
    borderRadius: 16,
    border: `1.5px solid ${T.border}`,
    background: T.surface,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 18, fontWeight: 500,
    color: T.text,
    textAlign: 'center',
    transition: 'all 0.2s',
    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
    outline: 'none',
    WebkitAppearance: 'none',
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
    transition: 'all 0.2s',
}

const disabledCtaStyle = {
    background: '#E8E6E3',
    color: T.text3,
    boxShadow: 'none',
    cursor: 'not-allowed',
}

const ctaShineStyle = {
    position: 'absolute', inset: 0, borderRadius: 16,
    background: 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, transparent 55%)',
    pointerEvents: 'none',
}
