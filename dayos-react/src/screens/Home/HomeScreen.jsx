import { useState, useEffect, useRef } from 'react';
import HomeHeader from './HomeHeader';

// Design tokens
const T = {
    background: '#FAF8F5',
    surface: '#FFFFFF',
    dawn: '#F4A261',
    sunrise: '#E76F51',
    text3: '#9B9790',
    border: '#ECEAE7',
    easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
};

const STATES = {
    early: {
        greeting: 'Bom dia, João.',
        focusCard: {
            type: 'task',
            urgency: 'urgent',
            title: 'Enviar proposta pro Carlos',
            origin: '📧 Email de Carlos · ontem 18h',
        },
        secondCard: null,
        insight: 'Você tem 1h livre antes da daily. Tempo suficiente pra finalizar a proposta do Carlos.',
        progress: { done: 0, total: 5, freeTime: '2h 30min' },
    },
    start: {
        greeting: 'Bom trabalho, João.',
        focusCard: {
            type: 'meeting',
            urgency: 'soon',
            title: 'Daily com o time',
            origin: '📅 09:30 · 30 min · Google Meet',
            minutesUntil: 12,
        },
        secondCard: {
            type: 'task',
            urgency: 'urgent',
            title: 'Revisar deck antes da daily',
            origin: '📧 Email do gestor · hoje 08h',
        },
        insight: 'Três reuniões hoje, todas de manhã. Sua tarde tá completamente livre — melhor bloco de foco do dia.',
        progress: { done: 1, total: 5, freeTime: '1h 45min' },
    },
    midday: {
        greeting: 'Como tá o ritmo?',
        focusCard: {
            type: 'task',
            urgency: 'urgent',
            title: 'Responder proposta do cliente',
            origin: '📧 Email de Ana · hoje 10h',
        },
        secondCard: null,
        insight: 'Você completou 3 de 5 tarefas. Tá no ritmo certo pra fechar o dia bem.',
        progress: { done: 3, total: 5, freeTime: '1h 20min' },
    },
    afternoon: {
        greeting: 'Boa tarde, João.',
        focusCard: {
            type: 'task',
            urgency: 'today',
            title: 'Ligar pro cliente antes das 17h',
            origin: '📝 Tarefa manual · adicionada hoje',
        },
        secondCard: null,
        insight: 'Faltam 2 horas. Essa tarefa leva uns 15 min. Ainda dá pra fechar tudo hoje.',
        progress: { done: 4, total: 5, freeTime: '40min' },
    },
    closing: {
        greeting: 'Quase lá, João.',
        focusCard: {
            type: 'task',
            urgency: 'pending',
            title: 'Atualizar planilha de métricas',
            origin: '📝 Ficou pendente desde ontem',
        },
        secondCard: null,
        insight: 'Você concluiu 4 de 5 tarefas hoje. Adiei a planilha pra amanhã de manhã automaticamente.',
        progress: { done: 4, total: 5, freeTime: '0min' },
    },
};

const getStateFromHour = (hour) => {
    if (hour >= 6 && hour < 9) return 'early';
    if (hour >= 9 && hour < 11) return 'start';
    if (hour >= 11 && hour < 14) return 'midday';
    if (hour >= 14 && hour < 18) return 'afternoon';
    return 'closing';
};

