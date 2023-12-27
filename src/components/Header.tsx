"use client"

import React from "react"
import AuthButton from "./AuthButton"
import { ToggleTheme } from "./ToggleTheme"
import Nav from "./Nav"
import { Dog } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const Header = () => {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  return (
    <header className="sticky top-0 bg-background/80 py-4 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold uppercase ">Perruno</h1>
        </Link>
        <Nav />
        <div className="flex items-center gap-x-2">
          <ToggleTheme />
          <AuthButton />
        </div>
      </div>
    </header>
  )
}

export default Header
