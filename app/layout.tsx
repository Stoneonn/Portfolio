import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'

const canela = localFont({
  src: './fonts/Canela-Medium.ttf',
  variable: '--font-canela',
  weight: '500',
})

const canelaRegularItalic = localFont({
  src: './fonts/CanelaDeck-RegularItalic-Trial.otf',
  variable: '--font-canela-italic',
  weight: '400',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://otaskaya.me/'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Ömer Taşkaya — это я',
    template: '%s | Ömer Taşkaya',
  },
  description:
    'I am Ömer: a founder, student, researcher and much more. This is me, and my portfolio.',
  openGraph: {
    title: 'Ömer Taşkaya — это я',
    description:
      'I am Ömer: a founder, student, researcher and much more. This is me, and my portfolio.',
    url: 'https://otaskaya.me/',
    siteName: 'Ömer Taşkaya',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ömer Taşkaya — это я',
    description:
      'I am Ömer: a founder, student, researcher and much more. This is me, and my portfolio.',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} ${canela.variable} ${canelaRegularItalic.variable} overflow-x-hidden bg-[#FAFAFA] tracking-tight antialiased dark:bg-zinc-950`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
            <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-8 pt-12 md:px-4">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
