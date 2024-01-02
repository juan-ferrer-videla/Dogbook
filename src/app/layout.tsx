import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import SessionProvider from "@/components/SessionProvider"
import Header from "@/components/Header"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "@/components/ui/toaster"
import { GoogleTagManager } from "@next/third-parties/google"

const inter = Inter({ subsets: ["latin"] })

const title = "Bancho"
const description = "Adopta animales que necesitan un hogar"

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
    images: ["/favicon.png"],
  },
  twitter: {
    title,
    description,
    images: ["/favicon.png"],
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
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="container mx-auto grow">{children}</main>
            <footer className="border-t border-t-muted py-8 text-center">
              Desarrollado por{" "}
              <a
                href="https://juan-ferrer.vercel.app"
                className="text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Juan Ferrer
              </a>
            </footer>
            <Toaster />
          </ThemeProvider>
        </body>
      </SessionProvider>
      <GoogleTagManager gtmId="G-RL4CB3FVGV" />
    </html>
  )
}
