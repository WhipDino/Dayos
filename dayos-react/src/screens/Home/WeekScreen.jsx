import { T } from './theme';

export function WeekScreen() {
    return (
        <div style={{ padding: '20px', paddingTop: 'env(safe-area-inset-top, 20px)' }}>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 700, color: T.text, margin: '0 0 8px 0' }}>Sua semana</h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: T.text2, margin: '0 0 24px 0' }}>12 - 18 de Outubro</p>

            <div style={{ background: T.surface, padding: 20, borderRadius: 20, boxShadow: T.shadowCard, marginBottom: 20 }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: T.text, textAlign: 'center' }}>Heatmap semanal em construção...</p>
            </div>

            <div style={{ background: T.gradientWarm, padding: 20, borderRadius: 20, boxShadow: T.shadowCard, color: 'white' }}>
                <h3 style={{ margin: '0 0 8px 0', fontFamily: "'Outfit', sans-serif", fontSize: 16 }}>Terça foi seu dia mais produtivo 🔥</h3>
                <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: 14, opacity: 0.9 }}>Você completou 8 tarefas e economizou 1h.</p>
            </div>
        </div>
    );
}
