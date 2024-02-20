"use client"

import React, {  useRef } from "react"

import { AlertCircle } from "lucide-react"

import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { useSession } from "next-auth/react"
import { createPost } from "@/actions/post"
import { useFormStatus } from "react-dom"
import { Spinner } from "../spinner"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { toast } from "../ui/use-toast"
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
        "Publicar"
      )}
    </Button>
  )
}

export const CreateForm = () => {

  const formRef = useRef<HTMLFormElement>(null)
  const { data: session } = useSession()
  const email = session?.user?.email ?? ""
  const user = session?.user?.name ?? ""

  const handleAction = async (data: FormData) => {
    try {
      await createPost(data)
      toast({
        description: "¡Tu post fue creado con exito!",
      })
      formRef.current?.reset()
    } catch (error) {
      toast({
        description: "Ocurrió un error, vuelve a intentarlo mas tarde",
        variant: "destructive",
      })
    }
  }

  return (
    <form action={handleAction} className="mb-10 " ref={formRef}>
      <legend className="sr-only mb-4 text-xl font-semibold sm:text-2xl md:text-3xl">
        Datos del animal
      </legend>
      <div className="mb-8 grid gap-x-12 gap-y-6 lg:grid-cols-2">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Nombre*</Label>
          <Input id="title" placeholder="Titulo" name="title" required />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="age">Edad</Label>
          <Input id="age" placeholder="6 meses" name="age" />
        </div>
        <div className="grid w-full items-center ">
          <Label htmlFor="size" className="mb-2">
            Tamaño
          </Label>
          <Select name="size">
            <SelectTrigger>
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
          <Label htmlFor="contact">Contacto*</Label>
          <Input
            id="contact"
            placeholder="numero de telefono, email, instagram..."
            name="contact"
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="location">Ubicación*</Label>
          <Input
            id="location"
            name="location"
            placeholder="Godoy Cruz, Mendoza, Argentina"
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
              <Textarea name="details" id="details" className="resize-none" />
            </div>
          </div>
        </fieldset>
        <input type="hidden" name="email" value={email} required />
        <input type="hidden" name="user" value={user} required />
      </div>
      <Submit />
      <p role="alert" className="mt-4">
        <AlertCircle className="inline-block" size={20} />{" "}
        <small>
          Si ya se encontro un hogar recorda eliminar la publicación.
        </small>
      </p>
    </form>
  )
}
