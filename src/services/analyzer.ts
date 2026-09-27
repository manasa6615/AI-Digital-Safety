import { sanitizeSensitiveData, SanitizationResult } from './privacySanitizer';
import { THREAT_RULES } from './securityRules';
import { SupportedLanguage } from '../locales';

export interface TimelineStep {
  stepNumber: string;
  title: string;
  description: string;
  detectedQuote?: string;
}

export interface FlaggedEvidence {
  quote: string;
  reason: string;
}

export interface PersonalizedActionPlan {
  receivedOnly: string[];
  clickedLink: string[];
  enteredCredentials: string[];
  sentMoney: string[];
  whatNotToDo: string[];
  safeResponse: string;
  verificationGuidance: string;
}

export interface AnalysisReport {
  id: string;
  timestamp: string;
  inputType: 'message' | 'screenshot' | 'url' | 'conversation' | 'voice' | 'email';
  sanitization: SanitizationResult;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW' | 'SAFE';
  riskScore: number;
  categoryKey: string;
  summary: string;
  flaggedEvidence: FlaggedEvidence[];
  timeline?: TimelineStep[];
  actionPlan: PersonalizedActionPlan;
  detectedUrls: string[];
  familyModeAdvice: {
    alertLevel: 'HIGH' | 'MEDIUM' | 'LOW';
    mainRule: string;
    rules: string[];
  };
}

