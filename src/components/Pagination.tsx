"use client"

import { useQuery } from "@/hooks/useQuery"
import React, { ComponentProps, FC, type MouseEventHandler } from "react"

const Back = () => {
  const { createQueryString, getQuery } = useQuery()
  const handleQueryBack = () => {
    const value = (Number(getQuery("page") ?? "1") - 1).toString()
    createQueryString({
      name: "page",
      value,
      action: "set",
    })
  }
  return (
    <button onClick={handleQueryBack} disabled={Number(getQuery("page")) <= 1}>
      Back
    </button>
  )
}
const Foward: FC<Pick<ComponentProps<"button">, "disabled">> = ({
  disabled,
}) => {
  const { createQueryString, getQuery } = useQuery()
  const handleQueryFoward = () => {
    const value = (Number(getQuery("page") ?? "1") + 1).toString()
    createQueryString({
      name: "page",
      value,
      action: "set",
    })
  }
  return (
    <button onClick={handleQueryFoward} disabled={disabled}>
      Foward
    </button>
  )
}

export const Pagination = () => {
  const { createQueryString, getQuery } = useQuery()
  const handleQuery: MouseEventHandler<HTMLButtonElement> = ({
    currentTarget: { textContent },
  }) => {
    createQueryString({
      name: "page",
      value: textContent ?? "1",
      action: "set",
    })
  }

  return (
    <div>
      <ul>
        <li>
          <Back />
        </li>
        <li>
          <button onClick={handleQuery}>1</button>
        </li>
        <li>
          <button onClick={handleQuery}>2</button>
        </li>
        <li>
          <button onClick={handleQuery}>3</button>
        </li>
        <li>
          <Foward />
        </li>
      </ul>
    </div>
  )
}
