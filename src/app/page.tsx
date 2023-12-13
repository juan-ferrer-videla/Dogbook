import { FilterInput } from "@/components/FilterInput"
import { PostSkeletons } from "@/components/PostSkeletons"
import { Posts } from "@/components/Posts"
import { Suspense } from "react"

export default function Home() {
  return (
    <>
      <h2 className="mb-4 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-8 md:mb-12 md:text-5xl lg:leading-[1.1]">
        Bienvenido a Dogbook
      </h2>
      {/*       <FilterInput />
       */}{" "}
      <Suspense fallback={<PostSkeletons />}>
        <Posts />
      </Suspense>
    </>
  )
}
