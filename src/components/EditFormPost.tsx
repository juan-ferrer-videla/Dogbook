"use client"

import React, { useRef, useState } from "react"
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
import { toast } from "./ui/use-toast"
import { Checkbox } from "./ui/checkbox"
import { vaccines } from "@/types"

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
  age,
  image,
  rabia: defaultRabia,
  polivalente: defaultPolivalente,
  polivalente2: defaultPolivalente2,
  polivalente_refuerzo: defaultPolivalenteRefuerzo,
}: Omit<Post, "createAt" | "email" | "user">) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [isOpen, setOpen] = useState(false)
  const { polivalente, polivalente2, polivalente_refuerzo, rabia } = vaccines
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
              Vacunas
            </legend>
            <div className="grid gap-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="polivalente"
                  name="polivalente"
                  value={polivalente}
                  defaultChecked={!!defaultPolivalente}
                />
                <label
                  htmlFor="polivalente"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  1era dosis Polivalente (sextuple)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  defaultChecked={!!defaultPolivalente2}
                  id="polivalente2"
                  name="polivalente2"
                  value={polivalente2}
                />
                <label
                  htmlFor="polivalente2"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  2da dosis Polivalente
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rabia"
                  name="rabia"
                  value={"rabia"}
                  defaultChecked={!!defaultRabia}
                />
                <label
                  htmlFor="rabia"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Rabia
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  defaultChecked={!!defaultPolivalenteRefuerzo}
                  id="polivalente_refuerzo"
                  name="polivalente_refuerzo"
                  value={polivalente_refuerzo}
                />
                <label
                  htmlFor="polivalente_refuerzo"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Refuerzo polivalente
                </label>
              </div>
            </div>
          </fieldset>
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
