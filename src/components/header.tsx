import React from "react"
import AuthButton from "./auth-button"
import { ToggleTheme } from "./toggle-theme"
import Nav from "./nav"
import Link from "next/link"
import { NavDrawer } from "./nav-drawer"

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-background/80 py-4 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold uppercase ">Bancho</h1>
        </Link>
        <Nav />
        <div className="hidden items-center gap-x-2 sm:flex">
          <ToggleTheme />
          <AuthButton />
        </div>
        <NavDrawer />
      </div>
    </header>
  )
}
