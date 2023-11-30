"use client"

import React, { useRef } from "react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { useSession } from "next-auth/react"
import { createPost } from "@/actions/post"
import { useFormStatus } from "react-dom"

const Submit = () => {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="justify-self-start" disabled={pending}>
      Publicar
    </Button>
  )
}

const FormPost = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const { data: session } = useSession()
  const email = session?.user?.email ?? ""
  const handleAction = async (data: FormData) => {
    await createPost(data)
    formRef.current?.reset()
  }

  return (
    <form action={handleAction} className="grid gap-y-4" ref={formRef}>
      <legend className="mb-4 text-xl font-semibold sm:text-2xl md:text-3xl">
        Nuevo Post
      </legend>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="title">Titulo</Label>
        <Input id="title" placeholder="Titulo" name="title" required />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Pone tu mensaje aca"
          className="resize-none"
          required
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="contact">Contacto</Label>
        <Input
          id="contact"
          type="number"
          placeholder="2610000000"
          name="contact"
          required
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="location">Ubicación</Label>
        <Input
          id="location"
          name="location"
          placeholder="Calle ejemplo 123"
          required
        />
      </div>
      <input type="hidden" name="email" value={email} required />
      <Button type="submit" className="justify-self-start">
        Publicar
      </Button>
    </form>
  )
}

export default FormPost
