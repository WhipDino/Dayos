import { useState, useEffect, useRef } from 'react';
import { AIOrb } from '../components/AIOrb';

const T = {
    bg: '#FAF8F5', surface: '#FFFFFF', surface2: '#F5F3F0',
    accent: '#F4A261', dawn: '#F4A261', sunrise: '#E76F51', dusk: '#6366F1', success: '#34D399',
    text: '#2D2D2D', text2: '#6B6B6B', text3: '#9B9790', border: '#ECEAE7',
};

const MicIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
);

const SendIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
    </svg>
);

export default function RoutineChat({ onContinue, onBack }) {
    const [entered, setEntered] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: "Oi! Me conta: como é um dia normal seu? Pode falar do horário que acorda até a hora de dormir 😊" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [orbState, setOrbState] = useState('idle');
    const [canContinue, setCanContinue] = useState(false);

    const chatEndRef = useRef(null);

    useEffect(() => {
        const t = setTimeout(() => setEntered(true), 50);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, orbState]);

    const getAnimStyle = (index) => ({
        opacity: entered ? 1 : 0,
        transform: entered ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.65s cubic-bezier(0.23, 1, 0.32, 1)',
        transitionDelay: `${index * 120}ms`
    });

    const handleSend = (textToSend = inputValue) => {
        if (!textToSend.trim()) return;

        const newMsg = { id: Date.now(), sender: 'user', text: textToSend.trim() };
        setMessages(p => [...p, newMsg]);
        setInputValue('');
        setOrbState('speaking');

        // Mock AI interaction without chat bubbles
        setTimeout(() => {
            const followUpCount = messages.filter(m => m.sender === 'ai').length;
            if (followUpCount === 1) {
                setMessages(p => [...p, { id: Date.now() + 1, sender: 'ai', text: "Internal state change" }]);
                setOrbState('idle');
            } else {
                setMessages(p => [...p, { id: Date.now() + 1, sender: 'ai', text: "Ready to proceed" }]);
                setOrbState('idle');
                setCanContinue(true);
            }
        }, 2000);
    };

    const toggleRecording = () => {
        if (isRecording) {
            setIsRecording(false);
            const mockTranscript = messages.length === 1
                ? "Acordo às 7h, trabalho das 9 às 18h e durmo às 23h."
                : "No fim de semana eu durmo até mais tarde e jogo videogame.";
            setInputValue(mockTranscript);
            setTimeout(() => handleSend(mockTranscript), 600);
        } else {
            setIsRecording(true);
        }
    };

    const isTyping = orbState === 'speaking';

    return (
        <>
            <style>{`
                @keyframes micPulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.12); }
                    100% { transform: scale(1); }
                }
                @keyframes micWave {
                    0% { transform: scale(1); opacity: 0.5; }
                    100% { transform: scale(1.8); opacity: 0; }
                }
                @keyframes typingBounce {
                    0% { transform: translateY(0); opacity: 0.4; }
                    50% { transform: translateY(-4px); opacity: 1; }
                    100% { transform: translateY(0); opacity: 0.4; }
                }
            `}</style>

            <div style={{
                position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                overflow: 'hidden', background: T.bg, paddingTop: 'env(safe-area-inset-top, 0px)'
            }}>
                <div style={{ maxWidth: 420, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>

                    {/* HEADER */}
                    <div style={{ flexShrink: 0, padding: '16px 20px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                {onBack && (
                                    <button
                                        onClick={onBack}
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            width: 40, height: 40, border: 'none', background: 'transparent',
                                            cursor: 'pointer', marginLeft: -8, borderRadius: 12, outline: 'none',
                                            WebkitTapHighlightColor: 'transparent', transition: 'background 0.15s ease'
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

                        <div style={{ width: '100%', height: 3, borderRadius: 1.5, background: T.border, marginBottom: 24, overflow: 'hidden' }}>
                            <div style={{ width: '80%', height: '100%', borderRadius: 1.5, background: `linear-gradient(90deg, ${T.dawn}, ${T.sunrise})` }} />
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <h1 style={{ ...getAnimStyle(0), margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: 30, fontWeight: 700, lineHeight: 1.12, letterSpacing: '-0.025em', color: T.text }}>
                                Me conta sobre<br /><em style={{ fontStyle: 'normal', background: `linear-gradient(135deg, ${T.dawn} 0%, ${T.sunrise} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>sua rotina</em>
                            </h1>
                            <p style={{ ...getAnimStyle(1), marginTop: 10, fontSize: 15, lineHeight: 1.5, color: T.text2, maxWidth: 300 }}>
                                Fale ou escreva como é seu dia a dia.
                            </p>
                        </div>
                    </div>

                    {/* ORB AREA (Expanded to fill available space) */}
                    <div style={{ ...getAnimStyle(2), flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <AIOrb state={orbState} size={280} />
                    </div>


                    {/* INPUT AREA */}
                    <div style={{ ...getAnimStyle(4), flexShrink: 0, padding: '16px 20px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <input
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                                placeholder="Escreva aqui..."
                                disabled={isTyping || canContinue}
                                style={{
                                    flex: 1, height: 48, background: T.surface, border: `1px solid ${T.border}`,
                                    borderRadius: 12, padding: '0 16px', fontSize: 15, color: T.text, outline: 'none',
                                    fontFamily: "'DM Sans', sans-serif",
                                    opacity: (isTyping || canContinue) ? 0.6 : 1
                                }}
                            />
                            {inputValue.trim() && (
                                <button
                                    onClick={() => handleSend()}
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

                        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', overflow: 'visible', fontSize: 56, paddingBottom: '0.45em', paddingTop: '0.15em' }}>
                            <div style={{ position: 'relative', width: '1em', height: '1em', opacity: canContinue ? 0 : 1, transition: 'opacity 0.3s', pointerEvents: canContinue ? 'none' : 'auto' }}>
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
                                        boxShadow: isRecording ? `0 8px 24px rgba(231,111,81,0.4)` : `0 8px 28px rgba(244,162,97,0.30)`,
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        animation: isRecording ? 'micPulse 1.5s infinite alternate ease-in-out' : 'none',
                                        transition: 'all 0.3s ease', zIndex: 2
                                    }}
                                >
                                    <MicIcon />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div style={{
                        flexShrink: 0, background: T.bg, padding: '24px 20px',
                        paddingBottom: 'calc(env(safe-area-inset-bottom, 16px) + 20px)',
                        marginTop: 'auto',
                        ...getAnimStyle(5)
                    }}>
                        <button
                            disabled={!canContinue}
                            onClick={() => onContinue && onContinue()}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                width: '100%', height: 56, border: 'none', borderRadius: 16,
                                background: canContinue ? `linear-gradient(135deg, ${T.dawn}, ${T.sunrise})` : '#E2DFDB',
                                color: canContinue ? 'white' : '#A8A49E',
                                fontFamily: "'Outfit', sans-serif", fontSize: 17, fontWeight: 600,
                                cursor: canContinue ? 'pointer' : 'default',
                                opacity: canContinue ? 1 : 0.4,
                                transition: 'all 0.3s ease',
                                boxShadow: canContinue ? '0 8px 28px rgba(244,162,97,0.30)' : 'none'
                            }}
                        >
                            Continuar →
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}
