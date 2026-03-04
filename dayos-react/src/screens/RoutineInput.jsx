import { useState, useEffect } from 'react'

const T = {
    bg: '#FAF8F5', surface: '#FFFFFF', surface2: '#F5F3F0',
    accent: '#F4A261', dawn: '#F4A261', sunrise: '#E76F51', dusk: '#6366F1', success: '#34D399',
    text: '#2D2D2D', text2: '#6B6B6B', text3: '#9B9790', border: '#ECEAE7',
}

const MicIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
)

const SendIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
    </svg>
)

export default function RoutineInput({ onContinue, onBack }) {
    const [entered, setEntered] = useState(false)
    const [text, setText] = useState('')
    const [finalMessage, setFinalMessage] = useState('')
    const [isRecording, setIsRecording] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setEntered(true), 50)
        return () => clearTimeout(t)
    }, [])

    const getAnimStyle = (index) => ({
        opacity: entered ? 1 : 0,
        transform: entered ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.65s cubic-bezier(0.23, 1, 0.32, 1)',
        transitionDelay: `${index * 120}ms`
    })

    const handleSend = () => {
        if (text.trim()) {
            setFinalMessage(text.trim())
            setText('')
        }
    }

    const toggleRecording = () => {
        if (isRecording) {
            setIsRecording(false)
            setTimeout(() => {
                setFinalMessage("Acordo às 7h, faço café, trabalho remoto das 9 às 18h, academia às 19h e durmo por volta das 23h")
            }, 1000)
        } else {
            setIsRecording(true)
        }
    }

    return (
        <>
            <style>{`
                @keyframes micPulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.08); }
                    100% { transform: scale(1); }
                }
                @keyframes micWave {
                    0% { transform: scale(1); opacity: 0.5; }
                    100% { transform: scale(1.6); opacity: 0; }
                }
            `}</style>

            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                background: T.bg,
                paddingTop: 'env(safe-area-inset-top, 0px)',
            }}>
                <div style={{ maxWidth: 420, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>

                    {/* HEADER */}
                    <div style={{ flexShrink: 0, padding: '16px 20px 0' }}>
                        {/* Topbar */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                {onBack && (
                                    <button
                                        onClick={onBack}
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            width: 40, height: 40, border: 'none', background: 'transparent',
                                            cursor: 'pointer', marginLeft: -8, borderRadius: 12, outline: 'none',
                                            WebkitTapHighlightColor: 'transparent',
                                            transition: 'background 0.15s ease'
                                        }}
                                        aria-label="Voltar"
                                    >
                                        <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, stroke: T.text, strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }}>
                                            <polyline points="15 18 9 12 15 6" />
                                        </svg>
                                    </button>
                                )}
                                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: T.text, lineHeight: 1 }}>
                                    Orbhy<span style={{ display: 'inline-block', width: 5, height: 5, background: T.accent, borderRadius: '50%', marginLeft: 1, verticalAlign: 'middle', position: 'relative', top: -1 }} />
                                </span>
                            </div>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: T.text3, background: T.surface2, padding: '5px 12px', borderRadius: 20 }}>
                                Passo 4 de 5
                            </span>
                        </div>

                        {/* Progress bar */}
                        <div style={{ width: '100%', height: 3, borderRadius: 1.5, background: T.border, marginBottom: 24, overflow: 'hidden' }}>
                            <div style={{ width: '80%', height: '100%', borderRadius: 1.5, background: `linear-gradient(90deg, ${T.dawn}, ${T.sunrise})` }} />
                        </div>

                        {/* Headline */}
                        <div style={{ marginBottom: 16 }}>
                            <h1 style={{ ...getAnimStyle(0), margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: 30, fontWeight: 700, lineHeight: 1.12, letterSpacing: '-0.025em', color: T.text }}>
                                Conte sobre sua<br /><em style={{ fontStyle: 'normal', background: `linear-gradient(135deg, ${T.dawn} 0%, ${T.sunrise} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>rotina</em>
                            </h1>
                            <p style={{ ...getAnimStyle(1), marginTop: 10, fontSize: 15, lineHeight: 1.5, color: T.text2, maxWidth: 300 }}>
                                Fale ou escreva como é seu dia a dia. A IA vai usar isso pra montar seu plano.
                            </p>
                        </div>
                    </div>

                    {/* CONTENT & INPUT */}
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, padding: '0 20px', gap: 16 }}>
                        {/* Chat area */}
                        <div style={{ ...getAnimStyle(2), flex: 1, background: T.surface2, borderRadius: 20, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: 0, overflowY: 'auto' }}>
                            {!finalMessage ? (
                                <div style={{ color: T.text3, fontSize: 13, fontStyle: 'italic', textAlign: 'center', margin: 'auto', maxWidth: '80%', lineHeight: 1.5 }}>
                                    Exemplo: Acordo às 7h, trabalho das 9 às 18h, academia às 19h...
                                </div>
                            ) : (
                                <div style={{
                                    background: T.accent,
                                    color: 'white',
                                    padding: '12px 16px',
                                    borderRadius: 16,
                                    borderBottomRightRadius: 4,
                                    alignSelf: 'flex-end',
                                    maxWidth: '85%',
                                    fontSize: 15,
                                    lineHeight: 1.4,
                                    fontFamily: "'DM Sans', sans-serif",
                                    animation: 'messageAppear 0.4s cubic-bezier(0.23, 1, 0.32, 1) forwards',
                                    transformOrigin: 'bottom right'
                                }}>
                                    <style>{`
                                        @keyframes messageAppear {
                                            from { opacity: 0; transform: scale(0.9) translateY(10px); }
                                            to { opacity: 1; transform: scale(1) translateY(0); }
                                        }
                                    `}</style>
                                    {finalMessage}
                                </div>
                            )}
                        </div>

                        {/* Input tools */}
                        <div style={{ ...getAnimStyle(3), display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 16, flexShrink: 0 }}>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                <input
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                                    placeholder="Escreva sua rotina..."
                                    style={{
                                        flex: 1, height: 48, background: T.surface, border: `1px solid ${T.border}`,
                                        borderRadius: 12, padding: '0 16px', fontSize: 15, color: T.text, outline: 'none',
                                        fontFamily: "'DM Sans', sans-serif"
                                    }}
                                />
                                {text.trim() && (
                                    <button
                                        onClick={handleSend}
                                        style={{
                                            width: 48, height: 48, borderRadius: 12, border: 'none',
                                            background: `linear-gradient(135deg, ${T.dawn}, ${T.sunrise})`,
                                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            animation: 'scaleIn 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
                                        }}
                                    >
                                        <style>{`@keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
                                        <SendIcon />
                                    </button>
                                )}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 80, justifyContent: 'center' }}>
                                <div style={{ position: 'relative', width: 56, height: 56 }}>
                                    {isRecording && (
                                        <div style={{
                                            position: 'absolute', inset: 0, borderRadius: '50%', background: T.sunrise,
                                            animation: 'micWave 1.5s infinite cubic-bezier(0.23, 1, 0.32, 1)'
                                        }} />
                                    )}
                                    <button
                                        onClick={toggleRecording}
                                        style={{
                                            position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: '50%', border: 'none',
                                            background: isRecording ? T.sunrise : `linear-gradient(135deg, ${T.dawn}, ${T.sunrise})`,
                                            boxShadow: isRecording ? `0 8px 24px rgba(231,111,81,0.4)` : `0 6px 16px rgba(244,162,97,0.25)`,
                                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            animation: isRecording ? 'micPulse 1.5s infinite alternate ease-in-out' : 'none',
                                            transition: 'all 0.3s ease', zIndex: 2
                                        }}
                                    >
                                        <MicIcon />
                                    </button>
                                </div>
                                {isRecording && (
                                    <div style={{
                                        color: T.sunrise, fontSize: 13, fontWeight: 500, marginTop: 12,
                                        animation: 'fadePulse 1.5s infinite alternate'
                                    }}>
                                        <style>{`@keyframes fadePulse { from { opacity: 0.6; } to { opacity: 1; } }`}</style>
                                        Ouvindo...
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div style={{
                        flexShrink: 0, background: T.bg, padding: '12px 20px',
                        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 20px)',
                        ...getAnimStyle(4)
                    }}>
                        <button
                            disabled={!finalMessage}
                            onClick={() => onContinue && onContinue(finalMessage)}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                width: '100%', height: 56, border: 'none', borderRadius: 16,
                                background: finalMessage ? `linear-gradient(135deg, ${T.dawn}, ${T.sunrise})` : '#E2DFDB',
                                color: finalMessage ? 'white' : '#A8A49E',
                                fontFamily: "'Outfit', sans-serif", fontSize: 17, fontWeight: 600,
                                cursor: finalMessage ? 'pointer' : 'default',
                                opacity: finalMessage ? 1 : 0.4,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Continuar →
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}
