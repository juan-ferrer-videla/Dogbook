import React from "react"
import prisma from "../lib/prisma"
import { getServerSession } from "next-auth"
import { Post } from "./Posts"

const UserPosts = async () => {
  const session = await getServerSession()
  if (!session?.user?.email) return
  const posts = await prisma.post.findMany({
    where: { email: session.user.email },
  })
  return (
    <ul className="grid gap-y-4">
      {posts.map((post) => (
        <Post {...post} key={post.id} />
      ))}
    </ul>
  )
}

export { UserPosts }
