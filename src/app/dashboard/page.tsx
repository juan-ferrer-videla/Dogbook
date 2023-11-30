import FormPost from "@/components/FormPost"
import { UserPosts } from "@/components/UserPosts"
import React from "react"

const DashboardPage = () => {
  return (
    <>
      <h2 className="mb-4 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-8 md:mb-12 md:text-5xl lg:leading-[1.1]">
        Dashboard
      </h2>
      <div className="grid items-start sm:grid-cols-2">
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