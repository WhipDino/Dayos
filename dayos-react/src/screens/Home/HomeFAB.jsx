import { motion, useMotionValueEvent } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState, useRef } from 'react';

export default function HomeFAB({ scrollY, onPress }) {
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);

    // Reage ao scroll container sem disparar re-renders no Home.jsx principal
    useMotionValueEvent(scrollY, 'change', (current) => {
        const prev = lastScrollY.current;
        const delta = current - prev;

        // Só age se movimento > 6px E scroll > 30px do topo
        if (Math.abs(delta) > 6 && current > 30) {
            setVisible(delta < 0); // subindo = true, descendo = false
        }

        lastScrollY.current = current;
    });

    return (
        <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{
                scale: visible ? 1 : 0,
                opacity: visible ? 1 : 0,
                y: visible ? 0 : 16,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            onTapStart={onPress}
            style={{
                position: 'absolute',
                bottom: 20,
                left: '50%',
                translateX: '-50%',
                width: 52,
                height: 52,
                borderRadius: 16,
                background: 'linear-gradient(135deg, #F4A261, #E76F51)',
                boxShadow: '0 4px 20px rgba(231,111,81,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
                zIndex: 10,
            }}
        >
            <Plus size={22} color="#FFFFFF" strokeWidth={2.2} />
        </motion.button>
    );
}
