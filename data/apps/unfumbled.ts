import type { App } from "../types";
import {
  unfumbledPrivacy,
  unfumbledTerms,
} from "../legal/unfumbled-global";

export const unfumbled: App = {
  slug:          "unfumbled",
  name:          "Unfumbled",
  tagline:       "Stop fumbling. Get the date.",
  headline:      "Know how the chat is going — and what to say next.",
  subheadline:
    "Unfumbled is an AI dating assistant that reads your text threads, scores the vibe, spots mistakes, and suggests copy-paste replies so you stop getting ghosted and start getting better outcomes.",
  summary:
    "AI-powered dating assistant that analyzes conversations (text or screenshots), scores interest and risk, and suggests what to say next.",
  description:
    "Unfumbled helps people dating on iMessage, Snapchat, Instagram DMs, and more. Paste a conversation or upload screenshots; get structured feedback including interest score, ghost risk, power balance, vibe summary, mistake detection, strategic next moves, and suggested replies—fast, minimal input, dark modern UI. Built with React Native (Expo), Supabase, and OpenAI.",
  status:        "live",
  platforms:     ["ios", "android"],
  featured:      true,
  accent:        "#6B5CF6",
  iconImage:     "/images/unfumbled-logo.png",
  category:      "Lifestyle",

  whatItDoes:
    "Most advice is generic. Unfumbled is specific: it looks at your actual thread and tells you how the interaction is going, where you may be misfiring (too dry, over-texting, missing signals, no escalation), and gives you concrete next moves—plus 3–5 short, natural replies in tones like confident, playful, flirty, or chill. Screenshot parsing reads blue/grey bubbles so you do not have to retype everything. Save analyses to build habit and track progress (locally or synced via Supabase). The scoring loop—interest, response quality, momentum, emotional engagement—is built to feel fair and improve over time, not gimmicky.",

  highlights: [
    { label: "Free tier to start",      icon: "✦" },
    { label: "Paste text or screenshots", icon: "✦" },
    { label: "iOS & Android (Expo)",    icon: "✦" },
    { label: "Copy-paste ready replies", icon: "✦" },
  ],

  features: [
    {
      title: "Conversation analysis engine",
      description:
        "Input raw text or screenshots. Output includes Interest Score (0–100), Ghost Risk (low / medium / high), Power Balance (you chasing, balanced, or them chasing), vibe summary, mistake detection with examples, Best Next Move (timing and direction), and multiple suggested reply styles.",
    },
    {
      title: "Screenshot parsing",
      description:
        "Upload chat screenshots; AI extracts messages, order, and tone—recognizing typical iPhone blue (you) vs grey (other) bubbles so setup feels fast and a bit magical.",
    },
    {
      title: "Saved conversations",
      description:
        "Save analyses and reopen them from a clean list of centered cards—local-only or backed by Supabase so you can track progress across devices.",
    },
    {
      title: "Scoring & psychology layer",
      description:
        "Metrics like Interest Score, Response Quality, Momentum, and Emotional Engagement are designed to feel accurate and motivating—not random number slot machines.",
    },
    {
      title: "Suggested replies engine",
      description:
        "Three to five replies per analysis, tuned to sound human: confident, playful, flirty, chill—short lines you can copy and send.",
    },
    {
      title: "Real-time coaching (roadmap)",
      description:
        "Future upgrade: type a message before you send and get quick feedback (too needy, too dry) plus better alternatives.",
    },
  ],

  screenshots: [
    {
      src:         "/images/unfumbled-screen-home.png",
      alt:         "Unfumbled home screen with hero copy, Analyze a Conversation button, and How it works carousel",
      caption:     "Home — start in one tap",
      subcaption:
        "Dark UI with headline, subtext, primary CTA, links to saved results, and a horizontal carousel (e.g. Read the Room with a vibe check, plus ghost detection).",
    },
    {
      src:         "/images/unfumbled-screen-analysis.png",
      alt:         "Your Analysis dashboard with interest score, ghost risk, energy, and score breakdown bars",
      caption:     "Your analysis — the full read",
      subcaption:
        "Interest score in a ring, LOW INTEREST label, ghost risk (e.g. medium), USER CHASING energy, summary line, and bar breakdown for reciprocity, enthusiasm, warmth, chemistry, momentum, ghost risk, and awkwardness.",
    },
    {
      src:         "/images/unfumbled-screen-replies.png",
      alt:         "Generate Reply section with Confident, Funny, and Flirty cards and Key Insight below",
      caption:     "Replies you can send — plus the why",
      subcaption:
        "AI-labeled calibrated replies with copy buttons, regenerate, and a Key Insight that explains effort balance and engagement in plain language.",
    },
  ],

  audience: [
    {
      title:       "Men 18–35 who are actively dating",
      description:
        "Using iMessage, Snapchat, Instagram DMs, and similar—and dealing with ghosting, dry chats, saying the wrong thing, or losing momentum after a strong start.",
    },
    {
      title:       "Anyone who wants texting confidence",
      description:
        "Including socially anxious texters and people getting back into dating after a break—clear, low-judgment feedback on what is going on in the thread.",
    },
    {
      title:       "Screenshot-first users",
      description:
        "If typing out a whole chat is friction, photo upload gets you to answers fast—one of Unfumbled's main edges over tools that only take manual paste.",
    },
    {
      title:       "Builders who care about outcomes",
      description:
        "The product is built around a tight loop: upload or paste → analyze in seconds → copy a reply → send. Metrics and saves exist to reinforce habit and improvement.",
    },
  ],

  links: [
    {
      label: "Download on the App Store",
      href:  "#",
      kind:  "store",
      note:  "Free on iOS 16+",
    },
    {
      label: "Get it on Google Play",
      href:  "#",
      kind:  "store",
      note:  "Free on Android 10+",
    },
  ],

  ctaTitle: "Stop guessing. Reply with a plan.",
  ctaBody:
    "Unfumbled is built for fast feedback—try the free tier, paste or upload a real thread, and walk away with scores, fixes, and copy-ready lines.",

  seo: {
    title: "Unfumbled — AI Texting Assistant for Dating & DMs",
    description:
      "Unfumbled is an AI texting assistant that reads your dating chats, scores the vibe, flags mistakes, and suggests what to say next. Paste text or upload screenshots — free to try on iOS and Android.",
    keywords: [
      "AI texting assistant",
      "AI dating assistant",
      "text conversation help app",
      "what to text her",
      "what to reply",
      "dating chat analyzer",
      "screenshot chat analyzer",
      "AI dating coach app",
      "how to stop getting ghosted",
      "iMessage AI reply",
      "Instagram DM helper",
      "Snapchat texting help",
      "Unfumbled app",
    ],
    ogImage: "/images/unfumbled-screen-home.png",
  },

  howItWorks: [
    {
      title: "1. Paste a chat or upload screenshots",
      description:
        "Drop in a conversation from iMessage, Instagram DMs, Snapchat, or anywhere else. Screenshot parsing reads blue and grey bubbles so you do not have to retype a single message.",
    },
    {
      title: "2. Get a full read on the vibe",
      description:
        "Unfumbled returns an Interest Score, Ghost Risk, Power Balance, and a short vibe summary — so you know whether the other person is actually into it, losing interest, or waiting for you to make a move.",
    },
    {
      title: "3. See your mistakes and the best next move",
      description:
        "The analysis highlights what is working and what is hurting you — dry replies, over-texting, missed escalation, bad timing — and then hands you the Best Next Move for the thread.",
    },
    {
      title: "4. Copy a suggested reply and send",
      description:
        "Get three to five short, natural replies in tones like confident, playful, flirty, or chill. Copy the one that sounds like you, send it, and track how the chat moves from there.",
    },
  ],

  mistakes: [
    {
      heading: "Being too dry",
      body:
        "One-word answers kill momentum. Unfumbled spots low-effort replies and suggests higher-effort alternatives that still sound like you — not a motivational poster.",
    },
    {
      heading: "Over-texting and double-sending",
      body:
        "Multiple messages in a row without a response flips the power balance. The app flags when you are chasing and recommends pacing so you stop burying the thread.",
    },
    {
      heading: "Missing green-light signals",
      body:
        "If they are asking questions, bringing up shared plans, or using playful language, that is an opening to escalate. Unfumbled surfaces those cues and suggests natural next moves — including when to ask someone out.",
    },
    {
      heading: "Escalating too fast",
      body:
        "Jumping from hi to meet up in 3 messages is a common ghost trigger. The scoring layer tracks warmth and momentum so you can read the actual temperature of the chat instead of guessing.",
    },
    {
      heading: "Responding out of anxiety",
      body:
        "Typing a reply just to fill silence is how threads go off the rails. Unfumbled gives you a second opinion in seconds so you can send intentionally, not emotionally.",
    },
  ],

  tips: [
    {
      heading: "Match their energy, then raise it slightly",
      body:
        "If their replies are short, do not write essays — but add one specific callback or playful question. Unfumbled's suggested replies are tuned to do this without feeling forced.",
    },
    {
      heading: "Ask specific questions, not generic ones",
      body:
        "How was your day is a dead end. Specific, personal, or context-aware questions get real answers. Use the Key Insight section to see what the thread is actually missing.",
    },
    {
      heading: "Close loops with a concrete plan",
      body:
        "Once the vibe is good, suggest a time and place — not just let's hang out sometime. The Best Next Move tells you when a thread is ready for that ask.",
    },
    {
      heading: "Save your chats and watch your scores improve",
      body:
        "Pattern recognition is where most people plateau. Saving analyses (locally or via Supabase sync) turns texting into something you can actually get better at.",
    },
  ],

  faq: [
    {
      q: "What does Unfumbled do?",
      a: "You paste a conversation or upload screenshots. We analyze the thread and return a structured report: how interested the other person likely is, ghost risk, who is chasing, a short vibe summary, mistakes to avoid, your best next move, and several suggested replies you can copy. The goal is to reduce fumbled conversations and improve dating outcomes.",
    },
    {
      q: "Is there a free version?",
      a: "Yes. The free tier includes a limited number of analyses per day, basic scoring, and limited reply suggestions—enough to see value quickly. A paid subscription unlocks unlimited analyses, deeper breakdowns, richer replies, insights, and priority processing. Pricing is targeted around a $7–15/month range.",
    },
    {
      q: "Do I need an account?",
      a: "You can start without one for core analysis. Creating an account (or signing in) may be required if you use cloud-backed features such as syncing saved conversations through Supabase.",
    },
    {
      q: "How are screenshots handled?",
      a: "Screenshots are processed to extract message text, order, sender cues (such as bubble colors on typical iPhone layouts), and tone so you do not have to transcribe chats by hand. Image and text are sent to our AI pipeline for that purpose.",
    },
    {
      q: "What data do you collect?",
      a: "We process the conversations and images you submit in order to run analysis. We may store saved analyses and account data if you use those features. We also use limited analytics and crash reporting to improve the app. We do not sell your personal information. See the Privacy Policy for details on AI subprocessors (such as OpenAI) and hosting (such as Supabase).",
    },
    {
      q: "How is this different from generic chatbots?",
      a: "Unfumbled is tuned for dating dynamics: scores, ghost risk, balance of pursuit, concrete mistakes, and short replies—not long essays. Screenshot parsing and a gamified, repeatable scoring model are core differentiators.",
    },
    {
      q: "What iOS and Android versions are supported?",
      a: "Unfumbled targets iOS 16 or later and Android 10 or later. The app is built with React Native (Expo).",
    },
    {
      q: "Who can use Unfumbled?",
      a: "The product is intended for adults. If you are under 18, please do not use the App.",
    },
  ],

  legalCanonicalPaths: {
    privacy: "/privacy",
    terms:   "/terms",
  },

  privacy: unfumbledPrivacy,

  terms: unfumbledTerms,
};
