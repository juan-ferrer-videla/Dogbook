import { CreateForm } from "@/components/post"
import { UserPosts } from "@/components/post/UserPosts"
import { Separator } from "@/components/ui/separator"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import React from "react"

const DashboardPage = async () => {
  const session = await getServerSession()
  if (!session?.user) redirect("/api/auth/signin")

  return (
    <>
      <h2 className="mb-4 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-8 md:mb-12 md:text-5xl lg:leading-[1.1]">
        Encontremosles un hogar
      </h2>
      <CreateForm />
      <Separator className="my-4 md:my-8 lg:my-12" />
      <h3 className="mb-4 text-xl font-semibold sm:text-2xl md:mb-8 md:text-3xl">
        Mis publicaciones
      </h3>
      <UserPosts />
    </>
  )
}

export default DashboardPage
