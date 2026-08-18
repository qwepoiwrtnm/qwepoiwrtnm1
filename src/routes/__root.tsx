import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { brand } from "@/config/site";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center bg-background px-5">
      <div className="max-w-md rounded-md border border-border bg-card p-10 text-center">
        <p className="font-display text-7xl font-extrabold text-candy">404</p>
        <h1 className="mt-3 font-display text-2xl font-bold text-foreground">
          This page wandered off
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The link may be old or mistyped. The download page is still right where you left it.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center rounded-md bg-candy px-5 text-sm font-semibold text-black"
          >
            Go home
          </Link>
          <Link
            to="/downloads"
            className="inline-flex min-h-11 items-center rounded-md border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Download Cutie Client
          </Link>
        </div>
      </div>
    </div>
  );
}


function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-candy px-4 py-2 text-sm font-medium text-black transition-colors hover:brightness-110"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cutie Client <3 — Minecraft, but cuter" },
      {
        name: "description",
        content:
          "A fast, polished Minecraft client for Windows and macOS. Free download, no account required.",
      },
      { name: "theme-color", content: "#141414" },
      { property: "og:site_name", content: "Cutie Client <3" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${brand.siteUrl}/og.jpg` },
      { property: "og:image:width", content: "1920" },
      { property: "og:image:height", content: "1088" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${brand.siteUrl}/og.jpg` },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
