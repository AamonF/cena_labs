import type { App } from "../types";
import {
  cenaLabsAcceptableUse,
  cenaLabsAiDisclaimer,
  cenaLabsContactPolicy,
  cenaLabsCookies,
  cenaLabsPrivacy,
} from "../legal/cena-labs-pack";
import { promptedTerms } from "../legal/prompted-global";
import { createApp } from "./defaults";

export const PROMPTED_APP_STORE_URL =
  "https://apps.apple.com/us/app/prompted-ai/id6769226494";

export const prompted: App = createApp({
  slug:     "prompted",
  name:     "Prompted",
  tagline:  "Structured AI education built for the real world.",
  headline: "Master modern AI — from first prompts to real workflows.",
  subheadline:
    "Prompted is an AI learning platform that teaches you how to actually use modern AI tools, build workflows, create apps, automate tasks, and think like an AI-native creator or entrepreneur.",
  summary:
    "Structured AI education on iOS — lessons, challenges, streaks, and projects from prompting basics to agents, automations, and real-world workflows.",
  description:
    "Prompted is an AI learning app for iOS 16+ that teaches practical mastery of modern AI tools — ChatGPT, Claude, Gemini, and more — through short lessons, interactive challenges, XP and streaks, and project-based learning for productivity, business, coding, design, and content creation.",
  status:        "live",
  platforms:     ["ios"],
  featured:      false,
  accent:        "#22d3ee",
  iconImage:     "/images/prompted-icon.png",
  category:      "Education",

  pageCopy: {
    howItWorks: {
      heading: "From AI beginner to AI builder in four steps.",
      lead:
        "Prompted is built around fast lessons, practical projects, and constant progression.",
    },
    features: {
      line1: "Everything needed to become AI-native.",
      line2: "Nothing bloated.",
    },
    mistakes: {
      heading: "Learning mistakes Prompted helps users avoid",
      lead:
        "Small habits can slow you down as AI tools evolve. Here is what Prompted is designed to help you fix early.",
    },
    tips: {
      heading: "How to improve faster with AI",
    },
  },

  whatItDoes:
    "Most people only use AI at surface level. Prompted is a guided path—short lessons, checkpoints, streaks, XP, and hands-on projects—that takes you from basics to real builds: picking the right models (e.g. ChatGPT, Claude, Gemini), prompting well, agents and automations, and applying AI across business, coding, design, productivity, and content. You level up by finishing challenges and projects—not by doom-scrolling tutorials.",

  highlights: [
    { label: "Free lessons to start",              icon: "✦" },
    { label: "Interactive AI challenges",          icon: "✦" },
    { label: "Project-based learning",             icon: "✦" },
    { label: "Built for beginners to advanced users", icon: "✦" },
    { label: "iOS 16+ · Rated 12+",                icon: "✦" },
  ],

  howItWorks: [
    {
      title: "Start with beginner-friendly lessons",
      description:
        "Learn core AI concepts through short, interactive lessons designed to feel approachable and rewarding. Topics start simple — understanding models, prompting basics, and AI tools — then expand into advanced workflows and automation systems.",
    },
    {
      title: "Practice with real-world AI challenges",
      description:
        "Complete mini-projects and checkpoints that simulate real use cases: writing prompts, comparing model outputs, building workflows, creating AI-powered apps, and solving practical problems.",
    },
    {
      title: "Unlock progression, streaks, and XP",
      description:
        "Every completed lesson earns XP and progression toward new courses, tools, and advanced paths. Daily streaks, milestones, achievements, and evolving AI companions make learning feel engaging instead of overwhelming.",
    },
    {
      title: "Build real AI skills you can actually use",
      description:
        "By the end of each learning path, users leave with practical workflows, reusable prompts, mini-projects, and systems they can immediately apply to work, business, content creation, coding, or daily life.",
    },
  ],

  screenshots: [
    {
      src: "/images/prompted-quick-look-learn.png",
      variant: "promo",
      alt: "Prompted Learn tab — structured AI Foundations units with bite-sized lessons and progression",
      caption: "Learn — from the ground up",
      subcaption:
        "Follow structured units like AI Foundations with short, interactive lessons that demystify what AI is, how models work, and how to think like an AI-native builder.",
    },
    {
      src: "/images/prompted-quick-look-practice.png",
      variant: "promo",
      alt: "Prompted Prompt Lab — write prompts, get scored feedback, and browse a template library",
      caption: "Practice — sharpen your prompting",
      subcaption:
        "Drop a prompt into the Prompt Lab and Lumi scores it, explains what works, and shows you how to make it stronger. Try examples or browse ready-to-use templates.",
    },
    {
      src: "/images/prompted-quick-look-projects.png",
      variant: "promo",
      alt: "Prompted Projects — hands-on builds with XP, achievements, and Lumi review",
      caption: "Projects — build real things",
      subcaption:
        "Apply what you learn with portfolio-worthy projects across productivity and learning tracks. Earn XP, unlock achievements, and get feedback when you submit.",
    },
  ],

  features: [
    {
      title: "Structured AI learning paths",
      description:
        "Progressive courses covering prompting, model selection, automations, AI agents, coding with AI, business workflows, productivity systems, content generation, and app building.",
    },
    {
      title: "Real-world projects",
      description:
        "Interactive assignments and practical builds that reinforce learning through execution instead of passive watching.",
    },
    {
      title: "AI model comparison training",
      description:
        "Learn when and why to use different models like ChatGPT, Claude, Gemini, image models, coding models, and research tools.",
    },
    {
      title: "XP, streaks, and gamification",
      description:
        "Daily streaks, level progression, achievements, unlockables, and milestone rewards keep users motivated long term.",
    },
    {
      title: "AI workflow builder",
      description:
        "Advanced users can create and save reusable AI systems, prompt chains, automations, and lightweight agents directly inside the app.",
    },
    {
      title: "Personalized learning roadmap",
      description:
        "The app adapts based on user goals — entrepreneurship, coding, school, productivity, content creation, design, or automation.",
    },
  ],

  audience: [
    {
      title: "Beginners trying to understand AI",
      description:
        "People overwhelmed by AI tools who want a clear starting point without technical jargon.",
    },
    {
      title: "Students and young professionals",
      description:
        "Users looking to gain valuable AI skills that improve productivity, creativity, and career opportunities.",
    },
    {
      title: "Creators and entrepreneurs",
      description:
        "People wanting to use AI for content, business systems, automations, research, or launching projects faster.",
    },
    {
      title: "Future builders",
      description:
        "Anyone who wants to go beyond casual prompting and actually learn how to build with AI.",
    },
  ],

  mistakes: [
    {
      heading: "Using the wrong AI model",
      body:
        "Most users treat every AI tool the same. Prompted teaches when to use different models for writing, coding, research, reasoning, visuals, and automation.",
    },
    {
      heading: "Writing weak prompts",
      body:
        "Small prompt changes massively affect output quality. Prompted teaches structure, context framing, iteration, and workflow thinking.",
    },
    {
      heading: "Consuming without practicing",
      body:
        "Watching AI content is not the same as building. Prompted focuses heavily on projects, exercises, and repetition.",
    },
    {
      heading: "Trying advanced workflows too early",
      body:
        "Many beginners jump straight into agents and automation without understanding fundamentals. Prompted builds progression intentionally.",
    },
    {
      heading: "Falling behind as AI evolves",
      body:
        "AI changes fast. Prompted is designed as a living platform that continuously expands with new tools, workflows, and best practices.",
    },
  ],

  tips: [
    {
      heading: "Build projects while learning",
      body:
        "The fastest way to improve is creating real systems — not memorizing terminology. Prompted pushes users toward execution from day one.",
    },
    {
      heading: "Compare outputs between models",
      body:
        "Understanding why one model performs better than another is a major skill advantage. Prompted trains this directly.",
    },
    {
      heading: "Focus on workflows, not single prompts",
      body:
        "Real AI leverage comes from chaining tools, systems, and automations together — not isolated one-off prompts.",
    },
    {
      heading: "Practice consistently",
      body:
        "Short daily lessons compound quickly. XP systems, streaks, and progression mechanics are designed to reinforce long-term learning habits.",
    },
  ],

  links: [
    {
      label: "Download on the App Store",
      href:  PROMPTED_APP_STORE_URL,
      kind:  "store",
      note:  "Free on iOS · iOS 16+, rated 12+",
    },
  ],

  ctaTitle: "Learn AI with direction.",
  ctaBody:
    "Prompted turns AI education into an interactive progression system — helping users move from confusion to real capability through lessons, projects, and hands-on practice.",

  seo: {
    title: "Prompted — Structured AI Learning for the Real World",
    description:
      "Learn practical AI on iOS: prompting, models, agents, automations, and projects — with lessons, XP, and streaks. iOS 16+, rated 12+.",
    keywords: [
      "learn AI app",
      "AI education iOS",
      "ChatGPT course app",
      "prompt engineering app",
      "Claude Gemini tutorial",
      "AI productivity learning",
      "structured AI lessons",
      "AI workflow builder",
      "AI agents learning",
      "Prompted app",
    ],
    ogImage: "/images/prompted-icon.png",
  },

  faq: [
    {
      q: "What is Prompted?",
      a: "Prompted is an AI learning platform for iOS that teaches you how to use modern AI tools in the real world — not just theory. You get structured paths, short lessons, hands-on challenges, projects, streaks, and XP so skills compound over time.",
    },
    {
      q: "Is Prompted beginner friendly?",
      a: "Yes. Paths start with approachable concepts (models, prompting basics, tool landscape) and grow into advanced workflows, automation, and building. Progression is intentional so you are not thrown into agents or complex stacks before you are ready.",
    },
    {
      q: "What kinds of AI tools does it teach?",
      a: "You learn when and how to use major models and ecosystems — for example ChatGPT, Claude, and Gemini — plus how to think about specialized tools for coding, images, research, and automation, as the curriculum expands.",
    },
    {
      q: "Do I need coding experience?",
      a: "No coding background is required to start. Content is designed for beginners through advanced users; builders can go deeper on workflows, lightweight apps, and automation as they progress.",
    },
    {
      q: "Is there a free version?",
      a: "Yes. You can begin with free lessons to try the experience before committing to paid paths or features.",
    },
    {
      q: "Can I build projects inside the app?",
      a: "Yes. Project-based learning is core — you work through exercises and builds (prompts, workflows, automations, mini apps) instead of only watching explanations.",
    },
    {
      q: "How often is content updated?",
      a: "Prompted is built as a living platform: new lessons, tools, workflows, and best practices are added as the AI landscape evolves.",
    },
    {
      q: "Who is Prompted built for?",
      a: "Beginners who want clarity, students and professionals levelling up skills, creators and entrepreneurs shipping faster, and anyone who wants to become an AI-native builder — not just a casual user.",
    },
  ],

  terms:           promptedTerms,
  privacy:         cenaLabsPrivacy,
  aiDisclaimer:    cenaLabsAiDisclaimer,
  cookies:         cenaLabsCookies,
  acceptableUse:   cenaLabsAcceptableUse,
  contactPolicy:   cenaLabsContactPolicy,
});
