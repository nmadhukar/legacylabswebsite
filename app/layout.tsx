import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: 'Legacy Labs | CAP-Accredited Clinical Reference Laboratory',
    template: '%s | Legacy Labs'
  },
  description: 'CAP-accredited clinical reference laboratory specializing in toxicology testing plus comprehensive diagnostics for institutional healthcare partners.',
  keywords: ['toxicology testing', 'clinical laboratory', 'CAP accredited', 'diagnostic testing', 'healthcare laboratory'],
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#D35400',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
