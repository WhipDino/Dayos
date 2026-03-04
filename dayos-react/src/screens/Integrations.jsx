import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import imgGoogleCal from '../assets/logos/Google_Calendar-Logo.wine.png'
import imgGmail from '../assets/logos/Gmail_icon_(2020).svg.webp'

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
   ICONS
   ═══════════════════════════════════════════════════ */
const ArrowIcon = () => (
    <svg style={{ width: 18, height: 18, stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }} viewBox="0 0 24 24">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
)

const CheckIcon = () => (
    <svg style={{ width: 16, height: 16, stroke: 'currentColor', strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }} viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
    </svg>
)

const SpinnerIcon = () => (
    <svg style={{ width: 16, height: 16, stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round', fill: 'none', animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </svg>
)

// Emulating external service icons
const GoogleCalIcon = () => (
    <div style={{ width: 40, height: 40, borderRadius: 10, background: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
        <img src={imgGoogleCal} alt="Google Calendar" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.3)' }} />
    </div>
)
const GmailIcon = () => (
    <div style={{ width: 40, height: 40, borderRadius: 10, background: '#FDF2F1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', padding: 6 }}>
        <img src={imgGmail} alt="Gmail" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>
)

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function Integrations({ onContinue, onBack }) {
    const [entered, setEntered] = useState(false)

    // States for each integration: 'idle', 'loading', 'connected'
    const [integrations, setIntegrations] = useState({
        google: 'idle',
        gmail: 'idle'
    })

    useEffect(() => {
        // Trigger manual CSS entrance animations on mount
        const t = setTimeout(() => setEntered(true), 10)
        return () => clearTimeout(t)
    }, [])

    const handleConnect = (id) => {
        if (integrations[id] === 'connected') return;

        setIntegrations(prev => ({ ...prev, [id]: 'loading' }))

        setTimeout(() => {
            setIntegrations(prev => ({ ...prev, [id]: 'connected' }))
        }, 1500)
    }

    const connectedCount = Object.values(integrations).filter(s => s === 'connected').length

    const integrationsList = [
        { id: 'google', icon: GoogleCalIcon, title: 'Google Calendar', desc: 'Sincronize eventos do Google' },
        { id: 'gmail', icon: GmailIcon, title: 'Gmail', desc: 'Triagem inteligente de emails' },
    ]

    return (
        <div style={screenStyle}>
            {/* ── Top Area (Header + Title) ── */}
            <div style={{ padding: '0 24px', zIndex: 10, display: 'flex', flexDirection: 'column' }}>

                {/* Topbar */}
                <div style={getEntranceStyle(entered, 0, { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 })}>
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
                        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: T.text, lineHeight: 1 }}>
                            Orbhy<span style={{ display: 'inline-block', width: 5, height: 5, background: T.accent, borderRadius: '50%', marginLeft: 1, verticalAlign: 'middle', position: 'relative', top: -1 }} />
                        </span>
                    </div>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: T.text3, background: T.surface2, padding: '5px 12px', borderRadius: 20 }}>
                        Passo 3 de 5
                    </span>
                </div>

                {/* Progress bar */}
                <div style={getEntranceStyle(entered, 1, { width: '100%', height: 3, borderRadius: 1.5, background: T.border, marginBottom: 24, overflow: 'hidden' })}>
                    <div style={{ width: '60%', height: '100%', borderRadius: 1.5, background: `linear-gradient(90deg, ${T.dawn}, ${T.sunrise})` }} />
                </div>

                {/* Headline */}
                <div style={getEntranceStyle(entered, 2, { marginBottom: 32 })}>
                    <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 30, fontWeight: 700, lineHeight: 1.12, letterSpacing: '-0.025em', color: T.text }}>
                        Conecte suas<br /><em style={{ fontStyle: 'normal', background: `linear-gradient(135deg, ${T.dawn} 0%, ${T.sunrise} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ferramentas</em>
                    </h1>
                    <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.5, color: T.text2, maxWidth: 300 }}>
                        Você pode conectar agora ou depois nas configurações.
                    </p>
                </div>
            </div>

            {/* ── Main Content Area ── */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12, WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
                {integrationsList.map((integration, idx) => {
                    const status = integrations[integration.id]
                    const isConnected = status === 'connected'
                    const isLoading = status === 'loading'

                    return (
                        <div
                            key={integration.id}
                            style={getEntranceStyle(entered, 3 + idx, {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 14,
                                padding: 16,
                                background: T.surface,
                                borderRadius: 20,
                                border: `1px solid ${isConnected ? 'rgba(52,211,153,0.3)' : T.border}`,
                                transition: 'all 0.3s ease',
                                boxShadow: isConnected ? '0 4px 12px rgba(52,211,153,0.08)' : '0 2px 8px rgba(0,0,0,0.02)'
                            })}
                        >
                            <integration.icon />

                            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 600, color: T.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {integration.title}
                                </div>
                                <div style={{ fontSize: 13, color: T.text2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {integration.desc}
                                </div>
                            </div>

                            <button
                                onClick={() => handleConnect(integration.id)}
                                disabled={isConnected || isLoading}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 6,
                                    height: 36,
                                    padding: '0 16px',
                                    borderRadius: 16,
                                    background: isConnected ? T.success : 'transparent',
                                    border: isConnected ? 'none' : `1.5px solid ${T.accent}`,
                                    color: isConnected ? '#fff' : T.accent,
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: 14,
                                    fontWeight: 600,
                                    cursor: isConnected || isLoading ? 'default' : 'pointer',
                                    transition: 'all 0.2s',
                                    outline: 'none',
                                    WebkitTapHighlightColor: 'transparent',
                                    flexShrink: 0
                                }}
                            >
                                {isLoading ? <SpinnerIcon /> : isConnected ? (
                                    <>
                                        <CheckIcon />
                                        Conectado
                                    </>
                                ) : (
                                    'Conectar'
                                )}
                            </button>
                        </div>
                    )
                })}
            </div>

            {/* ── Footer ── */}
            <div style={getEntranceStyle(entered, 7, { padding: '16px 24px', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 })}>
                <motion.button
                    onClick={connectedCount > 0 ? onContinue : undefined}
                    disabled={connectedCount === 0}
                    whileHover={connectedCount > 0 ? { y: -2, boxShadow: '0 14px 36px rgba(244,162,97,0.38), 0 4px 12px rgba(244,162,97,0.18)' } : {}}
                    whileTap={connectedCount > 0 ? { scale: 0.98 } : {}}
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        width: '100%', height: 56, border: 'none', borderRadius: 16,
                        background: connectedCount > 0 ? `linear-gradient(135deg, ${T.dawn} 0%, ${T.sunrise} 100%)` : '#E8E6E3',
                        color: connectedCount > 0 ? 'white' : T.text3,
                        fontFamily: "'Outfit', sans-serif", fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em',
                        cursor: connectedCount > 0 ? 'pointer' : 'default',
                        outline: 'none', WebkitTapHighlightColor: 'transparent',
                        boxShadow: connectedCount > 0 ? '0 8px 28px rgba(244,162,97,0.30), 0 2px 8px rgba(244,162,97,0.15)' : 'none',
                        position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease'
                    }}
                >
                    {connectedCount > 0 && <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, transparent 55%)', pointerEvents: 'none', borderRadius: 16 }} />}
                    Continuar
                    <motion.span style={{ display: 'flex' }}>
                        <ArrowIcon />
                    </motion.span>
                </motion.button>

                <div style={{ fontSize: 13, fontWeight: 500, color: connectedCount > 0 ? '#047857' : T.text3, transition: 'color 0.3s' }}>
                    {connectedCount > 0
                        ? `${connectedCount} de 2 conectados`
                        : <span onClick={onContinue} style={{ cursor: 'pointer' }}>Pular por enquanto</span>}
                </div>
            </div>
        </div>
    )
}

/* ═══════════════════════════════════════════════════
   HELPERS & STYLES
   ═══════════════════════════════════════════════════ */
const screenStyle = {
    position: 'absolute', inset: 0,
    display: 'flex', flexDirection: 'column',
    paddingTop: 'calc(env(safe-area-inset-top, 16px) + 16px)',
    paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 20px)',
    maxWidth: 420, margin: '0 auto',
    left: 0, right: 0,
    background: T.bg,
    overflow: 'hidden'
}

const getEntranceStyle = (entered, index, baseStyle) => {
    return {
        ...baseStyle,
        opacity: entered ? 1 : 0,
        transform: entered ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.65s cubic-bezier(0.23,1,0.32,1)',
        transitionDelay: `${index * 150}ms`
    }
}
