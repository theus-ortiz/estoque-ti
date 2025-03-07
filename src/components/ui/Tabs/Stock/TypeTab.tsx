import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export function TypeTab() {
  return (
    <Card className="w-full flex flex-col flex-grow">
      <CardHeader>
        <CardTitle>Tipo</CardTitle>
        <CardDescription>Insira os detalhes do tipo.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <div className="space-y-1">
          <Label htmlFor="typeName">Nome</Label>
          <Input id="typeName" />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="asset" />
          <Label htmlFor="asset">Patrimônio</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="cursor-pointer">Salvar</Button>
      </CardFooter>
    </Card>
  )
}