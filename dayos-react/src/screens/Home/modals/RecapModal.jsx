import { useEffect, useState, useRef } from 'react';
import { T, triggerHaptic } from '../theme';
import { ModalOverlay } from './ModalOverlay';
import { AIOrb } from '../../../components/AIOrb';

const XIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke="rgba(245, 243, 240, 0.5)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const MicIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="rgba(245, 243, 240, 0.6)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
);

const SendIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
    </svg>
);

const TypingIndicator = () => {
    return (
        <div style={{ display: 'flex', gap: 4, padding: '12px 16px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '16px 16px 16px 4px', border: '1px solid rgba(255, 255, 255, 0.06)', width: 'fit-content' }}>
            {[0, 1, 2].map((i) => (
                <div key={i} style={{
                    width: 6, height: 6, borderRadius: '50%', background: 'rgba(245, 243, 240, 0.4)',
                    animation: `pulse 1.4s ease-in-out infinite ${i * 0.15}s`
                }} />
            ))}
            <style>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(0.5); opacity: 0.5; }
                    50% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

const AIBubble = ({ text }) => (
    <div style={{
        background: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '16px 16px 16px 4px',
        padding: '12px 16px',
        maxWidth: '85%',
        alignSelf: 'flex-start',
        fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#F5F3F0', lineHeight: 1.5,
        animation: 'fadeInUp 350ms ease-out forwards'
    }}>
        {text}
        <style>{`
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(8px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `}</style>
    </div>
);

const UserBubble = ({ text }) => (
    <div style={{
        background: `linear-gradient(135deg, ${T.dawn}, ${T.sunrise})`,
        borderRadius: '16px 16px 4px 16px',
        padding: '12px 16px',
        maxWidth: '85%',
        alignSelf: 'flex-end',
        fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#FFFFFF', lineHeight: 1.5,
        animation: 'fadeInUp 350ms ease-out forwards'
    }}>
        {text}
    </div>
);

// Focus wrapper to handle focus outline gracefully
const ChatInput = ({ onSend, canShowDoneButton, onDone, isRecording, setIsRecording }) => {
    const [text, setText] = useState('');
    const [focused, setFocused] = useState(false);

    const handleSend = () => {
        if (!text.trim()) return;
        onSend(text);
        setText('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const toggleRecord = () => {
        if (isRecording) {
            triggerHaptic('medium');
            setIsRecording(false);
            setText(prev => prev ? prev + " Além disso, gravei isso." : "Essa é uma mensagem de voz transcrita."); // mock transcript
        } else {
            triggerHaptic('light');
            setIsRecording(true);
        }
    };

    return (
        <div style={{ position: 'sticky', bottom: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Close Day Button placed ABOVE input area */}
            {canShowDoneButton && (
                <button
                    onClick={onDone}
                    style={{
                        marginBottom: 16,
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: 999,
                        padding: '10px 24px',
                        fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: '#F5F3F0',
                        cursor: 'pointer',
                        animation: 'fadeInUp 400ms ease-out forwards',
                        flexShrink: 0
                    }}
                >
                    Pronto, fecha o dia ✓
                </button>
            )}

            <div style={{
                background: '#171537',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '12px 16px',
                display: 'flex', gap: 8, alignItems: 'center',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={isRecording ? "Ouvindo..." : "Conta como foi..."}
                    style={{
                        flex: 1,
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: `1px solid ${focused ? 'rgba(244, 162, 97, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                        borderRadius: 12,
                        padding: '10px 14px',
                        fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#F5F3F0',
                        outline: 'none',
                        transition: `border 200ms ${T.easeStandard}`
                    }}
                />

                {text.length > 0 ? (
                    <button onClick={handleSend} style={{
                        width: 36, height: 36, borderRadius: '50%', border: 'none',
                        background: `linear-gradient(135deg, ${T.dawn}, ${T.sunrise})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer',
                        animation: `popIn 250ms ${T.easeBounce} forwards`
                    }}>
                        <SendIcon />
                    </button>
                ) : (
                    <button onClick={toggleRecord} style={{
                        width: 36, height: 36, borderRadius: '50%', border: 'none',
                        background: isRecording ? T.sunrise : 'rgba(255, 255, 255, 0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'background 200ms ease',
                        animation: isRecording ? 'micPulse 1.5s infinite ease-in-out' : 'none'
                    }}>
                        <MicIcon />
                    </button>
                )}

                <style>{`
                    @keyframes popIn {
                        from { transform: scale(0); }
                        to { transform: scale(1); }
                    }
                    @keyframes micPulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.12); }
                        100% { transform: scale(1); }
                    }
                    ::placeholder { color: rgba(245, 243, 240, 0.3) !important; }
                `}</style>
            </div>
        </div>
    );
};

export const RecapModal = ({ isOpen, onClose, userName = "João" }) => {
    // Flow: 0=start, 1=ai starts typing, 2=ai says initial, 3=user types, 4=user sends, 5=ai typing, 6=ai confirms, 7=ai ends
    const [flowState, setFlowState] = useState(0);
    const [messages, setMessages] = useState([]);
    const [isClosing, setIsClosing] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    const scrollRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setIsClosing(false);
                setFlowState(0);
                setMessages([]);
                setIsRecording(false);
            }, 0);

            // AI starts typing after 1.5s
            setTimeout(() => setFlowState(1), 1500);

            // AI sends initial message
            setTimeout(() => {
                triggerHaptic('light');
                setMessages([{ id: Date.now(), role: 'ai', text: "Hoje você tinha 5 coisas no radar — reunião com o time, sync de design, mandar a proposta pro Carlos, ligar pro dentista e revisar o relatório. Como foi? 😊" }]);
                setFlowState(2); // Waiting for user
            }, 3500);
        }
    }, [isOpen]);

    useEffect(() => {
        // Auto-scroll to bottom
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, flowState]);

    const handleUserSend = (text) => {
        setMessages(prev => [...prev, { id: Date.now(), role: 'user', text }]);
        setFlowState(5); // AI typing to respond
        triggerHaptic('medium');

        // AI response
        setTimeout(() => {
            triggerHaptic('light');
            setMessages(prev => [...prev, { id: Date.now(), role: 'ai', text: "Show! Registrado. Mais alguma coisa?" }]);
            setFlowState(6);
        }, 1500);
    };

    const handleDone = () => {
        setFlowState(7); // Final AI typing
        triggerHaptic('success');

        setTimeout(() => {
            triggerHaptic('light');
            setMessages(prev => [...prev, { id: Date.now(), role: 'ai', text: `Dia fechado! Amanhã tem reunião de time às 10h e o relatório. Boa noite, ${userName} 💤` }]);
            setFlowState(8); // Done

            // Auto close after 2s
            setTimeout(() => {
                setIsClosing(true);
                setTimeout(onClose, 350); // wait for scale down animation
            }, 2500);
        }, 1200);
    };

    // Determine orb state
    let orbState = 'idle';
    if (isRecording) {
        orbState = 'listening';
    } else if (flowState === 1 || flowState === 5 || flowState === 7) {
        orbState = 'speaking';
    }

    // Since we handle our custom closing animation logic we wrap ModalOverlay's rendering or just let it handle standard.
    // The spec asks for a solid background no transparency:
    // Modal Overlay will render if isOpen is true. When isClosing is true we trigger our internal scale down.

    return (
        <ModalOverlay isOpen={isOpen && !isClosing} onClose={onClose} isNight={true} alignCenter={true}>
            <div style={{
                backgroundColor: '#1E1B4B',
                border: '1px solid rgba(99, 102, 241, 0.15)',
                borderRadius: 24,
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
                width: '100%',
                display: 'flex', flexDirection: 'column',
                height: '80vh', maxHeight: 700,
                position: 'relative',
                overflow: 'hidden',
                overscrollBehavior: 'contain',
                WebkitOverflowScrolling: 'auto'
            }}>

                {/* Scrollable Container */}
                <div ref={scrollRef} style={{
                    flex: 1,
                    overflowY: 'auto',
                    display: 'flex', flexDirection: 'column',
                    padding: '20px 20px 20px 20px',
                    overscrollBehavior: 'contain',
                    WebkitOverflowScrolling: 'auto'
                }}>

                    {/* Header: Logo Orbhy + Fechar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: '#F5F3F0', lineHeight: 1 }}>Orbhy</span>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.dawn, marginLeft: 2 }} />
                        </div>

                        <button
                            onClick={onClose}
                            style={{ background: 'none', border: 'none', padding: 8, margin: -8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            aria-label="Fechar recap"
                        >
                            <XIcon />
                        </button>
                    </div>

                    {/* Saudação com Gradient */}
                    <div style={{ marginTop: 16 }}>
                        <h2 style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 700, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span style={{ color: '#F5F3F0' }}>Boa noite,&nbsp;</span>
                            <span style={{
                                background: `linear-gradient(90deg, ${T.dawn}, ${T.sunrise})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>{userName}</span>
                        </h2>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'rgba(245, 243, 240, 0.5)', marginTop: 4 }}>
                            Hora de fechar o dia
                        </div>
                    </div>

                    {/* AIOrb */}
                    <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
                        <AIOrb state={orbState} size={140} />
                    </div>

                    {/* Chat Messages */}
                    <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12, padding: '0 4px', flex: 1 }}>
                        {messages.map((msg) => (
                            msg.role === 'ai' ? <AIBubble key={msg.id} text={msg.text} /> : <UserBubble key={msg.id} text={msg.text} />
                        ))}
                        {(flowState === 1 || flowState === 5 || flowState === 7) && <TypingIndicator />}
                    </div>
                </div>

                {/* Input Area (Sticky Bottom via absolute flex order) */}
                {(flowState >= 2 && flowState <= 6) && (
                    <div style={{ flexShrink: 0 }}>
                        <ChatInput
                            onSend={handleUserSend}
                            canShowDoneButton={flowState === 6}
                            onDone={handleDone}
                            isRecording={isRecording}
                            setIsRecording={setIsRecording}
                        />
                    </div>
                )}
            </div>
        </ModalOverlay>
    );
};
