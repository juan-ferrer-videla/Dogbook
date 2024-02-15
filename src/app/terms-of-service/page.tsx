import React from "react"

export default function Page() {
  return (
    <>
      <h1 className="mb-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Condiciones del Servicio - Bancho
      </h1>
      <p>
        Bienvenido a Bancho, una aplicación para adoptar perros de la calle.
      </p>

      <p>
        Al utilizar esta aplicación, aceptas cumplir con las siguientes
        condiciones:
      </p>

      <h2 className="tracking-tigh mb-4 mt-6 scroll-m-20 text-2xl font-semibold">
        1. Propósito de la Aplicación
      </h2>
      <p>
        Bancho tiene el objetivo de facilitar la adopción de perros de la calle,
        conectando a adoptantes con perros necesitados de un hogar amoroso.
      </p>

      <h2 className="tracking-tigh mb-4 mt-6 scroll-m-20 text-2xl font-semibold">
        2. Uso Responsable
      </h2>
      <p>
        Los usuarios deben utilizar la aplicación de manera responsable y ética.
        No se tolera el maltrato animal ni cualquier comportamiento que viole
        los principios de bienestar animal.
      </p>

      <h2 className="tracking-tigh mb-4 mt-6 scroll-m-20 text-2xl font-semibold">
        3. Información del Contacto
      </h2>
      <p>
        Para cualquier consulta o problema, puedes ponerte en contacto con
        nosotros a través del correo electrónico:{" "}
        <a href="mailto:juan.ferrer.videla@gmail.com">
          juan.ferrer.videla@gmail.com
        </a>
        .
      </p>

      <h2 className="tracking-tigh mb-4 mt-6 scroll-m-20 text-2xl font-semibold">
        4. Cambios en las Condiciones
      </h2>
      <p>
        Nos reservamos el derecho de realizar cambios en estas condiciones en
        cualquier momento. Se notificarán cambios significativos a los usuarios.
      </p>

      <p>
        Al utilizar Bancho, aceptas estas condiciones. Gracias por contribuir a
        la causa de la adopción responsable de perros de la calle.
      </p>
    </>
  )
}
