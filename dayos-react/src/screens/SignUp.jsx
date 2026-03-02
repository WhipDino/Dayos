import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ═══════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════ */
const T = {
    bg: '#FAF8F5',
    bgInput: '#F2F0ED',
    bgInputFocus: '#EBE9E6',
    surface: '#FFFFFF',
    surface2: '#F5F3F0',
    accent: '#F4A261',
    accentHover: '#E8955A',
    accentGlow: 'rgba(244,167,108,0.22)',
    accentLight: 'rgba(244,167,108,0.10)',
    dawn: '#F4A261',
    sunrise: '#E76F51',
    dusk: '#6366F1',
    success: '#34C759',
    successRing: 'rgba(52,199,89,0.25)',
    error: '#FF3B30',
    errorRing: 'rgba(255,59,48,0.30)',
    text: '#2D2D2D',
    text2: '#6B6B6B',
    text3: '#8A8A8E',
    textPlaceholder: '#AEAEB2',
    border: '#E5E5EA',
}

/* ═══════════════════════════════════════════════════
   SPRING EASING
   ═══════════════════════════════════════════════════ */
const spring = [0.23, 1, 0.32, 1]

/* ═══════════════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════════════ */
const BackArrow = () => (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, stroke: T.text, strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }}>
        <polyline points="15 18 9 12 15 6" />
    </svg>
)

