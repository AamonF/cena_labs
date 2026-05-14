import type { LegalDocument } from "@/data/types";

/** Canonical “last updated” for the Cena Labs legal pack. */
export const CENA_LABS_LEGAL_LAST_UPDATED = "May 7, 2026";

export const cenaLabsTerms: LegalDocument = {
  lastUpdated: CENA_LABS_LEGAL_LAST_UPDATED,
  sections: [
    {
      heading: "1. Introduction",
      body:
        `Welcome to Cena Labs ("Company," "we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of our websites, applications, products, software, AI-powered services, and related platforms (collectively, the "Services").

By accessing or using the Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use the Services.

If you are using the Services on behalf of a business or organization, you represent that you have authority to bind that organization to these Terms.`,
    },
    {
      heading: "2. Eligibility",
      body: `You must be at least 13 years old to use the Services. If you are under the age of majority in your jurisdiction, you may only use the Services with the consent of a parent or legal guardian.

You may not use the Services if:`,
      bullets: [
        "You are prohibited from using online services under applicable law;",
        "You have previously been suspended or removed from the Services;",
        "Your use violates any applicable law or regulation.",
      ],
    },
    {
      heading: "3. Accounts",
      body: `To access certain features, you may be required to create an account.

You agree to:`,
      bullets: [
        "Provide accurate and complete information;",
        "Keep your login credentials secure;",
        "Notify us immediately of unauthorized access;",
        "Be responsible for all activity under your account.",
      ],
      closing: "We reserve the right to suspend or terminate accounts that violate these Terms.",
    },
    {
      heading: "4. AI-Powered Features",
      body: `Some Services may include artificial intelligence or machine learning functionality.

You acknowledge and agree that:`,
      bullets: [
        "AI-generated outputs may contain inaccuracies, hallucinations, or incomplete information;",
        "AI responses are generated probabilistically and may vary;",
        "Outputs should not be solely relied upon for legal, medical, financial, employment, or safety-critical decisions;",
        "We do not guarantee accuracy, reliability, or suitability of AI-generated content.",
      ],
      closing: "You are solely responsible for evaluating and verifying any outputs before relying on them.",
    },
    {
      heading: "5. User Content",
      body: `You may submit text, prompts, images, files, messages, feedback, or other materials ("User Content") through the Services.

You retain ownership of your User Content.

By submitting User Content, you grant Cena Labs a worldwide, non-exclusive, royalty-free license to host, store, reproduce, modify, process, and display the content solely for:`,
      bullets: [
        "Operating the Services;",
        "Improving platform functionality;",
        "Security and moderation purposes;",
        "Providing requested features.",
      ],
      closing: `You represent and warrant that:

• You own or have rights to the content;
• Your content does not violate laws or third-party rights;
• Your content does not contain malicious code.`,
    },
    {
      heading: "6. Prohibited Conduct",
      body: "You agree not to:",
      bullets: [
        "Violate any laws or regulations;",
        "Infringe intellectual property rights;",
        "Attempt unauthorized access to systems or accounts;",
        "Reverse engineer or scrape the Services;",
        "Upload malware or harmful code;",
        "Use the Services to harass, threaten, or abuse others;",
        "Generate or distribute illegal content;",
        "Use automated systems to overload infrastructure;",
        "Circumvent safety systems or content filters;",
        "Misrepresent AI-generated content as human-produced where disclosure is legally required.",
      ],
      closing: "We reserve the right to investigate and take action against violations.",
    },
    {
      heading: "7. Intellectual Property",
      body: `All intellectual property rights in the Services, excluding User Content, are owned by Cena Labs or its licensors.

This includes:`,
      bullets: [
        "Software;",
        "Branding;",
        "Logos;",
        "Designs;",
        "UI/UX elements;",
        "AI systems;",
        "Databases;",
        "Documentation.",
      ],
      closing: "You may not copy, distribute, modify, or exploit our intellectual property without prior written consent.",
    },
    {
      heading: "8. Subscription and Payments",
      body: `Certain features may require payment.

By purchasing a subscription or paid feature, you agree that:`,
      bullets: [
        "Fees are charged in advance;",
        "Payments may automatically renew unless canceled;",
        "Prices may change with notice;",
        "Refunds are provided only where required by law or explicitly stated.",
      ],
      closing: "You authorize payment processors to charge your selected payment method.",
    },
    {
      heading: "9. Third-Party Services",
      body: `The Services may integrate with or link to third-party platforms, APIs, or services.

We are not responsible for:`,
      bullets: [
        "Third-party content;",
        "Third-party policies;",
        "Availability of external services;",
        "Data handling practices of third parties.",
      ],
      closing: "Your use of third-party services is governed by their respective terms.",
    },
    {
      heading: "10. Privacy",
      body: `Your use of the Services is also governed by our Privacy Policy.

By using the Services, you consent to the collection and use of information as described therein.`,
    },
    {
      heading: "11. Service Availability",
      body: `We may:`,
      bullets: [
        "Modify or discontinue features;",
        "Restrict access;",
        "Perform maintenance;",
        "Update systems;",
        "Introduce limits or quotas.",
      ],
      closing: "We do not guarantee uninterrupted or error-free operation.",
    },
    {
      heading: "12. Disclaimer of Warranties",
      body: `THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE."

TO THE MAXIMUM EXTENT PERMITTED BY LAW, CENA LABS DISCLAIMS ALL WARRANTIES, INCLUDING:

• MERCHANTABILITY;
• FITNESS FOR A PARTICULAR PURPOSE;
• NON-INFRINGEMENT;
• ACCURACY;
• RELIABILITY;
• AVAILABILITY.

WE DO NOT WARRANT THAT:

• THE SERVICES WILL BE ERROR-FREE;
• OUTPUTS WILL BE ACCURATE;
• THE SERVICES WILL ALWAYS BE AVAILABLE;
• SECURITY WILL BE UNINTERRUPTED.`,
    },
    {
      heading: "13. Limitation of Liability",
      body: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, CENA LABS SHALL NOT BE LIABLE FOR:

• INDIRECT DAMAGES;
• INCIDENTAL DAMAGES;
• CONSEQUENTIAL DAMAGES;
• LOSS OF PROFITS;
• LOSS OF DATA;
• BUSINESS INTERRUPTION;
• DAMAGES ARISING FROM AI OUTPUTS.

OUR TOTAL LIABILITY FOR ANY CLAIM SHALL NOT EXCEED THE GREATER OF:

• THE AMOUNT YOU PAID TO US IN THE PRIOR 12 MONTHS; OR
• $100 USD.`,
    },
    {
      heading: "14. Indemnification",
      body: `You agree to indemnify and hold harmless Cena Labs, its affiliates, employees, contractors, and partners from claims arising out of:

• Your use of the Services;
• Your User Content;
• Your violation of these Terms;
• Your violation of laws or third-party rights.`,
    },
    {
      heading: "15. Termination",
      body: `We may suspend or terminate your access at any time if:`,
      bullets: [
        "You violate these Terms;",
        "We believe your use creates risk or legal exposure;",
        "Required by law.",
      ],
      closing: `You may stop using the Services at any time.

Sections intended to survive termination shall remain in effect.`,
    },
    {
      heading: "16. Governing Law",
      body: `These Terms shall be governed by and construed in accordance with the laws of the State of North Carolina, without regard to conflict of law principles.

Any disputes shall be resolved in courts located in North Carolina, unless otherwise required by law.`,
    },
    {
      heading: "17. Changes to Terms",
      body: `We may update these Terms from time to time.

Changes become effective upon posting.

Continued use of the Services after updates constitutes acceptance.`,
    },
    {
      heading: "18. Contact Information",
      body: `For questions regarding these Terms:

• Email: info@cenalabs.com
• Support: support@cenalabs.com`,
    },
  ],
};

export const cenaLabsPrivacy: LegalDocument = {
  lastUpdated: CENA_LABS_LEGAL_LAST_UPDATED,
  sections: [
    {
      heading: "1. Introduction",
      body: `This Privacy Policy explains how Cena Labs collects, uses, stores, and protects personal information.

By using our Services, you consent to the practices described in this Privacy Policy.`,
    },
    {
      heading: "2. Information We Collect",
      body: `Information you provide

We may collect:

• Name;
• Email address;
• Account credentials;
• User-generated content;
• Uploaded files;
• Messages and prompts;
• Payment information handled by payment processors.

Automatically collected information

We may collect:

• IP address;
• Device information;
• Browser type;
• Operating system;
• Usage analytics;
• Crash reports;
• Cookies and identifiers.

AI interaction data

We may process prompts, conversations, and interactions to:

• Provide AI responses;
• Improve system performance;
• Detect abuse;
• Maintain safety.`,
    },
    {
      heading: "3. How We Use Information",
      body: "We may use information to:",
      bullets: [
        "Provide and maintain the Services;",
        "Authenticate accounts;",
        "Improve functionality;",
        "Personalize experiences;",
        "Process payments;",
        "Respond to support requests;",
        "Monitor security;",
        "Prevent fraud and abuse;",
        "Train or improve AI systems where permitted by law;",
        "Comply with legal obligations.",
      ],
    },
    {
      heading: "4. Legal Bases for Processing",
      body: `Where required by applicable law, we process personal data based on:

• Consent;
• Contractual necessity;
• Legitimate interests;
• Legal obligations.`,
    },
    {
      heading: "5. Sharing of Information",
      body: `We may share information with:`,
      bullets: [
        "Service providers;",
        "Hosting providers;",
        "Payment processors;",
        "Analytics providers;",
        "Security and fraud prevention vendors;",
        "Legal authorities when required.",
      ],
      closing: "We do not sell personal information in the traditional sense.",
    },
    {
      heading: "6. Data Retention",
      body: `We retain information only as long as reasonably necessary to:

• Provide Services;
• Meet legal obligations;
• Resolve disputes;
• Enforce agreements.

Retention periods may vary depending on the nature of the data.`,
    },
    {
      heading: "7. Security",
      body: `We implement commercially reasonable safeguards to protect information.

However, no online system is completely secure.

You acknowledge that transmission of data over the internet carries inherent risks.`,
    },
    {
      heading: "8. Your Rights",
      body: `Depending on your jurisdiction, you may have rights to:

• Access personal information;
• Correct inaccurate information;
• Delete information;
• Restrict processing;
• Object to processing;
• Request portability;
• Withdraw consent.

Requests may be submitted to support@cenalabs.com.`,
    },
    {
      heading: "9. Children’s Privacy",
      body: `The Services are not directed toward children under 13.

We do not knowingly collect personal information from children under 13.

If we become aware of such collection, we will take steps to delete the information.`,
    },
    {
      heading: "10. International Transfers",
      body: `Your information may be processed in jurisdictions outside your country of residence.

By using the Services, you consent to such transfers where legally permitted.`,
    },
    {
      heading: "11. Cookies and Tracking Technologies",
      body: `We use cookies and similar technologies to:

• Maintain sessions;
• Remember preferences;
• Analyze traffic;
• Improve performance;
• Enhance security.

Additional details are available in our Cookie Policy.`,
    },
    {
      heading: "12. Third-Party Services",
      body: `Third-party providers may independently collect information subject to their own privacy policies.

We are not responsible for third-party practices.`,
    },
    {
      heading: "13. Changes to This Policy",
      body: `We may update this Privacy Policy periodically.

Updated versions become effective upon posting.`,
    },
    {
      heading: "14. Contact Information",
      body: `For privacy-related inquiries:

• Email: info@cenalabs.com
• Support: support@cenalabs.com`,
    },
  ],
};

export const cenaLabsAiDisclaimer: LegalDocument = {
  lastUpdated: CENA_LABS_LEGAL_LAST_UPDATED,
  sections: [
    {
      heading: "1. General Disclaimer",
      body: `Cena Labs provides AI-powered tools and features intended for informational, educational, productivity, and assistance purposes only.

AI-generated content may:

• Be inaccurate;
• Contain errors;
• Be incomplete;
• Be outdated;
• Produce inconsistent results.

Users should independently verify outputs before relying on them.`,
    },
    {
      heading: "2. No Professional Advice",
      body: `AI-generated content does not constitute:

• Legal advice;
• Medical advice;
• Financial advice;
• Investment advice;
• Psychological advice;
• Professional consulting.

You should consult qualified professionals before making decisions based on AI outputs.`,
    },
    {
      heading: "3. User Responsibility",
      body: `You are solely responsible for:

• Evaluating outputs;
• Verifying accuracy;
• Reviewing generated content;
• Ensuring compliance with laws and regulations.`,
    },
    {
      heading: "4. AI Limitations",
      body: `Artificial intelligence systems may:

• Hallucinate facts;
• Misinterpret prompts;
• Reflect biases present in training data;
• Produce offensive or unintended outputs.

We continuously improve moderation and safeguards but cannot guarantee perfect performance.`,
    },
    {
      heading: "5. No Guarantees",
      body: `Cena Labs does not guarantee:

• Accuracy of outputs;
• Business results;
• Educational outcomes;
• Platform availability;
• Continuous functionality.`,
    },
    {
      heading: "6. Limitation of Liability",
      body: "To the maximum extent permitted by law, Cena Labs shall not be liable for losses or damages arising from reliance on AI-generated content.",
    },
    {
      heading: "7. Contact",
      body: `Questions regarding AI systems or AI policies may be directed to:

• info@cenalabs.com
• support@cenalabs.com`,
    },
  ],
};

export const cenaLabsContactPolicy: LegalDocument = {
  lastUpdated: CENA_LABS_LEGAL_LAST_UPDATED,
  sections: [
    {
      heading: "1. General Inquiries",
      body: `For general business inquiries, partnerships, legal matters, or media requests:

• Email: info@cenalabs.com`,
    },
    {
      heading: "2. Customer Support",
      body: `For technical support, account issues, billing assistance, or platform-related questions:

• Email: support@cenalabs.com`,
    },
    {
      heading: "3. Response Times",
      body: "We aim to respond to inquiries within a reasonable timeframe; however, response times are not guaranteed.",
    },
    {
      heading: "4. Abuse and Security Reporting",
      body: `To report:

• Security vulnerabilities;
• Abuse;
• Policy violations;
• Unauthorized activity;
• Intellectual property concerns;

please contact:

• support@cenalabs.com`,
    },
    {
      heading: "5. Legal Notices",
      body: `Legal requests or formal notices may be submitted electronically to:

• info@cenalabs.com`,
    },
  ],
};

export const cenaLabsCookies: LegalDocument = {
  lastUpdated: CENA_LABS_LEGAL_LAST_UPDATED,
  sections: [
    {
      heading: "1. Introduction",
      body: `This Cookie Policy explains how Cena Labs uses cookies and similar technologies.

By continuing to use the Services, you consent to the use of cookies as described herein.`,
    },
    {
      heading: "2. What Are Cookies?",
      body: `Cookies are small text files stored on your device by websites and applications.

They help platforms recognize users and improve experiences.`,
    },
    {
      heading: "3. Types of Cookies We Use",
      body: "Essential cookies — necessary for:",
      bullets: [
        "Authentication;",
        "Security;",
        "Session management;",
        "Core functionality.",
      ],
      closing: `Analytics cookies — used to:

• Understand usage patterns;
• Improve functionality;
• Measure performance.

Preference cookies — used to remember:

• User settings;
• Preferences;
• Interface customizations.

Security cookies — used to:

• Detect suspicious activity;
• Prevent abuse;
• Protect accounts.`,
    },
    {
      heading: "4. Third-Party Cookies",
      body: `Third-party services may place cookies for:

• Analytics;
• Payment processing;
• Embedded content;
• Infrastructure services.

These cookies are governed by third-party policies.`,
    },
    {
      heading: "5. Managing Cookies",
      body: `Most browsers allow you to:

• Block cookies;
• Delete cookies;
• Configure permissions.

Disabling cookies may affect functionality.`,
    },
    {
      heading: "6. Changes to This Policy",
      body: "We may update this Cookie Policy periodically.\n\nUpdated versions become effective upon posting.",
    },
    {
      heading: "7. Contact",
      body: `Questions regarding cookies or tracking technologies:

• info@cenalabs.com
• support@cenalabs.com`,
    },
  ],
};

export const cenaLabsAcceptableUse: LegalDocument = {
  lastUpdated: CENA_LABS_LEGAL_LAST_UPDATED,
  sections: [
    {
      heading: "1. Purpose",
      body: `This Acceptable Use Policy ("AUP") governs appropriate use of Cena Labs Services.

By using the Services, you agree to comply with this policy.`,
    },
    {
      heading: "2. Prohibited Activities",
      body: `Users may not use the Services to engage in prohibited conduct, including the categories below.

Illegal conduct

• Violate laws or regulations;
• Facilitate criminal activity;
• Promote fraud or scams.

Harmful conduct

• Harass or threaten individuals;
• Promote violence or self-harm;
• Share hateful or discriminatory content.

Malicious technical activity

• Distribute malware;
• Launch attacks;
• Attempt unauthorized access;
• Exploit vulnerabilities.

Intellectual property violations

• Infringe copyrights;
• Distribute pirated materials;
• Misappropriate trademarks.

AI abuse

• Circumvent safety systems;
• Generate harmful content;
• Create deceptive impersonations;
• Generate misinformation intended to deceive.

Platform abuse

• Spam users;
• Scrape systems excessively;
• Use bots to overload infrastructure;
• Abuse free trials or promotional systems.`,
    },
    {
      heading: "3. Content Moderation",
      body: `We reserve the right to:

• Remove content;
• Restrict access;
• Suspend accounts;
• Report illegal activity to authorities.

Moderation decisions may be made automatically or manually.`,
    },
    {
      heading: "4. Reporting Violations",
      body: "To report abuse or violations:\n\n• support@cenalabs.com",
    },
    {
      heading: "5. Enforcement",
      body: `Violations may result in:

• Content removal;
• Account suspension;
• Permanent bans;
• Legal action.`,
    },
    {
      heading: "6. Changes to This Policy",
      body: "We may modify this AUP at any time.\n\nContinued use of the Services constitutes acceptance of updated versions.",
    },
  ],
};

/** Footer / cross-links for Prompted (paths under /apps/prompted/…). */
export const promptedLegalRoutes = [
  { href: "/apps/prompted/terms", label: "Terms of Service" },
  { href: "/apps/prompted/privacy", label: "Privacy Policy" },
  { href: "/apps/prompted/cookies", label: "Cookie Policy" },
  { href: "/apps/prompted/ai-disclaimer", label: "AI Disclaimer" },
  { href: "/apps/prompted/acceptable-use", label: "Acceptable Use Policy" },
  { href: "/apps/prompted/contact", label: "Contact" },
] as const;
