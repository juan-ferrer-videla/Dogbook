"use client"

import { useSearchParams } from "next/navigation"

export const useQuery = () => {
  const searchParams = useSearchParams()

  let queryList: Record<string, string> = {}

  searchParams.forEach((value, key) => {
    queryList[key] = value
  })

  return queryList
}
