"use client"

import React from "react"
import type { Post as TPost } from "@prisma/client"
import { Post } from "./Posts"
import { useSearchParams } from "next/navigation"

const FilteredPosts = ({ posts }: { posts: TPost[] }) => {
  const searchParams = useSearchParams()
  const sizes = searchParams.getAll("size")
  const vaccines = searchParams.getAll("vaccines")

  const filters = [...sizes, ...vaccines]

  return (
    <>
      <ul className="grid gap-6 lg:grid-cols-2">
        {posts
          .filter(
            ({
              rabia,
              polivalente,
              polivalente2,
              polivalente_refuerzo,
              size: postSize,
            }) => {
              if (filters.length === 0) return true
              let isValid = true

              const postVaccines = new Set<string>()
              if (rabia) postVaccines.add(rabia)
              if (polivalente) postVaccines.add(polivalente)
              if (polivalente2) postVaccines.add(polivalente2)
              if (polivalente_refuerzo) postVaccines.add(polivalente_refuerzo)

              if (vaccines.length) {
                if (!vaccines.some((vaccine) => postVaccines.has(vaccine)))
                  return false
              }
              if (sizes.length) {
                if (!sizes.some((size) => size === postSize)) return false
              }

              return isValid
            }
          )
          .map((post) => (
            <Post {...post} key={post.id} />
          ))}
      </ul>
    </>
  )
}

export default FilteredPosts
