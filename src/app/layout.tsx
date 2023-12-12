import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import SessionProvider from "@/components/SessionProvider"
import Header from "@/components/Header"
import { ThemeProvider } from "@/components/ThemeProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Perruno",
  description: "Aplicacion para adoptar perros",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <SessionProvider>
        <body className={`${inter.className} min-h-screen`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="container mx-auto">{children}</main>
            <footer className="mt-8 border-t border-t-muted py-8 text-center">
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
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  )
}
