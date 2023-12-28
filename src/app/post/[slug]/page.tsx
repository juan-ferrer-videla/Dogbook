import React from "react"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { CldImage } from "@/components/post/CldImage"
import { vaccines } from "@/types"
import type { TVaccines } from "@/types"

import { Metadata } from "next"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const post = await prisma.post
    .findUnique({
      where: {
        id: slug,
      },
    })
    .catch(() => {})

  return {
    title: `${post?.title} - Perruno`,
  }
}

const Post = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await prisma.post
    .findUnique({
      where: {
        id: slug,
      },
    })
    .catch(() => {
      redirect("/not-found")
    })
  if (post === null)
    return (
      <div>
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          El post ya no existe
        </h1>
      </div>
    )

  const {
    age,
    contact,
    createAt,
    email,
    id,
    image,
    location,
    polivalente,
    polivalente2,
    polivalente_refuerzo,
    rabia,
    size,
    title,
    user,
  } = post

  const vaccinesArr: TVaccines[] = []
  if (polivalente) vaccinesArr.push(vaccines.polivalente)
  if (rabia) vaccinesArr.push(vaccines.rabia)
  if (polivalente2) vaccinesArr.push(vaccines.polivalente2)
  if (polivalente_refuerzo) vaccinesArr.push(vaccines.polivalente_refuerzo)

  return (
    <div className="mb-10">
      <h1 className="mb-6 text-center text-3xl font-bold leading-tight tracking-tighter sm:mb-10 md:text-6xl lg:leading-[1.1]">
        {title}
      </h1>
      <div className="lg:grid-cols-post grid gap-x-12 gap-y-8 text-center lg:text-start">
        {image && (
          <CldImage
            alt="Perro"
            className=" mx-auto rounded"
            src={image}
            width={680}
            height={680}
          />
        )}
        <div>
          {age && (
            <div className="mb-3">
              <h2 className="font-semibold tracking-tight sm:text-xl">Edad</h2>
              <p>{age}</p>
            </div>
          )}
          {size && (
            <div className="mb-3">
              <h2 className="font-semibold tracking-tight sm:text-xl">
                Tamaño
              </h2>
              <p>{size}</p>
            </div>
          )}
          {vaccinesArr.length > 0 && (
            <div className="mb-3">
              <h2 className="font-semibold tracking-tight sm:text-xl">
                Vacunas
              </h2>
              <ul>
                {vaccinesArr.map((vaccine) => (
                  <li key={vaccine}>{vaccine}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-muted-foreground">Autor: {user}</p>
          <p className="text-muted-foreground">Ubicación: {location}</p>
          <p className="text-muted-foreground">Contacto: {contact}</p>
          <p className="text-muted-foreground">Email: {email}</p>
        </div>
      </div>
    </div>
  )
}

export default Post
