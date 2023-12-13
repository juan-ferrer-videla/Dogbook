import React from "react"
import AuthButton from "./AuthButton"
import { ToggleTheme } from "./ToggleTheme"
import Nav from "./Nav"

const Header = () => {
  return (
    <header className="py-4">
      <div className="container mx-auto flex justify-between">
        <h1>Perruno</h1>
        <Nav />
        <div className="flex items-center gap-x-4">
          <ToggleTheme />
          <AuthButton />
        </div>
      </div>
    </header>
  )
}

export default Header
