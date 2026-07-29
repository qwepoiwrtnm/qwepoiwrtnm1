/**
 * CENTRAL CONTENT CONFIGURATION
 * ------------------------------------------------------------------
 * Everything a non-engineer might need to change lives in this file.
 * Components read from here — never hardcode marketing copy in JSX.
 *
 * NOTE: This is a preview/mock build. Statistics, testimonials, status
 * data and release notes are clearly marked as MOCK and must be replaced
 * with real sources before production.
 */

import heroBg from "@/assets/hero-bg.jpg";
import shotHud from "@/assets/shot-hud.jpg";
import shotCottage from "@/assets/shot-cottage.jpg";
import shotPlum from "@/assets/shot-plum.jpg";

/** Reads a public env var with a safe fallback (never throws during SSR). */
function env(key: string): string | undefined {
  const value = (import.meta.env as Record<string, string | undefined>)[key];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

export const brand = {
  name: "Cutie Client",
  nameSuffix: "<3",
  fullName: "Cutie Client <3",
  tagline: "Minecraft, but cuter.",
  description:
    "A fast, polished Minecraft client designed to make every session smoother, prettier, and more personal.",
  siteUrl: env("VITE_SITE_URL") ?? "https://cutieclient.example",
  supportEmail: env("VITE_SUPPORT_EMAIL") ?? "support@cutieclient.example",
} as const;

export interface NavItem {
  label: string;
  to: string;
  hash?: string;
}

export const nav: NavItem[] = [
  { label: "Features", to: "/features" },
  { label: "Preview", to: "/", hash: "preview" },
  { label: "FAQ", to: "/faq" },
  { label: "Status", to: "/status" },
  { label: "Support", to: "/support" },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Download", to: "/downloads" },
      { label: "Features", to: "/features" },
      { label: "Release notes", to: "/downloads", hash: "release-notes" },
      { label: "System status", to: "/status" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", to: "/signin" },
      { label: "Create account", to: "/signup" },
      { label: "Verify email", to: "/verify-email" },
      { label: "Your account", to: "/account" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Support & contact", to: "/support" },
      { label: "FAQ", to: "/faq" },
    ],
  },
];

export type PlatformId = "windows" | "macos";

export interface PlatformConfig {
  id: PlatformId;
  label: string;
  shortLabel: string;
  /** Trusted download URL. Comes from env only — never from query params. */
  url?: string;
  version?: string;
  fileSize?: string;
  /** SHA-256 checksum. Hidden entirely when not configured. Never invent one. */
  sha256?: string;
  architectures: string[];
  requirements: string[];
  install: string[];
}

export const platforms: Record<PlatformId, PlatformConfig> = {
  windows: {
    id: "windows",
    label: "Download for Windows",
    shortLabel: "Windows",
    url: env("VITE_WINDOWS_DOWNLOAD_URL"),
    version: env("VITE_WINDOWS_VERSION") ?? "1.8.2",
    fileSize: env("VITE_WINDOWS_FILE_SIZE") ?? "84 MB",
    sha256: env("VITE_WINDOWS_SHA256"),
    architectures: ["x64", "ARM64"],
    requirements: [
      "Windows 10 (build 19041) or newer",
      "8 GB RAM recommended (4 GB minimum)",
      "Java 17+ bundled with the installer",
      "1 GB free disk space",
    ],
    install: [
      "Run the downloaded installer and approve the Windows prompt.",
      "Pick your Minecraft installation folder, or let us detect it.",
      "Launch Cutie Client from the Start menu and sign in to Minecraft.",
    ],
  },
  macos: {
    id: "macos",
    label: "Download for macOS",
    shortLabel: "macOS",
    url: env("VITE_MACOS_DOWNLOAD_URL"),
    version: env("VITE_MACOS_VERSION") ?? "1.8.2",
    fileSize: env("VITE_MACOS_FILE_SIZE") ?? "91 MB",
    sha256: env("VITE_MACOS_SHA256"),
    architectures: ["Apple silicon", "Intel"],
    requirements: [
      "macOS 12 Monterey or newer",
      "8 GB unified memory recommended",
      "Java 17+ bundled with the app",
      "1 GB free disk space",
    ],
    install: [
      "Open the downloaded .dmg and drag Cutie Client to Applications.",
      "On first launch, right-click the app and choose Open.",
      "Sign in to Minecraft and pick a theme — you're done.",
    ],
  },
};

export const downloadMeta = {
  lastUpdated: env("VITE_LAST_UPDATED") ?? "2026-07-14",
  releaseNotesUrl: env("VITE_RELEASE_NOTES_URL"),
  statusApiUrl: env("VITE_STATUS_API_URL"),
} as const;

/** Hero media. Replace with real captures in /public/backgrounds and /public/video. */
export const media = {
  heroImage: heroBg,
  /** Optional hero video path, e.g. "/video/hero.mp4". Poster falls back to heroImage. */
  heroVideo: env("VITE_HERO_VIDEO_URL"),
  previewImage: shotHud,
  previewCaption: "In-client footage • Cozy HUD, minimap and keystrokes",
  // PLACEHOLDER SCREENSHOTS — replace with real client captures before production.
  gallery: [
    { src: shotHud, alt: "Cutie Client HUD with FPS counter, minimap and keystroke widgets", label: "Cozy HUD" },
    { src: shotCottage, alt: "Pastel cottage build rendered with the Blossom shader preset", label: "Blossom preset" },
    { src: shotPlum, alt: "Plum-tinted cavern rendered with the Midnight theme", label: "Midnight theme" },
  ],
} as const;

export const heroContent = {
  eyebrow: "YOUR GAME, YOUR STYLE",
  headlineLead: "Minecraft,",
  headlineAccent: "but cuter.",
  supporting:
    "A fast, polished Minecraft client designed to make every session smoother, prettier, and more personal.",
  availability: "Available for Windows and macOS",
  secondaryCta: { label: "Explore features", to: "/features" },
} as const;

/** MOCK statistics — preview only. Wire to a real source before production. */
export const mockStats = [
  { value: "412,000+", label: "Downloads" },
  { value: "1,850+", label: "Themes shared" },
  { value: "4.9 / 5", label: "Average rating" },
] as const;

export interface Feature {
  title: string;
  description: string;
  icon: string;
  span?: "wide" | "tall" | "normal";
  metric?: string;
}

export const features: Feature[] = [
  {
    title: "Performance you can feel",
    description:
      "A rebuilt render pipeline, chunk batching and smarter entity culling. Most players see a large frame-rate jump on the same hardware.",
    icon: "Gauge",
    span: "wide",
    metric: "+180% avg FPS",
  },
  {
    title: "Custom interface",
    description:
      "Drag, snap and resize every HUD module. Save layouts per world and swap them mid-session.",
    icon: "LayoutDashboard",
    metric: "24 modules",
  },
  {
    title: "Personalized themes",
    description:
      "Pastel, midnight, blossom or your own palette. Themes cover the client UI, chat and in-game overlays.",
    icon: "Palette",
    metric: "40+ presets",
  },
  {
    title: "Setup in one click",
    description:
      "The installer finds your Minecraft folder, bundles Java 17 and keeps vanilla profiles untouched.",
    icon: "Wand2",
  },
  {
    title: "Mods and cosmetics",
    description:
      "Fabric-compatible mod loading plus opt-in cosmetics that render only for other Cutie Client players.",
    icon: "Sparkles",
  },
  {
    title: "Fair-play friendly",
    description:
      "No combat automation, no x-ray, no reach. Built to stay compatible with the anti-cheats popular servers run.",
    icon: "ShieldCheck",
  },
];

export const highlights = [
  { value: "+180%", label: "Average FPS uplift", note: "Measured on a mid-range laptop, vanilla vs. Cutie Client" },
  { value: "3.1s", label: "Cold launch", note: "From click to main menu on an SSD" },
  { value: "0", label: "Trackers bundled", note: "No analytics ship inside the client" },
] as const;

export const previewBenefits = [
  { title: "Smooth performance", body: "Steady frames in busy hubs and huge redstone builds." },
  { title: "Personal customization", body: "Themes, layouts and cosmetics that stay yours." },
  { title: "Easy setup", body: "One installer, no config files, no launcher surgery." },
] as const;

export const installSteps = [
  { title: "Download", body: "Grab the installer for your platform. No account required." },
  { title: "Install", body: "Run it and let Cutie Client detect your Minecraft folder." },
  { title: "Play", body: "Launch, pick a theme, and jump into your world." },
] as const;

/** MOCK testimonials — preview only. */
export const testimonials = [
  {
    quote: "Frames went from stuttery to buttery on the same laptop, and the HUD finally matches my world.",
    author: "mira.exe",
    role: "SMP builder",
  },
  {
    quote: "Setup took under a minute. It didn't touch my vanilla profile, which is exactly what I wanted.",
    author: "toastedbun",
    role: "Community mod",
  },
  {
    quote: "The theme editor is the first one I've actually kept using after week one.",
    author: "velvetfox",
    role: "Content creator",
  },
] as const;

/** MOCK trust badges — replace with real audits/certificates before production. */
export const trustBadges = [
  { label: "Code-signed installers", detail: "Windows Authenticode & Apple notarization" },
  { label: "No bundled adware", detail: "One installer, one product" },
  { label: "Open release notes", detail: "Every build documented" },
  { label: "Fair-play policy", detail: "No combat or vision cheats" },
] as const;

export const faqs = [
  {
    q: "What is Cutie Client?",
    a: "Cutie Client is a desktop Minecraft client focused on performance and personalization. It replaces the default launcher experience with a faster renderer, a customizable HUD, and a theming system — while leaving your vanilla installation intact.",
  },
  {
    q: "Which operating systems are supported?",
    a: "Windows 10 (build 19041) and newer, and macOS 12 Monterey and newer. Both Apple silicon and Intel Macs are supported, along with x64 and ARM64 Windows devices.",
  },
  {
    q: "Do I need an account?",
    a: "No. Downloading and using Cutie Client never requires an account. An optional account only adds update notifications, synced preferences and early-access announcements.",
  },
  {
    q: "How do I install it?",
    a: "Download the installer for your platform, run it, and let it detect your Minecraft folder. On macOS, drag the app into Applications and right-click Open the first time. Full steps live on the Downloads page.",
  },
  {
    q: "Is downloading free?",
    a: "Yes. Cutie Client is free to download and use. You still need your own paid Minecraft: Java Edition account to play.",
  },
  {
    q: "Where can I get support?",
    a: "Use the Support page to email the team, or join the community server linked in the footer. Include your platform, client version and a short description of the issue.",
  },
  {
    q: "How do I verify that my download is authentic?",
    a: "Always download from this website. Installers are code-signed, so your operating system will show the publisher name. When a SHA-256 checksum is published for a release, it appears on the Downloads page and you can compare it against your file.",
  },
  {
    q: "How do updates work?",
    a: "The client checks for updates at launch and installs them in the background with your confirmation. You can disable automatic updates and update manually from the Downloads page instead.",
  },
  {
    q: "Is Cutie Client affiliated with Mojang or Microsoft?",
    a: "No. Cutie Client is an independent project and is not affiliated with, endorsed by, or sponsored by Mojang Studios or Microsoft.",
  },
] as const;

export const legal = {
  disclaimer:
    "Cutie Client is an independent project and is not affiliated with Mojang Studios or Microsoft. Minecraft is a trademark of Microsoft.",
  companyLine: "© " + new Date().getFullYear() + " Cutie Client. All rights reserved.",
  lastReviewed: "2026-07-01",
} as const;

export const socials = [
  { label: "Discord", href: "https://discord.com/", icon: "MessagesSquare" },
  { label: "GitHub", href: "https://github.com/", icon: "Github" },
  { label: "X", href: "https://x.com/", icon: "Twitter" },
] as const;

/** MOCK status services — replace with `downloadMeta.statusApiUrl` in production. */
export const statusServices = [
  { id: "website", name: "Website", description: "Marketing site and documentation" },
  { id: "downloads", name: "Downloads & CDN", description: "Installer delivery and mirrors" },
  { id: "auth", name: "Authentication", description: "Optional account sign-in" },
  { id: "email", name: "Email delivery", description: "Verification and password reset mail" },
  { id: "client", name: "Client services", description: "Update checks, themes and cosmetics" },
] as const;

/** MOCK incident history — preview only. */
export const incidents = [
  {
    date: "2026-07-02",
    title: "Slow installer downloads in EU",
    status: "Resolved",
    body: "A CDN edge node in Frankfurt served installers at reduced throughput for 41 minutes. Traffic was rerouted and the node was rebuilt.",
  },
  {
    date: "2026-06-18",
    title: "Delayed verification emails",
    status: "Resolved",
    body: "Verification emails queued for up to 12 minutes due to an upstream provider incident. No messages were lost.",
  },
  {
    date: "2026-05-29",
    title: "Scheduled maintenance",
    status: "Completed",
    body: "Update-check services were briefly unavailable during a database upgrade. Downloads were unaffected.",
  },
] as const;

/** MOCK release notes — replace with `downloadMeta.releaseNotesUrl`. */
export const releaseNotes = [
  {
    version: "1.8.2",
    date: "2026-07-14",
    items: [
      "Reduced frame pacing hitches when loading distant chunks.",
      "New Blossom and Midnight theme presets.",
      "Fixed HUD layouts not restoring on multi-monitor setups.",
    ],
  },
  {
    version: "1.8.0",
    date: "2026-06-21",
    items: [
      "Rebuilt theme editor with live preview.",
      "Fabric mod compatibility layer out of beta.",
      "Installer now bundles Java 17 on both platforms.",
    ],
  },
] as const;

/**
 * ANALYTICS INTEGRATION POINT
 * No analytics ship by default and no tracking cookies are set.
 * To add a privacy-respecting provider, set VITE_ANALYTICS_SRC and mount the
 * script from src/lib/analytics.ts. The site works fully without it.
 */
export const analyticsScriptSrc = env("VITE_ANALYTICS_SRC");
