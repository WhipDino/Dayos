import { useState, useEffect, useRef } from 'react';
import { T, triggerHaptic } from './theme';

const CircleCheckIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const CalendarIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke={T.dusk} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const CheckCircleOutlineIcon = ({ color }) => (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

const ClockIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke={T.success} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const EmptySunIcon = () => (
    <svg viewBox="0 0 24 24" width="64" height="64" stroke={T.dawn} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);


// Unified Completion Button
const CheckButton = ({ isChecked, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            style={{
                width: 28, height: 28, borderRadius: '50%',
                border: isChecked ? `2px solid ${T.success}` : `2px solid ${T.border}`,
                background: isChecked ? T.success : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                flexShrink: 0
            }}
        >
            <div style={{
                color: '#FFF',
                opacity: isChecked ? 1 : 0,
                transform: isChecked ? 'scale(1)' : 'scale(0)',
                transition: `all 250ms ${T.easeBounce}`
            }}>
                <CircleCheckIcon />
            </div>
        </button>
    );
};

// 1. Meeting Card
export const MeetingCard = ({ item, isPast, index }) => (
    <div style={{
        background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: 16,
        boxShadow: T.shadowCard, display: 'flex', gap: 12, alignItems: 'flex-start',
        opacity: isPast ? 0.4 : 1, transition: `all 500ms ${T.easeStandard}`,
        transitionDelay: `${index * 60}ms`,
        animation: 'fadeInUpCard 500ms cubic-bezier(0.23, 1, 0.32, 1) both'
    }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CalendarIcon />
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: T.text, textDecoration: isPast ? 'line-through' : 'none' }}>
                {item.title}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: T.text3, marginTop: 4 }}>
                {item.time} · {item.duration}
            </div>
            {item.participants && (
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: T.text3, marginTop: 2 }}>
                    {item.participants}
                </div>
            )}
        </div>
    </div>
);

// 2. Task Card
export const TaskCard = ({ item, isPast, index, onComplete }) => {
    const isUrgent = item.urgent;
    const color = isUrgent ? T.sunrise : T.dawn;
    const bgColor = isUrgent ? 'rgba(231,111,81,0.1)' : 'rgba(244,162,97,0.1)';

    return (
        <div style={{
            background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: 16,
            boxShadow: T.shadowCard, display: 'flex', gap: 12, alignItems: 'center',
            opacity: (isPast || item.completed) ? 0.4 : 1, transition: `all 500ms ${T.easeStandard}`,
            transitionDelay: `${index * 60}ms`,
            animation: 'fadeInUpCard 500ms cubic-bezier(0.23, 1, 0.32, 1) both'
        }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CheckCircleOutlineIcon color={color} />
            </div>
            <div style={{ flex: 1 }}>
                <div style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: T.text,
                    textDecoration: item.completed ? 'line-through' : 'none'
                }}>
                    {item.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: T.text3 }}>{item.subtitle}</div>
                    {isUrgent && (
                        <div style={{
                            background: 'rgba(231,111,81,0.08)', color: T.sunrise,
                            fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500,
                            padding: '2px 8px', borderRadius: 999
                        }}>
                            Hoje
                        </div>
                    )}
                </div>
            </div>
            <CheckButton isChecked={item.completed} onToggle={() => onComplete(item.id)} />
        </div>
    );
};


