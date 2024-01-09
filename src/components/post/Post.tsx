import { CldImage } from "@/components/post/cld-image"
import Image from "next/image"
import dogbook from "@/assets/dogbook.png"
import type { Post as TPost } from "@prisma/client"
import { type TVaccines, vaccines } from "@/types"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EditPost } from "./edit-post"
import { DeletePost } from "./delete-post"

export const Post = ({
  id,
  title,
  email,
  location,
  contact,
  image,
  age,
  user,
  polivalente,
  polivalente2,
  polivalente_refuerzo,
  rabia,
  size,
  createAt,
  withActions = false,
}: TPost & { withActions?: boolean }) => {
  const defaultValues = {
    id,
    title,
    email,
    location,
    contact,
    polivalente,
    polivalente2,
    rabia,
    polivalente_refuerzo,
    image,
    age,
    user,
    size,
  }

  const day = new Date(createAt).getDate()
  const month = new Date(createAt).getMonth() + 1
  const year = new Date(createAt).getFullYear()
  const vaccinesArr: TVaccines[] = []
  if (polivalente) vaccinesArr.push(vaccines.polivalente)
  if (polivalente2) vaccinesArr.push(vaccines.polivalente2)
  if (polivalente_refuerzo) vaccinesArr.push(vaccines.polivalente_refuerzo)
  if (rabia) vaccinesArr.push(vaccines.rabia)

  const date = `${day}/${month}/${year}`

  return (
    <Card className="grid h-full transition-transform">
      <CardHeader className="flex-row items-center space-x-5">
        {image ? (
          <CldImage
            src={image}
            alt=""
            sizes="30vw"
            width={200}
            height={200}
            className="h-24 w-24 rounded-full"
          />
        ) : (
          <Image src={dogbook} alt="" sizes="30vw" width={96} height={96} />
        )}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {vaccinesArr.length > 0 && (
          <div className="mb-2">
            <strong className="font-medium">Vacunas:</strong>{" "}
            <ul>
              {vaccinesArr.map((vaccine) => (
                <li key={vaccine}>{vaccine}</li>
              ))}
            </ul>
          </div>
        )}
        {size && (
          <p className="mb-2">
            <strong className="font-medium">Tamaño:</strong> {size}
          </p>
        )}
        {age && (
          <p className="mb-2">
            <strong className="font-medium">Edad:</strong> {age}
          </p>
        )}
      </CardContent>
      <CardFooter className="grid self-end text-muted-foreground">
        {user && <p>Autor: {user}</p>}
        <p>Ubicación: {location}</p>
        <p>Contacto: {contact}</p>
        <p>Fecha: {date}</p>
        {withActions && (
          <div className="mt-4 flex justify-between">
            <DeletePost id={id} imageId={image || undefined} />
            <EditPost {...defaultValues} />
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
