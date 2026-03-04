import { useEffect, useState } from 'react';
import { T, triggerHaptic } from '../theme';

export const ModalOverlay = ({ isOpen, onClose, isNight = false, alignCenter = false, children }) => {
    const [render, setRender] = useState(isOpen);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setRender(true), 0);
            setTimeout(() => {
                setVisible(true);
                triggerHaptic(isNight ? 'soft' : 'medium');
            }, 10);
        } else {
            setTimeout(() => setVisible(false), 0);
            setTimeout(() => setRender(false), 400); // 400ms transition
        }
    }, [isOpen, isNight]);

    // Body scroll lock
    useEffect(() => {
        if (isOpen) {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalStyle;
            };
        }
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!render) return null;

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 100,
            display: 'flex', alignItems: alignCenter ? 'center' : 'flex-end', justifyContent: 'center',
            padding: alignCenter ? 16 : 0,
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'auto',
            touchAction: 'none', // Prevent entire container drag
        }}>
            {/* Backdrop Overlay */}
            <div
                onClick={onClose}
                style={{
                    position: 'absolute', inset: 0,
                    background: isNight ? T.glassOverlayNight : 'rgba(0, 0, 0, 0.35)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
                }}
                aria-label="Fechar modal"
            />

            {/* Content Container */}
            <div style={{
                position: 'relative',
                width: '100%', maxWidth: alignCenter ? 400 : 420,
                height: alignCenter ? 'auto' : '85vh',
                opacity: visible ? 1 : 0,
                transform: visible ? (alignCenter ? 'scale(1)' : 'translateY(0)') : (alignCenter ? 'scale(0.92)' : 'translateY(100%)'),
                transition: `transform ${isNight ? '600ms' : '450ms'} cubic-bezier(0.23, 1, 0.32, 1), opacity ${isNight ? '600ms' : (alignCenter ? '250ms' : '450ms')}`,
                display: 'flex', flexDirection: 'column',
                pointerEvents: visible ? 'auto' : 'none',
                overscrollBehavior: 'contain',
                WebkitOverflowScrolling: 'auto',
                touchAction: 'pan-y' // Only allow vertical scrolling inside modal if needed
            }}>
                {children}
            </div>
        </div>
    );
};
