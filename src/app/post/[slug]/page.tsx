import React from "react"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { CldImage } from "@/components/post/CldImage"
import { vaccines } from "@/types"
import type { Vaccines as TVaccines } from "@/types"

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
    <div>
      <h1 className="mb-6 text-center text-3xl font-bold leading-tight tracking-tighter sm:mb-10 md:text-6xl lg:leading-[1.1]">
        {title}
      </h1>

      {image && (
        <CldImage
          alt="Perro"
          className="mx-auto rounded"
          src={image}
          width={576}
          height={576}
        />
      )}
      {age && (
        <>
          <h2>Edad</h2>
          <p>{age}</p>
        </>
      )}
      {size && (
        <>
          <h2>Tamaño</h2>
          <p>{size}</p>
        </>
      )}
      {vaccinesArr.length > 0 && (
        <>
          <h2>Vacunas:</h2>
          <ul>
            {vaccinesArr.map((vaccine) => (
              <li key={vaccine}>{vaccine}</li>
            ))}
          </ul>
        </>
      )}

      <p className="text-muted-foreground"> {user}</p>
      <p className="text-muted-foreground"> {location}</p>
      <p className="text-muted-foreground"> {contact}</p>
      <p className="text-muted-foreground"> {email}</p>
    </div>
  )
}

export default Post
