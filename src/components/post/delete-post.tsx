"use client"

import { deletePost } from "@/actions/post"
import React, { useState } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Spinner } from "@/components/spinner"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const DeletePost = ({
  id,
  imageId,
}: {
  id: string
  imageId?: string
}) => {
  const [pending, setPending] = useState(false)

  const handleDelete = async () => {
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
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Borrar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. La publicación se borrar de forma
            permanente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button asChild variant={"destructive"}>
            <AlertDialogAction disabled={pending} onClick={handleDelete}>
              {pending ? (
                <>
                  <Spinner variant="destructive" /> Cargando
                </>
              ) : (
                "Borrar"
              )}
            </AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
