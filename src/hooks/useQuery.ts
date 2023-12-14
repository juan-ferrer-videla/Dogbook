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
      action: "append" | "delete"
    }) => {
      const params = new URLSearchParams(searchParams)
      if (action === "append") {
        params.append(name, value)
      } else {
        params.delete(name, value)
      }

      router.replace(pathname + "?" + params.toString())
    },
    [searchParams, router, pathname]
  )

  return {
    createQueryString,
  }
}
