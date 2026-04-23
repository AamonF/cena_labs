import type { LegalDocument } from "@/data/types";

/** Canonical "last updated" for Unfumbled privacy and shared legal copy. */
export const UNFUMBLED_LEGAL_LAST_UPDATED = "April 20, 2026";

/** Terms of Service effective date. */
export const UNFUMBLED_TERMS_LAST_UPDATED = "April 23, 2026";

/** Privacy Policy effective date. */
export const UNFUMBLED_PRIVACY_LAST_UPDATED = "April 23, 2026";

/** AI Disclaimer effective date. */
export const UNFUMBLED_DISCLAIMER_LAST_UPDATED = "April 23, 2026";

const productLine =
  `These policies apply to Unfumbled and other applications and websites offered by Cena Labs (the "Services"). Cena Labs is operated by an individual based in the United States.`;

/* -----------------------------------------------------------------
   TERMS OF SERVICE
------------------------------------------------------------------ */

export const unfumbledTerms: LegalDocument = {
  lastUpdated: UNFUMBLED_TERMS_LAST_UPDATED,
  sections: [
    {
      heading: "1. Agreement",
      body: `These Terms govern your use of Unfumbled and services provided by Cena Labs ("we," "us," or "our"). By using the Services, you agree to these Terms.`,
    },
    {
      heading: "2. Eligibility",
      body: "You must be at least 16 years old to use the Services.",
    },
    {
      heading: "3. Accounts",
      body: "You are responsible for maintaining your account credentials and all activity under your account.",
    },
    {
      heading: "4. Subscriptions",
      body: "Unfumbled offers auto-renewing subscriptions.",
      bullets: [
        "Payment is charged to your Apple ID at confirmation of purchase",
        "Subscriptions automatically renew unless canceled at least 24 hours before the end of the billing period",
        "You can manage or cancel subscriptions in your Apple ID settings",
      ],
    },
    {
      heading: "5. AI Processing and User Content",
      body: `You may submit conversation text, screenshots, and related content ("User Content").\n\nBy using AI-powered features, you acknowledge and agree that:`,
      bullets: [
        "Your User Content is transmitted securely to our backend and to third-party AI providers (including OpenAI)",
        "This processing is required to generate analysis and reply suggestions",
        "OpenAI processes data on our behalf and does not use it to train models via API usage",
      ],
      closing: "You retain ownership of your content.",
    },
    {
      heading: "6. Acceptable Use",
      body: "You agree not to use the Services to:",
      bullets: [
        "Harass, manipulate, or harm others",
        "Violate any laws",
        "Misrepresent your identity",
      ],
    },
    {
      heading: "7. AI Disclaimer",
      body: "AI-generated outputs may be inaccurate, incomplete, or inappropriate. You are responsible for all actions taken based on these outputs.",
    },
    {
      heading: "8. No Guarantee of Outcomes",
      body: "We do not guarantee results such as replies, relationships, or improved communication outcomes.",
    },
    {
      heading: "9. Account Deletion",
      body: "You may delete your account at any time within the app via Settings.\n\nAccount deletion will permanently remove your account and associated data as described in our Privacy Policy.",
    },
    {
      heading: "10. Termination",
      body: "We may suspend or terminate your account at any time for violations of these Terms.",
    },
    {
      heading: "11. Disclaimer of Warranties",
      body: `The Services are provided "as is" without warranties of any kind.`,
    },
    {
      heading: "12. Limitation of Liability",
      body: "To the maximum extent permitted by law, we are not liable for indirect or consequential damages.",
    },
    {
      heading: "13. Changes",
      body: "We may update these Terms at any time.",
    },
    {
      heading: "14. Contact",
      body: "support@cenalabs.com",
    },
  ],
};

/* -----------------------------------------------------------------
   PRIVACY POLICY
------------------------------------------------------------------ */

