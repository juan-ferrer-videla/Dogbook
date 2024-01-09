import { CreateForm } from "@/components/post"
import { UserPosts } from "@/components/post/user-posts"
import { Separator } from "@/components/ui/separator"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import React from "react"

const DashboardPage = async () => {
  const session = await getServerSession()
  if (!session?.user) redirect("/api/auth/signin")

  return (
    <>
      <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
        Publicaciones
      </h1>
      <p className="mb-4 text-center text-muted-foreground sm:mb-8 md:mb-12">
        Completa el siguiente formulario
      </p>
      <CreateForm />
      <Separator className="my-4 md:my-8 lg:my-12" />
      <h2 className="mb-4 text-center text-3xl font-bold leading-tight tracking-tight md:text-5xl lg:leading-[1.1]">
        Mis publicaciones
      </h2>
      <UserPosts />
    </>
  )
}

export default DashboardPage
