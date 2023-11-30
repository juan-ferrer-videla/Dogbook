import React from "react"
import prisma from "../lib/prisma"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"

const Post = ({
  id,
  title,
  description,
  email,
  location,
  contact,
}: {
  id: string
  title: string
  description: string
  email?: string
  location: string
  contact: number
}) => {
  return (
    <li>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{description}</CardContent>
        <CardFooter className="grid text-muted-foreground">
          {email && <p>Autor: {email}</p>}
          <p>Ubicación: {location}</p>
          <p>Contacto: {contact}</p>
        </CardFooter>
      </Card>
    </li>
  )
}

const Posts = async () => {
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
