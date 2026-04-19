import type { Metadata } from "next";
import P from "../src/theme.js";

export const metadata: Metadata = {
  title: "Hometruth",
  description: "Real advice. Real homes. Home truths.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: P.bg }}>
        {children}
      </body>
    </html>
  );
}
