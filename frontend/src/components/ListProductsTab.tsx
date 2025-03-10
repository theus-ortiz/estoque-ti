import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination"
import { NewProductSheet } from "@/components/NewProductSheet"

interface Product {
  Produtos_Id: number
  Tipo_Nome: string
  Marca_Nome: string
  Local: string
  Qtd_Total: number
}

export function ListProductsTab() {
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1) // Estado para controlar a página atual
  const [isSheetOpen, setIsSheetOpen] = useState(false) // Estado para controlar a abertura do Sheet
  const itemsPerPage = 8 // Número de itens por página

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Erro ao buscar produtos:", error))
  }, [])

  // Lógica para dividir os produtos em páginas
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem)

  // Lógica para mudar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-5xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Lista de Produtos</CardTitle>
          <Button className="cursor-pointer" onClick={() => setIsSheetOpen(true)}>
            Novo Produto
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Quantidade Total</TableHead>
                <TableHead>Quantidade Emprestada</TableHead>
                <TableHead>Quantidade Ideal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((product) => (
                <TableRow key={product.Produtos_Id}>
                  <TableCell>{product.Tipo_Nome}</TableCell>
                  <TableCell>{product.Marca_Nome}</TableCell>
                  <TableCell>{product.Local}</TableCell>
                  <TableCell>{product.Qtd_Total}</TableCell>
                  <TableCell>Unidade</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Paginação */}
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (currentPage > 1) paginate(currentPage - 1) // Só muda de página se não estiver na primeira
                  }}
                  className={currentPage === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"} // Desabilita visualmente o botão
                />
              </PaginationItem>

              {/* Números das páginas */}
              {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => paginate(index + 1)}
                    isActive={currentPage === index + 1} // Destaca a página atual
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (currentPage < Math.ceil(products.length / itemsPerPage)) paginate(currentPage + 1) // Só muda de página se não estiver na última
                  }}
                  className={
                    currentPage === Math.ceil(products.length / itemsPerPage)
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  } // Desabilita visualmente o botão
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>

      {/* Componente NewProductSheet */}
      <NewProductSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </div>
  )
}