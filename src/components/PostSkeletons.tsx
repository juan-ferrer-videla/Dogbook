import { Skeleton } from "./ui/skeleton"

export const PostSkeletons = () => {
  return (
    <>
      <ul className="grid gap-y-4">
        <li>
          <Skeleton className="h-60 w-full" />
        </li>
        <li>
          <Skeleton className="h-60 w-full" />
        </li>
        <li>
          <Skeleton className="h-60 w-full" />
        </li>
      </ul>
    </>
  )
}
