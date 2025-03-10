import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"

interface NewProductSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewProductSheet({ open, onOpenChange }: NewProductSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Cadastrar Novo Produto</SheetTitle>
          <SheetDescription>
            Preencha os campos abaixo para cadastrar um novo produto.
          </SheetDescription>
        </SheetHeader>
        <form className="space-y-4 pl-4 pr-4 pb-4">
          {/* Campo Tipo */}
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo</Label>
            <Input id="tipo" placeholder="Tipo do produto" />
          </div>

          {/* Campo Marca */}
          <div className="space-y-2">
            <Label htmlFor="marca">Marca</Label>
            <Input id="marca" placeholder="Marca do produto" />
          </div>

          {/* Campo Quantidade */}
          <div className="space-y-2">
            <Label htmlFor="quantidade">Quantidade</Label>
            <Input id="quantidade" type="number" placeholder="Quantidade" />
          </div>

          {/* Campo Unidade de Medida */}
          <div className="space-y-2">
            <Label htmlFor="unidade">Unidade de Medida</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unidade">Unidade</SelectItem>
                <SelectItem value="litro">Litro</SelectItem>
                <SelectItem value="quilograma">Quilograma</SelectItem>
                <SelectItem value="metro">Metro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campo Condição */}
          <div className="space-y-2">
            <Label htmlFor="condicao">Condição</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a condição" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="novo">Novo</SelectItem>
                <SelectItem value="usado">Usado</SelectItem>
                <SelectItem value="danificado">Danificado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campo Local */}
          <div className="space-y-2">
            <Label htmlFor="local">Local</Label>
            <Input id="local" placeholder="Local do produto" />
          </div>

          {/* Campo Observação */}
          <div className="space-y-2">
            <Label htmlFor="observacao">Observação</Label>
            <Textarea id="observacao" placeholder="Observações adicionais" />
          </div>

          {/* Campo Imagem */}
          <div className="space-y-2">
            <Label htmlFor="imagem">Imagem</Label>
            <Input id="imagem" type="file" />
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