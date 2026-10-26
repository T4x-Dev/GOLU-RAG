import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  Upload,
  Brain,
  FileDown,
  Key,
  ChevronRight,
  Zap,
  Target,
  Layers,
  ArrowRight,
  Star,
  Shield,
  Globe,
  GraduationCap,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: (mode: 'login' | 'register') => void;
}

const STEPS = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload Your Study Material',
    description:
      'Drop in your syllabus PDFs, model question papers, lecture handouts, and textbook chapters. GOLU ingests them all.',
    color: 'sky-600',
    glow: 'rgba(23,134,180,0.35)',
  },
  {
    icon: Brain,
    step: '02',
    title: 'AI Grounds & Analyses',
    description:
      'Our engine cross-references your syllabus against model papers to identify high-yield topics, mark weightages, and exam patterns.',
    color: 'sky-500',
    glow: 'rgba(79,179,218,0.35)',
  },
  {
    icon: FileDown,
    step: '03',
    title: 'Get Exam-Ready Notes',
    description:
      'Receive structured 2/5/10-mark answers, visual diagrams, mnemonics, flashcards, practice exams, and downloadable PDFs.',
    color: 'sky-200',
    glow: 'rgba(152,213,238,0.25)',
  },
];

const FEATURES = [
  { icon: Target, label: 'Mark-Specific Answers', desc: '2, 5 & 10-mark structured responses for every question' },
  { icon: Layers, label: 'Multi-Format Output', desc: 'Document, handwritten simulation, flashcards & practice exams' },
  { icon: Zap, label: 'Deep Reasoning Mode', desc: 'Extended thinking for complex proofs & derivations' },
  { icon: Shield, label: 'Source Grounded', desc: 'Every fact cited back to your uploaded study material' },
  { icon: Star, label: 'Mnemonics & Diagrams', desc: 'Auto-generated memory tricks and Mermaid flow diagrams' },
  { icon: Globe, label: 'Share & Collaborate', desc: 'Generate shareable links or export to PDF/Word/ZIP' },
];

