"use client"

import { Pencil, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { ListTab } from "./ListTab"
import { NewTypeSheet } from "./NewTypeSheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Type {
  Tipo_Id: number
  Tipo_Nome: string
}

export function ListTypesTab() {
  const [types, setTypes] = useState<Type[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingType, setEditingType] = useState<Type | null>(null)
  const [typeToDelete, setTypeToDelete] = useState<Type | null>(null)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const itemsPerPage = 8

  useEffect(() => {
    fetchTypes()
  }, [currentPage])

  const fetchTypes = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/types?page=${currentPage}&limit=${itemsPerPage}`)
      const data = await response.json()
      setTypes(data.types)
      setTotalItems(data.total)
      setErrorMessage(null)
    } catch (error) {
      console.error("Erro ao buscar tipos:", error)
      setErrorMessage("Não foi possível carregar a lista de tipos.")
    }
  }

  const handleEdit = (id: number) => {
    const typeToEdit = types.find((type) => type.Tipo_Id === id)
    if (typeToEdit) {
      setEditingType(typeToEdit)
      setIsSheetOpen(true)
    }
  }

  const handleDelete = (id: number) => {
    const typeToDelete = types.find((type) => type.Tipo_Id === id)
    if (typeToDelete) {
      setTypeToDelete(typeToDelete)
      setIsAlertOpen(true)
    }
  }

  const confirmDelete = async () => {
    if (!typeToDelete) return

    try {
      // Usar fetch com a URL correta
      const response = await fetch(`http://localhost:8080/api/types/${typeToDelete.Tipo_Id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        fetchTypes() // Atualizar a lista
      } else {
        const errorText = await response.text()
        console.error("Erro ao excluir tipo:", errorText)
        setErrorMessage("Não foi possível excluir o tipo.")
      }
    } catch (error) {
      console.error("Erro ao excluir tipo:", error)
      setErrorMessage("Ocorreu um erro ao tentar excluir o tipo.")
    } finally {
      setIsAlertOpen(false)
      setTypeToDelete(null)
    }
  }

  const handleSheetClose = (open: boolean) => {
    if (!open) {
      setEditingType(null)
      fetchTypes() // Atualizar a lista quando o sheet é fechado
    }
    setIsSheetOpen(open)
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const columns = [{ key: "Tipo_Nome", label: "Tipo", width: "500px" }]

  const actions = [
    { label: <Pencil />, onClick: handleEdit },
    { label: <Trash2 />, onClick: handleDelete },
  ]

  return (
    <>
      {errorMessage && <div className="bg-red-100 text-red-800 p-3 mb-4 rounded-md">{errorMessage}</div>}

      <ListTab
        title="Lista de Tipos"
        columns={columns}
        data={types}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={paginate}
        onAddButtonClick={() => setIsSheetOpen(true)}
        addButtonLabel="Novo Tipo"
        actions={actions}
        idKey="Tipo_Id"
      />

      <NewTypeSheet
        open={isSheetOpen}
        onOpenChange={handleSheetClose}
        onSuccess={fetchTypes}
        editingType={editingType}
      />

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o tipo "{typeToDelete?.Tipo_Nome}"?<br />Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

