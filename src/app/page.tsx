import { FilterBadges } from "@/components/FilterBadges"
import { PostSkeletons } from "@/components/PostSkeletons"
import { Posts } from "@/components/Posts"
import { Suspense } from "react"
import { Filters } from "@/components/Filters"
import { Pagination } from "@/components/pagination"

export default function Home({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>
}) {
  const page = searchParams.page ? Number(searchParams.page) : 1
  return (
    <>
      <h2 className="mb-4 text-center text-3xl font-bold leading-tight tracking-tight md:text-5xl lg:leading-[1.1]">
        Bienvenido a Perruno
      </h2>
      <p className="text-center text-muted-foreground">
        Encontra a perros que necesitan un hogar
      </p>
      <div className="my-4 flex flex-wrap items-center gap-4 sm:my-6">
        <Filters />
        <FilterBadges />
      </div>
      <Pagination searchParams={searchParams} />
      <Suspense fallback={<PostSkeletons />}>
        <Posts searchParams={searchParams} />
      </Suspense>
    </>
  )
}
