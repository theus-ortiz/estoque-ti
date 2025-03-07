import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function UnitTab() {
  return (
    <Card className="w-full flex flex-col flex-grow">
      <CardHeader>
        <CardTitle>Unidades</CardTitle>
        <CardDescription>Insira os detalhes da unidade de medida.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <div className="space-y-1">
          <Label htmlFor="unitName">Nome</Label>
          <Input id="unitName" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="acronym">Sigla</Label>
          <Input id="acronym" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="cursor-pointer">Salvar</Button>
      </CardFooter>
    </Card>
  )
}