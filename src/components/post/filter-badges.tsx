"use client"

import { useSearchParams } from "next/navigation"
import React from "react"
import { Badge } from "../ui/badge"
import { vaccines } from "@/types"

export const FilterBadges = () => {
  const searchParams = useSearchParams()
  const polivalente = searchParams.get("polivalente") && vaccines.polivalente
  const polivalente2 = searchParams.get("polivalente2") && vaccines.polivalente2
  const rabia = searchParams.get("rabia") && vaccines.rabia
  const polivalenteRefuerzo =
    searchParams.get("polivalente_refuerzo") && vaccines.polivalente_refuerzo

  const big = searchParams.get("big")
  const medium = searchParams.get("medium")
  const small = searchParams.get("small")

  const filters: string[] = [
    big,
    medium,
    small,
    polivalente,
    polivalente2,
    rabia,
    polivalenteRefuerzo,
  ].reduce((acc, v) => {
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
