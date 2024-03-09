"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"
import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"

const AuthButton = () => {
  const { data, status } = useSession()

  if (data?.user?.image && data.user.name)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Image
            src={data?.user?.image || ""}
            alt="a"
            width={28}
            height={28}
            className="h-8 w-8 rounded-full object-contain object-center"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{data.user.name}</DropdownMenuLabel>
          <DropdownMenuItem disabled>
            <span>{data.user.email}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="text-base" href="/dashboard">
              Publica
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar Sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  return (
    <Button
      onClick={() => {
        signIn("google")
      }}
      disabled={status === "loading"}
    >
      Iniciar sesión
    </Button>
  )
}

export default AuthButton
