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
    <html lang="es">
      <SessionProvider>
        <body className={`${inter.className} min-h-screen pb-8`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="container mx-auto">{children}</main>
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  )
}
