import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PaginationComponent } from "@/components/Pagination"
import { ReactNode } from "react"

interface Column {
  key: string
  label: string
  defaultValue?: any
}

interface Action {
  label: string | ReactNode // REACTNODE PERMITE QUE COLOQUE ICONES TAMBÉM.
  onClick: (id: number) => void
}

interface ListTabProps {
  title: string
  columns: Column[]
  data: any[]
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (pageNumber: number) => void
  onAddButtonClick?: () => void
  addButtonLabel?: string
  actions?: Action[]
  idKey: string // Nova prop para a chave do ID
}

export function ListTab({
  title,
  columns,
  data,
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onAddButtonClick,
  addButtonLabel = "Adicionar",
  actions = [],
  idKey, // Recebe a chave do ID
}: ListTabProps) {
  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-5xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">{title}</CardTitle>
          {onAddButtonClick && (
            <Button className="cursor-pointer" onClick={onAddButtonClick}>
              {addButtonLabel}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key}>{column.label}</TableHead>
                ))}
                {actions.length > 0 && <TableHead>Ações</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {item[column.key] ?? column.defaultValue}</TableCell>
                  ))}
                  {actions.length > 0 && (
                    <TableCell>
                      <div className="flex gap-2">
                        {actions.map((action, actionIndex) => (
                          <Button
                            key={actionIndex}
                            variant="outline"
                            className="cursor-pointer"
                            size="sm"
                            onClick={() => action.onClick(item[idKey])} // Usa a chave do ID
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <PaginationComponent
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </CardContent>
      </Card>
    </div>
  )
}