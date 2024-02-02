import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import SessionProvider from "@/components/session-provider"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

const title = "Bancho"
const description = "Adopta animales que necesitan un hogar"

const images = {
  url: "/favicon.png",
  width: 600,
  height: 600,
}

export const metadata: Metadata = {
  title,
  description,
  authors: {
    name: "Juan Ferrer",
    url: "https://juan-ferrer.vercel.app/",
  },
  keywords: ["Adoptar", "Animales", "Perros"],

  creator: "Juan Ferrer",
  openGraph: {
    title,
    description,
    images,
  },
  twitter: {
    title,
    description,
    images,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <SessionProvider>
        <body className={`${inter.className} flex min-h-screen flex-col`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="container mx-auto grow">{children}</main>
            <footer className="border-t border-t-muted py-8 text-center">
              <small>
                Desarrollado por{" "}
                <a
                  href="https://juan-ferrer.vercel.app"
                  className="text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Juan Ferrer
                </a>
              </small>
            </footer>
            <Toaster />
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  )
}
