import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function ProductTab() {
  return (
    <Card className="w-full flex flex-col flex-grow">
      <CardHeader>
        <CardTitle>Produto</CardTitle>
        <CardDescription>Insira os detalhes do produto.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 flex-grow">
        <div className="space-y-1">
          <Label htmlFor="type">Tipo</Label>
          <Input id="type" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="brand">Marca</Label>
          <Input id="brand" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="quantity">Quantidade</Label>
          <Input id="quantity" type="number" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="unit">Unidade de medida</Label>
          <Input id="unit" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="condition">Condição</Label>
          <Input id="condition" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="location">Local</Label>
          <Input id="location" />
        </div>
        <div className="space-y-1 col-span-2">
          <Label htmlFor="observation">Observações</Label>
          <Input id="observation" />
        </div>
        <div className="space-y-1 col-span-2">
          <Label htmlFor="image">Imagem</Label>
          <Input id="image" type="file" accept="image/*" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="cursor-pointer">Salvar</Button>
      </CardFooter>
    </Card>
  )
}