import { Skeleton } from "./ui/skeleton"

const PostSkeleton = () => (
  <div className="rounded border bg-card p-4 shadow-xl md:p-8">
    <div className="flex items-center gap-x-6">
      <Skeleton className="aspect-square w-16 rounded-full" />
      <Skeleton className="h-5 w-36" />
    </div>
    <div className="mt-8 grid gap-y-3">
      <Skeleton className="h-4 w-full " />
      <Skeleton className="h-4 w-full " />
      <Skeleton className="h-4 w-full " />
    </div>
    <div className="mt-8 grid gap-y-3">
      <Skeleton className="h-4 w-full " />
      <Skeleton className="h-4 w-full " />
      <Skeleton className="h-4 w-full " />
      <Skeleton className="h-4 w-full " />
    </div>
  </div>
)

const PostSkeletons = ({ size = 6 }) => {
  return (
    <>
      <ul className="grid gap-6 lg:grid-cols-2">
        {Array(size)
          .fill(<PostSkeleton />)
          .map((skeleton, index) => (
            <li key={index}>{skeleton}</li>
          ))}
      </ul>
    </>
  )
}

export { PostSkeletons }
