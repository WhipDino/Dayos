export const T = {
    bg: '#FAF8F5',
    surface: '#FFFFFF',
    surface2: '#F5F3F0',
    surfaceElevated: '#FFFFFF',
    accent: '#F4A261',
    dawn: '#F4A261',
    sunrise: '#E76F51',
    dusk: '#6366F1',
    success: '#34D399',
    text: '#2D2D2D',
    text2: '#6B6B6B',
    text3: '#9B9790',
    border: '#ECEAE7',

    // Gradients
    gradientWarm: 'linear-gradient(135deg, #F4A261 0%, #E76F51 100%)',
    gradientDusk: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
    gradientSuccess: 'linear-gradient(135deg, #34D399 0%, #6EE7B7 100%)',
    gradientHero: 'linear-gradient(160deg, #FFF7ED 0%, #FAF8F5 40%, #EEF2FF 100%)',
    gradientNight: 'linear-gradient(160deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)',

    // Modals & Glass
    glassOverlay: 'rgba(0, 0, 0, 0.4)',
    glassModal: 'rgba(255, 255, 255, 0.75)',
    glassModalNight: 'rgba(30, 27, 75, 0.65)',
    glassOverlayNight: 'rgba(15, 12, 41, 0.55)',
    nightText: '#F5F3F0',

    // Shadows
    shadowCard: '0 2px 16px rgba(45,45,45,0.06)',
    shadowCardHover: '0 4px 24px rgba(45,45,45,0.10)',
    shadowFAB: '0 8px 28px rgba(244,162,97,0.35)',
    shadowElevated: '0 12px 40px rgba(45,45,45,0.12)',

    // Easings
    easeStandard: 'cubic-bezier(0.23, 1, 0.32, 1)',
    easeBounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    easeSnappy: 'cubic-bezier(0.25, 0.1, 0, 1)'
};

// Helper to reliably trigger Haptic Feedback on supported devices
export const triggerHaptic = (type = 'light') => {
    if (!navigator.vibrate) return;

    // Fallback patterns mapping
    const patterns = {
        light: [5],
        medium: [15],
        heavy: [25],
        success: [10, 30, 15]
    };

    try {
        navigator.vibrate(patterns[type] || patterns.light);
    } catch {
        // Ignore vibration errors
    }
};
