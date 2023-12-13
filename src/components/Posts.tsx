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
  vaccines,
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
    image,
    age,
    user,
    vaccines,
    size,
  }

  const day = new Date(createAt).getDate()
  const month = new Date(createAt).getMonth() + 1
  const year = new Date(createAt).getFullYear()

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
        <CardContent>
          {vaccines && <p>Vacunas: {vaccines}</p>}
          {size && <p>Tamaño: {size}</p>}
          {age && <p>Edad: {age}</p>}
        </CardContent>
        <CardFooter className="grid self-end text-muted-foreground">
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
  noStore()
  const posts = await prisma.post.findMany()
  return <FilteredPosts posts={posts} />
}

export { Posts, Post }
