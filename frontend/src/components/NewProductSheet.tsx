"use client"

import type React from "react"

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

// Atualizando as interfaces para corresponder ao formato do backend
interface Type {
  Tipo_Id: number // Alterado de ID para Tipo_Id
  Tipo_Nome: string // Alterado de Name para Tipo_Nome
}

interface Brand {
  ID: number
  Name: string
}

interface Location {
  ID: number
  LocalName: string
}

// Interface para o formato esperado pelo SearchableSelect
interface SelectOption {
  ID: number
  Name: string
}

export function NewProductSheet({ open, onOpenChange }: NewProductSheetProps) {
  const [types, setTypes] = useState<Type[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null)
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null)
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [brandSearchTerm, setBrandSearchTerm] = useState("")
  const [locationSearchTerm, setLocationSearchTerm] = useState("")
  const [filteredTypes, setFilteredTypes] = useState<Type[]>([])
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>([])
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([])
  const [quantidade, setQuantidade] = useState<string>("")
  const [unidadeMedida, setUnidadeMedida] = useState<string>("")
  const [condicao, setCondicao] = useState<string>("")
  const [observacao, setObservacao] = useState<string>("")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/types", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`Erro ao buscar tipos: ${response.status}`)
        }

        const data = await response.json()
        console.log("Resposta completa da API de tipos:", data)

        // Verificar a estrutura da resposta e extrair os tipos
        let typesData: any[] = []

        if (data.types && Array.isArray(data.types)) {
          typesData = data.types
        } else if (Array.isArray(data)) {
          typesData = data
        }

        // Validar cada item para garantir que tem a estrutura correta
        const validTypes = typesData.filter(
          (item: any) => item && typeof item === "object" && "Tipo_Id" in item && "Tipo_Nome" in item,
        ) as Type[]

        console.log("Tipos válidos:", validTypes)
        setTypes(validTypes)
        setFilteredTypes(validTypes)
      } catch (error) {
        console.error("Erro ao buscar tipos:", error)
        setMessage({ type: "error", text: "Erro ao carregar tipos. Tente novamente." })
        setTypes([])
        setFilteredTypes([])
      }
    }

    const fetchBrands = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/brands", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`Erro ao buscar marcas: ${response.status}`)
        }

        const data = await response.json()
        console.log("Resposta completa da API de marcas:", data)

        // Verificar a estrutura da resposta e extrair as marcas
        let brandsData: any[] = []

        if (data.brands && Array.isArray(data.brands)) {
          brandsData = data.brands
        } else if (Array.isArray(data)) {
          brandsData = data
        }

        // Validar cada item para garantir que tem a estrutura correta
        const validBrands = brandsData.filter(
          (item: any) => item && typeof item === "object" && "ID" in item && "Name" in item,
        ) as Brand[]

        console.log("Marcas válidas:", validBrands)
        setBrands(validBrands)
        setFilteredBrands(validBrands)
      } catch (error) {
        console.error("Erro ao buscar marcas:", error)
        setMessage({ type: "error", text: "Erro ao carregar marcas. Tente novamente." })
        setBrands([])
        setFilteredBrands([])
      }
    }

    const fetchLocations = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/locations", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`Erro ao buscar locais: ${response.status}`)
        }

        const data = await response.json()
        console.log("Resposta completa da API de locais:", data)

        // Verificar a estrutura da resposta e extrair os locais
        let locationsData: any[] = []

        if (data.locations && Array.isArray(data.locations)) {
          locationsData = data.locations
        } else if (Array.isArray(data)) {
          locationsData = data
        }

        // Validar cada item para garantir que tem a estrutura correta
        const validLocations = locationsData.filter(
          (item: any) => item && typeof item === "object" && "ID" in item && "LocalName" in item,
        ) as Location[]

        console.log("Locais válidos:", validLocations)
        setLocations(validLocations)
        setFilteredLocations(validLocations)
      } catch (error) {
        console.error("Erro ao buscar locais:", error)
        setMessage({ type: "error", text: "Erro ao carregar locais. Tente novamente." })
        setLocations([])
        setFilteredLocations([])
      }
    }

    if (open) {
      setMessage(null)
      fetchTypes()
      fetchBrands()
      fetchLocations()
    }
  }, [open])

  useEffect(() => {
    if (searchTerm && Array.isArray(types)) {
      const filtered = types.filter(
        (type) => type && type.Tipo_Nome && type.Tipo_Nome.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredTypes(filtered)
    } else {
      setFilteredTypes(types)
    }
  }, [searchTerm, types])

  useEffect(() => {
    if (brandSearchTerm && Array.isArray(brands)) {
      const filtered = brands.filter(
        (brand) => brand && brand.Name && brand.Name.toLowerCase().includes(brandSearchTerm.toLowerCase()),
      )
      setFilteredBrands(filtered)
    } else {
      setFilteredBrands(brands)
    }
  }, [brandSearchTerm, brands])

  useEffect(() => {
    if (locationSearchTerm && Array.isArray(locations)) {
      const filtered = locations.filter(
        (location) =>
          location && location.LocalName && location.LocalName.toLowerCase().includes(locationSearchTerm.toLowerCase()),
      )
      setFilteredLocations(filtered)
    } else {
      setFilteredLocations(locations)
    }
  }, [locationSearchTerm, locations])

  // Limpa os campos quando abrir o sheet
  useEffect(() => {
    if (open) {
      setSelectedTypeId(null)
      setSelectedBrandId(null)
      setSelectedLocationId(null)
      setSearchTerm("")
      setBrandSearchTerm("")
      setLocationSearchTerm("")
      setQuantidade("")
      setUnidadeMedida("")
      setCondicao("")
      setObservacao("")
      setMessage(null)
    }
  }, [open])

  // Função para salvar o produto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    if (!selectedTypeId || !selectedBrandId || !selectedLocationId || !quantidade || !unidadeMedida || !condicao) {
      setMessage({ type: "error", text: "Preencha todos os campos obrigatórios." })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      // Simulando uma chamada de API bem-sucedida
      console.log("=== VALORES DO FORMULÁRIO ===")
      console.log("Tipo (ID):", selectedTypeId)
      console.log("Marca (ID):", selectedBrandId)
      console.log("Local (ID):", selectedLocationId)
      console.log("Quantidade:", quantidade)
      console.log("Unidade de Medida:", unidadeMedida)
      console.log("Condição:", condicao)
      console.log("Observação:", observacao)
      console.log("===========================")

      // Simular um delay para mostrar o loading
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setMessage({ type: "success", text: "Produto cadastrado com sucesso!" })

      // Fechar o sheet após um breve delay
      setTimeout(() => {
        onOpenChange(false)
      }, 1500)
    } catch (error) {
      console.error("Erro ao salvar produto:", error)
      setMessage({ type: "error", text: "Ocorreu um erro ao salvar o produto. Tente novamente." })
    } finally {
      setIsLoading(false)
    }
  }

  // Converter os tipos para o formato esperado pelo SearchableSelect
  const mappedTypes: SelectOption[] = Array.isArray(filteredTypes)
    ? filteredTypes
        .filter(
          (type): type is Type =>
            type && typeof type === "object" && type.Tipo_Id !== undefined && type.Tipo_Nome !== undefined,
        )
        .map((type) => ({
          ID: type.Tipo_Id,
          Name: type.Tipo_Nome,
        }))
    : []

  // Mapear locations para o formato esperado pelo SearchableSelect
  const mappedLocations: SelectOption[] = Array.isArray(filteredLocations)
    ? filteredLocations
        .filter(
          (location): location is Location =>
            location && typeof location === "object" && location.ID !== undefined && location.LocalName !== undefined,
        )
        .map((location) => ({
          ID: location.ID,
          Name: location.LocalName,
        }))
    : []

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Cadastrar Novo Produto</SheetTitle>
          <SheetDescription>
            Preencha os campos abaixo para cadastrar um novo produto. Itens com * são obrigatórios.
          </SheetDescription>
        </SheetHeader>
        <form className="space-y-4 pl-4 pr-4 pb-4 mt-6" onSubmit={handleSubmit}>
          {/* Mensagem de feedback */}
          {message && (
            <div
              className={`p-3 rounded-md ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            >
              {message.text}
            </div>
          )}

          {/* Campo Tipo */}
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo*</Label>
            <SearchableSelect
              options={mappedTypes}
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>

          {/* Campo Local */}
          <div className="space-y-2">
            <Label htmlFor="local">Local*</Label>
            <SearchableSelect
              options={mappedLocations}
              placeholder="Selecione um local"
              value={selectedLocationId}
              onValueChange={setSelectedLocationId}
              searchPlaceholder="Buscar local..."
              searchTerm={locationSearchTerm}
              onSearchTermChange={setLocationSearchTerm}
              onClear={() => {
                setSelectedLocationId(null)
                setLocationSearchTerm("")
              }}
              disabled={isLoading}
            />
          </div>

          {/* Campo Quantidade */}
          <div className="space-y-2">
            <Label htmlFor="quantidade">Quantidade*</Label>
            <Input
              id="quantidade"
              type="number"
              placeholder="Quantidade"
              className="w-full"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Campo Unidade de Medida */}
          <div className="space-y-2">
            <Label htmlFor="unidade">Unidade de Medida*</Label>
            <Select value={unidadeMedida} onValueChange={setUnidadeMedida} disabled={isLoading}>
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
            <Select value={condicao} onValueChange={setCondicao} disabled={isLoading}>
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

          {/* Campo Observação */}
          <div className="space-y-2">
            <Label htmlFor="observacao">Observação</Label>
            <Textarea
              id="observacao"
              placeholder="Observações adicionais"
              className="w-full"
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Botão de Salvar */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}

