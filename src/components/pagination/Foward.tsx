"use client"

import { useQuery } from "@/hooks/useQuery"
import { ChevronRight } from "lucide-react"
import type { ComponentProps, FC } from "react"
import { Button } from "../ui/button"

export const Foward: FC<Pick<ComponentProps<"button">, "disabled">> = ({
  disabled,
}) => {
  const { createQueryString, getQuery } = useQuery()
  const handleQueryFoward = () => {
    const value = (Number(getQuery("page") ?? "1") + 1).toString()
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
      onClick={handleQueryFoward}
      disabled={disabled}
      className="flex items-center px-1 disabled:text-muted"
      aria-label="Navegar hacia la pagina posterior"
    >
      {<ChevronRight />}
    </Button>
  )
}
