"use client"

import React from "react"
import type { Post as TPost } from "@prisma/client"
import { Post } from "./Posts"
import { useSearchParams } from "next/navigation"

const FilteredPosts = ({ posts }: { posts: TPost[] }) => {
  const searchParams = useSearchParams()
  const filter = searchParams.get("filter") ?? ""

  return (
    <>
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
