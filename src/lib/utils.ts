import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function toTrim<T extends Record<PropertyKey, any>>(obj: T): T {
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = obj[key].trim()
    }
  }
  return obj
}
