"use client"

import { useQuery } from "@/hooks/useQuery"
import React from "react"

export const FilterList = () => {
  const query = useQuery()
  console.log(query)

  return <div>FilterList</div>
}
