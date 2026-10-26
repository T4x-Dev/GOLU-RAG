import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  X,
  AlertCircle,
  CheckCircle2,
  Github,
  Chrome,
} from 'lucide-react';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ mode: initialMode, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const DEMO_CREDENTIALS = { email: 'demo@golu.ai', password: 'golu2026' };

  const validate = () => {
    if (!email.trim()) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address.';
    if (!password.trim()) return 'Password is required.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (mode === 'register' && !name.trim()) return 'Name is required to register.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const validationErr = validate();
    if (validationErr) { setError(validationErr); return; }

    setIsLoading(true);

    // Check demo credentials instantly
    const isDemo = email.toLowerCase() === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password;
    await new Promise(r => setTimeout(r, isDemo ? 600 : 1200));
    setIsLoading(false);

    setSuccess(mode === 'login' ? 'Welcome back! Loading your workspace...' : 'Account created! Setting up your workspace...');
    await new Promise(r => setTimeout(r, 700));
    onSuccess();
  };

  const handleGuestContinue = () => {
    setSuccess('Continuing as guest...');
    setTimeout(onSuccess, 600);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 44px 12px 44px',
    borderRadius: 12,
    border: '1px solid rgba(23,134,180,0.25)',
    background: 'linear-gradient(145deg, #061929, #0a2d40)',
    boxShadow: 'inset 3px 3px 10px rgba(2,12,18,0.75), inset -2px -2px 8px rgba(15,94,131,0.15)',
    color: '#E1F2FA',
    fontSize: 14,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.2s',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(4,32,46,0.88)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 440,
          borderRadius: 24,
          background: 'linear-gradient(145deg, #0d2e40, #071e2b)',
          boxShadow: '0 24px 80px rgba(2,12,18,0.9), 0 0 0 1px rgba(79,179,218,0.15), inset 0 1px 0 rgba(79,179,218,0.08)',
          border: '1px solid rgba(23,134,180,0.25)',
          overflow: 'hidden',
          transform: mounted ? 'scale(1) translateY(0)' : 'scale(0.94) translateY(20px)',
          transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          position: 'relative',
        }}
      >
        {/* Glow blob */}
        <div style={{
          position: 'absolute',
          top: -80,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 300,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(23,134,180,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(23,134,180,0.2)',
            color: 'rgba(152,213,238,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            zIndex: 2,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.1)'; e.currentTarget.style.color = '#f87171'; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(152,213,238,0.6)'; e.currentTarget.style.borderColor = 'rgba(23,134,180,0.2)'; }}
        >
          <X size={14} />
        </button>

        {/* Header */}
        <div style={{ padding: '32px 32px 24px', textAlign: 'center', position: 'relative' }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: 'linear-gradient(135deg, #1786B4, #4FB3DA)',
            boxShadow: '0 8px 32px rgba(23,134,180,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            border: '1px solid rgba(79,179,218,0.4)',
          }}>
            <GraduationCap size={26} color="#E1F2FA" strokeWidth={2.5} />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#E1F2FA', letterSpacing: '-0.5px', marginBottom: 6 }}>
            {mode === 'login' ? 'Welcome back!' : 'Create your account'}
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(152,213,238,0.55)', lineHeight: 1.5 }}>
            {mode === 'login'
              ? 'Sign in to access your GOLU workspace'
              : 'Join GOLU and start acing your exams'}
          </p>
        </div>

        {/* Tab switcher */}
        <div style={{
          margin: '0 24px 20px',
          display: 'flex',
          gap: 6,
          padding: 5,
          borderRadius: 12,
          background: 'linear-gradient(145deg, #061929, #0a2d40)',
          boxShadow: 'inset 3px 3px 8px rgba(2,12,18,0.75), inset -2px -2px 6px rgba(15,94,131,0.1)',
          border: '1px solid rgba(23,134,180,0.15)',
        }}>
          {(['login', 'register'] as const).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); setSuccess(''); }}
              style={{
                flex: 1,
                padding: '9px 12px',
                borderRadius: 8,
                border: mode === m ? '1px solid rgba(79,179,218,0.35)' : '1px solid transparent',
                background: mode === m
                  ? 'linear-gradient(135deg, rgba(23,134,180,0.35), rgba(15,94,131,0.25))'
                  : 'transparent',
                color: mode === m ? '#E1F2FA' : 'rgba(152,213,238,0.4)',
                fontSize: 13,
                fontWeight: mode === m ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
                boxShadow: mode === m ? '2px 2px 8px rgba(2,12,18,0.5), 0 0 12px rgba(23,134,180,0.2)' : 'none',
              }}
            >
              {m === 'login' ? '🔑 Sign In' : '✦ Register'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '0 24px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Name (register only) */}
          {mode === 'register' && (
            <div style={{ position: 'relative' }}>
              <User size={15} color="rgba(79,179,218,0.5)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                id="auth-name"
                type="text"
                placeholder="Full name"
                value={name}
                onChange={e => setName(e.target.value)}
                style={inputStyle}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(79,179,218,0.5)'; e.currentTarget.style.boxShadow = 'inset 3px 3px 10px rgba(2,12,18,0.75), inset -2px -2px 8px rgba(23,134,180,0.12), 0 0 14px rgba(23,134,180,0.12)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(23,134,180,0.25)'; e.currentTarget.style.boxShadow = 'inset 3px 3px 10px rgba(2,12,18,0.75), inset -2px -2px 8px rgba(15,94,131,0.15)'; }}
              />
            </div>
          )}

          {/* Email */}
          <div style={{ position: 'relative' }}>
            <Mail size={15} color="rgba(79,179,218,0.5)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              id="auth-email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(79,179,218,0.5)'; e.currentTarget.style.boxShadow = 'inset 3px 3px 10px rgba(2,12,18,0.75), inset -2px -2px 8px rgba(23,134,180,0.12), 0 0 14px rgba(23,134,180,0.12)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(23,134,180,0.25)'; e.currentTarget.style.boxShadow = 'inset 3px 3px 10px rgba(2,12,18,0.75), inset -2px -2px 8px rgba(15,94,131,0.15)'; }}
            />
          </div>

          {/* Password */}
          <div style={{ position: 'relative' }}>
            <Lock size={15} color="rgba(79,179,218,0.5)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              id="auth-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ ...inputStyle, paddingRight: 44 }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(79,179,218,0.5)'; e.currentTarget.style.boxShadow = 'inset 3px 3px 10px rgba(2,12,18,0.75), inset -2px -2px 8px rgba(23,134,180,0.12), 0 0 14px rgba(23,134,180,0.12)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(23,134,180,0.25)'; e.currentTarget.style.boxShadow = 'inset 3px 3px 10px rgba(2,12,18,0.75), inset -2px -2px 8px rgba(15,94,131,0.15)'; }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(79,179,218,0.5)', padding: 4,
              }}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 12px',
              borderRadius: 10, background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.25)', fontSize: 12, color: '#f87171',
            }}>
              <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 12px',
              borderRadius: 10, background: 'rgba(52,211,153,0.08)',
              border: '1px solid rgba(52,211,153,0.25)', fontSize: 12, color: '#34d399',
            }}>
              <CheckCircle2 size={14} style={{ flexShrink: 0, marginTop: 1 }} />
              {success}
            </div>
          )}

          {/* Demo credentials hint */}
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              background: 'rgba(52,211,153,0.06)',
              border: '1px solid rgba(52,211,153,0.2)',
              fontSize: 12,
              color: 'rgba(52,211,153,0.8)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onClick={() => { setEmail('demo@golu.ai'); setPassword('golu2026'); setError(''); }}
            title="Click to auto-fill demo credentials"
          >
            <span style={{ fontWeight: 700 }}>🎯 Try Demo:</span>{' '}
            <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>demo@golu.ai</span>
            {' / '}
            <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>golu2026</span>
            <span style={{ opacity: 0.6, marginLeft: 6 }}>(click to auto-fill)</span>
          </div>

          {/* Submit */}
          <button
            id="auth-submit-btn"
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '13px 24px',
              borderRadius: 12,
              border: '1px solid rgba(79,179,218,0.4)',
              background: isLoading
                ? 'linear-gradient(135deg, #0F5E83, #1786B4)'
                : 'linear-gradient(135deg, #1786B4, #4FB3DA)',
              color: '#04202E',
              fontWeight: 800,
              fontSize: 14,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.25s',
              boxShadow: '0 8px 32px rgba(23,134,180,0.4)',
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              opacity: isLoading ? 0.7 : 1,
            }}
            onMouseEnter={e => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 14px 40px rgba(79,179,218,0.5)';
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(23,134,180,0.4)';
            }}
          >
            {isLoading ? (
              <>
                <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(4,32,46,0.3)', borderTopColor: '#04202E', animation: 'spin 0.8s linear infinite' }} />
                {mode === 'login' ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              <>
                <Sparkles size={15} />
                {mode === 'login' ? 'Sign In' : 'Create Account'}
                <ArrowRight size={15} />
              </>
            )}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(23,134,180,0.15)' }} />
            <span style={{ fontSize: 11, color: 'rgba(152,213,238,0.35)', fontWeight: 600 }}>OR</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(23,134,180,0.15)' }} />
          </div>

          {/* Guest Continue */}
          <button
            id="auth-guest-btn"
            type="button"
            onClick={handleGuestContinue}
            style={{
              width: '100%',
              padding: '11px 24px',
              borderRadius: 12,
              border: '1px solid rgba(23,134,180,0.2)',
              background: 'linear-gradient(145deg, rgba(10,60,85,0.4), rgba(4,32,46,0.5))',
              color: 'rgba(152,213,238,0.7)',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,179,218,0.35)'; e.currentTarget.style.color = '#E1F2FA'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(23,134,180,0.2)'; e.currentTarget.style.color = 'rgba(152,213,238,0.7)'; }}
          >
            Continue as Guest → (No account needed)
          </button>

          {/* Privacy note */}
          <p style={{ fontSize: 10.5, color: 'rgba(152,213,238,0.3)', textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
            🔒 Your data and API keys are stored locally only. We never share them.
          </p>
        </form>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