// 3. Email Card
export const EmailCard = ({ item, isPast, index, onComplete }) => {
    // Generate avatar color based on initial
    const getAvatarColor = (name) => {
        const initial = name ? name.charAt(0).toUpperCase() : 'A';
        if (['A', 'B', 'C', 'D', 'E', 'F'].includes(initial)) return T.sunrise;
        if (['G', 'H', 'I', 'J', 'K', 'L', 'M'].includes(initial)) return T.dusk;
        return T.dawn;
    };

    const senderName = item.sender || "Email";
    const avatarColor = getAvatarColor(senderName);

    return (
        <div style={{
            background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: 16,
            boxShadow: T.shadowCard, display: 'flex', gap: 12, alignItems: 'center',
            opacity: (isPast || item.completed) ? 0.4 : 1, transition: `all 500ms ${T.easeStandard}`,
            transitionDelay: `${index * 60}ms`,
            animation: 'fadeInUpCard 500ms cubic-bezier(0.23, 1, 0.32, 1) both'
        }}>
            <div style={{
                width: 40, height: 40, borderRadius: '50%', background: avatarColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 700, color: '#FFF'
            }}>
                {senderName.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
                <div style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: T.text,
                    textDecoration: item.completed ? 'line-through' : 'none'
                }}>
                    {item.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: T.text3 }}>{senderName} · {item.context || "Email"}</div>
                    {!item.completed && (
                        <div style={{
                            background: 'rgba(231,111,81,0.08)', color: T.sunrise,
                            fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500,
                            padding: '2px 8px', borderRadius: 999
                        }}>
                            responder
                        </div>
                    )}
                </div>
            </div>
            <CheckButton isChecked={item.completed} onToggle={() => onComplete(item.id)} />
        </div>
    );
};

// 4. Free Block
export const FreeBlock = ({ item, index }) => (
    <div style={{
        background: T.surface2, border: `1px dashed ${T.border}`, borderRadius: 20, padding: '14px 16px',
        display: 'flex', gap: 12, alignItems: 'center',
        transitionDelay: `${index * 60}ms`,
        animation: 'fadeInUpCard 500ms cubic-bezier(0.23, 1, 0.32, 1) both'
    }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(52,211,153,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ClockIcon />
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: T.text2 }}>
                {item.duration} livre
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: item.suggestion ? T.dawn : T.text3, marginTop: 2 }}>
                {item.suggestion || "Tempo livre — aproveite 😎"}
            </div>
        </div>
    </div>
);


const NowIndicator = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '8px 0' }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: T.dawn }}>
            AGORA
        </div>
        <div style={{ flex: 1, height: 1.5, background: `linear-gradient(90deg, ${T.dawn}, transparent)` }} />
    </div>
);

// Empty State
const EmptyState = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: 60, animation: 'fadeIn 500ms ease forwards' }}>
        <EmptySunIcon />
        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 600, color: T.text, marginTop: 16, marginBottom: 8 }}>
            Seu dia tá em branco
        </h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: T.text2, textAlign: 'center', maxWidth: 280, lineHeight: 1.5, margin: 0 }}>
            Conecte sua agenda ou crie tarefas no recap da noite
        </p>
        <button style={{
            marginTop: 20, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: '12px 24px',
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: T.dawn, cursor: 'pointer',
            boxShadow: T.shadowCard
        }}>
            Conectar agenda
        </button>
    </div>
);


