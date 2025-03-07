import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function BrandTab() {
  return (
    <Card className="w-full flex flex-col flex-grow">
      <CardHeader>
        <CardTitle>Marca</CardTitle>
        <CardDescription>Insira o nome da marca.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <div className="space-y-1">
          <Label htmlFor="brandName">Nome</Label>
          <Input id="brandName" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="cursor-pointer">Salvar</Button>
      </CardFooter>
    </Card>
  )
}