export interface DemoScenario {
  id: string;
  titleKey: string;
  defaultTitle: string;
  category: string;
  type: 'message' | 'url' | 'conversation' | 'screenshot' | 'email';
  content: string;
  sampleImageUrl?: string;
  description: string;
}

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "sbi_kyc_block",
    titleKey: "sbi_kyc_title",
    defaultTitle: "SBI KYC Account Block SMS",
    category: "kyc",
    type: "message",
    description: "Fake banking SMS threatening immediate account block unless KYC link is clicked within 24 hours.",
    content: "Dear SBI Customer, your YONO account will be blocked today within 24 hours due to pending KYC verification. Please click immediately to update your PAN & Aadhaar details: http://sbi-kyc-update-example.com/login",
  },
  {
    id: "job_wfh_scam",
    titleKey: "job_wfh_title",
    defaultTitle: "Work-From-Home YouTube Like Scam",
    category: "job",
    type: "message",
    description: "Fake job offer promising ₹3,500 daily for liking YouTube videos, later demanding registration fees.",
    content: "Congratulations! You have been shortlisted for Amazon & YouTube part-time online rating job. Earn Rs. 2,500 to Rs. 8,000 daily from home. Simple task: like 3 videos. Contact our HR manager on Telegram @EarnDaily_HR to pay initial registration deposit of Rs. 499 and start immediately.",
  },
  {
    id: "courier_delivery_scam",
    titleKey: "courier_delivery_title",
    defaultTitle: "India Post Parcel Address Fee",
    category: "delivery",
    type: "message",
    description: "Fake parcel update alert claiming package is held due to incomplete address and asking for ₹25 payment.",
    content: "India Post Alert: Your parcel package #IN84920491 cannot be delivered due to missing house number in your address. Your parcel is on hold. Please update correct address and pay Rs. 25 re-delivery fee within 12 hours: http://delivery-update-example.com/track",
  },
  {
    id: "lottery_prize_scam",
    titleKey: "lottery_prize_title",
    defaultTitle: "KBC ₹25 Lakh WhatsApp Lottery",
    category: "lottery",
    type: "message",
    description: "WhatsApp message claiming lucky draw winner of ₹25 Lakhs, requesting bank processing fees.",
    content: "KBC Kaun Banega Crorepati Lucky Draw Winner! Congratulations sir, your SIM card mobile number has won Rs. 25,00,000 in All India Sim Card Lucky Draw. To claim your prize money, send your bank account details and deposit Rs. 12,500 government tax fee to Bank Manager Sharma Ji.",
  },
  {
    id: "phishing_email_alert",
    titleKey: "phishing_email_title",
    defaultTitle: "HDFC NetBanking Security Phishing Email",
    category: "phishing",
    type: "email",
    description: "Spoofed bank security email claiming unauthorized login attempt and prompting credential entry.",
    content: "From: security-alert@hdfc-netbanking-verify.club\nSubject: CRITICAL: Unauthorized login attempt detected on your NetBanking\n\nDear Customer,\n\nWe detected an unauthorized sign-in to your HDFC NetBanking account from an unknown IP address in Moscow. As a precaution, your access has been locked.\n\nTo restore your account and verify your identity, visit the link below and confirm your Customer ID, NetBanking Password, and OTP:\nhttps://hdfc-security-verify-portal.xyz/restore\n\nIf you do not complete this within 2 hours, your debit card will be permanently disabled.",
  },
  {
    id: "legitimate_sms",
    titleKey: "legitimate_sms_title",
    defaultTitle: "Legitimate Swiggy Transaction Debit SMS",
    category: "banking",
    type: "message",
    description: "Actual, legitimate bank debit notification without deceptive links, urgency, or credential requests.",
    content: "Dear Customer, your Bank Account ending XX4912 has been debited by Rs. 450.00 on 17-Sep-26 at Swiggy UPI. Available balance: Rs. 14,230.50. If this transaction was not authorized by you, please call our 24x7 helpline 1800112211 or SMS BLOCK UPI to 567676.",
  },
  {
    id: "conversation_job_flow",
    titleKey: "conversation_job_title",
    defaultTitle: "Full Scam Dialogue Sequence (Job/KYC)",
    category: "conversation",
    type: "conversation",
    description: "Complete multi-turn conversation showing the 6-phase scam progression from greeting to extortion.",
    content: "Sender: Hello, I am Priya Sharma from Global Marketing Solutions HR department.\nUser: Hello, who is this?\nSender: We saw your resume on LinkedIn. We have a part-time job where you can earn ₹3,000 per day by rating hotels.\nUser: Sounds interesting, what do I need to do?\nSender: Excellent. First 3 tasks are free. We just paid you ₹150 for test task, correct?\nUser: Yes, I received ₹150.\nSender: Great! Now for the VIP Task with ₹10,000 payout, you must recharge your account with a ₹2,000 security deposit. Click here: http://vip-task-portal.top\nUser: Why do I have to pay to work?\nSender: Sir, this is mandatory security deposit. If you do not pay in 15 minutes, your earnings will be cancelled and legal notice will be issued to your address.",
  },
];
