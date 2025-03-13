"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { useState, useRef } from "react"

interface SearchableSelectProps {
  options: { ID: number; Name: string }[]
  placeholder: string
  value: string | null
  onValueChange: (value: string) => void
  searchPlaceholder: string
  searchTerm: string
  onSearchTermChange: (term: string) => void
  onClear: () => void
  disabled?: boolean
}

export function SearchableSelect({
  options,
  placeholder,
  value,
  onValueChange,
  searchPlaceholder,
  searchTerm,
  onSearchTermChange,
  onClear,
  disabled = false,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const clearButtonRef = useRef<HTMLButtonElement>(null)

  // Garantir que options seja sempre um array e que cada item tenha as propriedades necessárias
  const safeOptions = Array.isArray(options)
    ? options.filter(
        (option) => option && typeof option === "object" && option.ID !== undefined && option.Name !== undefined,
      )
    : []

  const handleOpenChange = (open: boolean) => {
    if (document.activeElement === clearButtonRef.current || disabled) {
      return
    }
    setIsOpen(open)
  }

  return (
    <div className="relative">
      <Select
        value={value || ""}
        onValueChange={onValueChange}
        open={isOpen}
        onOpenChange={handleOpenChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-[250px] overflow-y-auto">
          {/* Campo de busca dentro do Select */}
          <div className="p-2">
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
            />
          </div>
          {/* Lista de opções filtradas */}
          {safeOptions.length > 0 ? (
            safeOptions.map((option) => (
              <SelectItem
                key={option.ID}
                value={String(option.ID)} // Usar String() é mais seguro que toString()
              >
                {option.Name}
              </SelectItem>
            ))
          ) : (
            <div className="py-2 px-3 text-sm text-gray-500">Nenhuma opção encontrada</div>
          )}
        </SelectContent>
      </Select>
      {value && !disabled && (
        <button
          type="button"
          ref={clearButtonRef}
          onClick={onClear}
          className="absolute right-8 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 z-10 cursor-pointer"
          tabIndex={-1} // Previne que o botão receba foco no tab
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

