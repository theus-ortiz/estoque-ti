import { useEffect, useState } from "react"
import { ListTab } from "@/components/ListTab"
import { NewProductSheet } from "@/components/NewProductSheet"
import { Eye, Pencil, Trash2  } from "lucide-react"

interface Product {
  Produtos_Id: number
  Tipo_Nome: string
  Marca_Nome: string
  Local: string
  Qtd_Total: number
}

export function ListProductsTab() {
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const itemsPerPage = 8

  useEffect(() => {
    fetchProducts()
  }, [currentPage])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/products?page=${currentPage}&limit=${itemsPerPage}`)
      const data = await response.json()
      setProducts(data.products)
      setTotalItems(data.total)
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
    }
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleEdit = (id: number) => {
    console.log("Editar produto com ID:", id)
    // Lógica para editar o produto
  }

  const handleDelete = (id: number) => {
    console.log("Excluir produto com ID:", id)
    // Lógica para excluir o produto
  }

  const handleView = (id: number) => {
    console.log("Visualizar produto com ID:", id)
    // Lógica para visualizar o produto
  }

  const columns = [
    { key: "Tipo_Nome", label: "Tipo" }, // Não inclua o ID aqui
    { key: "Marca_Nome", label: "Marca" },
    { key: "Local", label: "Local" },
    { key: "Qtd_Total", label: "Quantidade Total" },
    { key: "Qtd_Ideal", label: "Quantidade Ideal", defaultValue: 0},
  ]

  const actions = [
    { label: <Pencil />, onClick: handleEdit },
    { label: <Trash2 />, onClick: handleDelete },
    { label: <Eye />, onClick: handleView },
  ]

  return (
    <>
      <ListTab
        title="Lista de Produtos"
        columns={columns}
        data={products}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={paginate}
        onAddButtonClick={() => setIsSheetOpen(true)}
        addButtonLabel="Novo Produto"
        actions={actions}
        idKey="Produtos_Id" // Passa a chave do ID
      />

      <NewProductSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </>
  )
}