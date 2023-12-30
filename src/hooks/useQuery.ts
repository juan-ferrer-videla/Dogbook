"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export const useQuery = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const createQueryString = useCallback(
    ({
      name,
      value,
      action,
    }: {
      name: string
      value: string
      action: "append" | "delete" | "set"
    }) => {
      const params = new URLSearchParams(searchParams)

      params[action](name, value)
      router.replace(pathname + "?" + params.toString(), { scroll: false })
    },
    [searchParams, router, pathname]
  )

  const getQuery = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams)
      return params.get(name)
    },
    [searchParams]
  )

  return {
    createQueryString,
    getQuery,
  }
}
