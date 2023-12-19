"use client"

import { useQuery } from "@/hooks/useQuery"
import React from "react"

export const Back = () => {
  const { createQueryString, getQuery } = useQuery()
  const handleQueryBack = () => {
    const value = (Number(getQuery("page") ?? "1") - 1).toString()
    createQueryString({
      name: "page",
      value,
      action: "set",
    })
  }
  return (
    <button onClick={handleQueryBack} disabled={Number(getQuery("page")) <= 1}>
      Back
    </button>
  )
}
