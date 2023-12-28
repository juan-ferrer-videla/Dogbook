import Image from "next/image"
import React from "react"
import notFoundImg from "@/assets/not-found.png"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const NotFound = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
        La pagina que intentas buscar no existe
      </h1>
      <Button asChild>
        <Link href="/"> Volver al inicio</Link>
      </Button>
      <Image
        src={notFoundImg}
        alt="Perro perdido"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="w-full max-w-sm"
      />
    </div>
  )
}

export default NotFound
