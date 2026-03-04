import { useState, useRef, useEffect } from 'react';
import { T } from './theme';

// --- MOCK DATA ---
const initialTasks = [
    { id: 'ev1', type: 'meeting', time: '10:00 — 11:00', title: 'Reunião com o time', subtext: 'Com Ana, Carlos e +2', link: true, past: true },
    { id: 't1', type: 'task', origin: 'Via email do Carlos · ~30min', title: 'Mandar proposta pro cliente', suggestion: 'Sugestão: fazer entre 11h e 11h30', urgent: true, done: false },
    { id: 'fb1', type: 'free', timeText: '1h30 livre', suggestion: 'Que tal resolver a proposta?' },
    { id: 'ev2', type: 'meeting', time: '14:00 — 15:00', title: 'Sync de Design', subtext: 'Google Meet', past: false },
    { id: 't2', type: 'task', origin: 'Criado por voz · ~15min', title: 'Ligar para o dentista', suggestion: 'Fazer à tarde', urgent: false, done: false }
];

// --- ICONS ---
const BellIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke={T.text} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);
const UserAvatar = ({ name }) => (
    <div style={{ width: 36, height: 36, borderRadius: 18, background: T.gradientWarm, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14, fontWeight: 'bold' }}>
        {name.substring(0, 2).toUpperCase()}
    </div>
);
const ClockIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke={T.text3} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);
const CheckIconSmall = ({ color = 'white' }) => (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

// --- COMPONENT: TimelineCard ---
const TimelineCard = ({ item, isNext, onComplete }) => {
    const isMeeting = item.type === 'meeting';
    const isTask = item.type === 'task';
    const isFree = item.type === 'free';

    // Fallback swipe interactions to clicks for desktop mock 
    const handleSimulatedSwipeComplete = () => {
        if (item.done || !isTask) return;
        if (navigator.vibrate) navigator.vibrate(10);
        setTimeout(() => onComplete(item.id), 400); // Trigger parent update
    };

    if (isMeeting) {
        return (
            <div style={{
                background: T.surface,
                borderRadius: 20,
                padding: isNext ? 20 : 16,
                boxShadow: isNext ? T.shadowCardHover : T.shadowCard,
                opacity: item.past ? 0.45 : 1,
                borderLeft: `4px solid ${item.past ? T.border : 'transparent'}`,
                backgroundImage: item.past ? 'none' : `linear-gradient(${T.surface}, ${T.surface}), ${T.gradientDusk}`,
                backgroundClip: 'padding-box, border-box',
                backgroundOrigin: 'padding-box, border-box',
                borderLeftColor: 'transparent', // The gradient will show through the left border
                position: 'relative',
                display: 'flex', flexDirection: 'column', gap: 12,
                transform: isNext ? 'scale(1.02)' : 'none',
                transition: `all 0.5s ${T.easeStandard}`
            }}>
                {isNext && (
                    <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(244,162,97,0.1)', color: T.dawn, padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 'bold', fontFamily: "'DM Sans', sans-serif" }}>
                        Próximo
                    </div>
                )}
                <div style={{ alignSelf: 'flex-start', background: 'rgba(99,102,241,0.08)', color: T.dusk, padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
                    {item.time}
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 17, color: T.text }}>
                    {item.title}
                </div>
                {item.subtext && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: T.text2 }}>
                            {item.subtext}
                        </div>
                        {item.link && !item.past && (
                            <button style={{ background: 'transparent', border: 'none', color: T.dusk, fontSize: 13, fontWeight: 600 }}>Entrar</button>
                        )}
                    </div>
                )}
            </div>
        );
    }

    if (isTask) {
        const completed = item.done;
        return (
            <div
                onClick={handleSimulatedSwipeComplete} // Simulated swipe
                style={{
                    background: T.surface,
                    borderRadius: 20,
                    padding: isNext ? 20 : 16,
                    boxShadow: completed ? 'none' : (isNext ? T.shadowCardHover : T.shadowCard),
                    opacity: completed ? 0.35 : 1,
                    borderLeft: completed ? `4px solid ${T.success}` : `4px solid transparent`,
                    backgroundImage: completed ? 'none' : `linear-gradient(${T.surface}, ${T.surface}), ${item.urgent ? T.gradientWarm : `linear-gradient(180deg, ${T.dawn}, ${T.dawn})`}`,
                    backgroundClip: 'padding-box, border-box',
                    backgroundOrigin: 'padding-box, border-box',
                    position: 'relative',
                    display: 'flex', flexDirection: 'column', gap: 6,
                    transform: completed ? 'scale(0.95)' : (isNext ? 'scale(1.02)' : 'none'),
                    transition: `all 0.4s ${completed ? T.easeBounce : T.easeStandard}`,
                    cursor: 'pointer'
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: T.text3 }}>{item.origin}</div>
                    {item.urgent && !completed && (
                        <div style={{ background: 'rgba(231,111,81,0.1)', color: T.sunrise, padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 'bold', fontFamily: "'DM Sans', sans-serif" }}>
                            Hoje
                        </div>
                    )}
                    {completed && <div style={{ background: T.success, borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckIconSmall /></div>}
                </div>

                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: 16, color: T.text, textDecoration: completed ? 'line-through' : 'none', textDecorationThickness: '1.5px', textDecorationColor: T.text3 }}>
                    {item.title}
                </div>

                {item.suggestion && !completed && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                        <ClockIcon />
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: T.text2 }}>{item.suggestion}</span>
                    </div>
                )}

                {isNext && !completed && (
                    <button onClick={(e) => { e.stopPropagation(); /* Focus mode trigger later */ }} style={{ marginTop: 12, background: T.gradientWarm, color: 'white', border: 'none', borderRadius: 12, height: 36, fontSize: 14, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>
                        Começar
                    </button>
                )}
            </div>
        );
    }

    if (isFree) {
        return (
            <div style={{
                background: T.surface2,
                borderRadius: 20,
                padding: 16,
                border: `1px dashed ${T.border}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
                margin: '8px 0'
            }}>
                <ClockIcon />
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 16, color: T.text2 }}>{item.timeText}</div>
                {item.suggestion && <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 13, color: T.accent }}>{item.suggestion}</div>}
            </div>
        );
    }

    return null;
};


// --- SCREEN COMPONENT ---
export function HomeScreen({ userName }) {
    const [tasks, setTasks] = useState(initialTasks);
    const [scrollY, setScrollY] = useState(0);
    const scrollRef = useRef(null);

    // Filter math for score
    const totalTasks = tasks.filter(t => t.type === 'task').length;
    const completedTasks = tasks.filter(t => t.type === 'task' && t.done).length;
    const progressPerc = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    const meetings = tasks.filter(t => t.type === 'meeting').length;

    // Scroll listener for hero header compression
    useEffect(() => {
        const handleScroll = (e) => {
            setScrollY(e.target.scrollTop);
        };
        const el = scrollRef.current;
        if (el) el.addEventListener('scroll', handleScroll);
        return () => el && el.removeEventListener('scroll', handleScroll);
    }, []);

    // Listen to FAB task creation event
    useEffect(() => {
        const addTask = () => {
            setTasks(p => [...p, {
                id: Date.now().toString(), type: 'task', origin: 'Por voz · agora',
                title: 'Lembrete novo adicionado', urgent: false, done: false
            }]);
        };
        window.addEventListener('dayos-add-voiced-task', addTask);
        return () => window.removeEventListener('dayos-add-voiced-task', addTask);
    }, []);

    const markItemDone = (id) => {
        setTasks(p => p.map(t => t.id === id ? { ...t, done: true } : t));
    };

    // Calculation for header animations
    const compressRatio = Math.min(Math.max(scrollY / 100, 0), 1);
    const isCompressed = compressRatio > 0.8;

    return (
        <div className="home-container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: T.bg, paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 56px)' }}>
            <style>{`
                .home-scroll-area {
                    flex: 1;
                    overflow-y: auto;
                    scroll-behavior: smooth;
                    padding: 0 16px 120px 16px;
                }
                .home-scroll-area::-webkit-scrollbar { display: none; }
                
                @keyframes pulseNowLine {
                    0% { opacity: 0.5; }
                    50% { opacity: 1; }
                    100% { opacity: 0.5; }
                }
                
                .card-enter {
                    animation: cardFadeUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
                }
                @keyframes cardFadeUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes confettiFall {
                    0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
                }
            `}</style>

            {/* HERO HEADER (Responsive) */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 10,
                background: T.gradientHero,
                paddingTop: 'env(safe-area-inset-top, 0px)',
                boxShadow: isCompressed ? `0 4px 20px rgba(0,0,0,0.03)` : 'none',
                transition: `all 0.3s ${T.easeStandard}`
            }}>
                {/* Top Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', transition: 'all 0.3s' }}>
                    <div style={{
                        fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 600, color: T.text,
                        opacity: isCompressed ? 1 : 0, transform: isCompressed ? 'translateY(0)' : 'translateY(10px)',
                        transition: `all 0.3s ${T.easeStandard}`
                    }}>
                        Hoje · <span style={{ color: completedTasks === totalTasks ? T.success : T.accent }}>{completedTasks}/{totalTasks} feitas</span>
                    </div>
                    {/* Floating right actions */}
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center', position: 'absolute', right: 20 }}>
                        <BellIcon />
                        <UserAvatar name={userName} />
                    </div>
                </div>

                {/* Main Greeting Area (Fades out when compressed) */}
                <div style={{
                    padding: '0 20px 20px',
                    opacity: 1 - compressRatio,
                    transform: `translateY(-${compressRatio * 20}px)`,
                    maxHeight: isCompressed ? 0 : 200,
                    overflow: 'hidden',
                    pointerEvents: isCompressed ? 'none' : 'auto',
                    transition: `max-height 0.3s ${T.easeStandard}, opacity 0.2s`
                }}>
                    <h1 style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 700, color: T.text, lineHeight: 1.2 }}>
                        Bom dia, {userName}!<br />
                        Hoje tá <span style={{ background: T.gradientWarm, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>puxado</span> ☀️
                    </h1>

                    {/* GAMIFIED SCORE CARD */}
                    <div style={{
                        marginTop: 20,
                        background: completedTasks === totalTasks && totalTasks > 0 ? 'rgba(52,211,153,0.05)' : T.surface,
                        borderRadius: 20, padding: 16,
                        boxShadow: T.shadowCard,
                        border: completedTasks === totalTasks && totalTasks > 0 ? `1px solid ${T.success}` : '1px solid transparent',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        transition: `all 0.5s ${T.easeStandard}`
                    }}>
                        {/* Meetings */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, paddingRight: 12, borderRight: `1px solid ${T.border}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.dusk }} />
                                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 700, color: T.dusk, lineHeight: 1 }}>{meetings}</span>
                            </div>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: T.text3 }}>reuniões</div>
                        </div>

                        {/* Tasks Done */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, padding: '0 12px', borderRight: `1px solid ${T.border}` }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 700, color: completedTasks === totalTasks ? T.success : T.dawn, lineHeight: 1 }}>{completedTasks}/{totalTasks}</span>
                            </div>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: T.text3, marginBottom: 4 }}>feitas</div>
                            {/* Progress Bar */}
                            <div style={{ height: 6, background: T.surface2, borderRadius: 3, overflow: 'hidden' }}>
                                <div style={{
                                    width: `${progressPerc}%`, height: '100%',
                                    background: completedTasks === totalTasks ? T.success : T.gradientWarm,
                                    transition: `width 0.8s ${T.easeBounce}, background 0.3s`
                                }} />
                            </div>
                        </div>

                        {/* Free Time */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, paddingLeft: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 700, color: T.success, lineHeight: 1 }}>1h30</span>
                            </div>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: T.text3 }}>livre</div>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: T.success, fontWeight: 600 }}>⬆ bom!</div>
                        </div>
                    </div>
                </div>

                {/* Score bar compression transition */}
                <div style={{
                    height: 4, width: '100%', background: T.surface2,
                    opacity: isCompressed ? 1 : 0, transition: 'opacity 0.2s', position: 'absolute', bottom: 0, left: 0
                }}>
                    <div style={{ width: `${progressPerc}%`, height: '100%', background: completedTasks === totalTasks ? T.success : T.gradientWarm, transition: 'width 0.5s' }} />
                </div>
            </div>

            {/* TIMELINE */}
            <div className="home-scroll-area" ref={scrollRef}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 16 }}>

                    {tasks.length === 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center' }}>
                            <div style={{ width: 120, height: 120, background: T.surface2, borderRadius: '50%', marginBottom: 20 }} />
                            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 600, color: T.text }}>Seu dia tá em branco</h2>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: T.text2, margin: '8px 0 24px 0' }}>Toca no microfone e me conta o que você precisa fazer ou conecte sua agenda.</p>

                            <button style={{ background: T.gradientWarm, color: 'white', border: 'none', padding: '14px 24px', borderRadius: 16, fontSize: 15, fontWeight: 600, boxShadow: T.shadowCard, width: '100%', marginBottom: 12 }}>🗣 Falar com a IA</button>
                            <button style={{ background: T.surface, color: T.text, border: `1px solid ${T.border}`, padding: '14px 24px', borderRadius: 16, fontSize: 15, fontWeight: 600, width: '100%' }}>📅 Conectar agenda</button>
                        </div>
                    ) : (
                        tasks.map((item, idx) => {
                            // Find where 'Agora' goes
                            const isNow = !item.past && (idx === 0 || tasks[idx - 1].past);
                            const animationStyle = { animationDelay: `${idx * 80}ms` };

                            return (
                                <div key={item.id} className="card-enter" style={animationStyle}>
                                    {isNow && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0 12px 0' }}>
                                            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 11, color: T.accent, letterSpacing: '1.5px' }}>AGORA</div>
                                            <div style={{ flex: 1, height: 2, background: T.gradientWarm, animation: 'pulseNowLine 3s infinite ease-in-out' }} />
                                        </div>
                                    )}
                                    <TimelineCard item={item} isNext={isNow} onComplete={markItemDone} />
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
