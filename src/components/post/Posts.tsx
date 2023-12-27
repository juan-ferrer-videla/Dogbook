import React from "react"

import { unstable_noStore as noStore } from "next/cache"
import prisma from "@/lib/prisma"
import { type VaccinesKeys, postsPerPage, type SplitKeys } from "@/types"
import { Pagination } from "@/components/pagination"
import { Post } from "."

export const Posts = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) => {
  noStore()
  const page = searchParams.page ? Number(searchParams.page) : 1

  const createQueryFilter = (filterQuery: string) => {
    const filter = searchParams[filterQuery]
    if (filter === undefined) return {}
    if (typeof filter === "string") return { [filterQuery]: filter }
    const filters = filter.map((filter) => ({ [filterQuery]: filter }))
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

  const sizeQuery = createQueryFilter("size")

  const postsCount = await prisma.post.count({
    where: {
      AND: [sizeQuery, { OR: [vaccinesArr] }],
    },
  })

  const posts = await prisma.post.findMany({
    where: {
      AND: [sizeQuery, { OR: [vaccinesArr] }],
    },
    take: postsPerPage,
    skip: (page - 1) * postsPerPage,
  })
  return (
    <>
      <ul className="my-4 grid gap-6 md:my-8 md:gap-16 lg:my-12 lg:grid-cols-2 ">
        {posts.map((post) => (
          <Post {...post} key={post.id} />
        ))}
      </ul>
      <Pagination postsCount={postsCount} />
    </>
  )
}
