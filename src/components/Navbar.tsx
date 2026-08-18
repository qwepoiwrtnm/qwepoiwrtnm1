import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { BrandIcon } from "@/components/BrandIcon";
import { nav } from "@/config/site";
import { cn } from "@/lib/utils";

const topSocials = [
  { label: "Discord", href: "https://discord.com/", brand: "discord" as const },
  { label: "X", href: "https://x.com/", brand: "x" as const },
  { label: "CurseForge", href: "https://www.curseforge.com/", brand: "curseforge" as const },
];

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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm transition-all duration-200",
        scrolled && "shadow-[0_1px_0_0_oklch(1_0_0_/_6%)]",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                hash={item.hash}
                className={cn(
                  "rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                  pathname === item.to
                    ? "text-candy"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Social icons — top right */}
          <ul className="hidden items-center gap-1 sm:flex">
            {topSocials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Cutie Client on ${social.label}`}
                  className="grid size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:text-candy"
                >
                  <BrandIcon brand={social.brand} />
                </a>
              </li>
            ))}
          </ul>

          <Link
            to="/signin"
            className="hidden rounded-md px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground lg:inline-flex"
          >
            Sign in
          </Link>
          <Link
            to="/downloads"
            className="inline-flex items-center rounded-md bg-candy px-4 py-2 text-sm font-semibold text-black transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          >
            Download
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            className="grid size-10 place-items-center rounded-md border border-border text-foreground lg:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
    </header>
  );
}
