import { MailCheck } from "lucide-react";
import { GlassPanel } from "@/components/GlassPanel";

export function EmailVerificationNotice({
  email,
  onResend,
  pending,
}: {
  email?: string;
  onResend?: () => void;
  pending?: boolean;
}) {
  return (
    <GlassPanel className="w-full max-w-md p-7">
      <MailCheck className="size-6 text-blush" aria-hidden="true" />
      <h2 className="mt-3 font-display text-xl font-bold">Check your email</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {email ? (
          <>
            If <span className="text-foreground">{email}</span> can receive mail, a verification
            link is on its way. The link expires in 60 minutes.
          </>
        ) : (
          "If that address can receive mail, a verification link is on its way. The link expires in 60 minutes."
        )}
      </p>
      <p className="mt-3 text-xs text-muted-foreground">
        Didn't get it? Check spam, then request a new link. You can keep using Cutie Client without
        verifying — accounts are optional.
      </p>
      {onResend ? (
        <button
          type="button"
          onClick={onResend}
          disabled={pending}
          className="mt-5 inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm font-medium transition-colors hover:bg-secondary disabled:opacity-60"
        >
          {pending ? "Sending…" : "Resend verification email"}
        </button>
      ) : null}
    </GlassPanel>
  );
}
