import { FooterNavigation } from './FooterNavigation';

export const AppLayout = ({ activePage, onNavigate, children }) => {
    return (
        <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            backgroundColor: 'rgb(250, 248, 245)', // Neutral background behind everything
            maxWidth: 420, margin: '0 auto',
            width: '100%',
        }}>
            {/* 
              Content slot: flex-1 takes up remaining space.
              min-height: 0 is crucial for flex children to scroll properly on iOS Safari.
              We add paddingBottom equal to the footer height + safe area so content isn't hidden behind it.
            */}
            <main style={{
                flex: 1,
                minHeight: 0,
                display: 'flex', flexDirection: 'column',
                overflowY: 'auto',
                overscrollBehavior: 'contain',
                WebkitOverflowScrolling: 'touch',
                paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))',
            }}>
                {children}
            </main>

            <FooterNavigation activePage={activePage} onNavigate={onNavigate} />
        </div>
    );
};
