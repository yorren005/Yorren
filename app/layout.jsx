import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata = {
  metadataBase: new URL('https://yorren.com'),
  title: {
    default: 'YORREN | Cognitive Architecture & Human Adaptation',
    template: '%s | YORREN',
  },
  description: 'An initiative to rethink human capability in the era of artificial intelligence. We are building the definitive framework for extreme human adaptation.',
  keywords: ['cognitive architecture', 'human adaptation', 'neuroplasticity', 'AI synergy', 'Yorren protocol', 'human potential'],
  authors: [{ name: 'Yorren' }],
  creator: 'Yorren',
  publisher: 'Yorren',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'YORREN | Cognitive Architecture & Human Adaptation',
    description: 'An initiative to rethink human capability in the era of artificial intelligence.',
    url: 'https://yorren.com',
    siteName: 'YORREN',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YORREN | Cognitive Architecture & Human Adaptation',
    description: 'An initiative to rethink human capability in the era of artificial intelligence.',
    creator: '@yorren',
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
    icon: '/assets/logo-cropped.png',
    apple: '/assets/logo-cropped.png',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'YORREN',
    url: 'https://yorren.com',
    logo: 'https://yorren.com/assets/logo-cropped.png',
    description: 'An initiative to rethink human capability in the era of artificial intelligence.',
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer showTagline />
      </body>
    </html>
  );
}