const API_PLATFORMS = [
  {
    name: 'Google Gemini',
    logo: '✦',
    color: '#4FB3DA',
    url: 'https://aistudio.google.com/app/apikey',
    steps: ['Go to Google AI Studio', 'Sign in with your Google account', 'Click "Create API key" button', 'Copy the key and paste in Settings'],
    badge: 'Free Tier Available',
    badgeColor: 'rgba(79,179,218,0.2)',
    badgeBorder: 'rgba(79,179,218,0.5)',
  },
  {
    name: 'Anthropic Claude',
    logo: '◈',
    color: '#98D5EE',
    url: 'https://console.anthropic.com/settings/keys',
    steps: ['Visit Anthropic Console', 'Create / log in to your account', 'Navigate to API Keys section', 'Generate key & paste in Settings'],
    badge: '$5 Free Credits',
    badgeColor: 'rgba(152,213,238,0.15)',
    badgeBorder: 'rgba(152,213,238,0.4)',
  },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [activeApiTab, setActiveApiTab] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #04202E 0%, #0A3C55 40%, #0F5E83 75%, #0A3C55 100%)',
        fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
        color: '#E1F2FA',
        overflowX: 'hidden',
      }}
    >
      {/* Animated cursor glow */}
      <div
        style={{
          position: 'fixed',
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,179,218,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'left 0.15s ease-out, top 0.15s ease-out',
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(79,179,218,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,179,218,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── NAV ── */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(4,32,46,0.85)',
          borderBottom: '1px solid rgba(23,134,180,0.2)',
          padding: '0 2rem',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #1786B4, #4FB3DA)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(23,134,180,0.4)',
            }}
          >
            <GraduationCap size={20} color="#E1F2FA" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-0.3px', color: '#E1F2FA', lineHeight: 1.1 }}>
              GOLU
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 11,
                  padding: '2px 8px',
                  borderRadius: 20,
                  background: 'rgba(79,179,218,0.15)',
                  border: '1px solid rgba(79,179,218,0.4)',
                  color: '#4FB3DA',
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  verticalAlign: 'middle',
                }}
              >
                AI
              </span>
            </div>
            <div style={{ fontSize: 10, color: 'rgba(152,213,238,0.6)', fontWeight: 500, letterSpacing: 0.3 }}>
              Genius Optimizing Learning Universally
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            id="landing-login-btn"
            onClick={() => onEnterApp('login')}
            style={{
              padding: '9px 22px',
              borderRadius: 10,
              border: '1px solid rgba(23,134,180,0.5)',
              background: 'rgba(15,94,131,0.3)',
              color: '#98D5EE',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 0.2s',
              backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.background = 'rgba(23,134,180,0.3)';
              (e.target as HTMLElement).style.borderColor = 'rgba(79,179,218,0.7)';
              (e.target as HTMLElement).style.color = '#E1F2FA';
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.background = 'rgba(15,94,131,0.3)';
              (e.target as HTMLElement).style.borderColor = 'rgba(23,134,180,0.5)';
              (e.target as HTMLElement).style.color = '#98D5EE';
            }}
          >
            Login
          </button>
          <button
            id="landing-register-btn"
            onClick={() => onEnterApp('register')}
            style={{
              padding: '9px 22px',
              borderRadius: 10,
              border: '1px solid rgba(79,179,218,0.6)',
              background: 'linear-gradient(135deg, #1786B4, #0F5E83)',
              color: '#E1F2FA',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 20px rgba(23,134,180,0.3)',
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.background = 'linear-gradient(135deg, #4FB3DA, #1786B4)';
              (e.target as HTMLElement).style.boxShadow = '0 6px 28px rgba(23,134,180,0.5)';
              (e.target as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.background = 'linear-gradient(135deg, #1786B4, #0F5E83)';
              (e.target as HTMLElement).style.boxShadow = '0 4px 20px rgba(23,134,180,0.3)';
              (e.target as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            Get Started Free →
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 24px 60px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        {/* Glow orb */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(23,134,180,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            padding: '6px 16px',
            borderRadius: 40,
            border: '1px solid rgba(79,179,218,0.4)',
            background: 'rgba(79,179,218,0.08)',
            backdropFilter: 'blur(8px)',
            marginBottom: 28,
            fontSize: 12,
            fontWeight: 600,
            color: '#4FB3DA',
            letterSpacing: 0.5,
          }}
        >
          <Sparkles size={13} />
          Powered by Gemini & Claude AI
        </div>

        <h1
          style={{
            fontSize: 'clamp(42px, 7vw, 80px)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-2px',
            maxWidth: 820,
            marginBottom: 24,
            background: 'linear-gradient(135deg, #E1F2FA 0%, #98D5EE 40%, #4FB3DA 80%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Study Smarter.<br />
          Score Higher.
        </h1>

        <p
          style={{
            fontSize: 'clamp(15px, 2.2vw, 20px)',
            color: 'rgba(152,213,238,0.85)',
            maxWidth: 620,
            lineHeight: 1.65,
            marginBottom: 12,
            fontWeight: 400,
          }}
        >
          GOLU — <em style={{ fontStyle: 'normal', color: '#4FB3DA', fontWeight: 600 }}>Genius Optimizing Learning Universally</em> — is an intelligent companion that transforms your raw study material into precision exam-ready content, grounded against your actual syllabus and model papers.
        </p>

        <p
          style={{
            fontSize: 13,
            color: 'rgba(152,213,238,0.5)',
            marginBottom: 44,
            fontStyle: 'italic',
            fontWeight: 500,
          }}
        >
          Futuristic. Ambitious. Built for students who demand more.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            id="hero-register-btn"
            onClick={() => onEnterApp('register')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 32px',
              borderRadius: 14,
              border: 'none',
              background: 'linear-gradient(135deg, #1786B4, #4FB3DA)',
              color: '#04202E',
              fontWeight: 800,
              fontSize: 15,
              cursor: 'pointer',
              transition: 'all 0.25s',
              boxShadow: '0 8px 32px rgba(23,134,180,0.45)',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => {
              (e.currentTarget).style.transform = 'translateY(-3px) scale(1.02)';
              (e.currentTarget).style.boxShadow = '0 14px 40px rgba(79,179,218,0.55)';
            }}
            onMouseLeave={e => {
              (e.currentTarget).style.transform = 'translateY(0) scale(1)';
              (e.currentTarget).style.boxShadow = '0 8px 32px rgba(23,134,180,0.45)';
            }}
          >
            <Sparkles size={16} />
            Start for Free
            <ArrowRight size={16} />
          </button>

          <button
            id="hero-login-btn"
            onClick={() => onEnterApp('login')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 32px',
              borderRadius: 14,
              border: '1px solid rgba(23,134,180,0.45)',
              background: 'rgba(10,60,85,0.5)',
              color: '#98D5EE',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              transition: 'all 0.25s',
              backdropFilter: 'blur(12px)',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => {
              (e.currentTarget).style.borderColor = 'rgba(79,179,218,0.7)';
              (e.currentTarget).style.background = 'rgba(23,134,180,0.2)';
              (e.currentTarget).style.color = '#E1F2FA';
              (e.currentTarget).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget).style.borderColor = 'rgba(23,134,180,0.45)';
              (e.currentTarget).style.background = 'rgba(10,60,85,0.5)';
              (e.currentTarget).style.color = '#98D5EE';
              (e.currentTarget).style.transform = 'translateY(0)';
            }}
          >
            <BookOpen size={16} />
            I Already Have an Account
          </button>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 60,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {[
            { value: '3 AI Models', label: 'Gemini + Claude + OpenAI' },
            { value: '6 Output Modes', label: 'Doc, Handwritten, Flashcards…' },
            { value: '100% Grounded', label: 'Against your syllabus & papers' },
          ].map((stat) => (
            <div key={stat.value} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: '#4FB3DA',
                  letterSpacing: '-0.5px',
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 11.5, color: 'rgba(152,213,238,0.6)', marginTop: 3, fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how-it-works"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '100px 24px',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 14px',
              borderRadius: 30,
              background: 'rgba(23,134,180,0.12)',
              border: '1px solid rgba(23,134,180,0.3)',
              fontSize: 11,
              fontWeight: 700,
              color: '#1786B4',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            How It Works
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-1px',
              color: '#E1F2FA',
              marginBottom: 14,
            }}
          >
            From Raw Material to Exam Mastery
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(152,213,238,0.65)', maxWidth: 520, margin: '0 auto' }}>
            Three intelligent steps transform your study stack into a precision revision arsenal.
          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                style={{
                  position: 'relative',
                  padding: '36px 32px',
                  borderRadius: 20,
                  background: 'linear-gradient(145deg, rgba(10,60,85,0.7), rgba(4,32,46,0.8))',
                  border: '1px solid rgba(23,134,180,0.25)',
                  backdropFilter: 'blur(16px)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  (e.currentTarget).style.transform = 'translateY(-6px)';
                  (e.currentTarget).style.borderColor = 'rgba(79,179,218,0.5)';
                  (e.currentTarget).style.boxShadow = `0 20px 50px ${s.glow}`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget).style.transform = 'translateY(0)';
                  (e.currentTarget).style.borderColor = 'rgba(23,134,180,0.25)';
                  (e.currentTarget).style.boxShadow = 'none';
                }}
              >
                {/* Step number watermark */}
                <div
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: 24,
                    fontSize: 64,
                    fontWeight: 900,
                    color: 'rgba(23,134,180,0.08)',
                    lineHeight: 1,
                    letterSpacing: -2,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  {s.step}
                </div>

                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: 'linear-gradient(135deg, rgba(23,134,180,0.3), rgba(79,179,218,0.15))',
                    border: '1px solid rgba(79,179,218,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                    boxShadow: `0 4px 20px ${s.glow}`,
                  }}
                >
                  <Icon size={24} color="#4FB3DA" />
                </div>

                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#1786B4',
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                    marginBottom: 8,
                  }}
                >
                  Step {s.step}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#E1F2FA', marginBottom: 10, lineHeight: 1.3 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(152,213,238,0.7)', lineHeight: 1.6 }}>{s.description}</p>

                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      display: 'none', // hidden on mobile, shown via CSS
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── API KEY SECTION ── */}
      <section
        id="api-keys"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '80px 24px 100px',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 14px',
              borderRadius: 30,
              background: 'rgba(79,179,218,0.1)',
              border: '1px solid rgba(79,179,218,0.3)',
              fontSize: 11,
              fontWeight: 700,
              color: '#98D5EE',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            <Key size={11} />
            Personal API Key Setup
          </div>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, color: '#E1F2FA', letterSpacing: '-0.8px', marginBottom: 12 }}>
            Bring Your Own API Key
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(152,213,238,0.65)', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
            GOLU works with your personal API keys for maximum privacy. Your keys are stored locally and never shared with anyone.
          </p>
        </div>

        {/* Tab switcher */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            padding: 6,
            borderRadius: 16,
            background: 'rgba(4,32,46,0.6)',
            border: '1px solid rgba(23,134,180,0.2)',
            marginBottom: 28,
            width: 'fit-content',
            margin: '0 auto 28px',
          }}
        >
          {API_PLATFORMS.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActiveApiTab(i)}
              style={{
                padding: '10px 24px',
                borderRadius: 11,
                border: activeApiTab === i ? '1px solid rgba(79,179,218,0.4)' : '1px solid transparent',
                background: activeApiTab === i
                  ? 'linear-gradient(135deg, rgba(23,134,180,0.35), rgba(15,94,131,0.3))'
                  : 'transparent',
                color: activeApiTab === i ? '#E1F2FA' : 'rgba(152,213,238,0.5)',
                fontWeight: activeApiTab === i ? 700 : 500,
                fontSize: 13,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
              }}
            >
              <span style={{ fontSize: 16 }}>{p.logo}</span>
              {p.name}
            </button>
          ))}
        </div>

        {/* API card */}
        {API_PLATFORMS.map((platform, i) => (
          <div
            key={platform.name}
            style={{
              display: activeApiTab === i ? 'block' : 'none',
              padding: '32px 36px',
              borderRadius: 20,
              background: 'linear-gradient(145deg, rgba(10,60,85,0.65), rgba(4,32,46,0.8))',
              border: '1px solid rgba(23,134,180,0.25)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 28, color: platform.color }}>{platform.logo}</span>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: '#E1F2FA' }}>{platform.name}</h3>
                  <span
                    style={{
                      padding: '2px 10px',
                      borderRadius: 20,
                      background: platform.badgeColor,
                      border: `1px solid ${platform.badgeBorder}`,
                      fontSize: 11,
                      fontWeight: 600,
                      color: platform.color,
                    }}
                  >
                    {platform.badge}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(152,213,238,0.55)', fontStyle: 'italic' }}>
                  Follow these steps to get your free API key
                </p>
              </div>
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '10px 20px',
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, rgba(23,134,180,0.3), rgba(79,179,218,0.15))',
                  border: `1px solid ${platform.badgeBorder}`,
                  color: platform.color,
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                <ExternalLink size={13} />
                Open {platform.name} Console
              </a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {platform.steps.map((step, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    padding: '14px 16px',
                    borderRadius: 12,
                    background: 'rgba(4,32,46,0.5)',
                    border: '1px solid rgba(23,134,180,0.15)',
                  }}
                >
                  <div
                    style={{
                      minWidth: 26,
                      height: 26,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(23,134,180,0.4), rgba(79,179,218,0.2))',
                      border: '1px solid rgba(79,179,218,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#4FB3DA',
                    }}
                  >
                    {idx + 1}
                  </div>
                  <span style={{ fontSize: 13, color: 'rgba(225,242,250,0.8)', lineHeight: 1.4 }}>{step}</span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 20,
                padding: '14px 18px',
                borderRadius: 12,
                background: 'rgba(23,134,180,0.08)',
                border: '1px solid rgba(23,134,180,0.2)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
              }}
            >
              <Shield size={15} color="#1786B4" style={{ marginTop: 1, flexShrink: 0 }} />
              <p style={{ fontSize: 12.5, color: 'rgba(152,213,238,0.65)', lineHeight: 1.5, margin: 0 }}>
                <strong style={{ color: '#4FB3DA', fontWeight: 600 }}>Privacy First:</strong> Your API key is stored only in your browser's local storage. GOLU never logs, stores, or transmits your key to any external server.
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* ── FEATURES GRID ── */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '80px 24px',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, color: '#E1F2FA', letterSpacing: '-0.8px', marginBottom: 12 }}>
            Everything You Need to Ace Your Exams
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(152,213,238,0.6)', maxWidth: 460, margin: '0 auto' }}>
            A complete AI-powered toolkit, built specifically for university exam preparation.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.label}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  padding: '22px 24px',
                  borderRadius: 16,
                  background: 'linear-gradient(145deg, rgba(10,60,85,0.5), rgba(4,32,46,0.6))',
                  border: '1px solid rgba(23,134,180,0.2)',
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.25s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  (e.currentTarget).style.borderColor = 'rgba(79,179,218,0.45)';
                  (e.currentTarget).style.transform = 'translateY(-3px)';
                  (e.currentTarget).style.boxShadow = '0 12px 36px rgba(23,134,180,0.2)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget).style.borderColor = 'rgba(23,134,180,0.2)';
                  (e.currentTarget).style.transform = 'translateY(0)';
                  (e.currentTarget).style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, rgba(23,134,180,0.25), rgba(15,94,131,0.15))',
                    border: '1px solid rgba(79,179,218,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} color="#4FB3DA" />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#E1F2FA', marginBottom: 4 }}>{f.label}</div>
                  <div style={{ fontSize: 13, color: 'rgba(152,213,238,0.6)', lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '80px 24px 100px',
          maxWidth: 760,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            padding: '56px 48px',
            borderRadius: 28,
            background: 'linear-gradient(145deg, rgba(23,134,180,0.2), rgba(15,94,131,0.15))',
            border: '1px solid rgba(79,179,218,0.35)',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative glow */}
          <div
            style={{
              position: 'absolute',
              top: -60,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 300,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(79,179,218,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ marginBottom: 12 }}>
            <CheckCircle2 size={40} color="#4FB3DA" style={{ margin: '0 auto 16px' }} />
          </div>
          <h2
            style={{
              fontSize: 'clamp(24px, 3.5vw, 36px)',
              fontWeight: 800,
              color: '#E1F2FA',
              letterSpacing: '-0.8px',
              marginBottom: 14,
            }}
          >
            Ready to Transform Your Study Sessions?
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(152,213,238,0.7)', marginBottom: 36, lineHeight: 1.6, maxWidth: 480, margin: '0 auto 36px' }}>
            Join thousands of students using GOLU to turn hours of studying into targeted, exam-ready preparation in minutes.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              id="cta-register-btn"
              onClick={() => onEnterApp('register')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 36px',
                borderRadius: 14,
                border: 'none',
                background: 'linear-gradient(135deg, #1786B4, #4FB3DA)',
                color: '#04202E',
                fontWeight: 800,
                fontSize: 15,
                cursor: 'pointer',
                transition: 'all 0.25s',
                boxShadow: '0 8px 32px rgba(23,134,180,0.45)',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => {
                (e.currentTarget).style.transform = 'translateY(-3px) scale(1.02)';
                (e.currentTarget).style.boxShadow = '0 14px 44px rgba(79,179,218,0.55)';
              }}
              onMouseLeave={e => {
                (e.currentTarget).style.transform = 'translateY(0) scale(1)';
                (e.currentTarget).style.boxShadow = '0 8px 32px rgba(23,134,180,0.45)';
              }}
            >
              <Sparkles size={16} />
              Get Started — It's Free
            </button>
            <button
              id="cta-login-btn"
              onClick={() => onEnterApp('login')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 28px',
                borderRadius: 14,
                border: '1px solid rgba(79,179,218,0.35)',
                background: 'transparent',
                color: '#98D5EE',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => {
                (e.currentTarget).style.borderColor = 'rgba(79,179,218,0.6)';
                (e.currentTarget).style.color = '#E1F2FA';
                (e.currentTarget).style.background = 'rgba(79,179,218,0.08)';
              }}
              onMouseLeave={e => {
                (e.currentTarget).style.borderColor = 'rgba(79,179,218,0.35)';
                (e.currentTarget).style.color = '#98D5EE';
                (e.currentTarget).style.background = 'transparent';
              }}
            >
              Login Instead
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          position: 'relative',
          zIndex: 1,
          borderTop: '1px solid rgba(23,134,180,0.15)',
          background: 'rgba(4,32,46,0.6)',
          backdropFilter: 'blur(12px)',
          padding: '48px 32px 32px',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 40,
            marginBottom: 40,
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #1786B4, #4FB3DA)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <GraduationCap size={18} color="#E1F2FA" />
              </div>
              <span style={{ fontWeight: 800, fontSize: 16, color: '#E1F2FA' }}>GOLU</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(152,213,238,0.5)', lineHeight: 1.6, maxWidth: 220 }}>
              Genius Optimizing Learning Universally.<br />An intelligent companion for modern students.
            </p>
            <p style={{ fontSize: 11, color: 'rgba(152,213,238,0.35)', marginTop: 12, fontStyle: 'italic' }}>
              Futuristic. Ambitious. Built for you.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: '#1786B4', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 14 }}>
              Product
            </h4>
            {['Features', 'How it Works', 'API Key Setup', 'Sample Presets', 'Download Formats'].map(link => (
              <div key={link} style={{ marginBottom: 9 }}>
                <a href="#" style={{ fontSize: 13, color: 'rgba(152,213,238,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = '#4FB3DA'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(152,213,238,0.55)'}
                >
                  {link}
                </a>
              </div>
            ))}
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: '#1786B4', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 14 }}>
              Resources
            </h4>
            {[
              { label: 'Google AI Studio', href: 'https://aistudio.google.com' },
              { label: 'Anthropic Console', href: 'https://console.anthropic.com' },
              { label: 'Documentation', href: '#' },
              { label: 'Privacy Policy', href: '#' },
            ].map(link => (
              <div key={link.label} style={{ marginBottom: 9 }}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  style={{ fontSize: 13, color: 'rgba(152,213,238,0.55)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget).style.color = '#4FB3DA'}
                  onMouseLeave={e => (e.currentTarget).style.color = 'rgba(152,213,238,0.55)'}
                >
                  {link.label}
                  {link.href.startsWith('http') && <ExternalLink size={10} />}
                </a>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: '#1786B4', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 14 }}>
              Quick Access
            </h4>
            <button
              onClick={() => onEnterApp('register')}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px 16px',
                borderRadius: 10,
                border: 'none',
                background: 'linear-gradient(135deg, rgba(23,134,180,0.4), rgba(79,179,218,0.2))',
                border: '1px solid rgba(79,179,218,0.3)',
                color: '#E1F2FA',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                marginBottom: 8,
                fontFamily: 'inherit',
                transition: 'all 0.2s',
              } as React.CSSProperties}
            >
              ✦ Create Account
            </button>
            <button
              onClick={() => onEnterApp('login')}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px 16px',
                borderRadius: 10,
                border: '1px solid rgba(23,134,180,0.2)',
                background: 'transparent',
                color: 'rgba(152,213,238,0.7)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'inherit',
                transition: 'all 0.2s',
              } as React.CSSProperties}
            >
              → Sign In
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(23,134,180,0.1)',
            paddingTop: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            maxWidth: 1100,
            margin: '0 auto',
          }}
        >
          <p style={{ fontSize: 12, color: 'rgba(152,213,238,0.35)', margin: 0 }}>
            © 2026 GOLU — Genius Optimizing Learning Universally. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: 'rgba(152,213,238,0.35)', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={11} color="rgba(79,179,218,0.5)" />
            Built with Gemini AI · Claude Sonnet · RAG Architecture
          </p>
        </div>
      </footer>
    </div>
  );
};
