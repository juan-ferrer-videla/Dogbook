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
  const pages = Math.ceil(max / postsPerPage)

  const page = searchParams.page ? Number(searchParams.page) : 1

  return (
    <div>
      <ul className="flex items-center gap-x-2 p-2">
        <li>
          <Back />
        </li>
        {Array(pages)
          .fill(null)
          .map((_, index) => (
            <li key={index}>
              <PageButton number={index + 1} />
            </li>
          ))}

        <li>
          <Foward disabled={page * postsPerPage >= max} />
        </li>
      </ul>
    </div>
  )
}
