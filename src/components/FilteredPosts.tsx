"use client"

import React from "react"
import type { Post as TPost } from "@prisma/client"
import { Post } from "./Posts"

const FilteredPosts = ({ posts }: { posts: TPost[] }) => {
  return (
    <>
      <ul className="grid gap-6 lg:grid-cols-2">
        {posts.map((post) => (
          <Post {...post} key={post.id} />
        ))}
      </ul>
    </>
  )
}

export default FilteredPosts
