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
  const vaccines: string[] = []
  if (polivalente) vaccines.push(polivalente)
  if (polivalente2) vaccines.push(polivalente2)
  if (polivalente_refuerzo) vaccines.push(polivalente_refuerzo)
  if (rabia) vaccines.push(rabia)

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
          {vaccines.length && (
            <div>
              <strong className="font-medium">Vacunas:</strong>{" "}
              <ul className="list-inside list-disc">
                {vaccines.map((vaccine) => (
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

const Posts = async () => {
  /*   noStore()
   */ const posts = await prisma.post.findMany()
  return <FilteredPosts posts={posts} />
}

export { Posts, Post }
