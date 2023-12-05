import React from "react"
import prisma from "../lib/prisma"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { CldImage } from "@/components/CldImage"
import { unstable_noStore as noStore } from "next/cache"

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
}: {
  id: string
  title: string
  email?: string
  location: string
  contact: number
  image: string
  size: string
  user: string
  vaccines: string
  age: string
}) => {
  return (
    <li>
      <Card>
        <CardHeader className="flex-row items-center space-x-6">
          {image && (
            <CldImage src={image} alt="" sizes="30vw" width={64} height={64} />
          )}
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {vaccines && <p>Vacunas: {vaccines}</p>}
          {size && <p>Tamaño: {size}</p>}
          {age && <p>Edad: {age}</p>}
        </CardContent>
        <CardFooter className="grid text-muted-foreground">
          {user && <p>Autor: {user}</p>}
          <p>Ubicación: {location}</p>
          <p>Contacto: {contact}</p>
        </CardFooter>
      </Card>
    </li>
  )
}

const Posts = async () => {
  noStore()
  const posts = await prisma.post.findMany()
  return (
    <ul className="grid gap-y-4">
      {posts.map((post) => (
        <Post {...post} key={post.id} />
      ))}
    </ul>
  )
}

export { Posts, Post }
