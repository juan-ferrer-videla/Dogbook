"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SlidersHorizontal } from "lucide-react"
import { Checkbox } from "../ui/checkbox"
import { useQuery } from "@/hooks/useQuery"
import { useSearchParams } from "next/navigation"
import { sizes, vaccines } from "@/types"

export const Filters = () => {
  const searchParams = useSearchParams()
  const { createQueryString } = useQuery()

  const { polivalente, polivalente2, polivalente_refuerzo, rabia } = vaccines
  const { big, medium, small } = sizes

  const handeCheckChange =
    (name: string, value: string) => (checked: boolean) => {
      createQueryString({
        name,
        value,
        action: checked ? "append" : "delete",
      })
    }

  const handleDefaultCheck = (name: string, value: string) => {
    return searchParams.has(name, value)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <SlidersHorizontal className="mr-3" size={20} />
          Filtros
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filtros</DialogTitle>
          <DialogDescription>
            Selecciona los filtros para facilitar tu busqueda
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-2">
            <h3 className="font-medium">Por tamaño</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="big"
                onCheckedChange={handeCheckChange("size", big)}
                defaultChecked={handleDefaultCheck("size", big)}
              />
              <label
                htmlFor="big"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {big}
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="medium"
                onCheckedChange={handeCheckChange("size", medium)}
                defaultChecked={handleDefaultCheck("size", medium)}
              />
              <label
                htmlFor="medium"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {medium}
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="small"
                onCheckedChange={handeCheckChange("size", small)}
                defaultChecked={handleDefaultCheck("size", small)}
              />
              <label
                htmlFor="small"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {small}
              </label>
            </div>
          </div>
          <div className="grid items-center gap-2">
            <h3 className="font-medium">Vacunas</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="polivalente"
                onCheckedChange={handeCheckChange("polivalente", "true")}
                defaultChecked={handleDefaultCheck("polivalente", "true")}
              />
              <label
                htmlFor="polivalente"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {polivalente}
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="polivalente2"
                onCheckedChange={handeCheckChange("polivalente2", "true")}
                defaultChecked={handleDefaultCheck("polivalente2", "true")}
              />
              <label
                htmlFor="polivalente2"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {polivalente2}
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rabia"
                onCheckedChange={handeCheckChange("rabia", "true")}
                defaultChecked={handleDefaultCheck("rabia", "true")}
              />
              <label
                htmlFor="rabia"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {rabia}
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="polivalente_refuerzo"
                onCheckedChange={handeCheckChange(
                  "polivalente_refuerzo",
                  "true"
                )}
                defaultChecked={handleDefaultCheck(
                  "polivalente_refuerzo",
                  "true"
                )}
              />
              <label
                htmlFor="polivalente_refuerzo"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {polivalente_refuerzo}
              </label>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
