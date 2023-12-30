import React from "react"

import { unstable_noStore as noStore } from "next/cache"
import prisma from "@/lib/prisma"
import { type VaccinesKeys, postsPerPage, type SplitKeys } from "@/types"
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
  const polivalente = { polivalente: !!searchParams.polivalente }
  const rabia = { rabia: !!searchParams.rabia }
  const polivalente2 = { polivalente2: !!searchParams.polivalente2 }
  const polivalente_refuerzo = {
    polivalente_refuerzo: !!searchParams.polivalente_refuerzo,
  }
  const vaccinesArr = [
    polivalente,
    rabia,
    polivalente2,
    polivalente_refuerzo,
  ].reduce(
    (acc, vaccine) => {
      if (Object.values(vaccine)[0]) acc.OR.push(vaccine)
      return acc
    },
    { OR: [] } as {
      OR: SplitKeys<Record<VaccinesKeys, boolean>>[]
    }
  )

  const sizeQuery = createQueryFilter(["big", "small", "medium"])

  const [postsCount, posts] = await Promise.all([
    prisma.post.count({
      where: {
        AND: [sizeQuery, { OR: [vaccinesArr] }],
      },
    }),
    prisma.post.findMany({
      where: {
        AND: [sizeQuery, { OR: [vaccinesArr] }],
      },
      take: postsPerPage,
      skip: (page - 1) * postsPerPage,
    }),
  ])

  const isEmpty = postsCount === 0

  if (isEmpty) return <p>No hay publicaciónes por el momento.</p>

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
