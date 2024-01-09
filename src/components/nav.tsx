"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const Nav = () => {
  const pathname = usePathname()

  return (
    <nav className="hidden space-x-4 sm:flex">
      <Link href="/" className={pathname === "/" ? "text-primary" : ""}>
        Inicio
      </Link>
      <Link
        href="/dashboard"
        className={pathname === "/dashboard" ? "text-primary" : ""}
      >
        Publica
      </Link>
    </nav>
  )
}

export default Nav
