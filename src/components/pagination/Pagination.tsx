import { Back } from "./Back"
import { Foward } from "./Foward"
import { PageButton } from "./PageButton"
import { unstable_noStore as noStore } from "next/cache"
import prisma from "@/lib/prisma"
import { postsPerPage } from "@/types"

export const Pagination = async ({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>
}) => {
  noStore()
  const max = await prisma.post.count()
  const page = searchParams.page ? Number(searchParams.page) : 1

  return (
    <div>
      <ul>
        <li>
          <Back />
        </li>
        <li>
          <PageButton number={1} />
        </li>

        <li>
          <Foward disabled={page * postsPerPage >= max} />
        </li>
      </ul>
    </div>
  )
}
