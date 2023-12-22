"use client"

import { useQuery } from "@/hooks/useQuery"
import { postsPerPage } from "@/types"
import { useSearchParams } from "next/navigation"
import { MouseEventHandler } from "react"

export const PageButton = ({
  number,
  postsCount,
}: {
  number: number
  postsCount: number
}) => {
  const searchParams = useSearchParams()
  const page = searchParams.get("page")
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
  return (
    <button
      disabled={isDisabled}
      onClick={handleQuery}
      className={`${
        number.toString() === page ? "text-primary" : "min-w-[1ch]"
      } `}
    >
      {isDisabled ? "" : number}
    </button>
  )
}
