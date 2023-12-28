"use client"

import React from "react"
import AuthButton from "./AuthButton"
import { ToggleTheme } from "./ToggleTheme"
import Nav from "./Nav"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { NavDrawer } from "./nav-drawer"

const Header = () => {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  return (
    <header className="sticky top-0 z-10 bg-background/80 py-4 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold uppercase ">Perruno</h1>
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

export default Header
