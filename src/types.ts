export const vaccines = {
  polivalente: "1era dosis Polivalente (sextuple)",
  polivalente2: "2da dosis Polivalente",
  polivalente_refuerzo: "Refuerzo Polivalente",
  rabia: "rabia",
} as const

export type ValueOf<T> = T[keyof T]

export type SplitKeys<T extends Record<string, unknown>> = {
  [K in keyof T]: Record<K, T[K]>
}[keyof T]

export const sizes = {
  big: "Grande",
  medium: "Mediano",
  small: "Pequeño",
} as const

export type Sizes = ValueOf<typeof sizes>

export const postsPerPage = 12
