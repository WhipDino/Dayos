import { T } from './theme';

const CalendarFilledIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="none" />
        <line x1="16" y1="2" x2="16" y2="6" stroke={T.surface} />
        <line x1="8" y1="2" x2="8" y2="6" stroke={T.surface} />
        <line x1="3" y1="10" x2="21" y2="10" stroke={T.surface} />
        <rect x="7" y="14" width="4" height="4" fill={T.surface} stroke="none" />
    </svg>
);

const CalendarOutlineIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

export const AgendaPlaceholder = () => {
    return (
        <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: T.bg,
            // Ensure padding bottom matches layout expectations just in case it's rendered alone, 
            // though AppLayout handles this for its children.
        }}>
            <div style={{ color: T.border, marginBottom: 16 }}>
                <svg viewBox="0 0 24 24" width="64" height="64" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            </div>
            <h2 style={{
                margin: 0,
                fontFamily: "'Outfit', sans-serif",
                fontSize: 18,
                fontWeight: 500,
                color: T.text3
            }}>
                Em breve
            </h2>
        </div>
    );
};
