"use server"

import { z } from "zod"
import prisma from "../lib/prisma"
import { revalidatePath } from "next/cache"
import { v2 as cloudinary } from "cloudinary"

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

const getSignature = () => {
  const timestamp = Math.round(Date.now() / 1000).toString()
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "dog-world" },
    cloudinaryConfig.api_secret as string
  )
  return { timestamp, signature }
}

const postSchema = z.object({
  title: z.string(),
  size: z.string(),
  vaccines: z.string(),
  age: z.string(),
  contact: z.string(),
  location: z.string(),
  email: z.string(),
  user: z.string(),
  /*   image: z.instanceof(File),
   */
})

const uploadImage = async ({
  file,
  signature,
  timestamp,
  folder = "dog-world",
}: {
  file: File
  signature: string
  timestamp: string
  folder?: string
}) => {
  const cloudinaryFormData = new FormData()
  cloudinaryFormData.append("file", file)
  cloudinaryFormData.append(
    "api_key",
    process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string
  )
  cloudinaryFormData.append("signature", signature)
  cloudinaryFormData.append("timestamp", timestamp)
  cloudinaryFormData.append("folder", folder)

  const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL as string

  const response = await fetch(endpoint, {
    method: "POST",
    body: cloudinaryFormData,
  })

  if (!response.ok) return

  const cldData = await response.json()

  const publicId = cldData?.public_id

  if (typeof publicId !== "string") return
  return publicId
}

export const createPost = async (data: FormData) => {
  const postData = postSchema.parse(Object.fromEntries(data))
  /*   const { image: file } = postData
   */ let publicId = ""

  /*   if (file.size) {
    const { signature, timestamp } = getSignature()
    const id = await uploadImage({ file, signature, timestamp })
    publicId = id ?? ""
  } */

  await prisma.post.create({
    data: {
      ...postData,
      contact: Number(postData.contact),
      createAt: Date.now(),
      image: publicId,
    },
  })
  revalidatePath("/")
}