export const unfumbledPrivacy: LegalDocument = {
  lastUpdated: UNFUMBLED_PRIVACY_LAST_UPDATED,
  sections: [
    {
      heading: "1. Overview",
      body: "This Privacy Policy explains what data we collect, how we use it, and your rights.",
    },
    {
      heading: "2. Information We Collect",
      body: "Information you provide",
      bullets: [
        "Email and account credentials",
        "Conversation text and screenshots",
        "Saved analyses",
      ],
      secondaryIntro: "Automatically collected",
      secondaryBullets: [
        "Device information",
        "Usage data",
        "Crash logs",
      ],
    },
    {
      heading: "3. AI Data Processing and Consent",
      body: "When you use AI-powered features such as conversation analysis or reply generation:",
      bullets: [
        "Your conversation text and extracted screenshot content are transmitted securely to our backend and to OpenAI",
        "This data is used solely to generate analysis and suggestions",
      ],
      closing:
        "Before using these features, you will be shown an in-app disclosure and asked to provide consent.\n\nYou may decline or withdraw consent at any time. If you do, AI features will not function.",
    },
    {
      heading: "4. How We Use Data",
      body: "We use your data to:",
      bullets: [
        "Provide app functionality",
        "Generate AI analysis and replies",
        "Improve performance and stability",
      ],
      closing:
        "We do NOT sell your data.\n\nWe only process AI-related data after obtaining your consent.",
    },
    {
      heading: "5. Third-Party Services",
      body: "We use:",
      bullets: [
        "Supabase — authentication and storage",
        "OpenAI — AI processing",
        "RevenueCat — subscription management",
        "Apple — payments and distribution",
      ],
      closing:
        "OpenAI processes data solely on our behalf and does not train on your data via API usage.",
    },
    {
      heading: "6. Data Storage",
      bullets: [
        "Conversations are processed transiently for AI",
        "Saved data is stored locally and/or in your account",
        "We do not permanently store raw conversation inputs unless you choose to save results",
      ],
    },
    {
      heading: "7. Data Retention",
      body: "We retain data only as long as necessary:",
      bullets: [
        "Account data — until deletion",
        "Saved analyses — until deleted",
        "Logs — limited duration",
      ],
    },
    {
      heading: "8. Account Deletion",
      body: "You may delete your account at any time directly within the app.",
      bullets: [
        "Go to Settings",
        "Tap “Delete Account”",
        "Confirm deletion",
      ],
      closing:
        "When you delete your account, your account is permanently removed, associated data is deleted from our systems, and access to saved content is lost.\n\nIf you cannot access the app, you may contact support@cenalabs.com.",
    },
    {
      heading: "9. Your Rights",
      body: "You may:",
      bullets: [
        "Access your data",
        "Request correction",
        "Request deletion",
        "Withdraw consent",
      ],
    },
    {
      heading: "10. Security",
      body: "We use industry-standard security measures including encryption and access controls.",
    },
    {
      heading: "11. Children",
      body: "The app is not intended for users under 16.",
    },
    {
      heading: "12. Changes",
      body: "We may update this policy at any time.",
    },
    {
      heading: "13. Contact",
      body: "support@cenalabs.com",
    },
  ],
};

/* -----------------------------------------------------------------
   AI DISCLAIMER
------------------------------------------------------------------ */

export const unfumbledDisclaimer: LegalDocument = {
  lastUpdated: UNFUMBLED_DISCLAIMER_LAST_UPDATED,
  sections: [
    {
      heading: "Informational and entertainment use",
      body: "Unfumbled provides AI-generated insights and suggestions for informational and entertainment purposes only.\n\nAI outputs:",
      bullets: [
        "May be inaccurate or incomplete",
        "Do not reflect real intentions or emotions",
        "Should not be relied on as professional advice",
      ],
      closing:
        "You are responsible for all actions taken based on AI-generated suggestions.",
    },
    {
      heading: "No guarantee",
      body: "We do not guarantee:",
      bullets: [
        "Replies from others",
        "Improved relationships",
        "Any specific outcome",
      ],
      closing: "Use your own judgment at all times.",
    },
  ],
};

/* -----------------------------------------------------------------
   COOKIE POLICY
------------------------------------------------------------------ */

