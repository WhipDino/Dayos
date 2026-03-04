import { useState } from 'react';
import { T } from './Home/theme';
import { HomeScreen } from './Home/HomeScreen';
import { AppLayout } from './Home/AppLayout';
import { AgendaPlaceholder } from './Home/AgendaPlaceholder';
import { BriefingModal } from './Home/modals/BriefingModal';
import { RecapModal } from './Home/modals/RecapModal';

export default function MainApp({ userName = 'João' }) {
    // Modal states for testing
    const [showBriefing, setShowBriefing] = useState(false);
    const [showRecap, setShowRecap] = useState(false);


    const [activePage, setActivePage] = useState('home');

    // Routing Logic
    const renderContent = () => {
        switch (activePage) {
            case 'agenda':
                return <AgendaPlaceholder />;
            case 'home':
            default:
                return <HomeScreen userName={userName} />;
        }
    };

    return (
        <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            backgroundColor: 'rgb(250, 248, 245)',
            maxWidth: 420, margin: '0 auto',
            width: '100%',
            overflow: 'hidden'
        }}>
            {/* The Main App Shell with Bottom Navigation */}
            <AppLayout activePage={activePage} onNavigate={setActivePage}>
                {renderContent()}
            </AppLayout>

            {/* Dev helper buttons to trigger modals easily */}
            <div style={{ position: 'fixed', bottom: 100, right: 16, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 100 }}>
                <button onClick={() => setShowBriefing(true)} style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 12px', fontSize: 12, cursor: 'pointer' }}>Matinal</button>
                <button onClick={() => setShowRecap(true)} style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 12px', fontSize: 12, cursor: 'pointer' }}>Noturno</button>
            </div>

            {/* The Ritual Modals */}
            <BriefingModal isOpen={showBriefing} onClose={() => setShowBriefing(false)} userName={userName} tasks={[]} />
            <RecapModal isOpen={showRecap} onClose={() => setShowRecap(false)} userName={userName} />
        </div>
    );
}
