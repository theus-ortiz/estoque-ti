"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useEffect, useState } from "react"

interface Type {
  Tipo_Id: number
  Tipo_Nome: string
}

interface TypeSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void // Callback para quando o tipo for salvo com sucesso
  editingType?: Type | null // Tipo sendo editado (se houver)
}

export function NewTypeSheet({ open, onOpenChange, onSuccess, editingType }: TypeSheetProps) {
  const [name, setName] = useState("") // Estado para armazenar o nome
  const [isLoading, setIsLoading] = useState(false) // Estado para controlar o loading
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const isEditing = !!editingType // Verifica se estamos editando ou criando

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setMessage({ type: "error", text: "O nome não pode estar vazio." })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      let response

      if (isEditing && editingType) {
        // Log para debug
        console.log(`Enviando PUT para http://localhost:8080/api/types/${editingType.Tipo_Id}`)

        // Atualizar tipo existente
        response = await fetch(`http://localhost:8080/api/types/${editingType.Tipo_Id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        })

        // Para debug
        if (!response.ok) {
          const errorText = await response.text()
          console.error(`Erro na resposta do servidor (${response.status}):`, errorText)
          throw new Error("Falha ao atualizar o tipo")
        }
      } else {
        // Criar novo tipo
        response = await fetch("http://localhost:8080/api/types", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error(`Erro na resposta do servidor (${response.status}):`, errorText)
          throw new Error("Falha ao salvar o tipo")
        }
      }

      // Mostrar mensagem de sucesso
      setMessage({
        type: "success",
        text: isEditing ? "Tipo atualizado com sucesso!" : "Tipo cadastrado com sucesso!",
      })

      // Limpar o formulário e fechar o sheet após um breve delay para mostrar a mensagem
      setTimeout(() => {
        setName("")
        onOpenChange(false)

        // Chamar o callback de sucesso, se fornecido
        if (onSuccess) {
          onSuccess()
        }
      }, 1000)
    } catch (error) {
      console.error(isEditing ? "Erro ao atualizar tipo:" : "Erro ao salvar tipo:", error)
      setMessage({
        type: "error",
        text: isEditing
          ? "Ocorreu um erro ao atualizar o tipo. Tente novamente."
          : "Ocorreu um erro ao salvar o tipo. Tente novamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Limpa o campo ou preenche com dados de edição quando o sheet é aberto
  useEffect(() => {
    if (open) {
      if (isEditing && editingType) {
        // Preencher o formulário com os dados do tipo sendo editado
        setName(editingType.Tipo_Nome)
      } else {
        // Limpar o formulário para um novo tipo
        setName("")
      }
      setMessage(null)
    }
  }, [open, editingType, isEditing]) // Executa sempre que `open` ou `editingType` mudar

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{isEditing ? "Editar Tipo" : "Cadastrar Novo Tipo"}</SheetTitle>
          <SheetDescription>
            {isEditing ? "Edite as informações do tipo abaixo." : "Insira um nome abaixo para criar um novo Tipo."}
          </SheetDescription>
        </SheetHeader>
        <form className="space-y-4 pl-4 pr-4 pb-4" onSubmit={handleSubmit}>
          {/* Mensagem de feedback */}
          {message && (
            <div
              className={`p-3 rounded-md ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            >
              {message.text}
            </div>
          )}

          {/* Campo Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome*</Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite o nome"
              className="w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required // Campo obrigatório
              autoComplete="off"
              disabled={isLoading}
            />
          </div>

          {/* Botão de Salvar/Atualizar */}
          <div className="flex justify-end">
            <Button type="submit" className="cursor-pointer" disabled={isLoading}>
              {isLoading ? (isEditing ? "Atualizando..." : "Salvando...") : isEditing ? "Atualizar" : "Salvar"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}

