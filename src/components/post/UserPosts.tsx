import React from "react"
import prisma from "../../lib/prisma"
import { getServerSession } from "next-auth"
import { Post } from "@/components/post"
import { redirect } from "next/navigation"

const UserPosts = async () => {
  const session = await getServerSession()
  if (!session?.user?.email) redirect("/api/auth/signin")
  const posts = await prisma.post.findMany({
    where: { email: session.user.email },
    orderBy: { createAt: "desc" },
  })
  const isEmpty = posts.length === 0
  if (isEmpty) return <p>No hay publicaciones por el momento.</p>
  return (
    <ul className="my-4 grid gap-6 md:my-8 md:gap-16 lg:my-12 lg:grid-cols-2 ">
      {posts.map((post) => (
        <li key={post.id}>
          <Post withActions {...post} />
        </li>
      ))}
    </ul>
  )
}

export { UserPosts }
