import { T } from './theme';

const SunIcon = ({ active }) => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke={active ? T.accent : T.text3} strokeWidth={active ? "2.5" : "2"} fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ transition: `stroke 0.3s ${T.easeStandard}` }}>
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

const ChartIcon = ({ active }) => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke={active ? T.accent : T.text3} strokeWidth={active ? "2.5" : "2"} fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ transition: `stroke 0.3s ${T.easeStandard}` }}>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
);

const TrophyIcon = ({ active }) => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke={active ? T.accent : T.text3} strokeWidth={active ? "2.5" : "2"} fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ transition: `stroke 0.3s ${T.easeStandard}` }}>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 1.1-.9 2-2 2H4" />
        <path d="M14 14.66V17c0 1.1.9 2 2 2h4" />
        <path d="M12 17v5" />
        <path d="M22 22H2" />
        <path d="M8 4h8v5.5c0 3-4 5.5-4 5.5s-4-2.5-4-5.5V4z" />
    </svg>
);

const UserAvatarIcon = ({ active }) => (
    <div style={{
        width: 24, height: 24, borderRadius: 12,
        background: active ? T.gradientWarm : T.surface2,
        color: active ? '#FFF' : T.text3,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, fontWeight: 'bold', fontFamily: "'Outfit', sans-serif",
        border: `2px solid ${active ? 'transparent' : T.border}`,
        boxSizing: 'border-box',
        transition: `all 0.3s ${T.easeStandard}`
    }}>
        JV
    </div>
);

export function TabBar({ currentTab, onChangeTab, hasPendingTasks }) {
    const tabs = [
        { id: 'hoje', label: 'Hoje', icon: SunIcon, showDot: hasPendingTasks },
        { id: 'semana', label: 'Semana', icon: ChartIcon },
        { id: 'conquistas', label: 'Conquistas', icon: TrophyIcon },
        { id: 'perfil', label: 'Eu', icon: UserAvatarIcon }
    ];

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: 420,
            background: T.surface,
            borderTop: `1px solid ${T.border}`,
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            zIndex: 30, // Above content, below FAB
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: 56
        }}>
            <style>{`
                @keyframes tabBounce {
                    0% { transform: scale(0.9); }
                    50% { transform: scale(1.15); }
                    100% { transform: scale(1.0); }
                }
            `}</style>

            {tabs.map(tab => {
                const isActive = currentTab === tab.id;
                const Icon = tab.icon;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onChangeTab(tab.id)}
                        style={{
                            flex: 1,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            cursor: 'pointer',
                            WebkitTapHighlightColor: 'transparent',
                            position: 'relative'
                        }}
                    >
                        {/* Notification Dot */}
                        {tab.showDot && (
                            <div style={{
                                position: 'absolute',
                                top: 8,
                                right: 'calc(50% - 12px)',
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: T.gradientWarm,
                                zIndex: 2
                            }} />
                        )}

                        <div style={{
                            animation: isActive ? `tabBounce 300ms ${T.easeBounce}` : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 28, height: 28
                        }}>
                            <Icon active={isActive} />
                        </div>

                        <div style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 11,
                            fontWeight: isActive ? 600 : 500,
                            color: isActive ? T.accent : 'transparent',
                            height: isActive ? 14 : 0,
                            opacity: isActive ? 1 : 0,
                            overflow: 'hidden',
                            transition: `all 0.25s ${T.easeSnappy}`,
                            marginTop: isActive ? 2 : 0
                        }}>
                            {tab.label}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
