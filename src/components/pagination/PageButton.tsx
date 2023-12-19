"use client"

import { useQuery } from "@/hooks/useQuery"
import { MouseEventHandler } from "react"

export const PageButton = ({ number }: { number: number }) => {
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
  return <button onClick={handleQuery}>{number}</button>
}
