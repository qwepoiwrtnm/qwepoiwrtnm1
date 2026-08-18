import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { BrandIcon } from "@/components/BrandIcon";
import { brand, footerNav, legal, socials } from "@/config/site";

const brandMap: Record<string, "discord" | "x" | "curseforge"> = {
  MessagesSquare: "discord",
  Github: "discord", // fallback, won't be used
  Twitter: "x",
  CurseForge: "curseforge",
};

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {brand.description}
          </p>
          <ul className="flex gap-2">
            {socials
              .filter((s) => s.label !== "GitHub")
              .map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${brand.name} on ${social.label}`}
                    className="grid size-10 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-candy hover:text-candy"
                  >
                    <BrandIcon brand={brandMap[social.icon]} />
                  </a>
                </li>
              ))}
          </ul>
        </div>

        {footerNav.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="font-display text-sm font-bold tracking-wide">{group.title}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to} hash={link.hash}
                    className="text-sm text-muted-foreground transition-colors hover:text-candy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-xs text-muted-foreground sm:px-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl leading-relaxed">{legal.disclaimer}</p>
          <p className="shrink-0">{legal.companyLine}</p>
        </div>
      </div>
    </footer>
  );
}
