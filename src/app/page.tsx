import { FilterBadges } from "@/components/FilterBadges"
import { PostSkeletons } from "@/components/PostSkeletons"
import { Posts } from "@/components/Posts"
import { Suspense } from "react"
import { Filters } from "@/components/Filters"

export default function Home() {
  return (
    <>
      <h2 className="mb-4 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-8 md:mb-12 md:text-5xl lg:leading-[1.1]">
        Bienvenido a Perruno
      </h2>
      <Filters />
      <FilterBadges />
      <Suspense fallback={<PostSkeletons />}>
        <Posts />
      </Suspense>
    </>
  )
}
