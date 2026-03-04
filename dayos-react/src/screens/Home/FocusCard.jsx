import {
    motion,
    useMotionValue,
    useTransform,
    animate,
} from 'framer-motion';
import { CheckCircle, Clock, Calendar, Mail, FileText, ChevronRight } from 'lucide-react';
import { useState } from 'react';

// --- SUBCOMPONENTES ---

function CardContent({ card, onPrimary, onSecondary }) {
    const URGENCY_CONFIG = {
        urgent: { bg: 'rgba(231,111,81,0.10)', color: '#E76F51', label: 'URGENTE' },
        soon: { bg: 'rgba(99,102,241,0.10)', color: '#6366F1', label: `EM ${card.minutesUntil || 0} MIN` },
        today: { bg: 'rgba(244,162,97,0.10)', color: '#F4A261', label: 'HOJE' },
        pending: { bg: 'rgba(107,107,107,0.08)', color: '#6B6B6B', label: 'PENDENTE' },
    };

    const ICON_CONFIG = {
        task: { bg: 'rgba(231,111,81,0.10)', color: '#E76F51', Icon: CheckCircle },
        meeting: { bg: 'rgba(99,102,241,0.10)', color: '#6366F1', Icon: Calendar },
    };

    const ORIGIN_ICON = {
        email: Mail,
        calendar: Calendar,
        note: FileText,
    };

    const urgency = URGENCY_CONFIG[card.urgency] || URGENCY_CONFIG.today;
    const icon = ICON_CONFIG[card.type] || ICON_CONFIG.task;
    const OriginIcon = ORIGIN_ICON[card.originIcon] || ORIGIN_ICON.note;

    return (
        <>
            {/* Header: ícone + label + badge */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 14,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {/* Ícone com container colorido */}
                    <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: icon.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <icon.Icon size={18} color={icon.color} strokeWidth={1.8} />
                    </div>

                    <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#6B6B6B',
                        letterSpacing: '0.01em',
                    }}>
                        {card.type === 'task' ? 'Foco agora' : 'Próxima reunião'}
                    </span>
                </div>

                {/* Badge de urgência */}
                <div style={{
                    background: urgency.bg,
                    color: urgency.color,
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: '0.06em',
                    padding: '4px 10px',
                    borderRadius: 20,
                }}>
                    {urgency.label}
                </div>
            </div>

            {/* Card filho interno — Surface2 */}
            <div style={{
                background: '#F5F3F0',
                borderRadius: 12,
                padding: '14px 14px 12px',
                marginBottom: 16,
            }}>
                <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 18,
                    fontWeight: 600,
                    color: '#2D2D2D',
                    lineHeight: 1.3,
                    marginBottom: 8,
                }}>
                    {card.title}
                </div>

                {/* Linha de origem */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                }}>
                    <OriginIcon size={12} color="#9B9790" strokeWidth={1.8} />
                    <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12,
                        color: '#9B9790',
                    }}>
                        {card.detail}
                    </span>
                </div>
            </div>

            {/* Divisor */}
            <div style={{ height: 1, background: '#ECEAE7', marginBottom: 14 }} />

            {/* Ações */}
            <div style={{ display: 'flex', gap: 10 }}>
                {/* Secundário */}
                <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={onSecondary}
                    style={{
                        flex: 1,
                        padding: '13px',
                        borderRadius: 12,
                        border: 'none',
                        background: '#F5F3F0',
                        color: '#6B6B6B',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: 'pointer',
                        outline: 'none',
                        WebkitTapHighlightColor: 'transparent',
                    }}
                >
                    {card.secondaryAction}
                </motion.button>

                {/* Primário */}
                <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={onPrimary}
                    style={{
                        flex: 1,
                        padding: '13px',
                        borderRadius: 12,
                        border: 'none',
                        background: 'linear-gradient(135deg, #F4A261, #E76F51)',
                        color: '#FFFFFF',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        outline: 'none',
                        WebkitTapHighlightColor: 'transparent',
                    }}
                >
                    {card.primaryAction}
                </motion.button>
            </div>
        </>
    );
}

// --- MAIN COMPONENT ---

