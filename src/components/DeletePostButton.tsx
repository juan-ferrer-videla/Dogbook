"use client"

import { deletePost } from "@/actions/post"
import React, { useState } from "react"
import { Button } from "./ui/button"
import { Spinner } from "./Spinner"
import { toast } from "./ui/use-toast"

const DeletePostButton = ({
  id,
  imageId,
}: {
  id: string
  imageId?: string
}) => {
  const [pending, setPending] = useState(false)
  return (
    <Button
      className="mt-4"
      variant={"destructive"}
      disabled={pending}
      onClick={async () => {
        setPending(true)
        try {
          await deletePost({ id, imageId })
          toast({
            description: "Tu post fue eliminado con exito",
            variant: "destructive",
          })
        } catch (error) {
          toast({
            description: "Ocurrió un error, vuelve a intentarlo mas tarde",
            variant: "destructive",
          })
        }
        setPending(false)
      }}
    >
      {pending ? (
        <>
          <Spinner variant="destructive" /> Cargando
        </>
      ) : (
        "Borrar"
      )}
    </Button>
  )
}

export default DeletePostButton
