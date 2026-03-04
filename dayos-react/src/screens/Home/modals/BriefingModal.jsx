import { useEffect, useState } from 'react';
import { T } from '../theme';
import { ModalOverlay } from './ModalOverlay';

const XIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke={T.text3} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
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

const MailIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke={T.dawn} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke={T.success} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

// Animated sentence revealing
const AnimatedNarrative = ({ text, show }) => {
    // We split by standard sentence ending punctuation
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: T.text, lineHeight: 1.6, marginTop: 24 }}>
            {sentences.map((sentence, i) => (
                <span key={i} style={{
                    display: 'inline-block',
                    opacity: show ? 1 : 0,
                    transition: `all 400ms ${T.easeStandard}`,
                    transitionDelay: `${300 + (i * 200)}ms`, // Stagger each sentence
                    marginRight: 4
                }}>
                    {sentence.trim()}
                </span>
            ))}
        </div>
    );
};

// Internal Item rendering
const DayItem = ({ item, index, show, cardIndex }) => {
    // Stagger based on card position + specific item index
    // Base delay is after narrative finishes (around 900ms) + card delay (120ms per card) + item delay (60ms)
    const animDelayMs = 900 + (cardIndex * 120) + (index * 60);

    const isTask = item.type === 'task';
    const isEmail = item.type === 'email';

    let dotColor = T.text3;
    if (item.type === 'meeting') dotColor = T.dusk;
    if (item.type === 'free') dotColor = T.success;
    if (isTask) dotColor = item.urgent ? T.sunrise : T.dawn;

    // Check if we need a right badge pill
    let pillText = null;
    let pillColor = T.text3;
    let pillBg = 'rgba(155,151,144,0.08)';

    if (item.type === 'meeting') {
        pillText = item.time === 'Agora' ? 'agora' : 'em breve';
        pillColor = T.dusk;
        pillBg = 'rgba(99,102,241,0.08)';
    } else if (item.type === 'free') {
        pillText = 'livre';
        pillColor = T.success;
        pillBg = 'rgba(52,211,153,0.08)';
    } else if (isEmail) {
        pillText = item.urgent ? 'responder hoje' : 'depois';
        pillColor = item.urgent ? T.sunrise : T.text3;
        pillBg = item.urgent ? 'rgba(231,111,81,0.08)' : 'rgba(155,151,144,0.08)';
    } else if (isTask) {
        pillText = item.duration || '~15min';
        pillColor = item.urgent ? T.sunrise : T.dawn;
        pillBg = item.urgent ? 'rgba(231,111,81,0.08)' : 'rgba(244,162,97,0.08)';
    }

    return (
        <div style={{
            background: T.surface2,
            borderRadius: 12,
            padding: '12px 14px',
            marginTop: 8,
            display: 'flex', alignItems: 'center',
            opacity: show ? 1 : 0,
            transition: `opacity 300ms ${T.easeStandard}`,
            transitionDelay: `${animDelayMs}ms`
        }}>
            {/* Lado Esquerdo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                {isEmail ? (
                    <div style={{
                        width: 28, height: 28, borderRadius: '50%', background: T.dawn, color: '#FFF',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 'bold'
                    }}>
                        {item.sender ? item.sender.charAt(0).toUpperCase() : 'E'}
                    </div>
                ) : (
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
                )}

                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: T.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.title}
                    </span>
                    {(item.time || item.duration) && (
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: T.text3 }}>
                            {item.time} {item.duration && item.time ? '·' : ''} {item.duration && !isTask && item.duration}
                        </span>
                    )}
                </div>
            </div>

            {/* Lado Direito */}
            <div style={{
                background: pillBg, color: pillColor,
                padding: '4px 10px', borderRadius: 999,
                fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500,
                marginLeft: 8, flexShrink: 0
            }}>
                {pillText}
            </div>
        </div>
    );
};

const DayCard = ({ type, title, subtitle, items, show, cardIndex }) => {
    // 900ms is roughly when narrative finishes
    const animDelayMs = 900 + (cardIndex * 120);

    let Icon = CheckIcon;
    let iconBg = 'rgba(52,211,153,0.1)';
    if (type === 'agenda') {
        Icon = CalendarIcon;
        iconBg = 'rgba(99,102,241,0.1)';
    } else if (type === 'emails') {
        Icon = MailIcon;
        iconBg = 'rgba(244,162,97,0.1)';
    }

    const displayItems = items.slice(0, 4);
    const hasMore = items.length > 4;

    return (
        <div style={{
            background: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: 20,
            padding: 16,
            marginTop: 16,
            opacity: show ? 1 : 0,
            transform: show ? 'scale(1)' : 'scale(0.97)',
            transition: `all 400ms ${T.easeStandard}`,
            transitionDelay: `${animDelayMs}ms`
        }}>
            {/* Header do Card */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: T.text }}>{title}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: T.text3 }}>{subtitle}</span>
                </div>
            </div>

            {/* Itens */}
            <div style={{ marginTop: 8 }}>
                {displayItems.map((item, idx) => (
                    <DayItem key={item.id || idx} item={item} index={idx} show={show} cardIndex={cardIndex} />
                ))}

                {hasMore && (
                    <div style={{
                        marginTop: 12, textAlign: 'center',
                        fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: T.text3,
                        opacity: show ? 1 : 0, transitionDelay: `${animDelayMs + 300}ms`
                    }}>
                        {displayItems.length} itens + {items.length - 4} mais
                    </div>
                )}
            </div>
        </div>
    );
};

