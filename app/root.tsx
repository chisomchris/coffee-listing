import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

// Google Fonts
export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-[#111315] min-h-screen flex flex-col">
        <div className="fixed top-0 left-0 w-full over-hidden">
          <img
            srcSet="bg-cafe-sm.jpg 640w, bg-cafe.jpg 1280w, bg-cafe-lg.jpg 1920w"
            sizes=" (max-width: 600px) 640px, (max-width: 1280px) 1280px, 1920px"
            src="bg-cafe-sm.jpg"
            alt="Background banner"
            className="w-full object-cover object-center min-h-[240px]" />
        </div>
        <div className="max-w-[1200px] w-11/12 mx-auto mt-[120px] relative z-10 min-[1440px]:mt-[180px]">
          {children}
        </div>
        <footer className="mt-auto pb-4">
          <div className="author-info text-[14px] text-center mt-[16px] text-[rgb(55,65,81)]">
            Coded by <a href="https://github.com/chisomchris" target="_blank" rel="noreferrer">Chisomchris</a> | Challenge by {" "}
            <a href="https://www.devchallenges.io?ref=challenge" target="_blank" rel="noreferrer"
            >devChallenges.io</a
            >.
          </div>
        </footer>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

{/* Root Error Boundary */ }
export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html lang="en">
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Oh no!</h1>
        <p>Something went wrong.</p>
        <Scripts />
      </body>
    </html>
  );
}
