import { useState } from 'react';
import { T } from './Home/theme';
import { TabBar } from './Home/TabBar';
import { FABMicrophone } from './Home/FABMicrophone';
import { HomeScreen } from './Home/HomeScreen';
import { WeekScreen } from './Home/WeekScreen';
import { AchievementsScreen } from './Home/AchievementsScreen';
import { ProfileScreen } from './Home/ProfileScreen';
import { BriefingModal } from './Home/modals/BriefingModal';
import { RecapModal } from './Home/modals/RecapModal';

export default function MainApp({ userName = 'João' }) {
    const [currentTab, setCurrentTab] = useState('hoje');
    // Modal and Microphone interaction states
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    // Modal states for testing
    const [showBriefing, setShowBriefing] = useState(false);
    const [showRecap, setShowRecap] = useState(false);

    // Mock generic tasks to test briefing with the new UI categories
    const mockBriefingTasks = [
        { id: '1', type: 'meeting', title: 'Daily com o time', time: '09:30', duration: '30 min', urgent: false },
        { id: '2', type: 'free', title: 'Bloco de foco absoluto', time: '10:00', duration: '2h' },
        { id: '3', type: 'meeting', title: 'Sync de Design', time: '14:00', duration: '1h', urgent: false },
        { id: '4', type: 'email', title: 'Proposta do Carlos', time: 'Há 2 horas', sender: 'C', urgent: true },
        { id: '5', type: 'email', title: 'Dúvida sobre o deploy', time: 'Há 3 horas', sender: 'R', urgent: false },
        { id: '6', type: 'task', title: 'Revisar PR #123', time: 'Hoje', duration: '~15min', urgent: false },
        { id: '7', type: 'task', title: 'Ligar para o dentista', time: 'Hoje', duration: '~10min', urgent: true },
    ];

    // We lift the global state for the microphone interactions
    const handleMicClick = () => {
        if (isProcessing || isConfirming) return;

        if (isRecording) {
            setIsRecording(false);
            setIsProcessing(true);

            // Simulating voice processing delay
            setTimeout(() => {
                setIsProcessing(false);
                setIsConfirming(true);

                // Add task logic will be dispatched to HomeScreen using a custom event
                // since lifting the entire timeline state to App level would be massive right now,
                // but for a real app we'd use Context or Recoil.
                const event = new CustomEvent('dayos-add-voiced-task');
                window.dispatchEvent(event);

                setTimeout(() => setIsConfirming(false), 900);
            }, 1500);
        } else {
            // Start recording
            setIsRecording(true);
            // Little haptic feedback if supported
            if (navigator.vibrate) navigator.vibrate(10);
        }
    };

    return (
        <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            background: T.bg,
            maxWidth: 420, margin: '0 auto',
            width: '100%',
            overflow: 'hidden'
        }}>
            {/* Tab Views */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                {currentTab === 'hoje' && <HomeScreen userName={userName} />}
                {currentTab === 'semana' && <WeekScreen />}
                {currentTab === 'conquistas' && <AchievementsScreen />}
                {currentTab === 'perfil' && <ProfileScreen />}
            </div>

            {/* Global Floating Elements */}
            <FABMicrophone
                isRecording={isRecording}
                isProcessing={isProcessing}
                isConfirming={isConfirming}
                onMicClick={handleMicClick}
            />

            {/* Dev helper buttons to trigger modals easily */}
            <div style={{ position: 'fixed', bottom: 80, right: 16, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 100 }}>
                <button onClick={() => setShowBriefing(true)} style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: 8, padding: '4px 8px', fontSize: 10 }}>Teste: Matinal</button>
                <button onClick={() => setShowRecap(true)} style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: 8, padding: '4px 8px', fontSize: 10 }}>Teste: Noturno</button>
            </div>

            <TabBar
                currentTab={currentTab}
                onChangeTab={(tab) => {
                    setCurrentTab(tab);
                    if (navigator.vibrate) navigator.vibrate(5);
                }}
                hasPendingTasks={true}
            />

            {/* The Ritual Modals */}
            <BriefingModal isOpen={showBriefing} onClose={() => setShowBriefing(false)} userName={userName} tasks={mockBriefingTasks} />
            <RecapModal isOpen={showRecap} onClose={() => setShowRecap(false)} userName={userName} />
        </div>
    );
}
