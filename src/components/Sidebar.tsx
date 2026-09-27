import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  LayoutDashboard,
  SearchCode,
  Image as ImageIcon,
  Link2,
  MessagesSquare,
  Mic,
  ShieldCheck,
  History,
  Users,
  Lock,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  isLoggedIn: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  onLogout,
  isLoggedIn,
}) => {
  const { t } = useLanguage();

  const navItems = [
    { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { id: 'message-scanner', label: t.nav.scanMessage, icon: SearchCode },
    { id: 'screenshot-analyzer', label: t.nav.screenshotAnalyzer, icon: ImageIcon },
    { id: 'url-checker', label: t.nav.urlChecker, icon: Link2 },
    { id: 'conversation-analyzer', label: t.nav.conversationAnalyzer, icon: MessagesSquare },
    { id: 'voice-guardian', label: t.nav.voiceGuardian, icon: Mic },
    { id: 'family-safety', label: t.nav.familySafety, icon: Users },
    { id: 'safety-center', label: t.nav.safetyCenter, icon: ShieldCheck },
    { id: 'history', label: t.nav.analysisHistory, icon: History },
    { id: 'privacy-center', label: t.nav.privacyCenter, icon: Lock },
    { id: 'knowledge-base', label: t.nav.help, icon: HelpCircle },
    { id: 'settings', label: t.nav.settings, icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="status-pill status-green">
          <span className="status-indicator-dot" />
          <span>{t.app.statusActive}</span>
        </div>
      </div>

      <ul className="sidebar-nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <li key={item.id} className="sidebar-nav-item">
              <button
                className={`sidebar-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {isLoggedIn && (
        <div className="sidebar-footer">
          <button
            className="sidebar-nav-link"
            onClick={onLogout}
            style={{ color: '#f87171' }}
          >
            <LogOut size={18} />
            <span>{t.nav.logout}</span>
          </button>
        </div>
      )}
    </aside>
  );
};
