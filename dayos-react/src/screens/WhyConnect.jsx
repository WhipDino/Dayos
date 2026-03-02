import { useRef, useState, useEffect } from 'react'
import { flushSync } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

const T = {
    bg: '#FAF8F5', surface: '#FFFFFF', surface2: '#F5F3F0',
    accent: '#F4A261', accentHover: '#E8955A',
    accentGlow: 'rgba(244,162,97,0.22)', accentLight: 'rgba(244,167,108,0.10)',
    dawn: '#F4A261', sunrise: '#E76F51', dusk: '#6366F1', success: '#34D399',
    text: '#2D2D2D', text2: '#6B6B6B', text3: '#9B9790', border: '#ECEAE7',
}

const CalendarIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" style={{ width: 20, height: 20 }}>
        <rect x="2" y="3" width="16" height="15" rx="3" fill="white" stroke="#E0E0E0" strokeWidth="0.8" />
        <rect x="2" y="3" width="16" height="5" rx="3" fill="#4285F4" />
        <rect x="2" y="7" width="16" height="1" fill="#4285F4" />
        <rect x="5" y="11" width="2.5" height="2" rx="0.4" fill="#34A853" />
        <rect x="8.8" y="11" width="2.5" height="2" rx="0.4" fill="#FBBC05" />
        <rect x="12.5" y="11" width="2.5" height="2" rx="0.4" fill="#EA4335" />
        <rect x="5" y="14.5" width="2.5" height="2" rx="0.4" fill="#4285F4" />
        <rect x="8.8" y="14.5" width="2.5" height="2" rx="0.4" fill="#34A853" />
    </svg>
)
const GmailIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" style={{ width: 20, height: 20 }}>
        <rect x="1" y="4" width="18" height="12" rx="2.5" fill="white" stroke="#E0E0E0" strokeWidth="0.8" />
        <path d="M1 7l9 5.5L19 7" stroke="#EA4335" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
)
const AiIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" style={{ width: 20, height: 20 }}>
        <circle cx="10" cy="10" r="7" stroke={T.accent} strokeWidth="1.5" />
        <path d="M7 10c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3" stroke={T.accent} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="10" r="1.5" fill={T.accent} />
        <line x1="10" y1="3" x2="10" y2="1" stroke={T.accent} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1="19" x2="10" y2="17" stroke={T.accent} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="3" y1="10" x2="1" y2="10" stroke={T.accent} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="19" y1="10" x2="17" y2="10" stroke={T.accent} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
)
const ShieldIcon = () => (
    <svg viewBox="0 0 16 16" style={{ width: 14, height: 14, stroke: '#059669', strokeWidth: 2.2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        <path d="M8 1L2 4v4c0 3.31 2.55 6.41 6 7 3.45-.59 6-3.69 6-7V4L8 1z" />
        <path d="M5.5 8l2 2 3.5-3.5" strokeWidth="1.8" />
    </svg>
)

function CalRow({ dot, name, time, badge, badgeType }) {
    const colors = { soon: { bg: 'rgba(244,162,97,0.15)', color: T.accentHover }, free: { bg: 'rgba(52,211,153,0.15)', color: '#059669' }, done: { bg: 'rgba(0,0,0,0.06)', color: T.text3 } }
    const c = colors[badgeType]
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: dot, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
                <div style={{ fontSize: 11, color: T.text3, marginTop: 1 }}>{time}</div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 6, whiteSpace: 'nowrap', background: c.bg, color: c.color }}>{badge}</span>
        </div>
    )
}

function EmailRow({ avatar, avatarBg, from, subject, tag, tagType }) {
    const colors = { reply: { bg: 'rgba(244,162,97,0.15)', color: T.accentHover }, review: { bg: 'rgba(99,102,241,0.12)', color: T.dusk } }
    const c = colors[tagType]
    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 10px', borderRadius: 10, background: T.surface }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white', flexShrink: 0, marginTop: 1, background: avatarBg }}>{avatar}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{from}</div>
                <div style={{ fontSize: 11, color: T.text2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>{subject}</div>
                <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 5, whiteSpace: 'nowrap', marginTop: 4, display: 'inline-block', background: c.bg, color: c.color }}>{tag}</span>
            </div>
        </div>
    )
}

function TaskItem({ done, text }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 14, height: 14, borderRadius: 4, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...(done ? { background: T.success, border: `1.5px solid ${T.success}` } : { border: `1.5px solid ${T.border}` }) }}>
                {done && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><polyline points="1 3 3 5 7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
            <span style={{ fontSize: 12, fontWeight: 500, color: done ? T.text3 : T.text, textDecoration: done ? 'line-through' : 'none' }}>{text}</span>
        </div>
    )
}

