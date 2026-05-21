import type { LegalDocument } from "@/data/types";

/** Terms of Use effective date for Prompted on iOS. */
export const PROMPTED_TERMS_LAST_UPDATED = "May 21, 2026";

export const promptedTerms: LegalDocument = {
  lastUpdated: PROMPTED_TERMS_LAST_UPDATED,
  sections: [
    {
      heading: "1. Introduction",
      body: `These Terms of Use / Terms of Service ("Terms") govern your access to and use of Prompted, a mobile application and related services operated by Cena Labs ("Company," "we," "our," or "us").

By accessing or using Prompted or any related websites, applications, products, software, AI-powered features, or services provided by Cena Labs (collectively, the "Services"), you agree to be bound by these Terms.

If you do not agree to these Terms, you may not access or use the Services.

If you are using the Services on behalf of a business, organization, or other entity, you represent that you have authority to bind that entity to these Terms.

Prompted is an educational app designed to help users learn practical AI skills, prompt engineering, productivity workflows, and related concepts through interactive lessons, projects, challenges, AI feedback, and premium learning features.

The Services may include free features, paid features, subscriptions, AI-powered feedback, educational content, progress tracking, and other interactive tools.`,
    },
    {
      heading: "2. Eligibility",
      body: `You must be at least 13 years old to use the Services.

If you are under the age of majority in your jurisdiction, you may only use the Services with the consent of a parent or legal guardian.

You may not use the Services if:`,
      bullets: [
        "You are prohibited from using online services under applicable law;",
        "You have previously been suspended or removed from the Services;",
        "Your use of the Services would violate any applicable law or regulation.",
      ],
      closing:
        "By using the Services, you represent and warrant that you meet these eligibility requirements.",
    },
    {
      heading: "3. Accounts",
      body: `To access certain features of the Services, you may be required to create an account.

You agree to:`,
      bullets: [
        "Provide accurate, current, and complete account information;",
        "Keep your login credentials secure;",
        "Notify us immediately of any unauthorized access to your account;",
        "Be responsible for all activity that occurs under your account.",
      ],
      closing: `We are not responsible for any loss or damage arising from your failure to protect your account credentials.

We reserve the right to suspend, restrict, or terminate accounts that violate these Terms or create risk for the Services, other users, or Cena Labs.`,
    },
    {
      heading: "4. AI-Powered Features",
      body: `Some parts of the Services may include artificial intelligence, machine learning, or automated feedback functionality.

You acknowledge and agree that:`,
      bullets: [
        "AI-generated outputs may be inaccurate, incomplete, outdated, misleading, or otherwise unreliable;",
        "AI responses are generated probabilistically and may vary;",
        "AI feedback is provided for educational and informational purposes only;",
        "AI-generated content should not be solely relied upon for legal, medical, financial, employment, safety-critical, or other high-stakes decisions;",
        "We do not guarantee the accuracy, reliability, completeness, or suitability of AI-generated outputs.",
      ],
      closing:
        "You are solely responsible for evaluating, verifying, and deciding how to use any AI-generated output or feedback provided through the Services.",
    },
    {
      heading: "5. Educational Content",
      body: `Prompted provides educational materials, exercises, projects, challenges, and AI-related learning content.

The Services are intended for educational and informational purposes only. We do not guarantee that use of the Services will result in any specific skill level, job outcome, income level, business result, academic result, professional certification, or other result.

You are responsible for how you apply anything learned through the Services.`,
    },
    {
      heading: "6. User Content",
      body: `You may submit text, prompts, answers, images, files, messages, feedback, or other materials through the Services ("User Content").

You retain ownership of your User Content.

By submitting User Content, you grant Cena Labs a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to host, store, reproduce, modify, process, display, and use your User Content solely for purposes related to:`,
      bullets: [
        "Operating and providing the Services;",
        "Delivering requested features;",
        "Generating AI-powered feedback;",
        "Improving app functionality and user experience;",
        "Maintaining security, abuse prevention, and moderation systems;",
        "Complying with legal obligations.",
      ],
      closing: `You represent and warrant that:

• You own or have the necessary rights to submit your User Content;
• Your User Content does not violate any law or third-party rights;
• Your User Content does not contain malware, harmful code, or prohibited content.

We reserve the right to remove or restrict User Content that violates these Terms or applicable law.`,
    },
    {
      heading: "7. Prohibited Conduct",
      body: "You agree not to:",
      bullets: [
        "Violate any laws, regulations, or third-party rights;",
        "Infringe intellectual property, privacy, publicity, or contractual rights;",
        "Attempt to gain unauthorized access to accounts, systems, data, or infrastructure;",
        "Reverse engineer, decompile, scrape, crawl, or copy the Services except where permitted by law;",
        "Upload malware, harmful code, spam, or abusive content;",
        "Use the Services to harass, threaten, impersonate, exploit, or abuse others;",
        "Generate, request, or distribute illegal, harmful, or abusive content;",
        "Circumvent safety systems, access controls, payment systems, or usage limits;",
        "Use automated tools to overload, disrupt, or manipulate the Services;",
        "Misrepresent AI-generated content as human-produced where disclosure is legally required;",
        "Use the Services in a way that could damage, disable, overburden, or impair the Services.",
      ],
      closing:
        "We reserve the right to investigate suspected violations and take appropriate action, including suspension or termination of access.",
    },
    {
      heading: "8. Intellectual Property",
      body: `The Services, including all software, designs, interfaces, graphics, logos, branding, text, educational content, databases, systems, features, and other materials, are owned by Cena Labs or its licensors and are protected by intellectual property and other laws.

Except for your User Content, you do not acquire ownership of any rights in the Services.

You may not copy, reproduce, distribute, modify, publicly display, publicly perform, create derivative works from, sell, license, or exploit any part of the Services without our prior written consent.

Subject to your compliance with these Terms, Cena Labs grants you a limited, revocable, non-exclusive, non-transferable license to access and use the Services for personal, non-commercial educational purposes.`,
    },
    {
      heading: "9. Subscriptions and Payments",
      body: `Certain features of Prompted may require a paid subscription.

Prompted may offer auto-renewable subscriptions, including monthly and yearly subscription options. Subscription pricing, duration, and included features are displayed in the app before purchase.

Premium features may include, but are not limited to:`,
      bullets: [
        "Access to all learning worlds;",
        "Unlimited or expanded AI feedback;",
        "Advanced projects;",
        "Full Prompt Lab access;",
        "Premium challenges, tools, or educational content.",
      ],
      closing: `If you purchase a subscription through Apple's App Store:

• Payment will be charged to your Apple ID account at confirmation of purchase;
• Your subscription automatically renews unless canceled at least 24 hours before the end of the current billing period;
• Your Apple ID account may be charged for renewal within 24 hours before the end of the current billing period;
• You can manage or cancel your subscription at any time through your Apple ID account settings;
• Cancellation takes effect at the end of the current billing period;
• You will continue to have access to premium features until the end of the paid subscription period;
• Refunds are handled by Apple in accordance with Apple's policies.

We may change subscription pricing, features, or availability from time to time. Any changes will be presented as required by applicable law and platform rules.

If a subscription payment cannot be processed, your access to premium features may be suspended, limited, or terminated.`,
    },
    {
      heading: "10. Free Trials, Promotions, and Offers",
      body: `We may offer free trials, promotional pricing, discounts, or limited-time offers.

Eligibility for trials or promotions may be limited and determined by Cena Labs or the applicable app store.

Unless otherwise stated, trials may automatically convert into paid subscriptions at the end of the trial period. You are responsible for canceling before the trial ends if you do not want to be charged.

Promotional offers may be changed, limited, or discontinued at any time where permitted by law.`,
    },
    {
      heading: "11. Refunds",
      body: `For purchases made through Apple's App Store, refund requests are handled by Apple according to Apple's refund policies.

Cena Labs does not directly process App Store refunds.

For any purchases made outside of Apple's App Store, refunds are provided only where required by law or explicitly stated by Cena Labs in writing.`,
    },
    {
      heading: "12. Third-Party Services",
      body: `The Services may integrate with, link to, or rely on third-party platforms, APIs, models, tools, or services.

We are not responsible for:`,
      bullets: [
        "Third-party content;",
        "Third-party availability;",
        "Third-party terms or policies;",
        "Third-party data handling practices;",
        "Errors, interruptions, or limitations caused by third-party services.",
      ],
      closing:
        "Your use of third-party services may be governed by their own terms and privacy policies.",
    },
    {
      heading: "13. Privacy",
      body: `Your use of the Services is also governed by our Privacy Policy, available at:

https://www.cenalabs.com/apps/prompted/privacy

By using the Services, you acknowledge that we collect, use, and process information as described in our Privacy Policy.`,
    },
    {
      heading: "14. Service Availability and Changes",
      body: `We may modify, update, suspend, limit, or discontinue any part of the Services at any time.

This may include:`,
      bullets: [
        "Adding or removing features;",
        "Updating educational content;",
        "Changing AI-powered functionality;",
        "Performing maintenance;",
        "Restricting access;",
        "Introducing usage limits or quotas;",
        "Changing free or premium feature availability.",
      ],
      closing:
        "We do not guarantee that the Services will always be available, uninterrupted, secure, or error-free.",
    },
    {
      heading: "15. Beta Features",
      body: `From time to time, we may offer experimental, beta, or early-access features.

Beta features may be incomplete, unstable, inaccurate, or changed without notice. We may modify or discontinue beta features at any time.

Use of beta features is at your own risk.`,
    },
    {
      heading: "16. Disclaimers",
      body: `THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE."

TO THE MAXIMUM EXTENT PERMITTED BY LAW, CENA LABS DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF:

• MERCHANTABILITY;
• FITNESS FOR A PARTICULAR PURPOSE;
• NON-INFRINGEMENT;
• ACCURACY;
• RELIABILITY;
• AVAILABILITY;
• SECURITY;
• ERROR-FREE OPERATION.

WE DO NOT WARRANT THAT:

• THE SERVICES WILL MEET YOUR EXPECTATIONS;
• THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE;
• AI-GENERATED OUTPUTS WILL BE ACCURATE OR RELIABLE;
• EDUCATIONAL CONTENT WILL PRODUCE ANY SPECIFIC RESULT;
• ANY ERRORS WILL BE CORRECTED.`,
    },
    {
      heading: "17. Limitation of Liability",
      body: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, CENA LABS AND ITS AFFILIATES, EMPLOYEES, CONTRACTORS, PARTNERS, AND LICENSORS SHALL NOT BE LIABLE FOR:

• INDIRECT DAMAGES;
• INCIDENTAL DAMAGES;
• SPECIAL DAMAGES;
• CONSEQUENTIAL DAMAGES;
• EXEMPLARY DAMAGES;
• LOSS OF PROFITS;
• LOSS OF DATA;
• BUSINESS INTERRUPTION;
• DAMAGES ARISING FROM AI OUTPUTS;
• DAMAGES ARISING FROM USER CONTENT;
• DAMAGES ARISING FROM UNAUTHORIZED ACCESS OR SERVICE INTERRUPTIONS.

TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATING TO THE SERVICES OR THESE TERMS SHALL NOT EXCEED THE GREATER OF:

• THE AMOUNT YOU PAID TO CENA LABS FOR THE SERVICES IN THE 12 MONTHS BEFORE THE CLAIM AROSE; OR
• $100 USD.

Some jurisdictions do not allow certain limitations of liability, so some of the above limitations may not apply to you.`,
    },
    {
      heading: "18. Indemnification",
      body: `You agree to indemnify, defend, and hold harmless Cena Labs, its affiliates, employees, contractors, partners, and licensors from and against any claims, damages, liabilities, losses, costs, and expenses, including reasonable attorneys' fees, arising out of or related to:`,
      bullets: [
        "Your use of the Services;",
        "Your User Content;",
        "Your violation of these Terms;",
        "Your violation of applicable law;",
        "Your violation of third-party rights;",
        "Your misuse of AI-generated outputs.",
      ],
    },
    {
      heading: "19. Termination",
      body: `You may stop using the Services at any time.

We may suspend, restrict, or terminate your access to the Services at any time if:`,
      bullets: [
        "You violate these Terms;",
        "Your use creates risk or legal exposure;",
        "Your conduct may harm the Services, other users, or Cena Labs;",
        "We are required to do so by law;",
        "We discontinue the Services.",
      ],
      closing: `Upon termination, your right to access and use the Services will end immediately.

Sections that by their nature should survive termination shall survive, including provisions related to intellectual property, subscriptions and payments, disclaimers, limitation of liability, indemnification, governing law, and dispute resolution.`,
    },
    {
      heading: "20. Governing Law",
      body: `These Terms shall be governed by and construed in accordance with the laws of the State of North Carolina, without regard to conflict of law principles.

Unless otherwise required by applicable law, any disputes arising out of or relating to these Terms or the Services shall be resolved in the state or federal courts located in North Carolina.`,
    },
    {
      heading: "21. Changes to These Terms",
      body: `We may update these Terms from time to time.

When we update these Terms, we will revise the effective date above. Changes become effective when posted unless otherwise stated.

Your continued use of the Services after updated Terms are posted means you accept the updated Terms.

If you do not agree to the updated Terms, you must stop using the Services.`,
    },
    {
      heading: "22. Contact Information",
      body: `For questions about these Terms, you can contact us at:

Cena Labs
Email: support@cenalabs.com
Additional contact: info@cenalabs.com`,
    },
  ],
};
