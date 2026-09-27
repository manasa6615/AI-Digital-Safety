import React, { useState, useEffect } from 'react';
import { useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { MessageScanner } from './components/MessageScanner';
import { ScreenshotAnalyzer } from './components/ScreenshotAnalyzer';
import { UrlChecker } from './components/UrlChecker';
import { ConversationAnalyzer } from './components/ConversationAnalyzer';
import { VoiceGuardian } from './components/VoiceGuardian';
import { AnalysisResultView } from './components/AnalysisResultView';
import { FamilySafetyView } from './components/FamilySafetyView';
import { PrivacyCenter } from './components/PrivacyCenter';
import { SecurityCenter } from './components/SecurityCenter';
import { KnowledgeBase } from './components/KnowledgeBase';
import { HistoryView } from './components/HistoryView';
import { SettingsView } from './components/SettingsView';
import { AuthModal } from './components/AuthModal';
import { AnalysisReport, analyzeContent } from './services/analyzer';
import { DemoScenario } from './services/demoData';

const STORAGE_HISTORY_KEY = 'ai_digital_safety_history';
const STORAGE_USER_KEY = 'ai_digital_safety_user';
const STORAGE_FAMILY_KEY = 'ai_digital_safety_family_mode';

export const App: React.FC = () => {
  const { t, language } = useLanguage();
  const [currentView, setCurrentView] = useState<string>('landing');
  const [activeReport, setActiveReport] = useState<AnalysisReport | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // User state
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const saved = localStorage.getItem(STORAGE_USER_KEY);
    return saved ? JSON.parse(saved) : { name: 'Manasa', email: 'manasa@safety.in' };
  });

  // Family Safety Mode state
  const [familyMode, setFamilyMode] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_FAMILY_KEY) === 'true';
  });

  // Analysis History state
  const [history, setHistory] = useState<AnalysisReport[]>(() => {
    const saved = localStorage.getItem(STORAGE_HISTORY_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn("Failed to parse history:", e);
      }
    }
    // Default initial mock reports for immediate dashboard feel
    const initialReport = analyzeContent(
      "Dear Customer, your SBI YONO account will be blocked today within 24 hours. Update PAN: http://sbi-kyc-verify-portal.top",
      'message',
      'en'
    );
    return [initialReport];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem(STORAGE_FAMILY_KEY, String(familyMode));
  }, [familyMode]);

  const toggleFamilyMode = () => {
    setFamilyMode((prev) => !prev);
  };

  const handleAnalysisComplete = (report: AnalysisReport) => {
    setHistory((prev) => [report, ...prev]);
    setActiveReport(report);
    setCurrentView('report');
  };

  const handleLoadScenario = (scenario: DemoScenario) => {
    const report = analyzeContent(scenario.content, scenario.type, language);
    setHistory((prev) => [report, ...prev]);
    setActiveReport(report);
    setCurrentView('report');
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAllHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_HISTORY_KEY);
  };

  const handleResetProfile = () => {
    setUser(null);
    setHistory([]);
    localStorage.clear();
    setCurrentView('landing');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_USER_KEY);
    setCurrentView('landing');
  };

  const handleAuthSuccess = (loggedUser: { name: string; email: string }) => {
    setUser(loggedUser);
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(loggedUser));
    setCurrentView('dashboard');
  };

  return (
    <div className="app-container">
      {/* Sidebar is shown once user navigates into the platform */}
      {currentView !== 'landing' && (
        <Sidebar
          currentView={currentView}
          onNavigate={(view) => {
            setCurrentView(view);
            if (view !== 'report') setActiveReport(null);
          }}
          onLogout={handleLogout}
          isLoggedIn={!!user}
        />
      )}

      <div className="main-content">
        <Navbar
          onNavigate={(view) => {
            setCurrentView(view);
            if (view !== 'report') setActiveReport(null);
          }}
          user={user}
          onOpenAuth={() => setAuthModalOpen(true)}
          familyMode={familyMode}
          onToggleFamilyMode={toggleFamilyMode}
        />

        <main style={{ flex: 1, paddingBottom: '48px' }}>
          {currentView === 'landing' && (
            <LandingPage
              onGetStarted={() => setCurrentView('dashboard')}
              onExploreDemo={() => {
                setCurrentView('dashboard');
              }}
            />
          )}

          {currentView === 'dashboard' && (
            <Dashboard
              onSelectTool={(toolId) => setCurrentView(toolId)}
              onLoadScenario={handleLoadScenario}
              recentScans={history}
              onViewReport={(report) => {
                setActiveReport(report);
                setCurrentView('report');
              }}
              user={user}
              familyMode={familyMode}
            />
          )}

          {currentView === 'message-scanner' && (
            <MessageScanner onAnalysisComplete={handleAnalysisComplete} />
          )}

          {currentView === 'screenshot-analyzer' && (
            <ScreenshotAnalyzer onAnalysisComplete={handleAnalysisComplete} />
          )}

          {currentView === 'url-checker' && (
            <UrlChecker onAnalysisComplete={handleAnalysisComplete} />
          )}

          {currentView === 'conversation-analyzer' && (
            <ConversationAnalyzer onAnalysisComplete={handleAnalysisComplete} />
          )}

          {currentView === 'voice-guardian' && (
            <VoiceGuardian onAnalysisComplete={handleAnalysisComplete} />
          )}

          {currentView === 'family-safety' && (
            <FamilySafetyView
              familyMode={familyMode}
              onToggleFamilyMode={toggleFamilyMode}
              onLaunchScanner={() => setCurrentView('message-scanner')}
            />
          )}

          {currentView === 'safety-center' && <SecurityCenter />}

          {currentView === 'privacy-center' && (
            <PrivacyCenter
              onClearHistory={handleClearAllHistory}
              onResetProfile={handleResetProfile}
            />
          )}

          {currentView === 'knowledge-base' && <KnowledgeBase />}

          {currentView === 'history' && (
            <HistoryView
              history={history}
              onViewReport={(report) => {
                setActiveReport(report);
                setCurrentView('report');
              }}
              onDeleteItem={handleDeleteHistoryItem}
              onClearAll={handleClearAllHistory}
            />
          )}

          {currentView === 'settings' && (
            <SettingsView
              familyMode={familyMode}
              onToggleFamilyMode={toggleFamilyMode}
            />
          )}

          {currentView === 'report' && activeReport && (
            <AnalysisResultView
              report={activeReport}
              onNewScan={() => setCurrentView('message-scanner')}
              familyMode={familyMode}
              onToggleFamilyMode={toggleFamilyMode}
            />
          )}
        </main>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};
