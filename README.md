# nihaoooo &lt;3 — product website

A production-quality marketing and download site for **nihaoooo &lt;3**, an
independent nihaoo client for Windows and macOS.

> This repository is a **preview/mock build**. Statistics, testimonials,
> screenshots, release notes and status data are clearly marked in
> `src/config/site.ts` and must be replaced with real sources before launch.

---

## 1. Overview

- Free download, **no account required** — accounts are optional and never block a download.
- Real client-side OS detection with a **visible manual platform switcher** (saved in `localStorage`).
- Download URLs come **only** from environment variables — never from query parameters.
- Liquid-glass design system: layered transparency, soft highlights, controlled blur, sparse particles.
- WCAG 2.2 AA targets: skip link, focus-visible rings, keyboard-accessible menus/modals, reduced-motion support, status never conveyed by color alone.

## 2. Technology stack

| Concern | Choice |
| --- | --- |
| Framework | TanStack Start v1 (React 19, file-based routing, SSR) |
| Build | Vite 7 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 via `src/styles.css` (`@theme`, oklch tokens) |
| UI primitives | Radix UI / shadcn components |
| Icons | lucide-react |
| Validation | Zod (client **and** server) |
| Server logic | `createServerFn` server functions |

> The original brief specified Next.js App Router. This workspace is fixed to
> TanStack Start, which provides the same capabilities (SSR, server functions,
> file routing, head metadata). All architectural requirements are met with the
> TanStack equivalents; no Supabase or Firebase is used anywhere.

## 3. Folder structure

```
public/
  brand/          # logo, favicons, icon-192.png, icon-512.png
  screenshots/    # real client captures
  video/          # hero.mp4 + poster
  backgrounds/    # hero stills / low-bandwidth fallbacks
  icons/          # platform + misc icons
  robots.txt
  site.webmanifest
src/
  assets/         # bundled images imported by components
  components/     # Navbar, Hero, DownloadButton, GlassPanel, …
  config/site.ts  # ← ALL editable content lives here
  hooks/          # use-platform (OS detection)
  lib/
    auth.functions.ts  # server functions: signup / signin / reset / support
  routes/         # file-based routes (one file per page)
  styles.css      # design tokens + utilities
.env.example
```

## 4. Local installation

```bash
bun install
cp .env.example .env
bun run dev          # http://localhost:8080
```

Other commands:

```bash
bun run build        # production build
bun run preview      # serve the production build
bun run lint         # eslint
```

## 5. Environment variables

