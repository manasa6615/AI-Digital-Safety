import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, AlertTriangle, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

export const KnowledgeBase: React.FC = () => {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>('banking');

  const scamLibrary = [
    {
      id: 'banking',
      title: t.categories.banking,
      pattern: "Scammers pose as State Bank of India, HDFC, ICICI, or Axis bank officials claiming that your account will be suspended, debit card blocked, or unauthorized transactions have occurred.",
      warningSigns: [
        "Unsolicited calls claiming your account will be blocked within 30 minutes to 2 hours.",
        "Requesting you to read out the 6-digit OTP received on your mobile.",
        "Sending SMS containing links with non-bank domains (.top, .xyz, .site).",
      ],
      mitigation: "Never disclose OTPs or passwords over the phone. Real bank employees will NEVER ask for your OTP. Verify transactions directly through the official mobile banking application.",
      simulatedExample: "Dear Customer, your Bank Account ending XX8910 will be blocked today. Click here to verify your KYC details: http://sbi-kyc-verify-example.com/login",
    },
    {
      id: 'kyc',
      title: t.categories.kyc,
      pattern: "Fraudsters send automated SMS warnings stating that PAN card linking or electricity bill payment is overdue, and power or banking access will be disconnected tonight at 9:30 PM.",
      warningSigns: [
        "Mention of specific deadlines (e.g., 'tonight at 9:30 PM').",
        "Instructing you to call an unofficial mobile number instead of standard toll-free numbers.",
        "Demanding immediate UPI transfer of a token fee (₹10–₹50) to verify account.",
      ],
      mitigation: "Official electricity boards and banks never disconnect services based on SMS threats with personal mobile contact numbers. Check bill status on your state discom portal.",
      simulatedExample: "Electricity Alert: Dear consumer, your electricity power will be disconnected tonight at 9:30 PM from electricity office. Please call officer Sharma on 9876543210 immediately.",
    },
    {
      id: 'job',
      title: t.categories.job,
      pattern: "Criminals reach out via WhatsApp or Telegram offering part-time work-from-home jobs liking YouTube videos, rating Google Maps locations, or merchant rating tasks with promises of ₹2,000–₹8,000 daily.",
      warningSigns: [
        "Small initial payout (₹150–₹500) to gain your psychological trust.",
        "Adding you to a Telegram group with fake screenshots of massive earnings.",
        "Demanding a 'security deposit' or 'recharge fee' (₹2,000 to ₹50,000) for VIP tasks.",
      ],
      mitigation: "Legitimate corporations never ask job applicants to pay money to receive wages. Discontinue chat and do not send money.",
      simulatedExample: "Amazon & YouTube Part-Time Hiring: Earn Rs. 3,500 daily by liking 5 videos. Initial test payout Rs. 150 credited. Contact Telegram HR @JobManager_Official to register.",
    },
    {
      id: 'delivery',
      title: t.categories.delivery,
      pattern: "Impersonators send text messages purporting to be India Post, Blue Dart, or FedEx stating that your package cannot be delivered because the street address is incomplete.",
      warningSigns: [
        "SMS comes from an ordinary 10-digit mobile number rather than an official header (like VK-INDPOST).",
        "Link directs to a fake web portal demanding credit/debit card details for a ₹25 address fee.",
        "Once card details and OTP are entered, large unauthorized amounts are debited.",
      ],
      mitigation: "India Post does not send SMS links requesting card details to update address information. Verify tracking numbers on indiapost.gov.in.",
      simulatedExample: "India Post: Your package #IN-849201 could not be delivered due to incomplete house number. Please update address & pay Rs. 25 fee: http://delivery-update-example.com/track",
    },
    {
      id: 'lottery',
      title: t.categories.lottery,
      pattern: "Victims receive audio messages or certificates on WhatsApp claiming their mobile SIM card won ₹25 Lakhs or a luxury car in Kaun Banega Crorepati (KBC) lucky draw.",
      warningSigns: [
        "Unsolicited notification for a lottery or contest you never entered.",
        "Demanding advance payments for 'processing tax', 'GST', or 'currency clearance'.",
        "Audio messages featuring fake images of celebrity hosts.",
      ],
      mitigation: "You cannot win a lottery or prize for a competition you did not buy a ticket for. Government lotteries do not operate over WhatsApp voice notes.",
      simulatedExample: "KBC All India SIM Card Lucky Draw Winner: Congratulations sir, your number won Rs. 25,00,000. Send bank details and pay Rs. 12,500 tax to claim check.",
    },
    {
      id: 'takeover',
      title: t.categories.takeover,
      pattern: "Scammers instruct victims to download remote screen-sharing applications (AnyDesk, QuickSupport, TeamViewer, RustDesk) or unauthorized Android APK files to solve a customer service complaint.",
      warningSigns: [
        "Caller asks you to read out a 9-digit code generated by AnyDesk or TeamViewer.",
        "Sending an APK file over WhatsApp claiming it is an official bank update.",
        "Asking you to open your mobile banking app while screen sharing is active.",
      ],
      mitigation: "Never install remote access tools on instructions from an unknown caller. Installing these apps grants the attacker complete remote control over your phone and OTP notifications.",
      simulatedExample: "Customer Care: To complete your KYC verification, please install Bank_Support.apk from WhatsApp and open your mobile banking app.",
    },
  ];

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '24px 20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen style={{ color: 'var(--accent-cyan)' }} size={24} />
          <span>{t.knowledgeBase.title}</span>
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          {t.knowledgeBase.subtitle}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {scamLibrary.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                transition: 'var(--transition-fast)',
              }}
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                style={{
                  padding: '18px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {item.title}
                  </div>
                  <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'var(--accent-cyan-subtle)', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                    {t.knowledgeBase.simulatedTag}
                  </span>
                </div>
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>

              {isExpanded && (
                <div style={{ padding: '0 24px 24px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '4px' }}>
                      {t.knowledgeBase.patternLabel}:
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {item.pattern}
                    </div>
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--risk-med-text)', marginBottom: '6px' }}>
                      {t.knowledgeBase.warningSignsLabel}:
                    </div>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {item.warningSigns.map((w, idx) => (
                        <li key={idx}>{w}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginBottom: '14px', background: 'var(--bg-surface)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Simulated Threat Sample:
                    </div>
                    <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: '#f87171' }}>
                      "{item.simulatedExample}"
                    </div>
                  </div>

                  <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--risk-safe-border)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--risk-safe-text)', marginBottom: '2px' }}>
                      {t.knowledgeBase.mitigationLabel}:
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                      {item.mitigation}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