function CarouselDots({ count, active }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 8 }}>
            {Array.from({ length: count }, (_, i) => (
                <div key={i} style={{ width: i === active ? 16 : 6, height: 6, borderRadius: i === active ? 3 : '50%', background: i === active ? T.dawn : T.border, transition: 'all 0.3s ease' }} />
            ))}
        </div>
    )
}

export default function WhyConnect({ onContinue, onBack }) {
    const scrollRef = useRef(null)
    const cloneScrollRef = useRef(null)
    const cardsContainerRef = useRef(null)
    const cardRefs = [useRef(null), useRef(null), useRef(null)]
    const [activeSlide, setActiveSlide] = useState(0)

    const [entered, setEntered] = useState(false)

    useEffect(() => {
        // Trigger enter animation after mount
        const t = setTimeout(() => setEntered(true), 50)
        return () => clearTimeout(t)
    }, [])

    // FLIP Animation state
    const [animState, setAnimState] = useState({
        phase: 'idle', // 'idle' | 'fly-in' | 'hold' | 'fly-out'
        activeIndex: -1,
        queue: [0, 1, 2],
        rect: null,
        cloneStyle: {}
    });

    const handleScroll = () => {
        const el = scrollRef.current
        if (!el) return
        const slide = Math.round(el.scrollLeft / (el.firstElementChild?.offsetWidth + 24 || 1))
        setActiveSlide(slide)
    }

    // Process the queue
    useEffect(() => {
        if (animState.phase !== 'idle' || animState.queue.length === 0) return;

        const nextIndex = animState.queue[0];
        const cardEl = cardRefs[nextIndex].current;
        if (!cardEl) return;

        const STAGGER_WAIT = nextIndex === 0 ? 700 : 200;
        let t1, t2, t3, t4, t5, t6, t7, t8, t9;

        const executeFlyOut = () => {
            // Re-calculate pos in case of user scroll
            const newRect = cardRefs[nextIndex].current.getBoundingClientRect();

            setAnimState(prev => ({
                ...prev,
                phase: 'fly-out',
                cloneStyle: {
                    left: newRect.left,
                    top: newRect.top,
                    width: newRect.width,
                    height: newRect.height,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03)',
                    transition: 'all 600ms cubic-bezier(0.23, 1, 0.32, 1)'
                }
            }));

            // Phase 5: cleanup and trigger next
            t6 = setTimeout(() => {
                flushSync(() => {
                    setAnimState(prev => ({
                        phase: 'idle',
                        activeIndex: -1,
                        queue: prev.queue.slice(1),
                        rect: null,
                        cloneStyle: {}
                    }));
                });

                if (nextIndex === 2 && cardsContainerRef.current) {
                    cardsContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 600); // transition duration
        };

        t1 = setTimeout(() => {
            // Scroll the container to ensure the card is in view
            cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Wait for scroll
            t2 = setTimeout(() => {
                // Snapshot original position
                const rect = cardRefs[nextIndex].current.getBoundingClientRect();

                // Phase 1: Create clone at exact position (no transition yet)
                flushSync(() => {
                    setAnimState(prev => ({
                        ...prev,
                        phase: 'fly-in',
                        activeIndex: nextIndex,
                        rect,
                        cloneStyle: {
                            left: rect.left,
                            top: rect.top,
                            width: rect.width,
                            height: rect.height,
                            boxShadow: '0 2px 12px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03)',
                            transition: 'none'
                        }
                    }));
                });

                // Phase 2: Next frame -> animate to center and expand slightly
                t3 = setTimeout(() => {
                    const vw = window.innerWidth;
                    const vh = window.innerHeight;

                    const expandedW = Math.min(vw - 32, rect.width * 1.05);
                    const scale = expandedW / rect.width;
                    const expandedH = rect.height * scale;

                    const targetLeft = (vw - expandedW) / 2;
                    const targetTop = (vh - expandedH) / 2;

                    setAnimState(prev => ({
                        ...prev,
                        cloneStyle: {
                            left: targetLeft,
                            top: targetTop,
                            width: expandedW,
                            height: expandedH,
                            boxShadow: '0 20px 60px rgba(244,162,97,0.30), 0 8px 24px rgba(0,0,0,0.12)',
                            transition: 'all 600ms cubic-bezier(0.23, 1, 0.32, 1)'
                        }
                    }));

                    // Phase 3: Hold
                    t4 = setTimeout(() => {
                        setAnimState(prev => ({ ...prev, phase: 'hold' }));

                        if (nextIndex === 2) {
                            // Phase 4 for Card 3: Animate the scroll inside the clone
                            // Extra 400ms before scrolling starts
                            t7 = setTimeout(() => {
                                if (cloneScrollRef.current) {
                                    cloneScrollRef.current.scrollTo({ left: cloneScrollRef.current.scrollWidth / 2, behavior: 'smooth' });
                                }
                                // Hold on slide 2 for 800ms
                                t8 = setTimeout(() => {
                                    if (cloneScrollRef.current) {
                                        cloneScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                                    }
                                    // Wait for scroll back before flying out (400ms)
                                    t9 = setTimeout(() => {
                                        executeFlyOut();
                                    }, 400);
                                }, 800);
                            }, 400);
                        } else {
                            // Phase 4: Fly back to original pos directly (for normal cards)
                            t5 = setTimeout(() => {
                                executeFlyOut();
                            }, 900); // hold time
                        }
                    }, 600); // fly-in transition time
                }, 30); // paint delay
            }, 400); // scroll duration
        }, STAGGER_WAIT);

        return () => {
            clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
            clearTimeout(t4); clearTimeout(t5); clearTimeout(t6);
            clearTimeout(t7); clearTimeout(t8); clearTimeout(t9);
        };
    }, [animState.queue]);

    const isAnimating = animState.phase !== 'idle';

    const getOriginalCardStyle = (index) => {
        if (!entered) {
            return {
                opacity: 0,
                transform: 'translateY(44px)',
                transition: 'all 0.65s cubic-bezier(0.23,1,0.32,1)',
                transitionDelay: `${index * 220}ms`
            };
        }
        if (isAnimating && animState.activeIndex === index) {
            return { opacity: 0, transition: 'none' };
        }
        if (isAnimating) {
            return {
                opacity: 0.1,
                filter: 'blur(4px)',
                transform: 'scale(0.96)',
                transition: 'none'
            };
        }
        return {
            opacity: 1,
            filter: 'none',
            transform: 'scale(1)',
            transition: 'all 600ms cubic-bezier(0.23,1,0.32,1)'
        };
    }

    const renderCardInternals = (index, isClone = false) => {
        if (index === 0) return (
            <>
                <div style={{ ...overlayGradient, background: 'linear-gradient(135deg, rgba(99,102,241,0.04) 0%, transparent 60%)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ ...iconBoxStyle, background: 'rgba(99,102,241,0.10)' }}><CalendarIcon /></div>
                    <div>
                        <div style={cardTitleStyle}>Lê sua agenda</div>
                        <div style={cardSubStyle} className="card-subtitle">Reuniões, blocos livres, compromissos</div>
                    </div>
                </div>
                <div style={previewStyle}>
                    <CalRow dot="#6366F1" name="Daily com o time" time="09:30 · 30 min" badge="em breve" badgeType="soon" />
                    <CalRow dot={T.success} name="Bloco livre" time="10:00 – 12:00" badge="livre" badgeType="free" />
                    <CalRow dot={T.accent} name="1:1 com gestor" time="14:00 · 1h" badge="depois" badgeType="done" />
                </div>
            </>
        )
        if (index === 1) return (
            <>
                <div style={{ ...overlayGradient, background: 'linear-gradient(135deg, rgba(234,67,53,0.04) 0%, transparent 60%)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ ...iconBoxStyle, background: 'rgba(234,67,53,0.08)' }}><GmailIcon /></div>
                    <div>
                        <div style={cardTitleStyle}>Processa seus emails</div>
                        <div style={cardSubStyle} className="card-subtitle">Identifica ações, filtra o que importa</div>
                    </div>
                </div>
                <div style={previewStyle}>
                    <EmailRow avatar="M" avatarBg="linear-gradient(135deg, #EA4335, #FBBC04)" from="Maria · Product" subject="Aprovação do wireframe Q2" tag="responder hoje" tagType="reply" />
                    <EmailRow avatar="R" avatarBg="linear-gradient(135deg, #4285F4, #34A853)" from="Rafael · Tech Lead" subject="PR #142 — revisão pendente" tag="revisar" tagType="review" />
                </div>
            </>
        )
        if (index === 2) return (
            <>
                <div style={{ ...overlayGradient, background: 'linear-gradient(135deg, rgba(244,162,97,0.06) 0%, transparent 60%)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ ...iconBoxStyle, background: T.accentLight }}><AiIcon /></div>
                    <div>
                        <div style={cardTitleStyle}>Monta seu dia</div>
                        <div style={cardSubStyle} className="card-subtitle">Tarefas priorizadas nas janelas certas</div>
                    </div>
                </div>
                <div
                    ref={isClone ? cloneScrollRef : scrollRef}
                    onScroll={isClone ? undefined : handleScroll}
                    style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', gap: 24, borderRadius: 12, background: T.surface2, padding: '12px 24px', scrollbarWidth: 'none', marginTop: 12 }}
                >
                    <div style={slideStyle}>
                        <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: T.accent, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
                            <div style={{ width: 5, height: 5, borderRadius: '50%', background: T.accent }} />
                            DayOS · Briefing de hoje
                        </div>
                        <div style={{ fontSize: 13, lineHeight: 1.5, color: T.text, marginBottom: 8 }}>
                            Você tem <span style={{ fontWeight: 600, color: T.accentHover }}>2h livres</span> antes do 1:1. Priorizei:
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                            <TaskItem done text="Responder Maria sobre wireframe" />
                            <TaskItem done={false} text="Revisar PR #142 do Rafael" />
                            <TaskItem done={false} text="Preparar pauta do 1:1" />
                        </div>
                    </div>
                    <div style={slideStyle}>
                        <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: T.dusk, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
                            <div style={{ width: 5, height: 5, borderRadius: '50%', background: T.dusk }} />
                            DayOS · Recap de ontem
                        </div>
                        <div style={{ fontSize: 13, lineHeight: 1.5, color: T.text, marginBottom: 8 }}>
                            <span style={{ fontWeight: 600, color: T.success }}>Ótimo dia!</span> 3 de 4 tarefas concluídas.
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                            <TaskItem done text="Enviar proposta Q2" />
                            <TaskItem done text="Code review sprint 14" />
                        </div>
                        <div style={{ fontSize: 11, color: T.text3, marginTop: 8, fontStyle: 'italic' }}>Amanhã: foco no PR e na apresentação.</div>
                    </div>
                </div>
                <CarouselDots count={2} active={activeSlide} />
            </>
        )
    }

    return (
        <>
            <style>{`
                .whyconnect-cards::-webkit-scrollbar { display: none; }
                .whyconnect-cards { scrollbar-width: none; }
                @media (max-height: 680px) {
                    .whyconnect-title { font-size: 26px !important; }
                    .whyconnect-subtitle { font-size: 13px !important; margin-bottom: 8px !important; }
                    .feature-card { padding: 14px 14px 12px !important; }
                }
                @media (max-height: 580px) {
                    .whyconnect-title { font-size: 22px !important; }
                    .whyconnect-subtitle { display: none !important; }
                    .card-subtitle { display: none !important; }
                }
            `}</style>

            {/* FLIP Clone */}
            {isAnimating && animState.activeIndex !== -1 && (
                <div style={{
                    position: 'fixed',
                    zIndex: 50,
                    margin: 0,
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                    ...cardStyle,     // base styles: background, border, etc
                    ...animState.cloneStyle // left, top, width, height, transition
                }}>
                    {renderCardInternals(animState.activeIndex, true)}
                </div>
            )}

            {/* Dark Overlay */}
            <div style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.35)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                zIndex: 40,
                opacity: isAnimating ? 1 : 0,
                pointerEvents: isAnimating ? 'auto' : 'none',
                transition: 'opacity 600ms cubic-bezier(0.23,1,0.32,1)'
            }} />

            {/* ── ROOT: absolute fullscreen, 3 zonas ── */}
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

                    {/* ── HEADER — fixo no topo ── */}
                    <div style={{
                        flexShrink: 0, padding: '16px 20px 0', touchAction: 'none',
                        opacity: isAnimating ? 0.3 : 1, filter: isAnimating ? 'blur(2px)' : 'none',
                        transition: 'opacity 0.6s ease, filter 0.6s ease'
                    }}>
                        {/* Topbar */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
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
                                    DayOS<span style={{ display: 'inline-block', width: 5, height: 5, background: T.accent, borderRadius: '50%', marginLeft: 1, verticalAlign: 'middle', position: 'relative', top: -1 }} />
                                </span>
                            </div>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: T.text3, background: T.surface2, padding: '5px 12px', borderRadius: 20 }}>
                                Passo 2 de 4
                            </span>
                        </div>

                        {/* Progress bar */}
                        <div style={{ width: '100%', height: 3, borderRadius: 1.5, background: T.border, marginBottom: 24, overflow: 'hidden' }}>
                            <div style={{ width: '50%', height: '100%', borderRadius: 1.5, background: `linear-gradient(90deg, ${T.dawn}, ${T.sunrise})` }} />
                        </div>

                        {/* Headline */}
                        <div style={{ marginBottom: 16 }}>
                            <h1 className="whyconnect-title" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 30, fontWeight: 700, lineHeight: 1.12, letterSpacing: '-0.025em', color: T.text }}>
                                Como a IA<br />organiza <em style={{ fontStyle: 'normal', background: `linear-gradient(135deg, ${T.dawn} 0%, ${T.sunrise} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>seu dia</em>
                            </h1>
                            <p className="whyconnect-subtitle" style={{ marginTop: 10, fontSize: 15, lineHeight: 1.5, color: T.text2, maxWidth: 300 }}>
                                Conecte suas ferramentas uma vez. A IA cuida do resto todo dia.
                            </p>
                        </div>
                    </div>

                    {/* ── CARDS — scroll vertical, display BLOCK (não flex!) ── */}
                    <div
                        ref={cardsContainerRef}
                        className="whyconnect-cards"
                        style={{
                            flex: 1,
                            minHeight: 0,
                            overflowY: isAnimating ? 'hidden' : 'auto',
                            overflowX: 'hidden',
                            WebkitOverflowScrolling: 'touch',
                            overscrollBehavior: 'contain',
                            padding: '4px 20px 16px',
                        }}
                    >
                        <div>
                            {/* Card 1: Google Calendar */}
                            <div ref={cardRefs[0]} style={{ ...cardStyle, marginBottom: 12, ...getOriginalCardStyle(0) }} className="feature-card">
                                {renderCardInternals(0)}
                            </div>

                            {/* Card 2: Gmail */}
                            <div ref={cardRefs[1]} style={{ ...cardStyle, marginBottom: 12, ...getOriginalCardStyle(1) }} className="feature-card">
                                {renderCardInternals(1)}
                            </div>

                            {/* Card 3: AI */}
                            <div ref={cardRefs[2]} style={{ ...cardStyle, ...getOriginalCardStyle(2) }} className="feature-card">
                                {renderCardInternals(2)}
                            </div>
                        </div>
                    </div>

                    {/* ── FOOTER — fixo embaixo ── */}
                    <div
                        style={{
                            flexShrink: 0,
                            background: T.bg,
                            padding: '12px 20px',
                            paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 20px)',
                            touchAction: 'none',
                            opacity: isAnimating ? 0.3 : 1,
                            filter: isAnimating ? 'blur(2px)' : 'none',
                            transition: 'opacity 0.6s ease, filter 0.6s ease',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', borderRadius: 14, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.18)', marginBottom: 16 }}>
                            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(52,211,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <ShieldIcon />
                            </div>
                            <p style={{ fontSize: 12, fontWeight: 500, color: '#047857', lineHeight: 1.4 }}>
                                <strong style={{ fontWeight: 700 }}>Seus dados ficam com você.</strong> Leitura somente. Nunca armazenamos emails ou eventos.
                            </p>
                        </div>
                        <motion.button
                            onClick={onContinue}
                            whileHover={{ y: -2, boxShadow: '0 14px 36px rgba(244,162,97,0.38), 0 4px 12px rgba(244,162,97,0.18)' }}
                            whileTap={{ scale: 0.98 }}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', height: 56, border: 'none', borderRadius: 16, background: `linear-gradient(135deg, ${T.dawn} 0%, ${T.sunrise} 100%)`, color: 'white', fontFamily: "'Outfit', sans-serif", fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', cursor: 'pointer', boxShadow: '0 8px 28px rgba(244,162,97,0.30), 0 2px 8px rgba(244,162,97,0.15)', position: 'relative', overflow: 'hidden', WebkitTapHighlightColor: 'transparent' }}
                        >
                            <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, transparent 55%)', pointerEvents: 'none', borderRadius: 16 }} />
                            Entendi, vamos lá →
                        </motion.button>
                    </div>
                </div>
            </div>
        </>
    )
}

const cardStyle = {
    background: T.surface, borderRadius: 20, border: `1px solid ${T.border}`,
    padding: '18px 18px 16px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03)',
    position: 'relative', overflow: 'visible',
}
const overlayGradient = { position: 'absolute', inset: 0, borderRadius: 20, pointerEvents: 'none' }
const iconBoxStyle = { width: 38, height: 38, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
const cardTitleStyle = { fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', color: T.text, lineHeight: 1.2 }
const cardSubStyle = { fontSize: 12, color: T.text3, marginTop: 2, fontWeight: 400 }
const previewStyle = { borderRadius: 12, background: T.surface2, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }
const slideStyle = { minWidth: '100%', width: '100%', flexShrink: 0, scrollSnapAlign: 'center', borderRadius: 12, background: T.surface, padding: '12px 16px', boxSizing: 'border-box' }