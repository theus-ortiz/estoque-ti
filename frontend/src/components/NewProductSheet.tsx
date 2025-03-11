"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { SearchableSelect } from "@/components/SearchableSelect"

interface NewProductSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface Type {
  ID: number
  Name: string
}

interface Brand {
  ID: number
  Name: string
}

export function NewProductSheet({ open, onOpenChange }: NewProductSheetProps) {
  const [types, setTypes] = useState<Type[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null)
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [brandSearchTerm, setBrandSearchTerm] = useState("")
  const [filteredTypes, setFilteredTypes] = useState<Type[]>([])
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>([])

  // Fetch types and brands from API
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/types")
        const data = await response.json()
        setTypes(data)
        setFilteredTypes(data)
      } catch (error) {
        console.error("Erro ao buscar tipos:", error)
      }
    }

    const fetchBrands = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/brands")
        const data = await response.json()
        setBrands(data)
        setFilteredBrands(data)
      } catch (error) {
        console.error("Erro ao buscar marcas:", error)
      }
    }

    if (open) {
      fetchTypes()
      fetchBrands()
    }
  }, [open])

  // Filter types based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = types.filter((type) => type.Name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredTypes(filtered)
    } else {
      setFilteredTypes(types)
    }
  }, [searchTerm, types])

  // Filter brands based on search term
  useEffect(() => {
    if (brandSearchTerm) {
      const filtered = brands.filter((brand) => brand.Name.toLowerCase().includes(brandSearchTerm.toLowerCase()))
      setFilteredBrands(filtered)
    } else {
      setFilteredBrands(brands)
    }
  }, [brandSearchTerm, brands])

  // Clear fields when form opens
  useEffect(() => {
    if (open) {
      setSelectedTypeId(null)
      setSelectedBrandId(null)
      setSearchTerm("")
      setBrandSearchTerm("")
      setFilteredTypes(types)
      setFilteredBrands(brands)
    }
  }, [open, types, brands])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Cadastrar Novo Produto</SheetTitle>
          <SheetDescription>
            Preencha os campos abaixo para cadastrar um novo produto. Itens com * são obrigatórios.
          </SheetDescription>
        </SheetHeader>
        <form
          className="space-y-4 pl-4 pr-4 pb-4"
          onSubmit={(e) => {
            e.preventDefault()
            console.log("Tipo selecionado (ID):", selectedTypeId)
            console.log("Marca selecionada (ID):", selectedBrandId)
          }}
        >
          {/* Campo Tipo */}
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo*</Label>
            <SearchableSelect
              options={filteredTypes}
              placeholder="Selecione um tipo"
              value={selectedTypeId}
              onValueChange={setSelectedTypeId}
              searchPlaceholder="Buscar tipo..."
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              onClear={() => {
                setSelectedTypeId(null)
                setSearchTerm("")
              }}
            />
          </div>

          {/* Campo Marca */}
          <div className="space-y-2">
            <Label htmlFor="marca">Marca*</Label>
            <SearchableSelect
              options={filteredBrands}
              placeholder="Selecione uma marca"
              value={selectedBrandId}
              onValueChange={setSelectedBrandId}
              searchPlaceholder="Buscar marca..."
              searchTerm={brandSearchTerm}
              onSearchTermChange={setBrandSearchTerm}
              onClear={() => {
                setSelectedBrandId(null)
                setBrandSearchTerm("")
              }}
            />
          </div>

          {/* Campo Quantidade */}
          <div className="space-y-2">
            <Label htmlFor="quantidade">Quantidade*</Label>
            <Input id="quantidade" type="number" placeholder="Quantidade" className="w-full" />
          </div>

          {/* Campo Unidade de Medida */}
          <div className="space-y-2">
            <Label htmlFor="unidade">Unidade de Medida*</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unidade">Unidade</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campo Condição */}
          <div className="space-y-2">
            <Label htmlFor="condicao">Condição*</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a condição" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Novo">Novo</SelectItem>
                <SelectItem value="Usado">Usado</SelectItem>
                <SelectItem value="Danificado">Danificado</SelectItem>
                <SelectItem value="Descarte">Descarte</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campo Local */}
          <div className="space-y-2">
            <Label htmlFor="local">Local*</Label>
            <Input id="local" placeholder="Local do produto" className="w-full" />
          </div>

          {/* Campo Observação */}
          <div className="space-y-2">
            <Label htmlFor="observacao">Observação</Label>
            <Textarea id="observacao" placeholder="Observações adicionais" className="w-full" />
          </div>

          {/* Campo Imagem */}
          <div className="space-y-2">
            <Label htmlFor="imagem">Imagem</Label>
            <Input id="imagem" type="file" className="w-full" />
          </div>

          {/* Botão de Salvar */}
          <div className="flex justify-end">
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}