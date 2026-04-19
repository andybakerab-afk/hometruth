import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'HomeTruth — Real advice. Real homes.',
  description: 'AI-powered property buying intelligence for Melbourne. Nick is your buyer\'s advocate.',
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F7F3EE',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="app-shell">
          <header className="app-header">
            <div className="app-logo">
              Home<span>Truth</span>
            </div>
            <div className="eyebrow">by Pickle</div>
          </header>
          <main className="app-main">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
