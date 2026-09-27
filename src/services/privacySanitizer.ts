export interface SanitizationResult {
  sanitizedText: string;
  hasRedactions: boolean;
  redactedTypes: string[];
}

export const sanitizeSensitiveData = (input: string): SanitizationResult => {
  let text = input;
  const redactedTypes: string[] = [];

  // 1. Redact 4 to 8 digit OTP / PIN occurrences preceded by common labels
  const otpPattern = /(?:otp|pin|one\s*time\s*password|code|cvv|cvc)[\s:=#\-]*([0-9]{3,8})\b/gi;
  if (otpPattern.test(text)) {
    redactedTypes.push("OTP / Security PIN");
    text = text.replace(otpPattern, (match, code) => match.replace(code, "[REDACTED]"));
  }

  // 2. Redact 16 digit card numbers (with or without dashes/spaces)
  const cardPattern = /\b([0-9]{4}[\s\-]*[0-9]{4}[\s\-]*[0-9]{4}[\s\-]*[0-9]{4})\b/g;
  if (cardPattern.test(text)) {
    redactedTypes.push("Payment Card Number");
    text = text.replace(cardPattern, "[CARD NUMBER REDACTED]");
  }

  // 3. Redact explicit passwords if entered as password=...
  const pwdPattern = /(?:password|pwd|passphrase)[\s:=]+([^\s,]+)/gi;
  if (pwdPattern.test(text)) {
    redactedTypes.push("Password string");
    text = text.replace(pwdPattern, (match, val) => match.replace(val, "[PASSWORD REDACTED]"));
  }

  return {
    sanitizedText: text,
    hasRedactions: redactedTypes.length > 0,
    redactedTypes,
  };
};
