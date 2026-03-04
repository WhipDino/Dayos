import { motion, LayoutGroup } from 'framer-motion';
import { Home, CalendarDays } from 'lucide-react';
import { T } from './theme';

const tabs = [
    { id: 'home', Icon: Home },
    { id: 'agenda', Icon: CalendarDays },
];

export const FooterNavigation = ({ activePage, onNavigate }) => {

    const renderNavButton = (tab) => {
        const isActive = activePage === tab.id;

        return (
            <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                style={{
                    flex: 1, height: '44px',
                    position: 'relative',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: 'none', background: 'transparent',
                    cursor: 'pointer', borderRadius: '14px',
                    padding: '0 8px'
                }}
            >
                {/* Animated Pill Background */}
                {isActive && (
                    <motion.div
                        layoutId="active-pill"
                        style={{
                            position: 'absolute', inset: 0,
                            borderRadius: '14px',
                            background: `linear-gradient(135deg, ${T.dawn}, ${T.sunrise})`,
                            zIndex: 0
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 30,
                            mass: 1,
                        }}
                    />
                )}

                {/* Tab Icon */}
                <tab.Icon
                    size={22}
                    strokeWidth={1.8}
                    style={{
                        position: 'relative', zIndex: 1,
                        color: isActive ? '#FFFFFF' : T.text3,
                        transition: 'color 0.2s ease',
                    }}
                />
            </button>
        );
    };

    return (
        <LayoutGroup>
            <footer style={{
                position: 'fixed', bottom: 0, left: 0, right: 0,
                backgroundColor: T.surface,
                borderTop: `1px solid ${T.border}`,
                height: 'calc(64px + env(safe-area-inset-bottom, 0px))',
                paddingBottom: 'env(safe-area-inset-bottom, 0px)',
                paddingLeft: '12px', paddingRight: '12px',
                display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px',
                zIndex: 50,
            }}>
                {tabs.map(tab => renderNavButton(tab))}
            </footer>
        </LayoutGroup>
    );
};
