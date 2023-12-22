"use client"

import { Back } from "./Back"
import { Foward } from "./Foward"
import { PageButton } from "./PageButton"
import { postsPerPage } from "@/types"
import { useSearchParams } from "next/navigation"

export const Pagination = ({ postsCount }: { postsCount: number }) => {
  const pagesCount = Math.ceil(postsCount / postsPerPage)
  const searchParams = useSearchParams()

  if (pagesCount === 1) return null

  const pageParams = searchParams.get("page")
  const page = pageParams ? Number(pageParams) : 1

  return (
    <ul className="my-4 flex flex-wrap items-center justify-center gap-x-2 p-2">
      <li>
        <Back />
      </li>

      <li>
        <PageButton number={page - 2} postsCount={postsCount} />
      </li>
      <li>
        <PageButton number={page - 1} postsCount={postsCount} />
      </li>
      <li>
        <PageButton number={page} postsCount={postsCount} />
      </li>
      <li>
        <PageButton number={page + 1} postsCount={postsCount} />
      </li>
      <li>
        <PageButton number={page + 2} postsCount={postsCount} />
      </li>

      <li>
        <Foward disabled={page * postsPerPage >= postsCount} />
      </li>
    </ul>
  )
}
