"use client"

import { useQuery } from "@/hooks/useQuery"
import { postsPerPage } from "@/types"
import { useSearchParams } from "next/navigation"
import { MouseEventHandler } from "react"
import { Button } from "../ui/button"

export const PageButton = ({
  number,
  postsCount,
}: {
  number: number
  postsCount: number
}) => {
  const searchParams = useSearchParams()
  const page = searchParams.get("page") ?? "1"
  const { createQueryString } = useQuery()
  const handleQuery: MouseEventHandler<HTMLButtonElement> = ({
    currentTarget: { textContent },
  }) => {
    createQueryString({
      name: "page",
      value: textContent ?? "1",
      action: "set",
    })
  }
  const isDisabled = number < 1 || number > Math.ceil(postsCount / postsPerPage)
  if (isDisabled) return null
  const isSelected = Number(page) === number
  return (
    <Button
      disabled={isDisabled}
      onClick={handleQuery}
      variant={isSelected ? "outline" : "ghost"}
      size="sm"
    >
      {isDisabled ? "" : number}
    </Button>
  )
}
