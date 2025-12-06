import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ConvexClientProvider } from './ConvexClientProvider';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#022c22' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://bizengreenfuture.com'),
  title: {
    default: 'Bizen Green Future Ltd - Innovation Rooted in Sustainability',
    template: '%s | Bizen Green Future Ltd',
  },
  description: 'Pioneering sustainability in Uganda through clean energy, regenerative agriculture, and circular innovation. Exclusive distributor of Supertech combustion technology.',
  keywords: [
    'Bizen Green Future',
    'sustainability Uganda',
    'clean energy Uganda',
    'Supertech combustion',
    'fuel efficiency',
    'emission reduction',
    'organic fertilizers',
    'Calcifeed animal feed',
    'regenerative agriculture',
    'circular economy',
    'green technology Uganda',
    'environmental solutions',
  ],
  authors: [{ name: 'Bizen Green Future Ltd' }],
  creator: 'Bizen Green Future Ltd',
  publisher: 'Bizen Green Future Ltd',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_UG',
    url: 'https://bizengreenfuture.com',
    siteName: 'Bizen Green Future Ltd',
    title: 'Bizen Green Future Ltd - Innovation Rooted in Sustainability',
    description: 'Pioneering sustainability in Uganda through clean energy, regenerative agriculture, and circular innovation.',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Bizen Green Future Ltd Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bizen Green Future Ltd - Innovation Rooted in Sustainability',
    description: 'Pioneering sustainability in Uganda through clean energy, regenerative agriculture, and circular innovation.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://bizengreenfuture.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <ConvexClientProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