export const analyzeContent = (
  rawInput: string,
  inputType: 'message' | 'screenshot' | 'url' | 'conversation' | 'voice' | 'email' = 'message',
  _lang: SupportedLanguage = 'en'
): AnalysisReport => {
  const sanitization = sanitizeSensitiveData(rawInput);
  const text = sanitization.sanitizedText;

  // Extract detected URLs
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(?:com|org|in|top|xyz|club|live|info|icu|pw|vip|buzz|online|site|app|cc|link|tk|ml)\b[^\s]*)/gi;
  const detectedUrls = Array.from(new Set(text.match(urlRegex) || []));

  let totalScore = 0;
  const matchedRules: typeof THREAT_RULES = [];
  const flaggedEvidence: FlaggedEvidence[] = [];

  // Evaluate Threat Rules
  for (const rule of THREAT_RULES) {
    const match = text.match(rule.pattern);
    if (match) {
      matchedRules.push(rule);
      totalScore += rule.weight;
      flaggedEvidence.push({
        quote: match[0].length > 80 ? match[0].substring(0, 80) + '...' : match[0],
        reason: rule.defaultExplanation,
      });
    }
  }

  // Evaluate URL specifics if URLs are found
  for (const url of detectedUrls) {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('.top') || lowerUrl.includes('.xyz') || lowerUrl.includes('.club') || lowerUrl.includes('.buzz') || lowerUrl.includes('.icu') || lowerUrl.includes('.tk')) {
      totalScore += 25;
      flaggedEvidence.push({
        quote: url,
        reason: "Suspicious or disposable top-level domain frequently used in automated phishing infrastructure.",
      });
    }
    if (lowerUrl.includes('sbi') || lowerUrl.includes('hdfc') || lowerUrl.includes('icici') || lowerUrl.includes('axis') || lowerUrl.includes('bank')) {
      if (!lowerUrl.includes('onlinesbi.sbi') && !lowerUrl.includes('hdfcbank.com') && !lowerUrl.includes('icicibank.com') && !lowerUrl.includes('axisbank.com')) {
        totalScore += 35;
        flaggedEvidence.push({
          quote: url,
          reason: "Lookalike banking domain detected. It is NOT the official portal of the claimed financial institution.",
        });
      }
    }
    if (lowerUrl.includes('bit.ly') || lowerUrl.includes('tinyurl') || lowerUrl.includes('is.gd') || lowerUrl.includes('t.me')) {
      totalScore += 15;
      flaggedEvidence.push({
        quote: url,
        reason: "Shortened or masked URL that conceals the true destination server.",
      });
    }
  }

  // Redacted credentials check
  if (sanitization.hasRedactions) {
    totalScore += 20;
    flaggedEvidence.push({
      quote: sanitization.redactedTypes.join(', '),
      reason: "Message contains authentication credentials or payment card figures which should never be shared.",
    });
  }

  // Check for conversation format
  const isConversation = inputType === 'conversation' || /(?:caller|sender|user|me|agent|officer)[\s]*:/i.test(text);
  let timeline: TimelineStep[] | undefined = undefined;

  if (isConversation) {
    timeline = [
      {
        stepNumber: "01",
        title: "Impersonation",
        description: "Sender initiates contact posing as an authoritative entity (Bank Manager, Police, Electricity Board, Courier Officer).",
      },
      {
        stepNumber: "02",
        title: "Trust Building",
        description: "Employs reference numbers, employee badges, or formal corporate phrasing to feign legitimacy.",
      },
      {
        stepNumber: "03",
        title: "Fear & Crisis",
        description: "Creates sudden apprehension: account suspension, pending police FIR, electricity disconnection tonight, or legal fine.",
      },
      {
        stepNumber: "04",
        title: "Urgency / Deadline",
        description: "Imposes an impossible deadline ('do this within 30 minutes') to prevent calm consultation or independent verification.",
      },
      {
        stepNumber: "05",
        title: "Credential Solicitation",
        description: "Prompts you to disclose OTP, debit card numbers, UPI PIN, or download a screen-mirroring tool (AnyDesk/APK).",
      },
      {
        stepNumber: "06",
        title: "Unauthorized Action",
        description: "Facilitates unapproved fund transfers or complete device compromise under the guise of 'verification'.",
      },
    ];
  }

  // Normalize score between 0 and 99 (never 100% scam or 100% safe)
  let normalizedScore = Math.min(Math.max(totalScore, 5), 96);
  if (flaggedEvidence.length === 0 && detectedUrls.length === 0) {
    normalizedScore = 12;
  }

  // Determine Risk Level
  let riskLevel: 'HIGH' | 'MEDIUM' | 'LOW' | 'SAFE' = 'LOW';
  if (normalizedScore >= 60) {
    riskLevel = 'HIGH';
  } else if (normalizedScore >= 35) {
    riskLevel = 'MEDIUM';
  } else if (normalizedScore <= 15 && flaggedEvidence.length === 0) {
    riskLevel = 'SAFE';
  }

  // Determine Primary Category
  let categoryKey = 'banking';
  if (matchedRules.length > 0) {
    categoryKey = matchedRules[0].category;
  } else if (detectedUrls.length > 0) {
    categoryKey = 'phishing';
  }

  // Build Structured Action Plan
  const actionPlan: PersonalizedActionPlan = {
    receivedOnly: [
      "Do NOT click any embedded links or phone numbers inside the communication.",
      "Do NOT reply to the sender; replying signals to scammers that your phone number is active.",
      "Block the sender's phone number or report the email as phishing in your mail provider.",
      "Verify independently using official bank contact details or branch visits.",
    ],
    clickedLink: [
      "Immediately close the browser window or tab.",
      "Do NOT fill in any personal details, passwords, debit card numbers, or OTPs.",
      "Clear your browser cache and cookies for the past hour.",
      "If any file was downloaded (such as an .apk file), delete it immediately from your device's Downloads folder without opening it.",
    ],
    enteredCredentials: [
      "Immediately log into your bank's official mobile banking app and change your internet banking password and UPI PIN.",
      "Call your bank's official 24x7 toll-free customer helpline to temporarily lock your debit card and online transactions.",
      "Enable Multi-Factor Authentication (MFA) or biometric lock on your accounts.",
      "Keep an eye on account transaction statements for any unauthorized deductions.",
    ],
    sentMoney: [
      "Call the National Cyber Crime Helpline immediately at 1930 (Government of India) to freeze the fraudulent transaction before money is withdrawn.",
      "File a formal digital fraud complaint at https://cybercrime.gov.in with screenshots and transaction UTR numbers.",
      "Notify your bank branch manager immediately to initiate an inter-bank recall request for the fraudulent transaction.",
      "Save all SMS, chat logs, call recordings, and payment screenshots as legal evidence.",
    ],
    whatNotToDo: [
      "NEVER share an OTP, UPI PIN, ATM PIN, or card CVV with anyone—banks NEVER ask for these.",
      "Never install remote screen-sharing tools like AnyDesk, QuickSupport, or TeamViewer when instructed by an unknown caller.",
      "Never pay 'advance processing fees' or 'security deposits' to receive a prize or get a job.",
      "Never approve collect requests or scan unknown QR codes to 'receive' money—scanning a QR code or entering a PIN only SENDS money.",
    ],
    safeResponse: riskLevel === 'HIGH' 
      ? "I will verify this communication directly with the official customer care helpline and my local bank branch. Please do not contact me further."
      : "Thank you for the update. I will inspect my account status via the official portal directly.",
    verificationGuidance: "Always confirm transactions or notices through official channels: Check your passbook or statement on the official banking app, visit your nearest physical branch, or call the verified toll-free number printed on the back of your debit card.",
  };

  // Build Family Mode Advice
  const familyModeAdvice = {
    alertLevel: riskLevel === 'HIGH' ? ('HIGH' as const) : riskLevel === 'MEDIUM' ? ('MEDIUM' as const) : ('LOW' as const),
    mainRule: riskLevel === 'HIGH' 
      ? "Stop! Do not touch any links or send money. This message is very likely a fake trick."
      : "Be cautious. Check with a trusted family member or the official bank app before clicking anything.",
    rules: [
      "Do NOT click any web link inside this message.",
      "Do NOT give your OTP, PIN, or bank password to anyone.",
      "Do NOT send money or UPI payments to this person.",
      "Check directly with your bank branch or ask a family member.",
    ],
  };

  return {
    id: 'scan-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' }),
    inputType,
    sanitization,
    riskLevel,
    riskScore: normalizedScore,
    categoryKey,
    summary: riskLevel === 'HIGH'
      ? "High probability of deceptive coercion or credential harvesting. The message displays characteristic patterns of unauthorized impersonation."
      : riskLevel === 'MEDIUM'
      ? "Moderate risk signals detected. Communication contains external links or promotional claims requiring independent verification."
      : "No obvious threat indicators detected. The content adheres to standard transaction or conversational phrasing, but remain vigilant.",
    flaggedEvidence: flaggedEvidence.length > 0 ? flaggedEvidence : [
      {
        quote: "Standard messaging format",
        reason: "No high-risk keywords, deceptive urgency, or unauthorized link patterns were detected.",
      }
    ],
    timeline,
    actionPlan,
    detectedUrls,
    familyModeAdvice,
  };
};
