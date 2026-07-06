import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

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

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
  themeColor: '#f5eedf',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://otaskaya.me/'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Ömer Taşkaya',
    template: '%s | Ömer Taşkaya',
  },
  description:
    'One day of Ömer Taşkaya, compressed into a page — economics at Bocconi, AI, photographs, acid techno, and a dusk by Aivazovsky. Scroll and the day passes.',
  openGraph: {
    title: 'Ömer Taşkaya',
    description:
      'One day, compressed into a page — economics, AI, photographs, acid techno, and a dusk by Aivazovsky.',
    url: 'https://otaskaya.me/',
    siteName: 'Ömer Taşkaya',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ömer Taşkaya',
    description:
      'One day, compressed into a page — economics, AI, photographs, acid techno, and a dusk by Aivazovsky.',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} ${canela.variable} ${canelaRegularItalic.variable} c-fg bg-paper overflow-x-hidden font-sans tracking-tight antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