All `VITE_*` values are **public** (bundled into the browser). Everything else is
server-only and must never be prefixed with `VITE_`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_SITE_URL` | optional | Canonical site origin |
| `VITE_SUPPORT_EMAIL` | optional | Shown on the support page |
| `VITE_WINDOWS_DOWNLOAD_URL` | **required for real downloads** | Trusted Windows installer URL |
| `VITE_MACOS_DOWNLOAD_URL` | **required for real downloads** | Trusted macOS installer URL |
| `VITE_WINDOWS_VERSION` / `VITE_MACOS_VERSION` | optional | Displayed version |
| `VITE_WINDOWS_FILE_SIZE` / `VITE_MACOS_FILE_SIZE` | optional | Displayed file size |
| `VITE_WINDOWS_SHA256` / `VITE_MACOS_SHA256` | optional | Checksum block is hidden when unset |
| `VITE_LAST_UPDATED` | optional | Release date shown site-wide |
| `VITE_RELEASE_NOTES_URL` | optional | External changelog link |
| `VITE_STATUS_API_URL` | optional | JSON status endpoint |
| `VITE_HERO_VIDEO_URL` | optional | Hero background video |
| `VITE_ANALYTICS_SRC` | optional | Privacy-respecting analytics script |
| `AUTH_SECRET` | required for accounts | Session/token signing secret |
| `AUTH_DATABASE_URL` | required for accounts | PostgreSQL connection string |
| `RESEND_API_KEY` | required for email | Transactional email |
| `EMAIL_FROM` | required for email | Verified sender address |
| `SUPPORT_EMAIL` | optional | Support inbox routing |

When download URLs are missing, the button shows a clear development-mode
notice instead of a broken link.

## 6. Optional account system

Accounts are **optional by design**: nothing behind them gates a download.

`src/lib/auth.functions.ts` contains the server boundary. Today it:

- validates every payload with Zod **on the server**,
- returns identical, non-enumerating messages for existing and unknown emails,
- exposes a `rateLimitHook(key)` integration point invoked before every credential path,
- reports `auth_not_configured` with setup instructions when `AUTH_SECRET` /
  `AUTH_DATABASE_URL` are absent, so the site never breaks.

To enable real accounts:

1. Provision PostgreSQL and set `AUTH_DATABASE_URL` + `AUTH_SECRET`.
2. Create the schema below.
3. Replace each `notConfigured()` return with your persistence + mail calls.
   Keep the validation and message shapes — they are the security contract.
4. Hash passwords with Argon2id (or bcrypt, cost ≥ 12).
5. Issue **HTTP-only, Secure, SameSite=Lax** session cookies.
6. Wire `rateLimitHook` to a shared store (KV or a Postgres counter).

### Database schema

```sql
create table "User" (
  id             uuid primary key default gen_random_uuid(),
  email          text not null,
  email_lower    text generated always as (lower(email)) stored,
  password_hash  text not null,
  display_name   text,
  email_verified timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create unique index user_email_unique on "User" (email_lower);

create table "Session" (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references "User"(id) on delete cascade,
  session_token text not null unique,
  expires       timestamptz not null,
  created_at    timestamptz not null default now()
);
create index session_user_idx on "Session" (user_id);

create table "VerificationToken" (
  identifier text not null,
  token      text not null unique,
  expires    timestamptz not null,
  created_at timestamptz not null default now(),
  primary key (identifier, token)
);

create table "PasswordResetToken" (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references "User"(id) on delete cascade,
  token      text not null unique,
  expires    timestamptz not null,
  used_at    timestamptz,
  created_at timestamptz not null default now()
);
create index password_reset_user_idx on "PasswordResetToken" (user_id);

create table "NotificationPreference" (
  user_id       uuid primary key references "User"(id) on delete cascade,
  release_email boolean not null default true,
  product_news  boolean not null default false,
  updated_at    timestamptz not null default now()
);
```

Apply it with `psql "$AUTH_DATABASE_URL" -f schema.sql`, or port it to your
migration tool of choice.

## 7. Email setup (Resend)

1. Verify your sending domain in Resend.
2. Set `RESEND_API_KEY` and `EMAIL_FROM`.
3. Send from the server handlers only. Three templates are expected:
   **Verify your email**, **Reset your password**, **Welcome**. Each should carry
   the brand mark, one clear action button, the expiry window, a plain-text
   fallback and a "if you didn't request this, ignore it" note.
4. In development, log the verification URL to the console **only** when
   `import.meta.env.DEV` is true. Never log tokens in production.

## 8. Adding real download URLs

Set `VITE_WINDOWS_DOWNLOAD_URL` and `VITE_MACOS_DOWNLOAD_URL` to absolute HTTPS
URLs on your CDN or object storage. **Do not commit installer binaries.**
Publish checksums with each release and set the matching `*_SHA256` variables.

## 9. Replacing images and video

| Asset | Place it in | Referenced by |
| --- | --- | --- |
| Logo | `public/brand/logo.svg` | `src/components/Logo.tsx` |
| Favicon | `public/favicon.ico`, `public/brand/icon-192.png`, `icon-512.png` | `__root.tsx`, `site.webmanifest` |
| Hero still | `public/backgrounds/hero.jpg` | `media.heroImage` |
| Hero video | `public/video/hero.mp4` | `VITE_HERO_VIDEO_URL` |
| Client screenshots | `public/screenshots/*.jpg` | `media.gallery` |
| Social preview | `public/brand/og.jpg` | route `head()` `og:image` |

The images currently bundled under `src/assets/` are **placeholders** — swap
them for real captures before production.

## 10. Editing content

Everything editable lives in **`src/config/site.ts`**: brand, tagline, nav,
platforms, versions, sizes, checksums, features, FAQ, install steps, testimonials,
trust badges, status services, incidents, release notes, socials, legal text.
No component contains hardcoded marketing copy.

## 11. Connecting a status API

Set `VITE_STATUS_API_URL` to an endpoint returning:

```json
{ "services": [{ "id": "downloads", "name": "Downloads & CDN", "description": "Installer delivery", "status": "operational" }] }
```

`status` accepts `operational | degraded | outage | maintenance`. Without the
variable the dashboard renders the configured preview data and says so.

## 12. Analytics

None ship by default and no tracking cookies are set. Set `VITE_ANALYTICS_SRC`
to a privacy-respecting script URL and mount it from the root route. The site
is fully functional without it. Add consent infrastructure before introducing
any cookie-based tracking.

## 13. Deployment

```bash
bun install
bun run build
```

Publish from the Lovable **Publish** action, or deploy the build output to any
edge/Node host. Set every required environment variable in the hosting
dashboard **before** the first deploy — server secrets are read at request time.

## 14. Security checklist

- [ ] All secrets set in the host, none committed (`.env` is git-ignored)
- [ ] Download URLs are absolute HTTPS values from env, never from query params
- [ ] Zod validation on every server handler (already implemented)
- [ ] Passwords hashed with Argon2id/bcrypt before storage
- [ ] Session cookies: `HttpOnly; Secure; SameSite=Lax`
- [ ] Rate limiting wired into `rateLimitHook`
- [ ] Auth responses do not reveal whether an email exists
- [ ] No stack traces returned to users in production
- [ ] Redirects restricted to a same-origin allowlist (no open redirects)
- [ ] Security headers at the edge: `Strict-Transport-Security`,
      `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
      `Permissions-Policy: geolocation=(), camera=(), microphone=()`
- [ ] CSP starting point:
      `default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self'; frame-ancestors 'none'; base-uri 'self'`

## 15. Production launch checklist

- [ ] Replace placeholder screenshots, hero media, logo and favicons
- [ ] Replace mock statistics, testimonials, incidents and release notes
- [ ] Set real download URLs, versions, sizes and checksums
- [ ] Sign Windows installers (Authenticode) and notarize macOS builds
- [ ] Set `BASE_URL` in `src/routes/sitemap[.]xml.ts` and the sitemap line in `robots.txt`
- [ ] Add the `og:image` absolute URL to leaf routes once the social image exists
- [ ] Legal review of Privacy Policy and Terms; update the review dates
- [ ] Verify the support inbox receives mail
- [ ] Run an accessibility pass (keyboard, screen reader, contrast, reduced motion)
- [ ] Check Core Web Vitals on a throttled mobile connection

---

Cutie Client is an independent project and is not affiliated with Mojang Studios
or Microsoft. Minecraft is a trademark of Microsoft.
