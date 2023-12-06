"use client"

import { deletePost } from "@/actions/post"
import React, { useState } from "react"
import { Button } from "./ui/button"
import { Spinner } from "./Spinner"

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
        await deletePost({ id, imageId })
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
