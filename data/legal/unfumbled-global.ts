import type { LegalDocument } from "@/data/types";

/** Canonical "last updated" for Unfumbled legal pages (sync with site deploys). */
export const UNFUMBLED_LEGAL_LAST_UPDATED = "April 20, 2026";

const productLine =
  `These policies apply to Unfumbled and other applications and websites offered by Cena Labs (the "Services"). Cena Labs is operated by an individual based in the United States.`;

/* -----------------------------------------------------------------
   TERMS OF SERVICE
------------------------------------------------------------------ */

export const unfumbledTerms: LegalDocument = {
  lastUpdated: UNFUMBLED_LEGAL_LAST_UPDATED,
  sections: [
    {
      heading: "1. Introduction and Agreement",
      body: `Welcome to Unfumbled. These Terms of Service ("Terms") govern your use of the Unfumbled mobile application, this website, and any other applications or services offered by Cena Labs (collectively, the "Services").\n\n${productLine}\n\nBy creating an account, downloading the app, or otherwise using the Services, you agree to be bound by these Terms. If you do not agree, do not use the Services.`,
    },
    {
      heading: "2. Eligibility",
      body: "You must be at least 18 years old to use the Services. By using the Services, you represent and warrant that:",
      bullets: [
        "You are at least 18 years of age",
        "You have the legal capacity to enter into a binding agreement",
        "You are not prohibited from receiving services under applicable law",
        "All information you provide is accurate and current",
      ],
      closing:
        "If we learn that a user is under 18, we will promptly terminate their account.",
    },
    {
      heading: "3. Accounts and Access",
      body: "Certain features of Unfumbled require you to create an account. When you register, you agree to:",
      bullets: [
        "Provide accurate, complete, and up-to-date information",
        "Keep your password and login credentials confidential",
        "Notify us immediately of any unauthorized access to your account",
        "Be solely responsible for all activity that occurs under your account",
      ],
      closing:
        "Cena Labs reserves the right to suspend or terminate any account at any time, with or without notice, if we believe the account has been used in violation of these Terms or applicable law.",
    },
    {
      heading: "4. Subscriptions and Billing",
      body: "Unfumbled offers a free tier with limited analyses per day, and a paid subscription that unlocks unlimited analyses, deeper scoring breakdowns, richer reply suggestions, and priority processing.\n\nSubscription details:",
      bullets: [
        "Subscriptions are billed on a monthly or annual basis, depending on the plan you select",
        "Subscriptions automatically renew at the end of each billing cycle unless canceled prior to renewal",
        "You may cancel your subscription at any time through your Apple App Store or Google Play account settings",
        "Cancellation takes effect at the end of the current billing period; you will retain access through that date",
        "Payments are processed by Apple (App Store) or Google (Play Store) and are subject to their respective terms",
        "Cena Labs does not directly collect or store payment card information",
        "Subscription management is also handled via RevenueCat, our subscription infrastructure provider",
      ],
      closing:
        "Refunds are governed by the App Store or Google Play refund policies. Cena Labs does not issue independent refunds except where required by applicable law.",
    },
    {
      heading: "5. Acceptable Use",
      body: "You agree to use Unfumbled only for lawful, personal purposes. You agree NOT to:",
      bullets: [
        "Use the Services in violation of any applicable local, state, national, or international law",
        "Upload, submit, or transmit any content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable",
        "Use AI-generated suggestions to manipulate, coerce, deceive, harass, or harm any other person",
        "Impersonate any person or entity, or falsely represent your affiliation with any person or entity",
        "Use the Services to send unsolicited communications, spam, or phishing content",
        "Attempt to gain unauthorized access to any part of the Services or related systems",
        "Reverse engineer, decompile, disassemble, or attempt to derive the source code of the Services",
        "Scrape, crawl, or use automated methods to access or collect data from the Services",
        "Interfere with or disrupt the integrity, performance, or security of the Services",
        "Use the Services for any commercial purpose without express written consent from Cena Labs",
      ],
      closing:
        "Violations of this section may result in immediate account termination. See our Acceptable Use Policy for further detail.",
    },
    {
      heading: "6. User Content and Conversation Inputs",
      body: `Unfumbled allows you to submit conversation text, screenshots, and related inputs ("User Content") for analysis. You retain ownership of all User Content you submit.\n\nBy submitting User Content, you grant Cena Labs a limited, non-exclusive, worldwide, royalty-free license to process your User Content solely for the purpose of providing the Services to you -- including forwarding conversation data to AI subprocessors (such as OpenAI) to generate analysis and reply suggestions.\n\nYou represent and warrant that:`,
      bullets: [
        "You have the right to submit the conversation content you provide",
        "Your User Content does not violate any third-party rights, including privacy rights of the people whose messages appear in conversations you submit",
        "Your User Content does not contain unlawful material",
      ],
      closing:
        "We do not permanently store conversation content on our servers. Conversations are processed transiently for analysis and may be stored locally on your device. Please review our Privacy Policy for full details on data handling.",
    },
    {
      heading: "7. AI-Generated Suggestions Disclaimer",
      body: "Unfumbled uses artificial intelligence to generate conversation analysis, interest scores, risk assessments, and suggested replies. You acknowledge and agree that:",
      bullets: [
        "AI-generated suggestions are produced by automated systems and may be inaccurate, incomplete, or inappropriate in context",
        "Suggestions are generated based on the content you submit and may not reflect the full complexity of human relationships or communication",
        "Cena Labs does not review, approve, or endorse any individual AI-generated suggestion",
        "You are solely responsible for reviewing and deciding whether to use any suggestion before sending it",
        "You are the sender of any message you choose to send -- Cena Labs bears no responsibility for messages sent based on its suggestions",
      ],
      closing:
        "The Services are designed as a texting assistance tool. They are not a substitute for personal judgment, emotional intelligence, or professional advice.",
    },
    {
      heading: "8. No Guarantee of Dating or Relationship Outcomes",
      body: "Unfumbled is an AI-powered communication assistant. We do not and cannot guarantee any specific outcome resulting from your use of the Services, including:",
      bullets: [
        "Receiving a reply or response from another person",
        "Improving your relationship with another person",
        "Securing dates, romantic relationships, or any other interpersonal outcome",
        "Any improvement in your communication skills or texting habits",
        "Prevention of ghosting, rejection, or relationship failure",
      ],
      closing:
        "Human relationships are complex. AI analysis and suggestions are a tool -- not a guarantee. You use the Services at your own discretion and risk.",
    },
    {
      heading: "9. Intellectual Property",
      body: "All aspects of the Services -- including the Unfumbled app, website, design, algorithms, branding, and written content -- are the exclusive property of Cena Labs and are protected by applicable intellectual property laws.\n\nYou may not copy, reproduce, distribute, publish, transmit, modify, adapt, translate, or create derivative works from the Services or any part thereof without express prior written consent from Cena Labs.\n\nThe Unfumbled name, logo, and related marks are trademarks of Cena Labs. Nothing in these Terms grants you any right to use these marks.",
    },
    {
      heading: "10. Third-Party Services",
      body: "The Services rely on third-party providers to function. These include:",
      bullets: [
        "Apple App Store and Google Play -- app distribution and in-app purchases",
        "RevenueCat -- subscription management",
        "Supabase -- authentication, cloud storage, and backend infrastructure",
        "OpenAI -- AI analysis and response generation",
      ],
      closing:
        "Your use of the Services is also subject to the applicable terms and privacy policies of these third-party providers. Cena Labs is not responsible for the practices of these providers beyond its contractual obligations.",
    },
    {
      heading: "11. Privacy",
      body: "Your use of the Services is subject to our Privacy Policy, which is incorporated into these Terms by reference. By using the Services, you consent to the data practices described in our Privacy Policy.",
    },
    {
      heading: "12. Termination",
      body: "Cena Labs may suspend or terminate your access to the Services at any time, with or without cause, including but not limited to:",
      bullets: [
        "Violation of these Terms or our Acceptable Use Policy",
        "Suspected illegal activity",
        "Behavior that harms other users or third parties",
        "Fraudulent, deceptive, or abusive conduct",
      ],
      closing:
        "You may also terminate your account at any time by deleting the app and canceling any active subscription through your app store account. Termination does not entitle you to a refund.",
    },
    {
      heading: "13. Disclaimer of Warranties",
      body: `The Services are provided "as is" and "as available," without warranties of any kind, either express or implied. Cena Labs expressly disclaims all warranties, including:`,
      bullets: [
        "Implied warranties of merchantability or fitness for a particular purpose",
        "Accuracy, reliability, or completeness of AI-generated content",
        "Continuous, uninterrupted, or error-free availability of the Services",
        "That the Services will meet your specific requirements or expectations",
      ],
    },
    {
      heading: "14. Limitation of Liability",
      body: "To the fullest extent permitted by applicable law, Cena Labs and its principals, employees, agents, and subprocessors shall not be liable for:",
      bullets: [
        "Indirect, incidental, special, exemplary, consequential, or punitive damages",
        "Loss of relationships, dates, romantic opportunities, or social outcomes",
        "Decisions you make based on AI-generated suggestions",
        "Third-party actions or content",
        "Service interruptions, data loss, or security breaches beyond our reasonable control",
      ],
      closing:
        "In all cases, our aggregate liability to you shall not exceed the total amount you paid to Cena Labs for the Services in the twelve (12) months preceding the claim.",
    },
    {
      heading: "15. Governing Law and Dispute Resolution",
      body: "These Terms are governed by the laws of the United States, without regard to conflict-of-law principles, except where your jurisdiction's mandatory consumer protection laws apply.\n\nAny dispute arising from or relating to these Terms or the Services shall be resolved through binding individual arbitration, except where prohibited by law. You waive the right to participate in any class action lawsuit or class-wide arbitration.",
    },
    {
      heading: "16. Changes to These Terms",
      body: `Cena Labs may update these Terms at any time. When we make material changes, we will update the "Last updated" date at the top of this page. Continued use of the Services after such changes constitutes your acceptance of the updated Terms.\n\nWe encourage you to review these Terms periodically. If you do not agree to updated Terms, you should discontinue use of the Services.`,
    },
    {
      heading: "17. Contact",
      body: "For questions about these Terms, please contact us:\n\nEmail: support@cenalabs.com\nBusiness inquiries: info@cenalabs.com",
    },
  ],
};