export const unfumbledCookies: LegalDocument = {
  lastUpdated: UNFUMBLED_LEGAL_LAST_UPDATED,
  sections: [
    {
      heading: "1. What Cookies and Similar Technologies Are",
      body: "Cookies are small text files stored on your device when you visit a website. They allow websites to remember information about your visit, such as your preferences and session state.\n\nSimilar technologies include local storage, session storage, and device identifiers used in mobile apps that serve similar purposes to cookies but operate differently at a technical level.\n\nThis policy applies to cenalabs.com and any web-based interfaces operated by Cena Labs, as well as analogous technologies used in the Unfumbled mobile app.",
    },
    {
      heading: "2. Essential and Functional Technologies",
      body: "Some technologies are strictly necessary for the Services to function. These cannot be disabled without breaking core functionality. They include:",
      bullets: [
        "Authentication session tokens -- allow you to remain logged in to your account across pages and sessions",
        "Security tokens -- protect against cross-site request forgery (CSRF) and similar attacks",
        "Supabase session storage -- maintains your active session with our backend",
        "App state storage -- remembers your local app preferences and cached results on your device",
      ],
      closing:
        "Because these are essential to the operation of the Services, they do not require your consent under most regulatory frameworks.",
    },
    {
      heading: "3. Analytics and Performance",
      body: "We may use analytics technologies to understand how users interact with the Services. This helps us identify bugs, measure feature adoption, and make the product better. Analytics data is collected in aggregate and de-identified form where possible.\n\nCurrently, Cena Labs uses limited internal analytics. If we introduce third-party analytics (such as Vercel Analytics, PostHog, or similar), we will update this policy to reflect that.",
      bullets: [
        "Page or screen views -- which parts of the app or website are visited most",
        "Session duration -- how long users engage with key features",
        "Crash and error reports -- to identify and fix technical issues",
        "Feature usage -- which analysis features are used most frequently",
      ],
      closing:
        "We do not use analytics to build advertising profiles or sell data to third parties.",
    },
    {
      heading: "4. Preference and Session Technologies",
      body: "We use preference storage to remember settings you have configured so you do not need to reconfigure them each session. Examples include:",
      bullets: [
        "UI preferences (such as display settings)",
        "Last-used analysis options",
        "Cached analysis results stored locally for faster re-access",
      ],
    },
    {
      heading: "5. Mobile App Technologies",
      body: "The Unfumbled mobile app (iOS) uses device-side storage technologies rather than browser cookies. These include:",
      bullets: [
        "AsyncStorage / SecureStore -- stores your authentication token and local app preferences securely on your device",
        "Local file-based storage -- saves conversation analyses you choose to keep",
        "RevenueCat SDK -- tracks your subscription entitlement locally and communicates with RevenueCat's servers to verify status",
      ],
      closing:
        "These technologies operate within the permissions model of iOS and are subject to Apple's privacy rules.",
    },
    {
      heading: "6. Managing Cookies",
      body: "For our website (cenalabs.com), you can control cookies through your browser settings:",
      bullets: [
        "Most browsers allow you to block or delete cookies through their settings or preferences menus",
        "Blocking essential cookies may prevent you from signing in or using certain features",
        "Browser-level cookie controls will not affect the Unfumbled mobile app",
      ],
      secondaryIntro: "For the mobile app:",
      secondaryBullets: [
        "You can clear locally stored app data by uninstalling the app",
        "iOS provides device-level privacy controls for app data and tracking",
        "Contact us if you would like specific data deleted from our servers",
      ],
    },
    {
      heading: "7. Changes to This Policy",
      body: `We may update this Cookie Policy at any time. When we do, we will update the "Last updated" date above. Continued use of the Services following any update constitutes your acceptance.`,
    },
    {
      heading: "8. Contact",
      body: "For questions about our use of cookies or similar technologies:\n\nEmail: support@cenalabs.com",
    },
  ],
};

/* -----------------------------------------------------------------
   ACCEPTABLE USE POLICY
------------------------------------------------------------------ */

