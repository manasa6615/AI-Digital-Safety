import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../locales';
import { Shield, Globe, Bell, Check, User, HeartHandshake } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: string) => void;
  user: { name: string; email: string } | null;
  onOpenAuth: () => void;
  familyMode: boolean;
  onToggleFamilyMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  user,
  onOpenAuth,
  familyMode,
  onToggleFamilyMode,
}) => {
  const { language, setLanguage, t, currentMeta } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Persistent Privacy Reminder Banner */}
      <div className="privacy-alert-banner" role="alert">
        <Shield size={15} style={{ flexShrink: 0 }} />
        <span>{t.app.privacyBanner}</span>
      </div>

      <header className="navbar">
        <div className="navbar-brand" onClick={() => onNavigate('dashboard')}>
          <div className="navbar-brand-icon">
            <Shield size={22} />
          </div>
          <div>
            <div className="navbar-brand-text">{t.app.name}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {t.app.protectionActive}
            </div>
          </div>
        </div>

        <div className="navbar-actions">
          {/* Family Mode Quick Toggle */}
          <button
            onClick={onToggleFamilyMode}
            className={`btn ${familyMode ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '6px 12px', fontSize: '0.82rem' }}
            title={t.familyMode.badge}
          >
            <HeartHandshake size={15} />
            <span>{t.familyMode.toggleLabel}</span>
            <span style={{ 
              fontSize: '0.7rem', 
              padding: '1px 6px', 
              borderRadius: '999px', 
              background: familyMode ? 'rgba(255,255,255,0.25)' : 'var(--border-medium)',
              fontWeight: 700 
            }}>
              {familyMode ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="lang-selector-wrapper" ref={langRef}>
            <button
              className="lang-selector-btn"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              aria-label="Select Application Language"
            >
              <Globe size={16} style={{ color: 'var(--accent-cyan)' }} />
              <span className="lang-native-text">{currentMeta.nativeName}</span>
            </button>

            {langMenuOpen && (
              <div className="lang-dropdown-menu">
                <div style={{ padding: '6px 10px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)', marginBottom: '4px' }}>
                  🌐 {t.settings.languageLabel}
                </div>
                {SUPPORTED_LANGUAGES.map((langItem) => {
                  const isSelected = langItem.code === language;
                  return (
                    <button
                      key={langItem.code}
                      className={`lang-option ${isSelected ? 'active' : ''}`}
                      onClick={() => {
                        setLanguage(langItem.code as SupportedLanguage);
                        setLangMenuOpen(false);
                      }}
                    >
                      <div>
                        <div className="lang-native-text">{langItem.nativeName}</div>
                        <div className="lang-en-text">{langItem.name}</div>
                      </div>
                      {isSelected && <Check size={16} style={{ color: 'var(--accent-cyan)' }} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Notifications Trigger */}
          <div style={{ position: 'relative' }} ref={notifRef}>
            <button
              className="btn btn-secondary"
              style={{ padding: '8px 10px', borderRadius: 'var(--radius-sm)' }}
              onClick={() => setNotifMenuOpen(!notifMenuOpen)}
              aria-label="Security Notifications"
            >
              <Bell size={16} />
            </button>

            {notifMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + 8px)',
                  width: '300px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-elevated)',
                  padding: '12px',
                  zIndex: 100,
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
                  {t.app.safetyToolsReady}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', padding: '8px', background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  🟢 {t.notifications.analysisComplete}
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Login */}
          {user ? (
            <button
              className="btn btn-secondary"
              onClick={() => onNavigate('settings')}
              style={{ fontSize: '0.85rem' }}
            >
              <User size={15} />
              <span>{user.name}</span>
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={onOpenAuth}
              style={{ fontSize: '0.85rem' }}
            >
              {t.nav.login}
            </button>
          )}
        </div>
      </header>
    </>
  );
};
