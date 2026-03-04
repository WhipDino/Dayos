import { T } from './theme';

export function ProfileScreen() {
    return (
        <div style={{ padding: '20px', paddingTop: 'calc(env(safe-area-inset-top, 20px) + 20px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                <div style={{ width: 80, height: 80, borderRadius: 40, background: T.gradientWarm, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                    JV
                </div>
                <div>
                    <h1 style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 700, color: T.text }}>João Vitor</h1>
                    <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: T.text2 }}>joao@dayos.ai</p>
                </div>
            </div>

            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 600, color: T.text, marginBottom: 16 }}>Integrações</h2>
            <div style={{ background: T.surface, padding: 16, borderRadius: 20, boxShadow: T.shadowCard, marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 40, height: 40, background: T.surface2, borderRadius: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 20 }}>📅</div>
                        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 500 }}>Google Calendar</span>
                    </div>
                    <div style={{ background: 'rgba(52,211,153,0.1)', color: T.success, padding: '4px 12px', borderRadius: 16, fontSize: 13, fontWeight: 600 }}>Conectado</div>
                </div>
                <div style={{ height: 1, background: T.border, margin: '2px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 40, height: 40, background: T.surface2, borderRadius: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 20 }}>📧</div>
                        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 500 }}>Gmail</span>
                    </div>
                    <div style={{ background: 'rgba(52,211,153,0.1)', color: T.success, padding: '4px 12px', borderRadius: 16, fontSize: 13, fontWeight: 600 }}>Conectado</div>
                </div>
            </div>

            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 600, color: T.text, marginBottom: 16 }}>Preferências</h2>
            <div style={{ background: T.surface, padding: 16, borderRadius: 20, boxShadow: T.shadowCard, marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: T.text }}>Briefing matinal</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: T.text2 }}>08:00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: T.text }}>Recap noturno</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: T.text2 }}>20:00</span>
                </div>
            </div>

            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 600, color: T.text, marginBottom: 16 }}>Conta</h2>
            <div style={{ background: T.surface, padding: 16, borderRadius: 20, boxShadow: T.shadowCard, marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16 }}>Plano atual</span>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 600, color: T.text2 }}>Grátis</span>
                </div>
                <div style={{ marginTop: 16, padding: '20px 16px', background: T.gradientWarm, borderRadius: 16, color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: 18, fontFamily: "'Outfit', sans-serif" }}>Desbloqueie integrações e IA</h3>
                    <p style={{ margin: '0 0 16px 0', fontSize: 14, fontFamily: "'DM Sans', sans-serif", opacity: 0.9 }}>Conecte quantas contas quiser e tenha suporte completo do Orbhy AI.</p>
                    <button style={{ background: 'white', color: T.sunrise, border: 'none', padding: '10px 20px', borderRadius: 12, fontWeight: '700', fontSize: 15, cursor: 'pointer', fontFamily: "'Outfit', sans-serif", boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>Ver planos</button>
                </div>
            </div>

            <div style={{ height: 80 }} /> {/* Padding for tab bar */}
        </div>
    );
}
