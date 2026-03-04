import { useState, useEffect, useRef } from 'react';
import HomeHeader from './HomeHeader';
import FocusCard from './FocusCard';
import InsightCard from './InsightCard';

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
            id: 'early-1',
            type: 'task',
            urgency: 'urgent',
            title: 'Enviar proposta pro Carlos',
            detail: 'ontem às 18h',
            originIcon: 'email',
            primaryAction: 'Feito ✓',
            secondaryAction: 'Adiar',
        },
        secondCard: null,
        insight: 'Você tem 1h livre antes da daily. Tempo suficiente pra finalizar a proposta do Carlos.',
        progress: { done: 0, total: 5, freeTime: '2h 30min' },
    },
    start: {
        greeting: 'Bom trabalho, João.',
        focusCard: {
            id: 'meeting-daily',
            type: 'meeting',
            urgency: 'soon',
            title: 'Daily com o time',
            detail: '09:30 · 30 min · Google Meet',
            originIcon: 'calendar',
            minutesUntil: 12,
            primaryAction: 'Entrar',
            secondaryAction: 'Ver agenda',
        },
        secondCard: {
            id: 'task-deck',
            type: 'task',
            urgency: 'urgent',
            title: 'Revisar deck antes da daily',
            detail: 'Email do gestor · hoje às 08h',
            originIcon: 'email',
            primaryAction: 'Feito ✓',
            secondaryAction: 'Adiar',
        },
        insight: 'Três reuniões hoje, todas de manhã. Sua tarde tá completamente livre — melhor bloco de foco do dia.',
        progress: { done: 1, total: 5, freeTime: '1h 45min' },
    },
    midday: {
        greeting: 'Como tá o ritmo?',
        focusCard: {
            id: 'midday-1',
            type: 'task',
            urgency: 'urgent',
            title: 'Responder proposta do cliente',
            detail: 'hoje às 10h',
            originIcon: 'email',
            primaryAction: 'Feito ✓',
            secondaryAction: 'Adiar',
        },
        secondCard: null,
        insight: 'Você completou 3 de 5 tarefas. Tá no ritmo certo pra fechar o dia bem.',
        progress: { done: 3, total: 5, freeTime: '1h 20min' },
    },
    afternoon: {
        greeting: 'Boa tarde, João.',
        focusCard: {
            id: 'afternoon-1',
            type: 'task',
            urgency: 'today',
            title: 'Ligar pro cliente antes das 17h',
            detail: 'Adicionada hoje',
            originIcon: 'note',
            primaryAction: 'Feito ✓',
            secondaryAction: 'Adiar',
        },
        secondCard: null,
        insight: 'Faltam 2 horas. Essa tarefa leva uns 15 min. Ainda dá pra fechar tudo hoje.',
        progress: { done: 4, total: 5, freeTime: '40min' },
    },
    closing: {
        greeting: 'Quase lá, João.',
        focusCard: {
            id: 'closing-1',
            type: 'task',
            urgency: 'pending',
            title: 'Atualizar planilha de métricas',
            detail: 'Pendente desde ontem',
            originIcon: 'note',
            primaryAction: 'Feito ✓',
            secondaryAction: 'Adiar',
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

    const handleFocusCardDismiss = (dismissedId) => {
        console.log('FocusCard Dismissed:', dismissedId);
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
                    {/* FOCUS CARDS (Animado c/ Framer) */}
                    <div style={{ position: 'relative', zIndex: 10 }}>
                        <FocusCard
                            key={dayState}
                            card={data.focusCard}
                            secondCard={data.secondCard}
                            onDismiss={handleFocusCardDismiss}
                        />
                    </div>
                </div>

                {/* ZONA 3 - INSIGHT */}
                <div style={{ position: 'relative', zIndex: 5 }}>
                    <InsightCard
                        insight={data.insight}
                        dayState={dayState}
                        entered={entered}
                        enterDelay={220}
                    />
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
