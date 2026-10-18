import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'qrgdg — Ücretsiz ve Hızlı QR Kod Oluşturucu',
  description:
    'qrgdg ile Wi-Fi, WhatsApp, Instagram, vCard, link ve tüm formatlarda anında ücretsiz QR kod oluşturun, PNG ve SVG indirin.',
  keywords: [
    'qrgdg',
    'qr kod oluşturucu',
    'ücretsiz qr kod',
    'wifi qr kod',
    'whatsapp qr kod',
    'instagram qr kod',
    'vcard qr kod',
    'svg qr kod indir',
  ],
  authors: [{ name: 'qrgdg' }],
  creator: 'qrgdg',
  openGraph: {
    title: 'qrgdg — Ücretsiz QR Kod Oluşturucu',
    description: 'Wi-Fi, WhatsApp, Instagram, vCard ve 28+ türde ücretsiz QR kod oluşturun.',
    type: 'website',
    locale: 'tr_TR',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 antialiased selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
        {children}
      </body>
    </html>
  );
}