export default function FocusCard({ card, secondCard, onDismiss }) {
    const x = useMotionValue(0);

    // Card de trás: escala de 0.92 → 1.0 conforme o card da frente é arrastado
    const backCardScale = useTransform(x, [-80, 0, 80], [1.0, 0.92, 1.0]);
    const backCardOpacity = useTransform(x, [-80, 0, 80], [0.85, 0.55, 0.85]);

    // Sombra cresce levemente ao arrastar, e leve rotação
    const shadowOpacity = useTransform(x, [-80, 0, 80], [0.12, 0.06, 0.12]);
    const rotate = useTransform(x, [-120, 0, 120], [-1.5, 0, 1.5]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [dismissed, setDismissed] = useState(false);
    const [dismissing, setDismissing] = useState(false);

    const cards = [card, secondCard].filter(Boolean);
    const currentCard = cards[activeIndex];
    const hasSecond = cards.length > 1;

    // Handlers
    const SWIPE_THRESHOLD = 60; // px
    const VELOCITY_THRESHOLD = 300; // px/s

    function handleDragEnd(event, info) {
        const { offset, velocity } = info;

        const shouldSwipe =
            Math.abs(offset.x) > SWIPE_THRESHOLD ||
            Math.abs(velocity.x) > VELOCITY_THRESHOLD;

        if (shouldSwipe && hasSecond) {
            if (offset.x < 0 && activeIndex === 0) {
                // Swipe esquerda → vai pro segundo card
                animate(x, -window.innerWidth, {
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    onComplete: () => {
                        setActiveIndex(1);
                        x.set(0); // reset sem animação
                    },
                });
            } else if (offset.x > 0 && activeIndex === 1) {
                // Swipe direita → volta pro primeiro card
                animate(x, window.innerWidth, {
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    onComplete: () => {
                        setActiveIndex(0);
                        x.set(0);
                    },
                });
            } else {
                // Snap de volta — spring com leve bounce
                animate(x, 0, {
                    type: 'spring',
                    stiffness: 500,
                    damping: 35,
                });
            }
        } else {
            // Não atingiu threshold — snap de volta
            animate(x, 0, {
                type: 'spring',
                stiffness: 500,
                damping: 35,
            });
        }
    }

    function handleDismiss() {
        setDismissing(true);
        animate(x, 0, { duration: 0 }); // garante posição central antes de animar

        // Card sobe e some
        setTimeout(() => {
            setDismissed(true);
            setDismissing(false);
            if (onDismiss) onDismiss(currentCard.id);

            // Se tem um segundo card, ele vira o principal e reseta o sumiço.
            if (hasSecond) {
                setActiveIndex(activeIndex === 0 ? 1 : 0);
                setTimeout(() => setDismissed(false), 50);
            }
        }, 400);
    }

    if (dismissed && !hasSecond) return null;

    return (
        <div style={{ position: 'relative', padding: '20px 20px 0' }}>

            {/* ─── CARD DE TRÁS (peek) ─── */}
            {hasSecond && (
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 23,
                        left: 28,
                        right: 28,
                        bottom: 3,
                        background: '#FFFFFF',
                        borderRadius: 20,
                        scale: backCardScale,
                        opacity: backCardOpacity,
                        zIndex: 0,
                    }}
                />
            )}

            {/* ─── CARD DA FRENTE (draggable) ─── */}
            <motion.div
                drag={hasSecond ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                dragMomentum={false}
                style={{
                    x,
                    rotate,
                    position: 'relative',
                    zIndex: 1,
                    background: '#FFFFFF',
                    borderRadius: 20,
                    padding: 20,
                    boxShadow: `0 4px 20px rgba(0,0,0,${shadowOpacity.get() || 0.06})`,
                    cursor: hasSecond ? 'grab' : 'default',
                }}
                animate={dismissing
                    ? { opacity: 0, y: -24, scale: 0.94 }
                    : { opacity: 1, y: 0, scale: 1 }
                }
                transition={dismissing
                    ? { duration: 0.35, ease: [0.23, 1, 0.32, 1] }
                    : { type: 'spring', stiffness: 400, damping: 30 }
                }
                onDragEnd={handleDragEnd}
                whileTap={hasSecond ? { cursor: 'grabbing' } : {}}
            >
                <CardContent
                    card={currentCard}
                    onPrimary={handleDismiss}
                    onSecondary={() => console.log('Adiar:', currentCard?.id)}
                />
            </motion.div>

            {/* ─── DOTS ─── */}
            {hasSecond && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 6,
                    marginTop: 10,
                }}>
                    {cards.map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                width: activeIndex === i ? 16 : 6,
                                background: activeIndex === i ? '#F4A261' : '#ECEAE7',
                            }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            style={{ height: 6, borderRadius: 3 }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
