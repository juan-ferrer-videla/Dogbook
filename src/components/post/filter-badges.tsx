"use client"

import { useSearchParams } from "next/navigation"
import React from "react"
import { Badge } from "../ui/badge"

export const FilterBadges = () => {
  const searchParams = useSearchParams()

  const big = searchParams.get("big")
  const medium = searchParams.get("medium")
  const small = searchParams.get("small")

  const filters: string[] = [big, medium, small].reduce((acc, v) => {
    if (v) acc.push(v)
    return acc
  }, [] as string[])

  return (
    <ul className="flex flex-wrap gap-4 ">
      {filters.map((filter) => (
        <Badge key={filter} className="flex items-center">
          {filter}
        </Badge>
      ))}
    </ul>
  )
}
