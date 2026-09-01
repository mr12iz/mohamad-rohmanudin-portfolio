import type { Metadata } from 'next';
import { Geist_Mono, Manrope } from 'next/font/google';
import './globals.css';
import CatChat from './components/CatChat';
import EyeCursor from './components/EyeCursor';

const codecFallback = Manrope({
  variable: '--font-codec-fallback',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mrohmanudin.my.id'),
  title: 'Mohamad Rohmanudin | VA & Social Media Manager for Coaches',
  description: 'Strategic content, thoughtful design, and organized virtual assistant support for business and mindset coaches.',
  openGraph: {
    title: 'Mohamad Rohmanudin',
    description: 'Virtual Assistant + Social Media Manager for Coaches',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Mohamad Rohmanudin — Virtual Assistant and Social Media Manager for Coaches' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohamad Rohmanudin',
    description: 'Virtual Assistant + Social Media Manager for Coaches',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${codecFallback.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <CatChat />
        <EyeCursor />
      </body>
    </html>
  );
}
