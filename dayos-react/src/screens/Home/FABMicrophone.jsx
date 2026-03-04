import { T } from './theme';

const MicIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
);

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export function FABMicrophone({ isRecording, isProcessing, isConfirming, onMicClick }) {
    return (
        <div className="fab-container" style={{
            position: 'fixed',
            bottom: 'calc(env(safe-area-inset-bottom, 0px) + 56px + 12px)', // 56px TabBar height
            zIndex: 40,
            width: 56, height: 56,
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
            <style>{`
                .fab-container { right: calc(50vw - 210px + 16px); }
                @media (max-width: 420px) { .fab-container { right: 16px; } }

                @keyframes fabMicPulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }

                @keyframes fabMicRipple {
                    0% { transform: scale(1); opacity: 0.5; }
                    100% { transform: scale(1.8); opacity: 0; }
                }

                @keyframes fabSpin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes fabBounce {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.15); }
                    100% { transform: scale(1); }
                }
            `}</style>

            {/* Ripple when recording */}
            {isRecording && (
                <div style={{
                    position: 'absolute', inset: 0, borderRadius: '50%', background: T.sunrise,
                    animation: `fabMicRipple 1.5s infinite ${T.easeStandard}`
                }} />
            )}

            {/* Spinning border when processing */}
            {isProcessing && (
                <div style={{
                    position: 'absolute', inset: -4, borderRadius: '50%',
                    border: '3px solid transparent',
                    borderTopColor: T.sunrise,
                    borderRightColor: T.dawn,
                    animation: 'fabSpin 1s linear infinite'
                }} />
            )}

            {/* Main Button */}
            <button
                onClick={onMicClick}
                style={{
                    position: 'relative', width: 56, height: 56, borderRadius: '50%', border: 'none',
                    background: isRecording || isConfirming ? T.sunrise : T.gradientWarm,
                    boxShadow: isRecording ? `0 8px 24px rgba(231,111,81,0.4)` : T.shadowFAB,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    animation: isRecording ? 'fabMicPulse 1.5s infinite alternate ease-in-out' :
                        isConfirming ? `fabBounce 0.4s ${T.easeBounce}` : 'none',
                    transition: `background 0.3s, box-shadow 0.3s, transform 0.2s ${T.easeBounce}`,
                    zIndex: 2, outline: 'none', WebkitTapHighlightColor: 'transparent'
                }}
                onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.92)'}
                onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onPointerLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                {isConfirming ? (
                    <CheckIcon />
                ) : isProcessing ? (
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'fabMicPulse 1s infinite alternate' }}>
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                ) : (
                    <MicIcon />
                )}
            </button>

            {/* Label when recording */}
            {isRecording && (
                <div style={{
                    position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)',
                    color: T.sunrise, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
                    fontFamily: "'DM Sans', sans-serif"
                }}>
                    Ouvindo...
                </div>
            )}
        </div>
    );
}
