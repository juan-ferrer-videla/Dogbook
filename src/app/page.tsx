import { Posts } from "@/components/Posts"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"

export const revalidate = 0

const PostSkeletons = () => {
  return (
    <>
      <ul className="grid gap-y-4">
        <li>
          <Skeleton className="h-40 w-full" />
        </li>
        <li>
          <Skeleton className="h-40 w-full" />
        </li>
        <li>
          <Skeleton className="h-40 w-full" />
        </li>
      </ul>
    </>
  )
}

export default function Home() {
  return (
    <>
      <h2 className="mb-4 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-8 md:mb-12 md:text-5xl lg:leading-[1.1]">
        Bienvenido a Dogbook
      </h2>
      <Suspense fallback={<PostSkeletons />}>
        <Posts />
      </Suspense>
    </>
  )
}
