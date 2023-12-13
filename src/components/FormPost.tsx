"use client"

import React, { useRef } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { useSession } from "next-auth/react"
import { createPost } from "@/actions/post"
import { useFormStatus } from "react-dom"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Spinner } from "./Spinner"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { toast } from "./ui/use-toast"

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

export const FormPost = () => {
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
      <legend className="mb-4 text-xl font-semibold sm:text-2xl md:text-3xl">
        Nuevo Post
      </legend>
      <div className="mb-8 grid gap-x-12 gap-y-6 lg:grid-cols-2">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Nombre</Label>
          <Input id="title" placeholder="Titulo" name="title" required />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="age">Edad</Label>
          <Input id="age" placeholder="6 meses" name="age" />
        </div>
        <div className="grid w-full items-center gap-1.5">
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
          <Label htmlFor="vaccines">Vacunas</Label>
          <Input
            id="vaccines"
            placeholder="Vacuna Polivalente"
            name="vaccines"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="contact">Contacto</Label>
          <Input
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
        <input type="hidden" name="email" value={email} required />
        <input type="hidden" name="user" value={user} required />
      </div>
      <Submit />
    </form>
  )
}
