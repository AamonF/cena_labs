import type { LegalDocument } from "@/data/types";

/** Canonical “last updated” for Unfumbled legal pages (sync with site deploys). */
export const UNFUMBLED_LEGAL_LAST_UPDATED = "April 20, 2026";

const productLine =
  "These policies apply to Unfumbled and other applications and websites offered by Cena Labs (the “Services”). Cena Labs is operated by an individual based in the United States.";

export const unfumbledTerms: LegalDocument = {
  lastUpdated: UNFUMBLED_LEGAL_LAST_UPDATED,
  sections: [
    {
      heading: "1. Introduction",
      body:
        `Welcome to Cena Labs. These Terms of Service (“Terms”) govern your use of our applications, websites, and services (collectively, the “Services”), including the Unfumbled mobile application.\n\n${productLine}\n\nBy using our Services, you agree to these Terms.`,
    },
    {
      heading: "2. Eligibility",
      body: "You must be at least 18 years old to use our Services.\n\nBy using the Services, you confirm that:",
      bullets: [
        "You are legally capable of entering into a binding agreement",
        "You will comply with all applicable laws",
      ],
    },
    {
      heading: "3. Account requirements",
      body: "To access certain features, you must create an account.\n\nYou agree to:",
      bullets: [
        "Provide accurate information",
        "Keep your login credentials secure",
        "Be responsible for all activity under your account",
      ],
      closing:
        "We reserve the right to suspend or terminate accounts for misuse.",
    },
    {
      heading: "4. Acceptable use",
      body: "You agree NOT to:",
      bullets: [
        "Use the Services for illegal purposes",
        "Harass, threaten, or abuse others",
        "Upload harmful or malicious content",
        "Attempt to reverse engineer or exploit the platform",
      ],
    },
    {
      heading: "5. AI disclaimer",
      body: "Our applications provide AI-generated messaging suggestions. You acknowledge:",
      bullets: [
        "AI responses may be inaccurate or inappropriate",
        "We do NOT guarantee outcomes (including dating or communication success)",
        "You are fully responsible for how you use the information",
      ],
      closing:
        "The Services are provided for informational and entertainment purposes only.",
    },
    {
      heading: "6. Subscriptions & billing",
      body:
        "Some features require a paid subscription.\n\nSubscriptions are billed monthly. Subscriptions automatically renew unless canceled. You can cancel anytime through your app store account.\n\nPayments are handled by third-party providers such as:",
      bullets: ["Apple App Store", "Google Play", "RevenueCat"],
      closing: "We do not directly process payments.",
    },
    {
      heading: "7. User content",
      body:
        "You retain ownership of any content you submit.\n\nBy using the Services, you grant us a limited license to process your content solely to provide functionality.\n\nWe do NOT claim ownership of your personal conversations. Conversations are stored locally on your device; see our Privacy Policy for how data may be processed for AI and account features.",
    },
    {
      heading: "8. Privacy",
      body:
        "Your use of the Services is governed by our Privacy Policy.",
    },
    {
      heading: "9. Termination",
      body: "We may suspend or terminate access at any time if:",
      bullets: ["These Terms are violated", "Misuse or abuse is detected"],
    },
    {
      heading: "10. Disclaimer of warranties",
      body: 'The Services are provided “as is” without warranties of any kind.\n\nWe do not guarantee:',
      bullets: [
        "Accuracy of AI outputs",
        "Continuous availability",
        "Error-free operation",
      ],
    },
    {
      heading: "11. Limitation of liability",
      body: "To the fullest extent permitted by law, Cena Labs is not liable for:",
      bullets: [
        "Indirect or consequential damages",
        "Loss of relationships or opportunities",
        "User decisions based on AI suggestions",
      ],
    },
    {
      heading: "12. Governing law",
      body:
        "These Terms are governed by the laws of the United States, without regard to conflict-of-law rules, except where your jurisdiction’s mandatory consumer protections apply.",
    },
    {
      heading: "13. Changes to Terms",
      body:
        "We may update these Terms at any time. Continued use of the Services constitutes acceptance of the updated Terms.",
    },
  ],
};