/* -----------------------------------------------------------------
   PRIVACY POLICY
------------------------------------------------------------------ */

export const unfumbledPrivacy: LegalDocument = {
  lastUpdated: UNFUMBLED_LEGAL_LAST_UPDATED,
  sections: [
    {
      heading: "1. Overview",
      body: `Cena Labs is committed to your privacy. This Privacy Policy explains what information we collect, how we use it, who we share it with, and what choices you have.\n\n${productLine}\n\nAn account is required to access certain features of Unfumbled. By using the Services, you agree to the practices described in this policy.`,
    },
    {
      heading: "2. Information We Collect",
      body: "We collect information you provide directly:",
      bullets: [
        "Account information -- email address and password when you register",
        "Conversation inputs -- text threads and screenshots you submit for analysis",
        "Support inquiries -- messages you send to our support team",
        "Subscription information -- your subscription tier and status, managed via RevenueCat",
      ],
      secondaryIntro: "We also collect information automatically:",
      secondaryBullets: [
        "Device type, operating system version, and app version",
        "General usage data (screens visited, features used, session duration)",
        "Crash reports and diagnostic data to improve app stability",
        "Approximate IP address for security and abuse prevention",
      ],
    },
    {
      heading: "3. Conversation Inputs and Local Storage",
      body: "When you paste a conversation or upload a screenshot, that content is processed through our AI pipeline (OpenAI) to generate analysis and reply suggestions. This processing is transient -- we use your input to produce results and do not permanently store raw conversation content on our servers.\n\nAnalyses you choose to save are stored:",
      bullets: [
        "Locally on your device by default",
        "In your Supabase-backed cloud account if you are signed in and cloud sync is enabled",
      ],
      closing:
        "We do not read, review, or use your saved conversation analyses for any purpose other than returning them to you when you access your saved results.",
    },
    {
      heading: "4. How We Use Information",
      body: "We use information we collect to:",
      bullets: [
        "Provide, operate, and improve the Services",
        "Process conversation inputs and generate AI analysis through OpenAI",
        "Authenticate your identity and manage your account via Supabase",
        "Manage subscriptions and billing through RevenueCat",
        "Diagnose errors, prevent abuse, and ensure service security",
        "Respond to support requests and communicate with you about the Services",
        "Analyze aggregate, de-identified usage patterns to improve product features",
      ],
      closing:
        "We do not use your conversation inputs to train AI models or to build advertising profiles.",
    },
    {
      heading: "5. Third-Party Services and Subprocessors",
      body: "Unfumbled relies on the following third-party providers to function. Each receives only the data necessary for their specific role:",
      bullets: [
        "Supabase -- authentication, user account storage, and optional cloud sync for saved analyses. Hosted on AWS. Data processing agreement in place.",
        "OpenAI -- AI analysis and reply generation. Conversation inputs are sent to OpenAI's API when you request an analysis. OpenAI's data use is governed by their API usage policies, which do not permit training on API inputs by default.",
        "RevenueCat -- subscription status tracking and entitlement management. Receives your app store receipt and subscription tier.",
        "Apple App Store / Google Play -- app distribution, payment processing for subscriptions, and device-level crash reporting.",
      ],
      closing:
        "We do not sell your data to third parties. We do not share personal information with advertisers.",
    },
    {
      heading: "6. Data Retention",
      body: "We retain your data only as long as necessary to provide the Services and comply with legal obligations:",
      bullets: [
        "Account information -- retained until you delete your account",
        "Conversation analyses saved to cloud -- retained until you delete them or close your account",
        "Support correspondence -- retained for up to 2 years",
        "Usage logs and diagnostics -- retained for up to 12 months in aggregate, de-identified form",
      ],
      closing:
        "You may request deletion of your account and associated data at any time by emailing support@cenalabs.com. We will process deletion requests within 30 days.",
    },
    {
      heading: "7. Security",
      body: "We implement industry-standard safeguards to protect your information, including:",
      bullets: [
        "TLS encryption for all data in transit",
        "Supabase row-level security policies to restrict database access",
        "Hashed and salted password storage",
        "Access controls limiting who within Cena Labs can access production systems",
      ],
      closing:
        "No method of electronic storage or transmission is 100% secure. We cannot guarantee absolute security, but we take reasonable and appropriate measures to protect your data.",
    },
    {
      heading: "8. Your Rights and Choices",
      body: "Depending on your jurisdiction, you may have certain rights regarding your personal information:",
      bullets: [
        "Access -- request a copy of the personal information we hold about you",
        "Correction -- request correction of inaccurate information",
        "Deletion -- request deletion of your account and associated data",
        "Portability -- request an export of your data in a machine-readable format",
        "Withdrawal of consent -- stop using the Services and request account deletion at any time",
      ],
      closing:
        "To exercise any of these rights, contact us at support@cenalabs.com. We will respond within 30 days. We may ask you to verify your identity before processing sensitive requests.",
    },
    {
      heading: "9. Children's Privacy",
      body: "Unfumbled is not intended for use by anyone under the age of 18. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us at support@cenalabs.com and we will promptly delete that information.",
    },
    {
      heading: "10. International Users",
      body: "Cena Labs is operated in the United States. If you are located outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States or other countries where our service providers operate. By using the Services, you consent to such transfers.",
    },
    {
      heading: "11. Changes to This Policy",
      body: `We may update this Privacy Policy at any time. When we make changes, we will update the "Last updated" date at the top of this page. For significant changes, we may also provide additional notice within the app.\n\nYour continued use of the Services after any update constitutes acceptance of the revised policy.`,
    },
    {
      heading: "12. Contact",
      body: "For privacy questions or requests, please contact us:\n\nPrivacy / data requests: support@cenalabs.com\nGeneral inquiries: info@cenalabs.com",
    },
  ],
};

