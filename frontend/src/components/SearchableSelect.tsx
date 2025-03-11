// components/SearchableSelect.tsx
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
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const clearButtonRef = useRef<HTMLButtonElement>(null)

  const handleOpenChange = (open: boolean) => {
    if (document.activeElement === clearButtonRef.current) {
      return
    }
    setIsOpen(open)
  }

  return (
    <div className="relative">
      <Select value={value || ""} onValueChange={onValueChange} open={isOpen} onOpenChange={handleOpenChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {/* Campo de busca dentro do Select */}
          <div className="p-2">
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
            />
          </div>
          {/* Lista de opções filtradas */}
          {options.map((option) => (
            <SelectItem key={option.ID} value={option.ID.toString()}>
              {option.Name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {value && (
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