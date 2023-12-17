export const vaccines = {
  polivalente: "1era dosis Polivalente (sextuple)",
  polivalente2: "2da dosis Polivalente",
  polivalente_refuerzo: "Refuerzo Polivalente",
  rabia: "rabia",
} as const

type ValueOf<T> = T[keyof T]
export type Vaccines = ValueOf<typeof vaccines>

export const sizes = {
  big: "Grande",
  medium: "Mediano",
  small: "Pequeño",
} as const