export const unfumbledPrivacy: LegalDocument = {
  lastUpdated: UNFUMBLED_LEGAL_LAST_UPDATED,
  sections: [
    {
      heading: "1. Overview",
      body:
        `Cena Labs respects your privacy. This policy explains how we collect, use, and protect your information.\n\n${productLine}\n\nAn account is required to use Unfumbled.`,
    },
    {
      heading: "2. Information we collect",
      body: "Information you provide",
      bullets: [
        "Messages or screenshots you upload",
        "Account information",
        "Support inquiries",
      ],
      secondaryIntro: "Automatically collected",
      secondaryBullets: [
        "Device type",
        "Usage data",
        "IP address (approximate)",
      ],
    },
    {
      heading: "3. Local data storage",
      body:
        "We prioritize user privacy.\n\nConversations are stored locally on your device. We do NOT permanently store personal conversations on our servers. Data may be temporarily processed for AI functionality (for example, when you request an analysis), and account-related data may be processed by our backend and subprocessors as described below.",
    },
    {
      heading: "4. How we use data",
      body: "We use data to:",
      bullets: [
        "Provide core app functionality",
        "Generate AI responses",
        "Improve performance",
        "Prevent abuse",
      ],
    },
    {
      heading: "5. Third-party services",
      body: "We use:",
      bullets: [
        "Supabase (backend and authentication)",
        "OpenAI (AI processing)",
        "RevenueCat (subscriptions)",
      ],
      closing:
        "These services may process data as required to operate the app.",
    },
    {
      heading: "6. Data sharing",
      body:
        "We do NOT sell your data.\n\nWe only share data with necessary service providers to run the Services.",
    },
    {
      heading: "7. Data retention",
      body:
        "We retain data only as long as necessary to provide the Services and meet legal obligations.\n\nYou may request deletion by contacting support@cenalabs.com.",
    },
    {
      heading: "8. Security",
      body:
        "We implement reasonable safeguards but cannot guarantee absolute security.",
    },
    {
      heading: "9. Your rights",
      body: "You may:",
      bullets: [
        "Request access to your data",
        "Request deletion",
        "Contact us with privacy concerns",
      ],
      closing: "Reach us at support@cenalabs.com.",
    },
    {
      heading: "10. Children’s privacy",
      body: "This service is not intended for users under 18.",
    },
    {
      heading: "11. Changes",
      body: "We may update this policy at any time. We will update the “Last updated” date when we do.",
    },
  ],
};

export const unfumbledDisclaimer: LegalDocument = {
  lastUpdated: UNFUMBLED_LEGAL_LAST_UPDATED,
  sections: [
    {
      heading: "AI-generated suggestions",
      body:
        "Cena Labs provides AI-generated suggestions for communication and messaging through Unfumbled.",
    },
    {
      heading: "What to expect",
      body: "These outputs:",
      bullets: [
        "May be inaccurate",
        "May not reflect real-world outcomes",
        "Should not be relied upon as professional advice",
      ],
    },
    {
      heading: "No guarantees",
      body: "We do NOT guarantee:",
      bullets: [
        "Dating success",
        "Relationship outcomes",
        "Communication effectiveness",
      ],
      closing:
        "Users are fully responsible for their actions and decisions.\n\nThis service is provided for informational and entertainment purposes only.",
    },
  ],
};

export const unfumbledCookies: LegalDocument = {
  lastUpdated: UNFUMBLED_LEGAL_LAST_UPDATED,
  sections: [
    {
      heading: "Cookies and similar technologies",
      body: "We use cookies and similar technologies to:",
      bullets: [
        "Improve performance",
        "Analyze usage",
        "Enhance user experience",
      ],
      closing:
        "You can control cookies through your browser settings. Mobile apps may use similar technologies in line with platform rules.",
    },
  ],
};

export const unfumbledAcceptableUse: LegalDocument = {
  lastUpdated: UNFUMBLED_LEGAL_LAST_UPDATED,
  sections: [
    {
      heading: "Acceptable use",
      body: "Users may NOT:",
      bullets: [
        "Upload illegal or explicit content",
        "Harass or abuse others",
        "Attempt to exploit the platform",
      ],
      closing: "Violations may result in account suspension or termination.",
    },
  ],
};

/** Short labels for cross-links in the legal footer */
export const unfumbledLegalRoutes = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/disclaimer", label: "AI Disclaimer" },
  { href: "/contact", label: "Contact" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/acceptable-use", label: "Acceptable Use" },
] as const;
