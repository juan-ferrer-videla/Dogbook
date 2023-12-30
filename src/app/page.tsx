import { FilterBadges } from "@/components/post/FilterBadges"
import { PostSkeletons } from "@/components/PostSkeletons"
import { Posts } from "@/components/post"
import { Suspense } from "react"
import { Filters } from "@/components/post/Filters"
import Image from "next/image"
import DogAndWomen from "@/assets/bacho.png"

export default function Home({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>
}) {
  return (
    <>
      <div className="mt-4 grid place-items-center gap-6 text-center sm:gap-x-8 md:mt-8 md:gap-x-16 lg:grid-cols-2 lg:gap-x-24 lg:text-start">
        <div className="flex flex-col justify-center">
          <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            Encontremos un hogar para ellos
          </h2>
          <p className="mb-2 text-muted-foreground">
            A travez de Bacho podes encontrar perros que necesiten un hogar.
          </p>
          <p className="text-muted-foreground">
            También podes publicar y ayudar a que otras personas los encuentren.
          </p>
        </div>
        <Image
          src={DogAndWomen}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full max-w-sm"
          alt="Una mujer con su perro"
        />
      </div>
      <div className="my-4 flex flex-wrap items-center gap-4 ">
        <Filters />
        <FilterBadges />
      </div>
      <Suspense fallback={<PostSkeletons />}>
        <Posts searchParams={searchParams} />
      </Suspense>
    </>
  )
}
