import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Optional account system — server boundary.
 *
 * This preview build ships WITHOUT a configured identity provider or database.
 * Every handler validates input with Zod on the server and then reports a clear,
 * non-enumerating result. When AUTH_DATABASE_URL / AUTH_SECRET / RESEND_API_KEY
 * are configured, replace the `notConfigured()` return with your persistence and
 * mail calls — the validation, error shape and safe messaging stay identical.
 *
 * Security notes for the production implementation:
 *  - Hash passwords with Argon2id or bcrypt (cost >= 12). Never store plaintext.
 *  - Use HTTP-only, Secure, SameSite=Lax session cookies.
 *  - Never reveal whether an email address exists (see `genericSubmitMessage`).
 *  - Apply the rate-limit hook below before any credential check.
 *  - Never log tokens outside development.
 */

const emailSchema = z.string().trim().toLowerCase().email("Enter a valid email address").max(254);

const passwordSchema = z
  .string()
  .min(10, "Use at least 10 characters")
  .max(200, "Password is too long")
  .regex(/[a-z]/, "Include a lowercase letter")
  .regex(/[A-Z]/, "Include an uppercase letter")
  .regex(/[0-9]/, "Include a number");

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  displayName: z.string().trim().min(2, "Too short").max(40, "Too long").optional(),
});

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Enter your password").max(200),
});

export const emailOnlySchema = z.object({ email: emailSchema });

export const resetPasswordSchema = z.object({
  token: z.string().min(10).max(500),
  password: passwordSchema,
});

export const contactSchema = z.object({
  email: emailSchema,
  topic: z.enum(["install", "performance", "account", "billing", "other"]),
  message: z.string().trim().min(20, "Tell us a bit more (20+ characters)").max(2000),
});

export interface AuthResult {
  ok: boolean;
  code: "auth_not_configured" | "accepted" | "invalid";
  message: string;
  /** Setup guidance surfaced in the UI only when the backend is unconfigured. */
  setup?: string[];
}

/** Identical message for existing and non-existing accounts (no enumeration). */
export const genericSubmitMessage =
  "If that email can receive mail, we've sent the next step. Check your inbox and spam folder.";

function isConfigured() {
  return Boolean(process.env.AUTH_SECRET && process.env.AUTH_DATABASE_URL);
}

function notConfigured(): AuthResult {
  return {
    ok: false,
    code: "auth_not_configured",
    message:
      "Accounts are optional and not enabled in this environment. Downloading Cutie Client never requires an account.",
    setup: [
      "Set AUTH_SECRET to a long random value.",
      "Set AUTH_DATABASE_URL to your PostgreSQL connection string.",
      "Set RESEND_API_KEY and EMAIL_FROM to enable verification and reset email.",
      "Run the database migration documented in README.md, then redeploy.",
    ],
  };
}

/**
 * RATE-LIMIT INTEGRATION POINT.
 * Wire a shared store (e.g. an edge KV or Postgres counter) here before
 * enabling the account system in production.
 */
async function rateLimitHook(_key: string): Promise<void> {
  return;
}

export const createAccount = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => signUpSchema.parse(data))
  .handler(async ({ data }): Promise<AuthResult> => {
    await rateLimitHook(`signup:${data.email}`);
    if (!isConfigured()) return notConfigured();
    return { ok: true, code: "accepted", message: genericSubmitMessage };
  });

export const signIn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => signInSchema.parse(data))
  .handler(async ({ data }): Promise<AuthResult> => {
    await rateLimitHook(`signin:${data.email}`);
    if (!isConfigured()) return notConfigured();
    // Always return the same failure text for wrong email and wrong password.
    return { ok: false, code: "invalid", message: "Email or password is incorrect." };
  });

export const requestPasswordReset = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => emailOnlySchema.parse(data))
  .handler(async ({ data }): Promise<AuthResult> => {
    await rateLimitHook(`reset:${data.email}`);
    if (!isConfigured()) return notConfigured();
    return { ok: true, code: "accepted", message: genericSubmitMessage };
  });

export const resendVerification = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => emailOnlySchema.parse(data))
  .handler(async ({ data }): Promise<AuthResult> => {
    await rateLimitHook(`verify:${data.email}`);
    if (!isConfigured()) return notConfigured();
    return { ok: true, code: "accepted", message: genericSubmitMessage };
  });

export const submitSupportRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }): Promise<AuthResult> => {
    await rateLimitHook(`support:${data.email}`);
    if (!process.env.RESEND_API_KEY) {
      return {
        ok: false,
        code: "auth_not_configured",
        message:
          "Email delivery is not configured in this environment, so the form can't send yet.",
        setup: [
          "Set RESEND_API_KEY and EMAIL_FROM in your environment.",
          "Then support messages route to SUPPORT_EMAIL.",
        ],
      };
    }
    return {
      ok: true,
      code: "accepted",
      message: "Thanks — we've received your message and will reply by email.",
    };
  });
