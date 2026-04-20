export const site = {
  name: "Cena Labs",
  tagline: "An app studio building quietly useful software.",
  description:
    "Cena Labs is an independent app studio crafting focused, fast, and delightful products for iOS, Android, and the web.",
  url: "https://cenalabs.com",
  email: "info@cenalabs.com",
  supportEmail: "support@cenalabs.com",
  twitter: "@cenalabs",
  foundedYear: 2025,
  location: "Remote",
} as const;

export type Site = typeof site;
