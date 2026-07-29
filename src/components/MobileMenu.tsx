import { Link } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { nav, brand } from "@/config/site";

/**
 * Accessible mobile navigation. Radix Sheet provides focus trapping,
 * escape-to-close and correct dialog semantics.
 */
export function MobileMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="glass-strong w-[88vw] max-w-sm border-l">
        <SheetHeader className="text-left">
          <SheetTitle className="font-display">{brand.fullName}</SheetTitle>
          <SheetDescription>{brand.tagline}</SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile" className="mt-6 px-4">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  onClick={() => onOpenChange(false)}
                  className="block rounded-2xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/signin"
                onClick={() => onOpenChange(false)}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Sign in
              </Link>
            </li>
          </ul>

          <Link
            to="/downloads"
            onClick={() => onOpenChange(false)}
            className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-[image:var(--gradient-candy)] px-6 text-base font-semibold text-primary-foreground shadow-[var(--shadow-glow)]"
          >
            Download
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
