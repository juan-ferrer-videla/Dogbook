import React from "react"

export const Spinner = ({
  variant = "primary",
}: {
  variant?: keyof typeof variants
}) => {
  const variants = {
    primary: "border-primary-foreground border-t-primary",
    destructive: "border-destructive-foreground border-t-destructive",
  } as const

  return (
    <div
      className={`mx-2 h-4 w-4 animate-spin rounded-full border ${variants[variant]}`}
    />
  )
}
