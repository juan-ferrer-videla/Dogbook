import React from "react"
import prisma from "../lib/prisma"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { CldImage } from "@/components/CldImage"
import { unstable_noStore as noStore } from "next/cache"
import DeletePostButton from "./DeletePostButton"
import FilteredPosts from "./FilteredPosts"
import Image from "next/image"
import dogbook from "@/assets/dogbook.png"
import { EditFormPost } from "./EditFormPost"
import type { Post as TPost } from "@prisma/client"
import {
  type VaccinesKeys,
  postsPerPage,
  vaccines,
  type SplitKeys,
} from "@/types"
import { Pagination } from "./pagination"

const Post = ({
  id,
  title,
  email,
  location,
  contact,
  image,
  age,
  user,
  polivalente,
  polivalente2,
  polivalente_refuerzo,
  rabia,
  size,
  createAt,
  withActions = false,
}: TPost & { withActions?: boolean }) => {
  const defaultValues = {
    id,
    title,
    email,
    location,
    contact,
    polivalente,
    polivalente2,
    rabia,
    polivalente_refuerzo,
    image,
    age,
    user,
    size,
  }

  const day = new Date(createAt).getDate()
  const month = new Date(createAt).getMonth() + 1
  const year = new Date(createAt).getFullYear()
  const vaccinesArr: string[] = []
  if (polivalente) vaccinesArr.push(vaccines.polivalente)
  if (polivalente2) vaccinesArr.push(vaccines.polivalente2)
  if (polivalente_refuerzo) vaccinesArr.push(vaccines.polivalente_refuerzo)
  if (rabia) vaccinesArr.push(vaccines.rabia)

  const date = `${day}/${month}/${year}`
  return (
    <li>
      <Card className="grid h-full">
        <CardHeader className="flex-row items-center space-x-5">
          {image ? (
            <CldImage src={image} alt="" sizes="30vw" width={64} height={64} />
          ) : (
            <Image src={dogbook} alt="" sizes="30vw" width={64} height={64} />
          )}
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-y-1">
          {vaccinesArr.length && (
            <div>
              <strong className="font-medium">Vacunas:</strong>{" "}
              <ul className="list-inside list-disc">
                {vaccinesArr.map((vaccine) => (
                  <li key={vaccine}>{vaccine}</li>
                ))}
              </ul>
            </div>
          )}
          {size && (
            <p>
              <strong className="font-medium">Tamaño:</strong> {size}
            </p>
          )}
          {age && (
            <p>
              <strong className="font-medium">Edad:</strong> {age}
            </p>
          )}
        </CardContent>
        <CardFooter className="grid gap-y-1 self-end text-muted-foreground">
          {user && <p>Autor: {user}</p>}
          <p>Ubicación: {location}</p>
          <p>Contacto: {contact}</p>
          <p>Fecha: {date}</p>
          {withActions && (
            <div className="mt-4 flex justify-between">
              <DeletePostButton id={id} imageId={image || undefined} />
              <EditFormPost {...defaultValues} />
            </div>
          )}
        </CardFooter>
      </Card>
    </li>
  )
}

const Posts = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) => {
  noStore()
  const page = searchParams.page ? Number(searchParams.page) : 1

  const createQueryFilter = (filterQuery: string) => {
    const filter = searchParams[filterQuery]
    if (filter === undefined) return {}
    if (typeof filter === "string") return { [filterQuery]: filter }
    const filters = filter.map((filter) => ({ [filterQuery]: filter }))
    return { OR: filters }
  }
  const polivalente = { polivalente: !!searchParams.polivalente }
  const rabia = { rabia: !!searchParams.rabia }
  const polivalente2 = { polivalente2: !!searchParams.polivalente2 }
  const polivalente_refuerzo = {
    polivalente_refuerzo: !!searchParams.polivalente_refuerzo,
  }
  const vaccinesArr = [
    polivalente,
    rabia,
    polivalente2,
    polivalente_refuerzo,
  ].reduce(
    (acc, vaccine) => {
      if (Object.values(vaccine)[0]) acc.OR.push(vaccine)
      return acc
    },
    { OR: [] } as {
      OR: SplitKeys<Record<VaccinesKeys, boolean>>[]
    }
  )

  const sizeQuery = createQueryFilter("size")

  const postsCount = await prisma.post.count({
    where: {
      AND: [sizeQuery, { OR: [vaccinesArr] }],
    },
  })

  const posts = await prisma.post.findMany({
    where: {
      AND: [sizeQuery, { OR: [vaccinesArr] }],
    },
    take: postsPerPage,
    skip: (page - 1) * postsPerPage,
  })
  return (
    <>
      <FilteredPosts posts={posts} />
      <Pagination postsCount={postsCount} />
    </>
  )
}

export { Posts, Post }
