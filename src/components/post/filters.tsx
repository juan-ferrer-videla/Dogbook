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
import { sizes } from "@/types"

export const Filters = () => {
  const searchParams = useSearchParams()
  const { createQueryString } = useQuery()

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
                onCheckedChange={handeCheckChange("big", big)}
                defaultChecked={handleDefaultCheck("big", big)}
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
                onCheckedChange={handeCheckChange("medium", medium)}
                defaultChecked={handleDefaultCheck("medium", medium)}
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
                onCheckedChange={handeCheckChange("small", small)}
                defaultChecked={handleDefaultCheck("small", small)}
              />
              <label
                htmlFor="small"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {small}
              </label>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