export const unfumbledAcceptableUse: LegalDocument = {
  lastUpdated: UNFUMBLED_LEGAL_LAST_UPDATED,
  sections: [
    {
      heading: "1. Overview",
      body: `This Acceptable Use Policy ("AUP") describes conduct that is prohibited when using Unfumbled and related services operated by Cena Labs (the "Services"). This policy applies to all users and to all content submitted to or generated by the Services.\n\nThis AUP is incorporated into and forms part of our Terms of Service. Violations may result in account suspension or permanent termination.`,
    },
    {
      heading: "2. Lawful Use Only",
      body: "You may only use the Services for lawful purposes. You must comply with all applicable local, state, national, and international laws and regulations. This includes laws governing privacy, communications, harassment, and consumer protection in your jurisdiction.",
    },
    {
      heading: "3. No Harassment, Abuse, or Coercion",
      body: "Unfumbled is built to help people communicate better -- not to facilitate harm. The following conduct is strictly prohibited:",
      bullets: [
        "Using AI-generated suggestions to harass, intimidate, threaten, stalk, or abuse any individual",
        "Sending unsolicited, repetitive, or unwanted messages to another person after they have expressed disinterest or asked to stop",
        "Using the Services to coerce, pressure, or manipulate another person into an interaction, relationship, or sexual encounter they have not consented to",
        "Targeting individuals with abusive, demeaning, or sexually aggressive messaging",
        "Using the Services in connection with any form of domestic violence, sexual violence, or gender-based violence",
      ],
    },
    {
      heading: "4. No Fraud, Impersonation, or Manipulation",
      body: "The Services must not be used to deceive or manipulate others. The following is prohibited:",
      bullets: [
        "Impersonating any person or entity, including using AI-generated messages to mislead someone about who they are talking to",
        "Submitting conversations involving a third party without their knowledge in order to manipulate or deceive that person",
        "Using the Services to run romance scams, catfishing schemes, or any form of fraudulent romantic or social deception",
        "Using AI-generated content to falsely represent your interests, identity, or intentions to another person",
        "Using the Services to gather personal information from others under false pretenses",
      ],
    },
    {
      heading: "5. No Unlawful, Harmful, or Deceptive Content",
      body: "You must not upload, submit, or use the Services to generate content that is:",
      bullets: [
        "Sexually explicit, obscene, or pornographic",
        "Defamatory, libelous, or maliciously false about any individual",
        "Hateful toward individuals or groups on the basis of race, ethnicity, religion, gender, sexual orientation, disability, or other protected characteristics",
        "In violation of any third party's privacy, intellectual property, or other legal rights",
        "Related to illegal activity, including drug trafficking, human trafficking, or any form of exploitation",
      ],
    },
    {
      heading: "6. No Misuse of AI-Generated Suggestions",
      body: "AI reply suggestions in Unfumbled are intended to help users communicate more clearly and confidently. They must not be used as tools for manipulation or harm. Specifically, you must not:",
      bullets: [
        "Use AI suggestions to craft messages designed to psychologically manipulate or exploit another person's vulnerabilities",
        "Use AI suggestions to send communications that constitute harassment, stalking, or cyberbullying",
        "Use AI suggestions in ways that violate another person's right to a harassment-free interaction",
        "Use AI suggestions to automate or systematically send messages to large numbers of people without their consent",
        "Attempt to use the Services as a component of any automated messaging, bot, or spam system",
      ],
    },
    {
      heading: "7. No Interference with the Service",
      body: "You must not take any action that interferes with or disrupts the Services or infrastructure supporting them, including:",
      bullets: [
        "Attempting to probe, scan, or test the vulnerability of the Services or any associated network or system",
        "Attempting to circumvent security controls, access controls, or usage limits",
        "Transmitting malware, viruses, or any code designed to damage or interfere with the Services",
        "Launching denial-of-service or distributed denial-of-service attacks",
        "Introducing any unauthorized automated agents, crawlers, or scripts",
      ],
    },
    {
      heading: "8. No Exploitation or Reverse Engineering",
      body: "You agree not to attempt to extract, reverse engineer, or reproduce any part of the Services or its underlying systems, including:",
      bullets: [
        "Decompiling or disassembling the app binary",
        "Reverse engineering the AI prompts, scoring algorithms, or data pipelines",
        "Reproducing or redistributing any part of the Services for commercial use without written consent from Cena Labs",
        "Scraping or bulk-downloading any content generated by the Services",
      ],
    },
    {
      heading: "9. Enforcement and Account Restrictions",
      body: "Cena Labs reserves the right, at its sole discretion, to:",
      bullets: [
        "Remove or refuse to process any content that violates this AUP",
        "Warn, suspend, or permanently terminate any account found to be in violation",
        "Report suspected illegal activity to appropriate law enforcement authorities",
        "Cooperate with law enforcement investigations involving use of the Services",
      ],
      closing:
        "We are not obligated to monitor the content users submit, but we reserve the right to do so and to take action when violations come to our attention. Account termination does not entitle you to a refund.",
    },
    {
      heading: "10. Reporting Violations",
      body: "If you believe another user is violating this policy -- including using the Services for harassment, abuse, or fraud -- please report it to us:\n\nEmail: support@cenalabs.com\n\nInclude as much detail as possible, including dates, the nature of the violation, and any supporting information. We take all reports seriously.",
    },
    {
      heading: "11. Contact",
      body: "For questions about this Acceptable Use Policy:\n\nEmail: support@cenalabs.com\nBusiness inquiries: info@cenalabs.com",
    },
  ],
};

/* -----------------------------------------------------------------
   SHARED ROUTE REGISTRY
------------------------------------------------------------------ */

/** Short labels for cross-links in the legal footer */
export const unfumbledLegalRoutes = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/disclaimer", label: "AI Disclaimer" },
  { href: "/contact", label: "Contact" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/acceptable-use", label: "Acceptable Use" },
] as const;
