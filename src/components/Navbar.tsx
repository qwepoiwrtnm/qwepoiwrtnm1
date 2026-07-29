import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { nav } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex max-w-6xl items-center gap-3 rounded-full border px-3 py-2.5 transition-all duration-300 sm:px-4",
          "backdrop-blur-xl",
          scrolled
            ? "border-[oklch(1_0_0_/_16%)] bg-[oklch(0.16_0.04_320_/_88%)] shadow-[var(--shadow-soft)]"
            : "border-[oklch(1_0_0_/_10%)] bg-[oklch(0.16_0.04_320_/_45%)]",
        )}
      >
        <Logo className="shrink-0" />

        <ul className="mx-auto hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to} hash={item.hash}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  pathname === item.to
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Link
            to="/signin"
            className="hidden rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            to="/downloads"
            className="inline-flex items-center rounded-full bg-[image:var(--gradient-candy)] px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Download
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            className="grid size-11 place-items-center rounded-full border border-border text-foreground lg:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
    </header>
  );
}
