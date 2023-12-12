import React from "react"
import prisma from "../lib/prisma"
import { getServerSession } from "next-auth"
import { Post } from "./Posts"
import { redirect } from "next/navigation"

const UserPosts = async () => {
  const session = await getServerSession()
  if (!session?.user?.email) redirect("/api/auth/signin")
  const posts = await prisma.post.findMany({
    where: { email: session.user.email },
  })
  return (
    <ul className="grid gap-y-4">
      {posts.map((post) => (
        <Post withActions {...post} key={post.id} />
      ))}
    </ul>
  )
}

export { UserPosts }
