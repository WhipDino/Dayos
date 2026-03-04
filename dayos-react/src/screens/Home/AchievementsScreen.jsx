import { T } from './theme';

export function AchievementsScreen() {
    return (
        <div style={{ padding: '20px', paddingTop: 'env(safe-area-inset-top, 20px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32, marginTop: 16 }}>
                <div style={{ position: 'relative', width: 120, height: 120, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ position: 'absolute', inset: 0, border: `6px solid ${T.success}`, borderRadius: '50%', opacity: 0.2 }} />
                    <div style={{ position: 'absolute', inset: 0, border: `6px solid transparent`, borderTopColor: T.sunrise, borderRightColor: T.dawn, borderRadius: '50%', transform: 'rotate(-45deg)' }} />

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 48, fontWeight: 700, background: T.gradientWarm, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>12</div>
                    </div>
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: T.text2, marginTop: 12 }}>dias seguidos</div>
            </div>

            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 600, color: T.text, marginBottom: 16 }}>Suas Conquistas</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <div style={{
                            width: 64, height: 64, borderRadius: '50%',
                            background: i <= 3 ? T.gradientWarm : T.surface2,
                            opacity: i <= 3 ? 1 : 0.5,
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            fontSize: 24, boxShadow: i <= 3 ? T.shadowCard : 'none'
                        }}>
                            {i === 1 ? '🌱' : i === 2 ? '⭐' : i === 3 ? '🔥' : '🔒'}
                        </div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: T.text2, textAlign: 'center', fontWeight: 500 }}>
                            {i === 1 ? 'Primeira' : i === 2 ? 'Semana' : 'Streak'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
