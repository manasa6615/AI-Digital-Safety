import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HeartHandshake, ShieldAlert, ShieldCheck, PhoneCall, CheckCircle2 } from 'lucide-react';

interface FamilySafetyViewProps {
  familyMode: boolean;
  onToggleFamilyMode: () => void;
  onLaunchScanner: () => void;
}

export const FamilySafetyView: React.FC<FamilySafetyViewProps> = ({
  familyMode,
  onToggleFamilyMode,
  onLaunchScanner,
}) => {
  const { t } = useLanguage();

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '24px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HeartHandshake style={{ color: '#ec4899' }} size={26} />
            <span>{t.familyMode.badge}</span>
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {t.familyMode.activeBanner}
          </p>
        </div>

        <button
          onClick={onToggleFamilyMode}
          className={`btn ${familyMode ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '8px 18px' }}
        >
          <span>{familyMode ? 'Family Mode: ACTIVE' : 'Enable Family Mode'}</span>
        </button>
      </div>

      {/* Primary Simplified Rules Card */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '28px',
          boxShadow: 'var(--shadow-card)',
          marginBottom: '24px',
        }}
      >
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>
          {t.familyMode.simplifiedTitle}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--risk-high-border)', borderRadius: 'var(--radius-md)', padding: '18px' }}>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--risk-high-text)', marginBottom: '8px' }}>
              🛑 Rule 1
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
              {t.familyMode.rule1}
            </div>
          </div>

          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--risk-high-border)', borderRadius: 'var(--radius-md)', padding: '18px' }}>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--risk-high-text)', marginBottom: '8px' }}>
              🛑 Rule 2
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
              {t.familyMode.rule2}
            </div>
          </div>

          <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid var(--risk-med-border)', borderRadius: 'var(--radius-md)', padding: '18px' }}>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--risk-med-text)', marginBottom: '8px' }}>
              ⚠️ Rule 3
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
              {t.familyMode.rule3}
            </div>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--risk-safe-border)', borderRadius: 'var(--radius-md)', padding: '18px' }}>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--risk-safe-text)', marginBottom: '8px' }}>
              ✅ Rule 4
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
              {t.familyMode.rule4}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={onLaunchScanner} style={{ padding: '12px 28px', fontSize: '1rem' }}>
            <ShieldCheck size={18} />
            <span>{t.nav.scanMessage}</span>
          </button>
        </div>
      </div>

      {/* Emergency Helpline Guidance */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171', flexShrink: 0 }}>
          <PhoneCall size={20} />
        </div>
        <div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Emergency Helpline: 1930
          </div>
          <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            If you or an elderly family member sent money to an unknown caller, immediately dial 1930 within 2 hours to freeze bank transfers.
          </div>
        </div>
      </div>
    </div>
  );
};
