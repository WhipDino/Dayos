import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AIOrb } from '../components/AIOrb'

/* ═══════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════ */
const T = {
    bg: '#FAF8F5',
    surface: '#FFFFFF',
    surface2: '#F5F3F0',
    accent: '#F4A261',
    accentHover: '#E8955A',
    accentGlow: 'rgba(244,167,108,0.30)',
    accentLight: '#FDDCBC',
    dawn: '#F4A261',
    sunrise: '#E76F51',
    dusk: '#6366F1',
    success: '#34D399',
    text: '#2D2D2D',
    text2: '#6B6B6B',
    text3: '#9B9790',
    border: '#ECEAE7',
}

/* ═══════════════════════════════════════════════════
   SPRING EASING
   ═══════════════════════════════════════════════════ */
const spring = [0.23, 1, 0.32, 1]


/* ═══════════════════════════════════════════════════
   FLOATING PARTICLES
   ═══════════════════════════════════════════════════ */
const particles = [
    { size: 6, top: '15%', left: '20%', duration: 6, delay: 1 },
    { size: 4, top: '70%', right: '18%', duration: 7, delay: 2.5 },
    { size: 5, bottom: '20%', left: '15%', duration: 8, delay: 0.5 },
]

function FloatingParticle({ size, top, left, right, bottom, duration, delay }) {
    return (
        <motion.div
            style={{
                position: 'absolute',
                width: size,
                height: size,
                borderRadius: '50%',
                background: T.accentLight,
                top, left, right, bottom,
            }}
            animate={{
                y: [0, -16, 0],
                opacity: [0, 0.6, 0],
                scale: [0.8, 1, 0.8],
            }}
            transition={{
                repeat: Infinity,
                duration,
                delay,
                ease: 'easeInOut',
            }}
        />
    )
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function SplashScreen({ onContinue, onLogin = () => { } }) {
    return (
        <div style={screenStyle}>

            {/* ── Logo ── */}
            <motion.header
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7, ease: spring }}
                style={{ textAlign: 'center' }}
            >
                <h1 style={logoTextStyle}>
                    Orbhy
                    <span style={logoDotStyle} />
                </h1>
            </motion.header>

            {/* ── Central Content ── */}
            <div style={centralStyle}>

                {/* Lottie Animation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1, ease: spring }}
                    style={animContainerStyle}
                    aria-hidden="true"
                    className="animation-container"
                >
                    <AIOrb state="idle" size={240} />

                    {/* Floating particles */}
                    {particles.map((p, i) => (
                        <FloatingParticle key={i} {...p} />
                    ))}
                </motion.div>

                {/* Floor Shadow */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1, ease: spring }}
                    style={floorStyle}
                    aria-hidden="true"
                />

                {/* Copywriting */}
                <div style={copySectionStyle}>
                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.7, ease: spring }}
                        style={copyTitleStyle}
                        className="copy-title"
                    >
                        Sincronize sua vida.<br />Respeite sua energia.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.7, ease: spring }}
                        style={copySubStyle}
                        className="copy-subtitle"
                    >
                        Seu assistente comportamental que organiza sua rotina para prevenir o esgotamento.
                    </motion.p>
                </div>
            </div>

            {/* ── CTA Footer ── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7, ease: spring }}
                style={ctaContainerStyle}
            >
                <motion.button
                    onClick={onContinue}
                    whileHover={{ y: -2, boxShadow: '0 14px 36px rgba(244,162,97,0.38), 0 4px 12px rgba(244,162,97,0.18)' }}
                    whileTap={{ scale: 0.98 }}
                    style={ctaButtonStyle}
                >
                    {/* Shine overlay */}
                    <span style={ctaShineStyle} />
                    Começar
                </motion.button>

                <motion.a
                    href="#"
                    onClick={(e) => { e.preventDefault(); onLogin() }}
                    whileHover={{ color: T.text2 }}
                    style={footerLinkStyle}
                >
                    Já tem uma conta?{' '}
                    <span style={footerLinkBoldStyle}>Entrar</span>
                </motion.a>
            </motion.div>

            {/* Responsive overrides */}
            <style>{`
        @media (max-height: 700px) {
          .animation-container {
            width: 180px !important;
            height: 180px !important;
          }
          .animation-container dotlottie-wc {
            width: 180px !important;
            height: 180px !important;
          }
          .copy-title {
            font-size: 22px !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
        </div>
    )
}

/* ═══════════════════════════════════════════════════
   SHARED STYLE OBJECTS
   ═══════════════════════════════════════════════════ */
const screenStyle = {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 'calc(env(safe-area-inset-top, 16px) + 48px)',
    paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)',
    paddingLeft: 24,
    paddingRight: 24,
    maxWidth: 420,
    margin: '0 auto',
    left: 0,
    right: 0,
    background: T.bg,
}

const logoTextStyle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: '-0.02em',
    color: T.text,
}

const logoDotStyle = {
    display: 'inline-block',
    width: 7,
    height: 7,
    background: T.accent,
    borderRadius: '50%',
    marginLeft: 1,
    verticalAlign: 'baseline',
    position: 'relative',
    top: -1,
}

const centralStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 32,
    maxWidth: 340,
}

const animContainerStyle = {
    width: 240,
    height: 240,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

const floorStyle = {
    width: 160,
    height: 20,
    marginTop: -16,
    borderRadius: '50%',
    background: 'radial-gradient(ellipse at center, rgba(244,167,108,0.15) 0%, rgba(244,167,108,0.06) 40%, transparent 70%)',
    filter: 'blur(6px)',
}

const copySectionStyle = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
}

const copyTitleStyle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 26,
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.015em',
    color: T.text,
    maxWidth: 300,
}

const copySubStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.5,
    color: '#8A8A8E',
    maxWidth: 280,
}

const ctaContainerStyle = {
    width: '100%',
    maxWidth: 350,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
}

const ctaButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 56,
    border: 'none',
    borderRadius: 16,
    background: `linear-gradient(135deg, ${T.dawn} 0%, ${T.sunrise} 100%)`,
    color: 'white',
    fontFamily: "'Outfit', sans-serif",
    fontSize: 17,
    fontWeight: 600,
    letterSpacing: '-0.01em',
    cursor: 'pointer',
    boxShadow: '0 8px 28px rgba(244,162,97,0.30), 0 2px 8px rgba(244,162,97,0.15)',
    position: 'relative',
    overflow: 'hidden',
    WebkitTapHighlightColor: 'transparent',
}

const ctaShineStyle = {
    position: 'absolute',
    inset: 0,
    borderRadius: 16,
    background: 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, transparent 55%)',
    pointerEvents: 'none',
}

const footerLinkStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: 400,
    color: '#AEAEB2',
    textDecoration: 'none',
    padding: '4px 8px',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
}

const footerLinkBoldStyle = {
    fontWeight: 500,
    color: '#8A8A8E',
}