export const BriefingModal = ({ isOpen, onClose, userName = "João", tasks = [] }) => {
    const [animateIn, setAnimateIn] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const t = setTimeout(() => setAnimateIn(true), 50);
            return () => clearTimeout(t);
        } else {
            setTimeout(() => setAnimateIn(false), 0);
        }
    }, [isOpen]);

    // Group tasks
    const agendaItems = tasks.filter(t => t.type === 'meeting' || t.type === 'free');
    const emailItems = tasks.filter(t => t.type === 'email');
    const taskItems = tasks.filter(t => t.type === 'task' || !t.type); // fallback

    // Narrative logic
    const isBusyDay = (agendaItems.length + taskItems.length) > 3;

    let narrativeText = "";

    if (tasks.length === 0) {
        narrativeText = "Seu primeiro dia com o Orbhy! Ainda não tenho informações da sua agenda. Me conta suas tarefas pelo microfone ou conecte seu calendário nas configurações.";
    } else if (isBusyDay) {
        narrativeText = "A sua manhã tem foco em entregas com reuniões na sequência. Depois do almoço o ritmo aperta. Dia cheio, mas tá tudo sob controle aqui.";
    } else {
        narrativeText = "Hoje tá leve — poucas coisas no radar. O resto do dia é seu. Aproveite para adiantar algo importante ou apenas focar no que precisa de atenção.";
    }



    const dateStr = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());

    return (
        <ModalOverlay isOpen={isOpen} onClose={onClose} alignCenter={true}>
            {/* Modal Container */}
            <div style={{
                backgroundColor: 'rgb(250, 248, 245)',
                border: `1px solid ${T.border}`,
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                borderRadius: 24,
                display: 'flex', flexDirection: 'column',
                position: 'relative',
                maxHeight: '85vh',
                width: '100%',
                overflow: 'hidden',
                overscrollBehavior: 'contain',
                WebkitOverflowScrolling: 'auto'
            }}>

                {/* Scrollable Content */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: 24,
                    overscrollBehavior: 'contain',
                    WebkitOverflowScrolling: 'auto',
                    WebkitOverflowScrolling: 'touch'
                }}>

                    {/* 1. Header: Logo + Fechar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12 }}>
                        {/* Logo Orbhy */}
                        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: T.text, lineHeight: 1 }}>Orbhy</span>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.dawn, marginLeft: 2 }} />
                        </div>

                        {/* Fechar X */}
                        <button
                            onClick={onClose}
                            style={{ background: 'none', border: 'none', padding: 8, margin: -8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            aria-label="Fechar briefing"
                        >
                            <XIcon />
                        </button>
                    </div>

                    {/* 2. Saudação */}
                    <div style={{
                        opacity: animateIn ? 1 : 0,
                        transform: animateIn ? 'translateY(0)' : 'translateY(12px)',
                        transition: `all 400ms ${T.easeStandard}`,
                        transitionDelay: '100ms'
                    }}>
                        <h2 style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: 26, fontWeight: 700, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span style={{ color: T.text }}>Bom dia,&nbsp;</span>
                            <span style={{
                                background: `linear-gradient(90deg, ${T.dawn}, ${T.sunrise})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>{userName}</span>
                            <span style={{ color: T.text }}>!</span>
                        </h2>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: T.text3, marginTop: 8, textTransform: 'capitalize', opacity: animateIn ? 1 : 0, transition: `opacity 400ms ${T.easeStandard}`, transitionDelay: '200ms' }}>
                            {dateStr}
                        </div>
                    </div>

                    {/* 3. Narrativa do Dia */}
                    <AnimatedNarrative text={narrativeText} show={animateIn} />

                    {/* 4. Separador (se houver cards) */}
                    {tasks.length > 0 && (
                        <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '24px 0 8px' }} />
                    )}

                    {/* 5. Cards do Dia */}
                    <div style={{ flex: 1 }}>
                        {agendaItems.length > 0 && <DayCard type="agenda" title="Sua agenda" subtitle="Reuniões e blocos livres" items={agendaItems} show={animateIn} cardIndex={0} />}
                        {emailItems.length > 0 && <DayCard type="emails" title="E-mails importantes" subtitle="Para responder hoje" items={emailItems} show={animateIn} cardIndex={1} />}
                        {taskItems.length > 0 && <DayCard type="tasks" title="Suas tarefas" subtitle="Para fazer hoje" items={taskItems} show={animateIn} cardIndex={2} />}

                        {tasks.length === 0 && (
                            <div style={{ textAlign: 'center', marginTop: 32 }}>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: T.dawn }}>🎙 Fale suas tarefas</span>
                            </div>
                        )}
                    </div>

                    {/* 6. Footer Motivacional */}
                    <div style={{
                        marginTop: 24, textAlign: 'center',
                        fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: T.text3,
                        opacity: animateIn ? 1 : 0,
                        transition: `opacity 600ms ${T.easeStandard}`,
                        transitionDelay: '1500ms'
                    }}>
                        {isBusyDay ? "Bora lá 🚀" : "Sem correria hoje 😎"}
                    </div>
                </div>
            </div>
        </ModalOverlay>
    );
};
