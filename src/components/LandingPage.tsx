import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, ShieldAlert, ArrowRight, CheckCircle2, Lock, Globe, FileSearch, Sparkles, MessageSquare } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onExploreDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onExploreDemo }) => {
  const { t } = useLanguage();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Hero Section */}
      <section style={{ maxWidth: '1140px', margin: '0 auto', padding: '72px 24px 48px', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '999px',
            background: 'var(--accent-cyan-subtle)',
            border: '1px solid var(--accent-cyan-border)',
            color: 'var(--accent-cyan)',
            fontSize: '0.84rem',
            fontWeight: 600,
            marginBottom: '24px',
          }}
        >
          <Shield size={16} />
          <span>{t.landing.badge}</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
            fontWeight: 900,
            fontFamily: 'var(--font-display)',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
            color: 'var(--text-primary)',
          }}
        >
          {t.landing.heroTitle}
        </h1>

        <p
          style={{
            maxWidth: '720px',
            margin: '0 auto 36px',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
          }}
        >
          {t.landing.heroSubtitle}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={onGetStarted} style={{ padding: '14px 28px', fontSize: '1rem' }}>
            <span>{t.landing.ctaPrimary}</span>
            <ArrowRight size={18} />
          </button>
          <button className="btn btn-secondary" onClick={onExploreDemo} style={{ padding: '14px 24px', fontSize: '1rem' }}>
            <Sparkles size={18} style={{ color: 'var(--accent-cyan)' }} />
            <span>{t.landing.ctaSecondary}</span>
          </button>
        </div>
      </section>

      {/* Core Product Journey Section: DETECT -> EXPLAIN -> PROTECT -> RECOVER */}
      <section style={{ maxWidth: '1140px', margin: '0 auto', padding: '36px 24px 64px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
            {t.landing.journeyTitle}
          </h2>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            DETECT → EXPLAIN → PROTECT → RECOVER
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '8px' }}>
              {t.landing.detectStep}
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {t.landing.detectDesc}
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fbbf24', marginBottom: '8px' }}>
              {t.landing.explainStep}
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {t.landing.explainDesc}
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399', marginBottom: '8px' }}>
              {t.landing.protectStep}
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {t.landing.protectDesc}
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f87171', marginBottom: '8px' }}>
              {t.landing.recoverStep}
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {t.landing.recoverDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Trust Guarantee Section */}
      <section style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
            {t.landing.trustTitle}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: 'var(--risk-safe-text)' }}>
              <Lock size={18} />
              <div style={{ fontSize: '0.98rem', fontWeight: 700 }}>{t.landing.trust1Title}</div>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {t.landing.trust1Desc}
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: 'var(--accent-cyan)' }}>
              <Globe size={18} />
              <div style={{ fontSize: '0.98rem', fontWeight: 700 }}>{t.landing.trust2Title}</div>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {t.landing.trust2Desc}
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: '#fbbf24' }}>
              <FileSearch size={18} />
              <div style={{ fontSize: '0.98rem', fontWeight: 700 }}>{t.landing.trust3Title}</div>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {t.landing.trust3Desc}
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: '#f87171' }}>
              <ShieldAlert size={18} />
              <div style={{ fontSize: '0.98rem', fontWeight: 700 }}>{t.landing.trust4Title}</div>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {t.landing.trust4Desc}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
