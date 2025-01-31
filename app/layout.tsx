import './globals.css'
import type { Metadata } from "next"
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ActiveSectionProvider } from "@/context/active-section-context"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://runic2h.github.io'),
  title: "Elton Teo | Portfolio",
  description: "Personal portfolio of Elton Teo, showcasing skills and projects in frontend development and software engineering.",
  icons: {
    icon: "/assets/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ActiveSectionProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ActiveSectionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}