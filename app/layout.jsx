import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-outfit' });

export const metadata = {
  metadataBase: new URL('https://yorren.com'),
  title: {
    default: 'Yorren | Reinventing humanity',
    template: '%s | Yorren',
  },
  description: 'Reinventing humanity. An initiative to rethink human capability in the era of artificial intelligence.',
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
    title: 'Yorren | Reinventing humanity',
    description: 'Reinventing humanity. An initiative to rethink human capability in the era of artificial intelligence.',
    url: 'https://yorren.com',
    siteName: 'Yorren',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yorren | Reinventing humanity',
    description: 'Reinventing humanity. An initiative to rethink human capability in the era of artificial intelligence.',
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
    icon: '/eye.png?v=4',
    apple: '/eye.png?v=4',
  },
  verification: {
    google: 'zoeeH_5ohc-QF1gs9jeN9uQaUNkCeClRIafupwowdko',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://yorren.com/#organization',
        name: 'Yorren',
        alternateName: ['yorren'],
        url: 'https://yorren.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://yorren.com/assets/logo-cropped.png'
        },
        image: 'https://yorren.com/assets/logo-cropped.png',
        description: 'Yorren is an intellectual and creative initiative exploring human capability, philosophy, psychology, technology, and the future of society in the era of artificial intelligence.',
        slogan: 'Rethinking human capability in the era of artificial intelligence.',
        founder: {
          '@id': 'https://yorren.com/#founder'
        },
        sameAs: [
          'https://x.com/Yorren174900',
          'https://www.instagram.com/yorrenofficial/',
          'https://pin.it/1Ayc7D4Zi'
        ],
        knowsAbout: [
          'Artificial Intelligence', 'Philosophy', 'Psychology', 'Political Thought',
          'Cultural Commentary', 'Human Potential', 'Technology', 'Mental Models',
          'Future of Society', 'Behavioral Science'
        ],
        keywords: [
          'AI', 'philosophy', 'psychology', 'human capability', 'future',
          'mental models', 'technology', 'culture'
        ],
        areaServed: {
          '@type': 'Place',
          name: 'Worldwide'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          url: 'https://yorren.com/contact'
        }
      },
      {
        '@type': 'Person',
        '@id': 'https://yorren.com/#founder',
        name: 'Yogeshwaran',
        givenName: 'Yogeshwaran',
        alternateName: ['Yorren', 'Yogesh', 'Yogi'],
        url: 'https://yorren.com/about',
        image: {
          '@type': 'ImageObject',
          url: 'https://yorren.com/assets/yogeshwaran-1.jpg'
        },
        jobTitle: 'Founder & Creative Director',
        description: 'Philosopher, creator, and public intellectual exploring psychology, philosophy, technology, culture, and artificial intelligence.',
        nationality: {
          '@type': 'Country',
          name: 'India'
        },
        worksFor: {
          '@id': 'https://yorren.com/#organization'
        },
        sameAs: [
          'https://x.com/Yorren174900',
          'https://www.instagram.com/yorrenofficial/',
          'https://pin.it/1Ayc7D4Zi'
        ],
        knowsAbout: [
          'Philosophy', 'Psychology', 'Artificial Intelligence', 'Cultural Analysis',
          'Political Philosophy', 'Human Behavior', 'Content Creation', 'Storytelling'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://yorren.com/#website',
        url: 'https://yorren.com',
        name: 'Yorren',
        publisher: {
          '@id': 'https://yorren.com/#organization'
        },
        inLanguage: 'en',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://yorren.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      }
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
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
