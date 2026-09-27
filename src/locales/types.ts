export type SupportedLanguage = 
  | 'en' // English
  | 'te' // Telugu
  | 'hi' // Hindi
  | 'ta' // Tamil
  | 'kn' // Kannada
  | 'ml' // Malayalam
  | 'mr' // Marathi
  | 'bn' // Bengali
  | 'gu' // Gujarati
  | 'pa'; // Punjabi

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  bcp47: string; // for speech recognition and synthesis
}

export interface TranslationSchema {
  app: {
    name: string;
    tagline: string;
    taglineSub: string;
    privacyBanner: string;
    protectionActive: string;
    safetyToolsReady: string;
    statusActive: string;
    statusShielded: string;
  };
  nav: {
    dashboard: string;
    scanMessage: string;
    screenshotAnalyzer: string;
    urlChecker: string;
    conversationAnalyzer: string;
    voiceGuardian: string;
    safetyCenter: string;
    analysisHistory: string;
    familySafety: string;
    privacyCenter: string;
    settings: string;
    help: string;
    logout: string;
    getStarted: string;
    login: string;
    signup: string;
    demoMode: string;
  };
  landing: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    journeyTitle: string;
    detectStep: string;
    detectDesc: string;
    explainStep: string;
    explainDesc: string;
    protectStep: string;
    protectDesc: string;
    recoverStep: string;
    recoverDesc: string;
    trustTitle: string;
    trust1Title: string;
    trust1Desc: string;
    trust2Title: string;
    trust2Desc: string;
    trust3Title: string;
    trust3Desc: string;
    trust4Title: string;
    trust4Desc: string;
  };
  dashboard: {
    greeting: string;
    securityStatusTitle: string;
    securityStatusDesc: string;
    familyModeActiveNotice: string;
    metricAnalyses: string;
    metricHighRisk: string;
    metricLinks: string;
    metricSafetyActions: string;
    toolsTitle: string;
    toolsSubtitle: string;
    cardMessageTitle: string;
    cardMessageDesc: string;
    cardScreenshotTitle: string;
    cardScreenshotDesc: string;
    cardUrlTitle: string;
    cardUrlDesc: string;
    cardConversationTitle: string;
    cardConversationDesc: string;
    cardEmailTitle: string;
    cardEmailDesc: string;
    cardVoiceTitle: string;
    cardVoiceDesc: string;
    quickDemoTitle: string;
    quickDemoDesc: string;
    recentActivityTitle: string;
    noRecentActivity: string;
  };
  messageScanner: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    analyzeBtn: string;
    clearBtn: string;
    loadExampleBtn: string;
    analyzingText: string;
    privacyNote: string;
    redactedNotice: string;
  };
  screenshotAnalyzer: {
    title: string;
    subtitle: string;
    dropText: string;
    dropSub: string;
    uploadBtn: string;
    changeImage: string;
    removeImage: string;
    extractedTextTitle: string;
    detectedLinksTitle: string;
    analyzingOcr: string;
    demoSample1: string;
    demoSample2: string;
  };
  urlChecker: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    checkBtn: string;
    analyzingUrl: string;
    httpsNotice: string;
    domainDetails: string;
    suspiciousIndicators: string;
    redirectsFound: string;
  };
  conversationAnalyzer: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    analyzeBtn: string;
    loadConversationDemo: string;
    timelineTitle: string;
    timelineIntro: string;
    phaseImpersonation: string;
    phaseTrust: string;
    phaseFear: string;
    phaseUrgency: string;
    phaseCredential: string;
    phaseAction: string;
  };
  voiceGuardian: {
    title: string;
    subtitle: string;
    instructions: string;
    startListening: string;
    stopListening: string;
    listeningStatus: string;
    analyzingStatus: string;
    transcriptTitle: string;
    responseTitle: string;
    listenResponseBtn: string;
    stopSpeechBtn: string;
    clearBtn: string;
    voiceSettingsNote: string;
    micPermissionError: string;
  };
  report: {
    riskLevel: string;
    riskScore: string;
    riskIndicatorLabel: string;
    levelHigh: string;
    levelMedium: string;
    levelLow: string;
    levelSafe: string;
    whatWeFound: string;
    whySuspicious: string;
    scamType: string;
    actionPlanTitle: string;
    stateReceived: string;
    stateClicked: string;
    stateEntered: string;
    statePaid: string;
    whatToDoTitle: string;
    whatNotToDoTitle: string;
    safeResponseTitle: string;
    copyResponseBtn: string;
    copied: string;
    verifyTitle: string;
    newScanBtn: string;
  };
  familyMode: {
    badge: string;
    toggleLabel: string;
    activeBanner: string;
    simplifiedTitle: string;
    alertHigh: string;
    alertMedium: string;
    alertLow: string;
    rule1: string;
    rule2: string;
    rule3: string;
    rule4: string;
  };
  categories: {
    banking: string;
    kyc: string;
    phishing: string;
    job: string;
    investment: string;
    delivery: string;
    lottery: string;
    gov: string;
    takeover: string;
    socialEng: string;
    payment: string;
    customerSupport: string;
  };
  privacyCenter: {
    title: string;
    subtitle: string;
    warningBanner: string;
    dataStoredTitle: string;
    dataStoredDesc: string;
    localOnly: string;
    accountDataTitle: string;
    wipeHistoryBtn: string;
    deleteAccountBtn: string;
    wipeSuccess: string;
  };
  securityCenter: {
    title: string;
    subtitle: string;
    mfaTitle: string;
    mfaDesc: string;
    mfaEnabled: string;
    mfaDisabled: string;
    toggleMfa: string;
    sessionTitle: string;
    activeSession: string;
    lastLogin: string;
    passwordStatus: string;
  };
  knowledgeBase: {
    title: string;
    subtitle: string;
    simulatedTag: string;
    patternLabel: string;
    warningSignsLabel: string;
    mitigationLabel: string;
  };
  history: {
    title: string;
    subtitle: string;
    emptyText: string;
    clearHistoryBtn: string;
    tableDate: string;
    tableType: string;
    tableCategory: string;
    tableRisk: string;
    tableAction: string;
    viewReport: string;
    deleteItem: string;
  };
  settings: {
    title: string;
    subtitle: string;
    languageLabel: string;
    voiceLangLabel: string;
    speechSpeedLabel: string;
    autoSpeechLabel: string;
    familyModeDefault: string;
    saveBtn: string;
    savedNotice: string;
  };
  notifications: {
    analysisComplete: string;
    highRiskDetected: string;
    reportDeleted: string;
    languageUpdated: string;
    micPermissionRequired: string;
    historyCleared: string;
  };
  errors: {
    noInternet: string;
    voicePermission: string;
    unsupportedImage: string;
    emptyInput: string;
    serviceUnavailable: string;
  };
  loading: {
    readingContent: string;
    checkingPatterns: string;
    analyzingContext: string;
    preparingAdvice: string;
    extractingOcr: string;
    listening: string;
    transcribing: string;
  };
}
