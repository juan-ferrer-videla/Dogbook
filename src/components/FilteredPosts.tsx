"use client"

import React, { useCallback } from "react"
import type { Post as TPost } from "@prisma/client"
import { Post } from "./Posts"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useDebouncedCallback } from "@/hooks/useDebounce"

const FilteredPosts = ({ posts }: { posts: TPost[] }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const filter = searchParams.get("filter") ?? ""
  console.log(filter)

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
    <>
      <div className="mb-2 max-w-sm">
        <Label />
        <Input onChange={handleChange} />
      </div>
      <ul className="grid gap-6 lg:grid-cols-2">
        {posts
          .filter((post) =>
            Object.values(post)
              .join(" ")
              .toLowerCase()
              .includes(filter.toLowerCase())
          )
          .map((post) => (
            <Post {...post} key={post.id} />
          ))}
      </ul>
    </>
  )
}

export default FilteredPosts