/* -----------------------------------------------------------------
   AI DISCLAIMER
------------------------------------------------------------------ */

export const unfumbledDisclaimer: LegalDocument = {
  lastUpdated: UNFUMBLED_LEGAL_LAST_UPDATED,
  sections: [
    {
      heading: "1. Informational and Entertainment Purposes Only",
      body: "Unfumbled and related services provided by Cena Labs are designed as personal communication assistance tools. All content generated by the Services -- including conversation analysis, interest scores, ghost risk ratings, reply suggestions, and any other AI-generated output -- is provided for informational and entertainment purposes only.\n\nNothing in the Services constitutes professional advice of any kind, including but not limited to psychological, therapeutic, relationship, legal, or medical advice.",
    },
    {
      heading: "2. AI Accuracy Limitations",
      body: "Unfumbled uses large language model AI (currently OpenAI) to analyze conversation inputs and generate outputs. AI systems have inherent limitations:",
      bullets: [
        "AI analysis is based on patterns in text and may not accurately reflect the actual intentions, emotions, or interest level of the person you are texting",
        "Scores such as Interest Score, Ghost Risk, and Power Balance are algorithmic estimates -- not objective measurements of human behavior",
        "AI-generated reply suggestions may be contextually inappropriate, culturally insensitive, or factually incorrect for your specific situation",
        "The quality of output depends heavily on the quality and completeness of the input you provide",
        "AI systems can produce outputs that seem confident or authoritative but are nonetheless wrong",
      ],
      closing:
        "You should apply your own judgment to every AI-generated suggestion before acting on it.",
    },
    {
      heading: "3. No Guarantee of Results",
      body: "Cena Labs expressly disclaims any guarantee regarding the effectiveness of AI-generated suggestions. Specifically, we do NOT guarantee:",
      bullets: [
        "That following any suggestion will result in a reply from the other person",
        "That using Unfumbled will improve any specific conversation or relationship",
        "Any dating success, romantic relationship, or other interpersonal outcome",
        "Prevention of ghosting, rejection, loss of interest, or relationship failure",
        "That your texting scores will improve over time",
        "That any suggested reply is appropriate, safe, or effective for your situation",
      ],
      closing:
        "Human relationships are inherently unpredictable. No tool, AI or otherwise, can reliably predict or control the behavior of another person.",
    },
    {
      heading: "4. No Professional Advice",
      body: "Unfumbled is not a therapist, counselor, coach, or mental health professional. The Services do not provide:",
      bullets: [
        "Psychological or therapeutic guidance",
        "Relationship counseling",
        "Mental health support",
        "Legal or financial advice",
      ],
      closing:
        "If you are experiencing distress, anxiety, or serious concerns related to your relationships, we encourage you to seek support from a qualified professional.",
    },
    {
      heading: "5. User Responsibility",
      body: "You are fully responsible for how you use the Services and the actions you take based on any AI-generated content. This includes:",
      bullets: [
        "Reading and reviewing every suggested reply before you send it",
        "Exercising your own judgment about what is appropriate to say to another person",
        "Ensuring that any message you send complies with applicable laws and respects the other person's privacy and dignity",
        "Not using AI suggestions in ways that are deceptive, manipulative, coercive, or harmful",
      ],
      closing:
        "Cena Labs bears no responsibility for outcomes arising from messages you send, decisions you make, or actions you take based on Services output.",
    },
    {
      heading: "6. Dating and Communication Outcomes May Vary",
      body: "The success of any conversation depends on many factors entirely outside Unfumbled's control: the other person's feelings, circumstances, communication preferences, history with you, external events, and countless other variables.\n\nUnfumbled may help you communicate more thoughtfully and intentionally. It cannot overcome incompatibility, timing, or lack of mutual interest. Results will vary significantly from person to person and conversation to conversation.",
    },
    {
      heading: "7. Contact",
      body: "If you have questions about this disclaimer or the limitations of the Services, contact us:\n\nEmail: support@cenalabs.com",
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
      body: "The Unfumbled mobile app (iOS and Android) uses device-side storage technologies rather than browser cookies. These include:",
      bullets: [
        "AsyncStorage / SecureStore -- stores your authentication token and local app preferences securely on your device",
        "Local file-based storage -- saves conversation analyses you choose to keep",
        "RevenueCat SDK -- tracks your subscription entitlement locally and communicates with RevenueCat's servers to verify status",
      ],
      closing:
        "These technologies operate within the permissions model of iOS and Android and are subject to each platform's privacy rules.",
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
        "iOS and Android provide device-level privacy controls for app data and tracking",
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
