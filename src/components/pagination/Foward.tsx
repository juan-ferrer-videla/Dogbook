"use client"

import { useQuery } from "@/hooks/useQuery"
import { ChevronRight } from "lucide-react"
import type { ComponentProps, FC } from "react"

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
    <button
      onClick={handleQueryFoward}
      disabled={disabled}
      className="flex items-center disabled:text-muted"
    >
      {<ChevronRight />}
    </button>
  )
}