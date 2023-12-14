"use client"

import React from "react"
import type { Post as TPost } from "@prisma/client"
import { Post } from "./Posts"
import { useSearchParams } from "next/navigation"

const FilteredPosts = ({ posts }: { posts: TPost[] }) => {
  const searchParams = useSearchParams()
  const sizes = new Set(searchParams.getAll("size"))
  const vaccines = new Set(searchParams.getAll("vaccines"))

  const categorys = [sizes, vaccines]

  return (
    <>
      <ul className="grid gap-6 lg:grid-cols-2">
        {posts
          .filter((post) => {
            if (categorys.every((set) => set.size === 0)) return true
            return sizes.has(post.size)
          })
          .map((post) => (
            <Post {...post} key={post.id} />
          ))}
      </ul>
    </>
  )
}

export default FilteredPosts