export const HomeScreen = ({ userName }) => {
    // Current State
    const [dayState, setDayState] = useState(getStateFromHour(new Date().getHours()));
    const data = STATES[dayState];

    // Replace João with userName correctly for realistic behavior
    const greeting = data.greeting.replace('João', userName || 'João');

    // Animations
    const [entered, setEntered] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setEntered(true), 50);
        return () => clearTimeout(t);
    }, []);

    const getAnim = (delay) => ({
        opacity: entered ? 1 : 0,
        transform: entered ? 'translateY(0)' : 'translateY(16px)',
        transition: `all 0.65s ${T.easing} ${delay}ms`
    });

    const scrollContainerRef = useRef(null);

    // Swipe logic
    const [touchStart, setTouchStart] = useState(null);
    const [activeCardIndex, setActiveCardIndex] = useState(0);

    // Refresh card states on state change
    const [dimosProps, setDismosProps] = useState({});
    const [dismissedCards, setDismissedCards] = useState({});

    useEffect(() => {
        setDismissedCards({});
        setDismosProps({});
        setActiveCardIndex(0);
    }, [dayState]);

    const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
    const handleTouchEnd = (e) => {
        if (!touchStart || !data.secondCard) return;
        const touchEnd = e.changedTouches[0].clientX;
        const diff = touchStart - touchEnd;
        if (diff > 60) setActiveCardIndex(1);
        if (diff < -60) setActiveCardIndex(0);
        setTouchStart(null);
    };

    const handleFeitoClick = (index) => {
        setDismosProps(prev => ({ ...prev, [index]: true }));
        setTimeout(() => {
            setDismissedCards(prev => ({ ...prev, [index]: true }));
            if (index === 0 && data.secondCard) {
                setActiveCardIndex(0);
            }
        }, 300);
    };

    const badgeStyle = (urgency) => {
        switch (urgency) {
            case 'urgent': return { background: 'rgba(231,111,81,0.12)', color: '#E76F51' };
            case 'soon': return { background: 'rgba(99,102,241,0.12)', color: '#6366F1' };
            case 'today': return { background: 'rgba(244,162,97,0.12)', color: '#F4A261' };
            case 'pending': return { background: 'rgba(107,107,107,0.10)', color: '#6B6B6B' };
            default: return { background: 'transparent', color: '#000' };
        }
    };

    const badgeText = (card) => {
        switch (card.urgency) {
            case 'urgent': return 'URGENTE';
            case 'soon': return `EM ${card.minutesUntil} MIN`;
            case 'today': return 'HOJE';
            case 'pending': return 'PENDENTE';
            default: return '';
        }
    };

    const renderCard = (card, index) => {
        const isClosing = dimosProps[index];
        const isActuallyDismissed = dismissedCards[index];
        if (isActuallyDismissed) return null;

        return (
            <div style={{
                flexShrink: 0,
                width: (!dismissedCards[0] && data.secondCard) ? '88%' : '100%',
                background: '#FFFFFF',
                borderRadius: 20,
                padding: '20px',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                overflow: 'hidden',
                // Animate dismiss
                opacity: isClosing ? 0 : 1,
                transform: isClosing ? 'scale(0.94)' : 'scale(1)',
                transition: `all 0.3s ${T.easing}`,
                margin: 0,
                border: 'none',
                height: 'auto'
            }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    fontSize: 10, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.06em',
                    padding: '4px 10px', borderRadius: 20, marginBottom: 12,
                    ...badgeStyle(card.urgency)
                }}>
                    {card.type === 'meeting' ? '🟣' : '🔴'} {badgeText(card)}
                </div>

                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 700, color: '#2D2D2D', lineHeight: 1.25, marginBottom: 10 }}>
                    {card.title}
                </div>

                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#9B9790', marginBottom: 20 }}>
                    {card.origin}
                </div>

                <div style={{ height: 1, background: '#ECEAE7', marginBottom: 16 }} />

                <div style={{ display: 'flex', gap: 10 }}>
                    <button style={{
                        flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: '#F5F3F0',
                        color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, cursor: 'pointer',
                        outline: 'none', WebkitTapHighlightColor: 'transparent'
                    }}>
                        {card.type === 'meeting' ? 'Ver agenda' : 'Adiar'}
                    </button>

                    <button
                        onClick={() => handleFeitoClick(index)}
                        style={{
                            flex: 1, padding: '12px', borderRadius: 12, border: 'none',
                            background: `linear-gradient(135deg, ${T.dawn}, ${T.sunrise})`,
                            color: '#FFFFFF', fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, cursor: 'pointer',
                            outline: 'none', WebkitTapHighlightColor: 'transparent'
                        }}
                    >
                        {card.type === 'meeting' ? 'Entrar' : 'Feito ✓'}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: T.background }}>
            <style>{`
                @keyframes swapFadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <HomeHeader
                greeting={greeting}
                date="Terça, 4 de março"
                userName={userName}
                scrollContainerRef={scrollContainerRef}
            />

            <div
                ref={scrollContainerRef}
                style={{ flex: 1, minHeight: 0, overflowY: 'auto', paddingBottom: 100, WebkitOverflowScrolling: 'touch' }}
            >
                {/* DEBUG SELECTOR */}
                <div style={{ display: 'flex', gap: 6, padding: '4px 20px 12px', overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
                    {['early', 'start', 'midday', 'afternoon', 'closing'].map(s => (
                        <button
                            key={s}
                            onClick={() => setDayState(s)}
                            style={{
                                fontSize: 10, padding: '3px 10px', borderRadius: 20, border: '1px solid #ECEAE7',
                                background: dayState === s ? '#F4A261' : '#FFFFFF',
                                color: dayState === s ? '#FFFFFF' : '#9B9790',
                                whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.2s ease',
                                fontFamily: "'DM Sans', sans-serif", outline: 'none', WebkitTapHighlightColor: 'transparent'
                            }}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                {/* ZONA 1 - SAUDAÇÃO */}
                <div style={{ ...getAnim(80), fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 600, color: '#2D2D2D', padding: '8px 20px 20px' }}>
                    {greeting}
                </div>

                {/* ZONA 2 - FOCUS CARDS */}
                <div key={dayState} style={{ animation: `swapFadeIn 0.4s ${T.easing} both`, ...getAnim(180) }}>
                    <div style={{ overflow: 'hidden', padding: '0 20px' }}>
                        <div
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                            style={{
                                display: 'flex', gap: 12,
                                transform: `translateX(calc(-${activeCardIndex} * (88% + 12px)))`,
                                transition: `transform 0.4s ${T.easing}`
                            }}
                        >
                            {data.focusCard && renderCard(data.focusCard, 0)}
                            {data.secondCard && renderCard(data.secondCard, 1)}
                        </div>
                    </div>

                    {/* DOTS DE SWIPE */}
                    {data.secondCard && !dismissedCards[0] && !dismissedCards[1] && (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 12 }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: activeCardIndex === 0 ? '#F4A261' : '#ECEAE7', transition: 'background 0.2s ease' }} />
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: activeCardIndex === 1 ? '#F4A261' : '#ECEAE7', transition: 'background 0.2s ease' }} />
                        </div>
                    )}
                </div>

                {/* ZONA 3 - INSIGHT */}
                <div key={`insight-${dayState}`} style={{ ...getAnim(280), animation: `swapFadeIn 0.4s ${T.easing} both` }}>
                    <div style={{ margin: '16px 20px 0', background: '#F5F3F0', borderRadius: 16, padding: '16px', borderLeft: `3px solid ${T.dawn}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
                            <span style={{ color: T.dawn, fontSize: 13 }}>✦</span>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: T.dawn, letterSpacing: '0.04em' }}>
                                Orbhy
                            </span>
                        </div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#2D2D2D', lineHeight: 1.55 }}>
                            "{data.insight}"
                        </div>
                    </div>
                </div>

                {/* ZONA 4 - PROGRESSO */}
                <div key={`prog-${dayState}`} style={{ ...getAnim(360), animation: `swapFadeIn 0.4s ${T.easing} both`, padding: '14px 20px 0', fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#6B6B6B' }}>
                    {data.progress.done} de {data.progress.total} tarefas concluídas
                    <span style={{ color: '#ECEAE7', margin: '0 8px' }}>·</span>
                    {data.progress.freeTime} livres hoje
                </div>
            </div>
        </div>
    );
};
