import { FormPost } from "@/components/FormPost"
import { UserPosts } from "@/components/UserPosts"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import React from "react"

const DashboardPage = async () => {
  const session = await getServerSession()
  if (!session?.user) redirect("/api/auth/signin")

  return (
    <>
      <h2 className="mb-4 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-8 md:mb-12 md:text-5xl lg:leading-[1.1]">
        Dashboard
      </h2>
      <div>
        <FormPost />
        <div>
          <h3 className="mb-4 text-xl font-semibold sm:text-2xl md:text-3xl">
            Tus Posts!
          </h3>
          <UserPosts />
        </div>
      </div>
    </>
  )
}

export default DashboardPage
