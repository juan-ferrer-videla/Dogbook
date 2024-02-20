"use server"

import { z } from "zod"
import prisma from "../lib/prisma"
import { revalidatePath } from "next/cache"
import { v2 as cloudinary } from "cloudinary"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

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
  location: z.string(),
  contact: z.string(),
  size: z.string().optional(),
  age: z.string().optional(),
  details: z.string().optional(),
  email: z.string(),
  user: z.string(),
  image: z.unknown(),
})

const editSchema = z.object({
  title: z.string(),
  id: z.string(),
  location: z.string(),
  size: z.string().optional(),
  details: z.string().optional(),
  age: z.string().optional(),
  contact: z.string().optional(),
  image: z.unknown(),
  publicId: z.string(),
})

const uploadEndpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL as string

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

  const response = await fetch(uploadEndpoint, {
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
  const session = await getServerSession()
  const email = session?.user?.email
  if (!email) redirect("/api/auth/signin")

  const { image, ...postData } = postSchema.parse(Object.fromEntries(data))
  const file = image as File
  let publicId = ""

  if (file.size) {
    const { signature, timestamp } = getSignature()
    const id = await uploadImage({ file, signature, timestamp })
    publicId = id ?? ""
  }

  await prisma.post.create({
    data: {
      ...postData,
      createAt: Date.now(),
      image: publicId,
    },
  })
  revalidatePath("/")
}

export const editPost = async (data: FormData) => {
  const session = await getServerSession()
  const email = session?.user?.email
  if (!email) redirect("/api/auth/signin")

  const postData = editSchema.parse(Object.fromEntries(data))
  const file = postData.image as File
  let publicId = postData.publicId

  if (file.size) {
    cloudinary.uploader.destroy(publicId)
    const { signature, timestamp } = getSignature()
    const id = await uploadImage({ file, signature, timestamp })
    if (id) {
      publicId = id
    }
  }

  const { id, publicId: image, ...mutableData } = postData

  await prisma.post.update({
    where: { id: postData.id },
    data: {
      ...mutableData,
      createAt: Date.now(),
      image,
    },
  })
  revalidatePath("/")
}

export const deletePost = async ({
  id,
  imageId,
}: {
  id: string
  imageId?: string
}) => {
  const session = await getServerSession()
  const email = session?.user?.email
  if (!email) redirect("/api/auth/signin")

  await prisma.post.delete({
    where: {
      id,
      email,
    },
  })
  if (imageId) {
    await cloudinary.uploader.destroy(imageId)
  }

  revalidatePath("/")
}
