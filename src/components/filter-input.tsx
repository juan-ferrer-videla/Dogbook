"use client"

import { useDebouncedCallback } from "@/hooks/useDebounce"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import React, { useCallback } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export const FilterInput = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleChange = useDebouncedCallback((e) => {
    router.replace(
      e.target.value
        ? pathname + "?" + createQueryString("filter", e.target.value)
        : pathname
    )
  }, 500)

  return (
    <div className="flex flex-wrap space-x-4">
      <div className="mb-6 max-w-sm">
        <Label>Filtros</Label>
        <Input onChange={handleChange} />
      </div>
    </div>
  )
}
