"use client"

import { useSearchParams } from "next/navigation"
import React from "react"
import { Badge } from "../ui/badge"

export const FilterBadges = () => {
  const searchParams = useSearchParams()
  const size = searchParams.getAll("size")
  const vaccines = searchParams.getAll("vaccines")
  const filters = [...size, ...vaccines]

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