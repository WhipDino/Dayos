import { motion } from 'framer-motion';
import { Calendar, Video, MapPin, Users } from 'lucide-react';

const ICON_MAP = {
    meet: <Video size={12} color="#9B9790" strokeWidth={1.8} />,
    calendar: <Calendar size={12} color="#9B9790" strokeWidth={1.8} />,
    location: <MapPin size={12} color="#9B9790" strokeWidth={1.8} />,
    people: <Users size={12} color="#9B9790" strokeWidth={1.8} />,
};

export default function NextUpCard({ events = [], entered, enterDelay = 320 }) {
    if (!events || events.length === 0) return null;
    const [main, ...rest] = events;
    const upNext = rest.slice(0, 2);
    const timeLabel = main.minutesUntil === 0
        ? 'Agora'
        : main.minutesUntil != null
            ? `Em ${main.minutesUntil} min · ${main.time}`
            : main.time;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={entered ? { opacity: 1, y: 0 } : {}}
            transition={{
                type: 'spring',
                stiffness: 320,
                damping: 28,
                delay: enterDelay / 1000,
            }}
            style={{
                margin: '14px 20px 0',
                borderRadius: 18,
                border: '1px solid #ECEAE7',
                background: '#FFFFFF',
                padding: 16,
                display: 'flex',
                gap: 14,
                alignItems: 'stretch',
            }}
        >
            {/* Left timeline column */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 10,
                flexShrink: 0,
                paddingTop: 3,
            }}>
                <div style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#F4A261',
                    flexShrink: 0,
                    boxShadow: '0 0 0 3px rgba(244,162,97,0.15)',
                }} />
                <div style={{
                    width: 2,
                    flex: 1,
                    marginTop: 5,
                    background: 'linear-gradient(to bottom, rgba(244,162,97,0.35), rgba(244,162,97,0.0))',
                    borderRadius: 99,
                }} />
            </div>

            {/* Right content column */}
            <div style={{ flex: 1, minWidth: 0 }}>
                {/* Main event */}
                <div style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#F4A261',
                    marginBottom: 4,
                    letterSpacing: '0.02em',
                }}>{timeLabel}</div>
                <div style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#2D2D2D',
                    lineHeight: 1.3,
                    marginBottom: 5,
                }}>{main.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    {ICON_MAP[main.iconType] || ICON_MAP.calendar}
                    <span style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: 12,
                        color: '#9B9790',
                    }}>{main.location} · {main.duration} min</span>
                </div>

                {/* Divider + list */}
                {upNext.length > 0 && (
                    <>
                        <div style={{ height: 1, background: '#ECEAE7', margin: '12px 0 10px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {upNext.map((ev, i) => (
                                <div key={ev.id} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: i === 0 ? 1 : 0.55 }}>
                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ECEAE7', flexShrink: 0, marginLeft: -18 }} />
                                    <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, fontWeight: 600, color: '#9B9790', width: 36, flexShrink: 0 }}>{ev.time}</span>
                                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: '#6B6B6B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.title}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
}
