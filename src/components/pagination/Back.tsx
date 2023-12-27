"use client"

import { useQuery } from "@/hooks/useQuery"
import { ChevronLeft } from "lucide-react"
import React from "react"
import { Button } from "../ui/button"

export const Back = () => {
  const { createQueryString, getQuery } = useQuery()
  const handleQueryBack = () => {
    const value = (Number(getQuery("page") ?? "1") - 1).toString()
    createQueryString({
      name: "page",
      value,
      action: "set",
    })
  }
  return (
    <Button
      size="sm"
      variant="ghost"
      className="flex items-center px-1 disabled:text-muted"
      onClick={handleQueryBack}
      disabled={Number(getQuery("page")) <= 1}
      aria-label="Navegar hacia la pagina anterior"
    >
      {<ChevronLeft />}
    </Button>
  )
}
