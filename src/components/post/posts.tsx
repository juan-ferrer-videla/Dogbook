import React from "react"

import { unstable_noStore as noStore } from "next/cache"
import prisma from "@/lib/prisma"
import { postsPerPage } from "@/types"
import { Pagination } from "@/components/pagination"
import { Post } from "."
import Link from "next/link"

export const Posts = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) => {
  noStore()
  const page = searchParams.page ? Number(searchParams.page) : 1

  const createQueryFilter = (filterQuerys: string[]) => {
    const filters = filterQuerys.reduce(
      (acc, query) => {
        const value = searchParams[query]
        if (typeof value === "string") acc.push({ size: value })
        return acc
      },
      [] as { size: string }[]
    )
    return { OR: filters }
  }

  const sizeQuery = createQueryFilter(["big", "small", "medium"])

  const [postsCount, posts] = await Promise.all([
    prisma.post.count({
      where: {
        AND: [sizeQuery],
      },
    }),
    prisma.post.findMany({
      where: {
        AND: [sizeQuery],
      },
      take: postsPerPage,
      skip: (page - 1) * postsPerPage,
    }),
  ])

  const isEmpty = postsCount === 0

  if (isEmpty)
    return (
      <p className="my-4 md:my-8 lg:my-12">
        No hay publicaciónes por el momento.
      </p>
    )

  return (
    <>
      <ul className="my-4 grid gap-6 md:my-8 md:gap-16 lg:my-12 lg:grid-cols-2 ">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>
              <Post {...post} />
            </Link>
          </li>
        ))}
      </ul>
      <Pagination postsCount={postsCount} />
    </>
  )
}
