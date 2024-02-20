import { CldImage } from "@/components/post/cld-image"
import Image from "next/image"
import dogbook from "@/assets/dogbook.png"
import type { Post as TPost } from "@prisma/client"
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
  details,
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
    details,
    image,
    age,
    user,
    size,
  }

  const day = new Date(createAt).getDate()
  const month = new Date(createAt).getMonth() + 1
  const year = new Date(createAt).getFullYear()

  const date = `${day}/${month}/${year}`

  const detailsArr = details?.split("\n") ?? []

  return (
    <Card className="grid h-full shadow-xl transition-transform">
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
        {details && (
          <div className="mb-2">
            <strong className="font-medium">Detalles:</strong>{" "}
            <div className="line-clamp-3">
              {detailsArr.map((detail, i) => (
                <p key={i}>{detail}</p>
              ))}
            </div>
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
