"use client"

import React, { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { editPost } from "@/actions/post"
import { useFormStatus } from "react-dom"
import { Spinner } from "@/components/spinner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Post } from "@prisma/client"
import { toast } from "@/components/ui/use-toast"
import { Textarea } from "../ui/textarea"

const Submit = () => {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Spinner />
          <span>Cargando</span>
        </>
      ) : (
        "Guardar"
      )}
    </Button>
  )
}

export const EditPost = ({
  id,
  title,
  location,
  contact,
  size,
  age,
  image,
  details,
}: Omit<Post, "createAt" | "email" | "user">) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [isOpen, setOpen] = useState(false)
  const handleAction = async (data: FormData) => {
    try {
      await editPost(data)
      toast({
        description: "¡Tu post fue editado con exito!",
      })
      formRef.current?.reset()
    } catch (error) {
      toast({
        description: "Ocurrió un error, vuelve a intentarlo mas tarde",
        variant: "destructive",
      })
    } finally {
      setOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Editar</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edita tu publicación</DialogTitle>
          <DialogDescription>Al finalizar recorda guardar</DialogDescription>
        </DialogHeader>
        <form action={handleAction} className="grid gap-y-6" ref={formRef}>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title">Nombre</Label>
            <Input
              id="title"
              placeholder="Titulo"
              name="title"
              required
              defaultValue={title}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="age">Edad</Label>
            <Input
              id="age"
              placeholder="6 meses"
              name="age"
              defaultValue={age ?? ""}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="size" className="mb-2">
              Tamaño
            </Label>
            <Select name="size" defaultValue={size ?? ""}>
              <SelectTrigger id="size">
                <SelectValue placeholder="Selecciona un tamaño" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="sr-only">Tamaño</SelectLabel>
                  <SelectItem value="Grande">Grande</SelectItem>
                  <SelectItem value="Mediano">Mediano</SelectItem>
                  <SelectItem value="Pequeño">Pequeño</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="contact">Contacto</Label>
            <Input
              defaultValue={contact}
              id="contact"
              placeholder="numero de telefono, email, instagram..."
              name="contact"
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="location">Ubicación</Label>
            <Input
              defaultValue={location}
              id="location"
              name="location"
              placeholder="Calle ejemplo 123"
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="image">Imagen</Label>
            <Input type="file" id="image" name="image" accept="image/*" />
          </div>
          <fieldset>
            <legend className="mb-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Detalles (vacunas, castrado, etc.)
            </legend>
            <div className="grid gap-y-2">
              <div className="flex items-center space-x-2">
                <Textarea
                  name="details"
                  id="details"
                  className="resize-none"
                  defaultValue={details || ""}
                />
              </div>
            </div>
          </fieldset>
          <input type="hidden" value={image ?? ""} name="publicId" />
          <input type="hidden" value={id} name="id" />

          <DialogFooter>
            <Submit />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
