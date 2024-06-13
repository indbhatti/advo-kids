import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './navbar'
import Footer from './footer'
import Info from './info'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Advo-Kids',
  description: 'Advo-Kids an app for the youth to learn about the law',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Info />
        <Footer />
      </body>
    </html>
  )
}
