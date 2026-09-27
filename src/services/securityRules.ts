export interface ThreatRule {
  id: string;
  category: string;
  pattern: RegExp;
  weight: number;
  explanationKey: string;
  defaultExplanation: string;
  suggestedAction: string;
}

export const THREAT_RULES: ThreatRule[] = [
  // 1. Banking & KYC Impersonation
  {
    id: "bank_block_threat",
    category: "kyc",
    pattern: /(?:bank\s*account|sbi|hdfc|icici|axis|pnb|yono)[\s\S]{0,60}(?:block|suspend|deactivat|freeze|hold|terminat)/i,
    weight: 35,
    explanationKey: "rule_bank_block",
    defaultExplanation: "Threatens immediate bank account suspension or blocking, a classic psychological coercion tactic.",
    suggestedAction: "Do NOT click the link. Real banks never ask to update KYC via SMS links.",
  },
  {
    id: "kyc_urgency",
    category: "kyc",
    pattern: /(?:kyc|pan|aadhaar)[\s\S]{0,50}(?:expire|update|mandat|link|verif|penalt)/i,
    weight: 30,
    explanationKey: "rule_kyc_urgency",
    defaultExplanation: "Demands immediate KYC / PAN / Aadhaar linking to avoid penalties or account deactivation.",
    suggestedAction: "Visit your local bank branch or use the official mobile app to verify your KYC status.",
  },
  {
    id: "electricity_disconnection",
    category: "socialEng",
    pattern: /(?:electricity|power|bill\s*officer)[\s\S]{0,60}(?:disconnect|tonight|9:30|cutoff|unpaid)/i,
    weight: 40,
    explanationKey: "rule_electricity_disconnection",
    defaultExplanation: "Threatens electricity power cut tonight due to unpaid bill—a widespread extortion scam in India.",
    suggestedAction: "Do not call the phone number provided. Check bill status on your official electricity discom portal.",
  },
  // 2. Work from Home & Part-time Job
  {
    id: "job_earn_task",
    category: "job",
    pattern: /(?:work\s*from\s*home|part\s*time|daily\s*income|earn\s*(?:rs\.?|inr|₹)?\s*[0-9]{3,6}|youtube\s*like|telegram\s*task)/i,
    weight: 35,
    explanationKey: "rule_job_earn",
    defaultExplanation: "Offers unrealistic guaranteed daily earnings (₹2,000–₹10,000) for simple tasks like liking videos.",
    suggestedAction: "Legitimate employers never ask for advance security deposits or registration fees for jobs.",
  },
  {
    id: "job_fee_deposit",
    category: "job",
    pattern: /(?:registration\s*fee|security\s*deposit|processing\s*charge|activation\s*fee)[\s\S]{0,30}(?:rs\.?|inr|₹|[0-9]+)/i,
    weight: 40,
    explanationKey: "rule_job_fee",
    defaultExplanation: "Demands upfront payment or registration fee under the guise of an employment processing charge.",
    suggestedAction: "Never pay money to secure a job. Cease all communication immediately.",
  },
  // 3. Courier & Delivery Scams
  {
    id: "courier_address_fee",
    category: "delivery",
    pattern: /(?:india\s*post|courier|parcel|delivery|fedex|bluedart)[\s\S]{0,60}(?:incomplete\s*address|undelivered|hold|pay\s*(?:rs|₹)?[0-9]+|update\s*address)/i,
    weight: 35,
    explanationKey: "rule_courier_fee",
    defaultExplanation: "Claims parcel delivery failed due to incorrect address and requests a small update fee (₹10–₹50).",
    suggestedAction: "Do not click the address update link. India Post never sends SMS links demanding card details.",
  },
  // 4. Lottery & Prize Scams
  {
    id: "lottery_winner",
    category: "lottery",
    pattern: /(?:lottery|kbc|kaun\s*banega|congratulations|you\s*have\s*won|prize\s*money|lucky\s*winner)[\s\S]{0,50}(?:lakh|crore|₹|[0-9]{5,})/i,
    weight: 45,
    explanationKey: "rule_lottery_prize",
    defaultExplanation: "Fabricated prize or lottery winning notification asking you to claim millions of rupees.",
    suggestedAction: "You cannot win a lottery you never bought a ticket for. Delete and report as spam.",
  },
  // 5. Credential Harvesting & Remote Access
  {
    id: "otp_harvesting",
    category: "phishing",
    pattern: /(?:share|enter|send|provide|give)[\s\S]{0,30}(?:otp|pin|cvv|password|passcode)/i,
    weight: 45,
    explanationKey: "rule_otp_harvesting",
    defaultExplanation: "Directly solicits authentication credentials (OTP, PIN, CVV, or passwords).",
    suggestedAction: "NEVER share OTP with anyone under any circumstances. Bank staff will never ask for your OTP.",
  },
  {
    id: "remote_app_installation",
    category: "takeover",
    pattern: /(?:download|install)[\s\S]{0,40}(?:anydesk|quicksupport|teamviewer|rustdesk|\.apk)/i,
    weight: 50,
    explanationKey: "rule_remote_app",
    defaultExplanation: "Instructs installation of remote screen-sharing tools (AnyDesk/QuickSupport) or unauthorized APK files.",
    suggestedAction: "Installing this grants criminals complete control over your mobile device and banking apps. Do NOT install.",
  },
  // 6. Suspicious Shortened URLs & Fake Domains
  {
    id: "suspicious_domain_patterns",
    category: "phishing",
    pattern: /(?:https?:\/\/)?([a-zA-Z0-9-]+\.(?:top|xyz|club|live|info|icu|pw|vip|buzz|online|site|app|cc|link|tk|ml|ga|cf|gq))\b/i,
    weight: 25,
    explanationKey: "rule_suspicious_domain",
    defaultExplanation: "Contains an untrusted or suspicious top-level domain frequently utilized in automated phishing campaigns.",
    suggestedAction: "Avoid clicking links ending in non-standard domains (.top, .xyz, .site, .link).",
  },
  // 7. Extreme Urgency & Intimidation
  {
    id: "extreme_urgency",
    category: "socialEng",
    pattern: /(?:within\s*(?:10|15|30|60)\s*mins?|immediately|last\s*warning|fir\s*registered|police\s*action|legal\s*warrant|cbi|ed|customs\s*officer)/i,
    weight: 35,
    explanationKey: "rule_urgency_intimidation",
    defaultExplanation: "Employs high-pressure deadlines, threats of legal action, police warrants, or immediate financial seizure.",
    suggestedAction: "Law enforcement authorities and banks do not issue legal threats or arrest warrants via WhatsApp or SMS.",
  },
];
