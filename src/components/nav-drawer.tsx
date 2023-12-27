"use client"

import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Home, LogIn, LogOut, Menu, Moon, Plus, Sun } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useTheme } from "next-themes"
import Image from "next/image"

export function NavDrawer() {
  const { data, status } = useSession()
  const [isOpen, setOpen] = useState(false)

  const { setTheme, theme } = useTheme()
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="sm:hidden">
      <Drawer open={isOpen} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <Menu aria-label="Abrir menu" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="grid py-4">
            <div className="my-2 flex flex-wrap items-center space-x-2">
              {data?.user?.image && (
                <Image
                  src={data.user.image}
                  alt="a"
                  width={28}
                  height={28}
                  className="ml-4 h-8 w-8 rounded-full object-contain object-center"
                />
              )}
              {data?.user?.email && (
                <p className="px-4 py-2 text-sm text-muted-foreground">
                  {data.user.email}
                </p>
              )}
            </div>
            {status !== "authenticated" && (
              <Button
                onClick={() => {
                  signIn()
                }}
                variant="ghost"
                disabled={status === "loading"}
                className="justify-start"
              >
                <LogIn className="mr-2 h-4 w-4" />
                <span>Iniciar sesión</span>
              </Button>
            )}
            <Button
              asChild
              variant="ghost"
              className="justify-start"
              onClick={() => {
                setOpen(false)
              }}
            >
              <Link href="/dashboard" className="flex items-center">
                <Plus size={16} className="mr-2" /> Publica
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="justify-start"
              onClick={() => {
                setOpen(false)
              }}
            >
              <Link href="/" className="flex items-center">
                <Home size={16} className="mr-2" /> Inicio
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="justify-start"
              onClick={toggleTheme}
            >
              <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              {theme === "dark" ? "Modo oscuro" : null}
              {theme === "system" ? "Modo sistema" : null}
              {theme === "light" ? "Modo claro" : null}
            </Button>
            {status === "authenticated" && (
              <Button
                onClick={() => {
                  signOut()
                }}
                variant="ghost"
                className="justify-start"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </Button>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