const GoogleIcon = () => (
    <svg style={{ width: 20, height: 20, flexShrink: 0 }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
)

const AppleIcon = () => (
    <svg style={{ width: 18, height: 18, flexShrink: 0 }} viewBox="0 0 18 18" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.94 13.05c-.33.76-.49 1.1-.91 1.78-.59.94-1.43 2.12-2.46 2.13-1.03.01-1.3-.67-2.7-.66-1.4.01-1.69.67-2.72.66-1.04-.01-1.83-1.07-2.42-2.02-1.65-2.65-1.83-5.76-.81-7.41.73-1.18 1.87-1.87 2.94-1.87 1.1 0 1.78.67 2.69.67.88 0 1.42-.68 2.69-.67.91.01 1.92.49 2.62 1.35-2.3 1.27-1.93 4.56.28 5.44zM11.38 4.22c.46-.59.81-1.42.68-2.27-.75.05-1.63.53-2.14 1.15-.46.56-.85 1.4-.7 2.22.82.03 1.67-.46 2.16-1.1z" />
    </svg>
)

const EyeIcon = ({ slashVisible }) => (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, stroke: T.textPlaceholder, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
        {slashVisible && <line x1="1" y1="1" x2="23" y2="23" />}
    </svg>
)

/* ═══════════════════════════════════════════════════
   VALIDATION HELPERS
   ═══════════════════════════════════════════════════ */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPassword(pw) {
    return pw.length >= 8 && /[a-zA-Z]/.test(pw) && /[0-9]/.test(pw)
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function SignUp({ onContinue, onBack = () => { }, onLogin = () => { } }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    // Validation state
    const [emailTouched, setEmailTouched] = useState(false)
    const [passwordTouched, setPasswordTouched] = useState(false)

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const emailValid = isValidEmail(email)
    const emailError = emailTouched && email.length > 0 && !emailValid
    const passwordValid = isValidPassword(password)
    const passwordError = passwordTouched && password.length > 0 && !passwordValid

    const getInputRing = (valid, error) => {
        if (valid) return `0 0 0 2px ${T.successRing}`
        if (error) return `0 0 0 2px ${T.errorRing}`
        return 'none'
    }

    const handleSubmit = () => {
        setEmailTouched(true)
        setPasswordTouched(true)
        // For now, navigate regardless (same as original)
        if (onContinue) onContinue({ name, email, password })
    }

    return (
        <div style={screenStyle}>

            {/* ── Header ── */}
            <motion.header
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.6, ease: spring }}
                style={{ marginBottom: 36 }}
            >
                {/* Back button */}
                <motion.button
                    onClick={onBack}
                    whileHover={{ background: 'rgba(0,0,0,0.04)' }}
                    whileTap={{ background: 'rgba(0,0,0,0.08)' }}
                    style={backBtnStyle}
                    aria-label="Voltar"
                >
                    <BackArrow />
                </motion.button>

                <h1 style={headerTitleStyle}>
                    Comece a sincronizar<br />sua rotina
                </h1>
                <p style={headerSubStyle}>
                    Crie sua conta para treinarmos o seu assistente.
                </p>
            </motion.header>

            {/* ── Social Login ── */}
            <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6, ease: spring }}
                style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}
            >
                <motion.button
                    whileHover={{ y: -1, boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06)' }}
                    whileTap={{ scale: 0.99 }}
                    style={googleBtnStyle}
                >
                    <GoogleIcon />
                    <span style={socialTextStyle}>Continuar com o Google</span>
                </motion.button>

                <motion.button
                    whileHover={{ y: -1, background: '#1a1a1a', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                    whileTap={{ scale: 0.99 }}
                    style={appleBtnStyle}
                >
                    <AppleIcon />
                    <span style={{ ...socialTextStyle, color: '#FFFFFF' }}>Continuar com a Apple</span>
                </motion.button>
            </motion.section>

            {/* ── Divider ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.5, ease: spring }}
                style={dividerStyle}
            >
                <div style={dividerLineStyle} />
                <span style={dividerTextStyle}>ou</span>
                <div style={dividerLineStyle} />
            </motion.div>

            {/* ── Form ── */}
            <motion.form
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: spring }}
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                onSubmit={(e) => e.preventDefault()}
            >
                {/* Name */}
                <input
                    type="text"
                    placeholder="Nome"
                    autoComplete="name"
                    autoCapitalize="words"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.background = T.bgInputFocus; e.target.style.boxShadow = `0 0 0 2px ${T.accentGlow}` }}
                    onBlur={(e) => { e.target.style.background = T.bgInput; e.target.style.boxShadow = 'none' }}
                />

                {/* Email */}
                <input
                    ref={emailRef}
                    type="email"
                    placeholder="E-mail"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        if (emailError && isValidEmail(e.target.value)) setEmailTouched(true)
                    }}
                    onBlur={() => setEmailTouched(true)}
                    style={{
                        ...inputStyle,
                        boxShadow: getInputRing(emailTouched && emailValid, emailError),
                    }}
                    onFocus={(e) => {
                        if (!emailTouched || email.length === 0) {
                            e.target.style.background = T.bgInputFocus
                            e.target.style.boxShadow = `0 0 0 2px ${T.accentGlow}`
                        }
                    }}
                />

                {/* Email error */}
                <AnimatePresence>
                    {emailError && (
                        <motion.p
                            initial={{ opacity: 0, height: 0, marginTop: -4 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: -4 }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            style={errorTextStyle}
                        >
                            Insira um e-mail válido.
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* Password */}
                <div style={{ position: 'relative' }}>
                    <input
                        ref={passwordRef}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Senha"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setPasswordTouched(true)
                        }}
                        onBlur={() => {
                            if (password.length === 0) setPasswordTouched(false)
                        }}
                        style={{
                            ...inputStyle,
                            paddingRight: 52,
                            boxShadow: getInputRing(passwordTouched && passwordValid, passwordError),
                        }}
                        onFocus={(e) => {
                            if (!passwordTouched || password.length === 0) {
                                e.target.style.background = T.bgInputFocus
                                e.target.style.boxShadow = `0 0 0 2px ${T.accentGlow}`
                            }
                        }}
                    />
                    <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        whileHover={{ background: 'rgba(0,0,0,0.04)' }}
                        style={toggleBtnStyle}
                        aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    >
                        <EyeIcon slashVisible={!showPassword} />
                    </motion.button>
                </div>

                {/* Password helper */}
                <p style={{
                    ...helperTextStyle,
                    color: passwordTouched && password.length > 0
                        ? (passwordValid ? T.success : T.error)
                        : T.textPlaceholder,
                }}>
                    {passwordTouched && password.length > 0 && passwordValid
                        ? '✓ Senha segura'
                        : 'Use 8+ caracteres com letras e números.'}
                </p>
            </motion.form>

            {/* ── Spacer ── */}
            <div style={{ flex: 1 }} />

            {/* ── Bottom Area ── */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: spring }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
            >
                <motion.button
                    onClick={handleSubmit}
                    whileHover={{ y: -2, boxShadow: '0 14px 36px rgba(244,162,97,0.38), 0 4px 12px rgba(244,162,97,0.18)' }}
                    whileTap={{ scale: 0.98 }}
                    style={ctaButtonStyle}
                >
                    <span style={ctaShineStyle} />
                    Criar conta
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

            {/* Responsive */}
            <style>{`
        @media (max-height: 680px) {
          .signup-header-title { font-size: 24px !important; }
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
    paddingTop: 'calc(env(safe-area-inset-top, 16px) + 12px)',
    paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)',
    paddingLeft: 24,
    paddingRight: 24,
    maxWidth: 420,
    margin: '0 auto',
    left: 0,
    right: 0,
    background: T.bg,
}

const backBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    marginLeft: -8,
    marginBottom: 16,
    borderRadius: 12,
    WebkitTapHighlightColor: 'transparent',
}

const headerTitleStyle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
    color: T.text,
}

const headerSubStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 1.45,
    color: T.text3,
    marginTop: 4,
}

const googleBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 52,
    border: 'none',
    borderRadius: 14,
    background: T.surface,
    boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
    cursor: 'pointer',
    padding: '0 16px',
    WebkitTapHighlightColor: 'transparent',
}

const appleBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 52,
    border: 'none',
    borderRadius: 14,
    background: '#000000',
    cursor: 'pointer',
    padding: '0 16px',
    WebkitTapHighlightColor: 'transparent',
}

const socialTextStyle = {
    flex: 1,
    textAlign: 'center',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 16,
    fontWeight: 500,
    color: T.text,
    marginRight: 20,
}

const dividerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 28,
}

const dividerLineStyle = {
    flex: 1,
    height: 1,
    background: T.border,
}

const dividerTextStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    fontWeight: 400,
    color: T.textPlaceholder,
    textTransform: 'lowercase',
}

const inputStyle = {
    width: '100%',
    height: 52,
    border: 'none',
    borderRadius: 14,
    background: T.bgInput,
    padding: '0 18px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 16,
    fontWeight: 400,
    color: T.text,
    outline: 'none',
    transition: 'all 0.2s ease',
    WebkitAppearance: 'none',
    appearance: 'none',
}

const toggleBtnStyle = {
    position: 'absolute',
    right: 4,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    borderRadius: 10,
}

const helperTextStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    fontWeight: 400,
    paddingLeft: 4,
    marginTop: -4,
    transition: 'color 0.2s ease',
}

const errorTextStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    fontWeight: 400,
    color: T.error,
    paddingLeft: 4,
    marginTop: -4,
    overflow: 'hidden',
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
    padding: '8px 12px',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
}

const footerLinkBoldStyle = {
    fontWeight: 500,
    color: '#8A8A8E',
}
