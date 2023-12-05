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

const FormPost = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const { data: session } = useSession()
  const email = session?.user?.email ?? ""
  const user = session?.user?.name ?? ""
  const handleAction = async (data: FormData) => {
    await createPost(data)
    formRef.current?.reset()
  }

  return (
    <form action={handleAction} className="grid gap-y-6" ref={formRef}>
      <legend className="mb-4 text-xl font-semibold sm:text-2xl md:text-3xl">
        Nuevo Post
      </legend>
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
        <RadioGroup defaultValue="medium" name="size" id="size">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="big" id="big" />
            <Label htmlFor="big">Grande</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium">Mediano</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="small" id="small" />
            <Label htmlFor="small">Pequeño</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="vaccines">Vacunas</Label>
        <Input id="vaccines" placeholder="Vacuna Polivalente" name="vaccines" />
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
        <Input type="file" id="image" name="image" />
      </div>
      <input type="hidden" name="email" value={email} required />
      <input type="hidden" name="user" value={user} required />
      <Submit />
    </form>
  )
}

export default FormPost