// -------------------------------------------------------------
// MAIN HOME SCREEN
// -------------------------------------------------------------
export const HomeScreen = ({ userName = "João", initialTasks = [] }) => {
    const [scrolled, setScrolled] = useState(false);
    const [tasks, setTasks] = useState(initialTasks);
    const nowRef = useRef(null);

    // Initial unified data prep and grouping
    const summary = {
        meetings: tasks.filter(t => t.type === 'meeting' && !t.completed).length,
        tasks: tasks.filter(t => (t.type === 'task' || t.type === 'email') && !t.completed).length,
        freeTime: "1h", // Mocked sum
    };

    const pastItems = tasks.filter(t => t.isPast);
    const futureItems = tasks.filter(t => !t.isPast);

    const handleComplete = (id) => {
        triggerHaptic('success');
        setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const handleScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        if (scrollTop > 10 && !scrolled) setScrolled(true);
        else if (scrollTop <= 10 && scrolled) setScrolled(false);
    };

    // Auto-scroll to "AGORA"
    useEffect(() => {
        if (nowRef.current && tasks.length > 0) {
            setTimeout(() => {
                nowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 600); // Wait for enter animations
        }
    }, [tasks.length]);

    const renderCard = (item, index, isPast) => {
        switch (item.type) {
            case 'meeting': return <MeetingCard key={item.id} item={item} index={index} isPast={isPast} />;
            case 'email': return <EmailCard key={item.id} item={item} index={index} isPast={isPast} onComplete={handleComplete} />;
            case 'free': return <FreeBlock key={item.id} item={item} index={index} />;
            case 'task':
            default: return <TaskCard key={item.id} item={item} index={index} isPast={isPast} onComplete={handleComplete} />;
        }
    };


    return (
        <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            maxWidth: 420, margin: '0 auto',
            backgroundColor: 'rgb(250, 248, 245)',
            overscrollBehavior: 'contain'
        }}>
            <style>{`
                @keyframes fadeInUpCard {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>

            {/* HEADER */}
            <header style={{
                position: 'sticky', top: 0, zIndex: 10,
                padding: 'calc(env(safe-area-inset-top, 24px) + 16px) 16px 12px',
                backgroundColor: 'rgb(250, 248, 245)',
                borderBottom: scrolled ? `1px solid ${T.border}` : '1px solid transparent',
                transition: 'border-bottom 0.2s ease',
                animation: 'fadeInUpCard 400ms ease-out both'
            }}>
                {/* Linha 1 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 700, color: T.text, lineHeight: 1 }}>Orbhy</span>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: T.dawn, marginLeft: 3 }} />
                    </div>
                    <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: `linear-gradient(135deg, ${T.dawn}, ${T.sunrise})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, color: '#FFF'
                    }}>
                        {userName.charAt(0).toUpperCase()}
                    </div>
                </div>

                {/* Linha 2 */}
                <div style={{ marginTop: 16 }}>
                    <h2 style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: T.text }}>Bom dia,&nbsp;</span>
                        <span style={{
                            background: `linear-gradient(90deg, ${T.dawn}, ${T.sunrise})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>{userName}</span>
                    </h2>

                    {(summary.meetings > 0 || summary.tasks > 0) && (
                        <div style={{
                            marginTop: 6, background: T.surface2, borderRadius: 12, padding: '8px 14px',
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: T.text2
                        }}>
                            {summary.meetings > 0 && (
                                <>
                                    <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: T.dusk }} />
                                    <span>{summary.meetings} reuniões</span>
                                </>
                            )}
                            {(summary.meetings > 0 && summary.tasks > 0) && <span style={{ opacity: 0.5 }}>·</span>}
                            {summary.tasks > 0 && (
                                <>
                                    <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: T.dawn }} />
                                    <span>{summary.tasks} tarefas</span>
                                </>
                            )}
                            {(summary.tasks > 0) && <span style={{ opacity: 0.5 }}>·</span>}
                            <>
                                <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: T.success }} />
                                <span>{summary.freeTime} livre</span>
                            </>
                        </div>
                    )}
                </div>
            </header>

            {/* TIMELINE BODY */}
            <main
                onScroll={handleScroll}
                style={{
                    flex: 1, overflowY: 'auto',
                    padding: '12px 16px 120px 16px',
                    overscrollBehavior: 'contain',
                    WebkitOverflowScrolling: 'touch',
                    display: 'flex', flexDirection: 'column', gap: 10
                }}
            >
                {tasks.length === 0 ? (
                    <EmptyState />
                ) : (
                    <>
                        {pastItems.map((item, i) => renderCard(item, i, true))}

                        {(pastItems.length > 0 || futureItems.length > 0) && (
                            <div ref={nowRef} style={{ scrollMarginTop: 140 }}>
                                <NowIndicator />
                            </div>
                        )}

                        {futureItems.map((item, i) => renderCard(item, pastItems.length + i, false))}
                    </>
                )}
            </main>
        </div>
    );
};
