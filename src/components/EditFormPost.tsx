"use client"

import React, { useRef } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { editPost } from "@/actions/post"
import { useFormStatus } from "react-dom"
import { Spinner } from "./Spinner"
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
} from "./ui/select"
import { Post } from "@prisma/client"

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

export const EditFormPost = ({
  id,
  title,
  location,
  contact,
  size,
  vaccines,
  age,
  image,
}: Omit<Post, "createAt" | "email" | "user">) => {
  const formRef = useRef<HTMLFormElement>(null)
  const handleAction = async (data: FormData) => {
    await editPost(data)
    formRef.current?.reset()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Editar</Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edita tu post</DialogTitle>
          <DialogDescription>
            Hace las modificaciones de tu post aca. Cuando termines clickea el
            boton de guardar.
          </DialogDescription>
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
              defaultValue={age}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="size" className="mb-2">
              Tamaño
            </Label>
            <Select name="size" defaultValue={size}>
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
            <Label htmlFor="vaccines">Vacunas</Label>
            <Input
              id="vaccines"
              placeholder="Vacuna Polivalente"
              name="vaccines"
              defaultValue={vaccines}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="contact">Contacto</Label>
            <Input
              defaultValue={contact}
              id="contact"
              type="number"
              placeholder="2610000000"
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
          <input type="hidden" value={image} name="publicId" />
          <input type="hidden" value={id} name="id" />

          <DialogFooter>
            <Submit />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
