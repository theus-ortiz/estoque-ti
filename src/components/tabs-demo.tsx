"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

export function TabsStock() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState("product")

  useEffect(() => {
    const path = location.pathname
    if (path.includes("/stock/product")) setActiveTab("product")
    else if (path.includes("/stock/type")) setActiveTab("type")
    else if (path.includes("/stock/brand")) setActiveTab("brands")
    else if (path.includes("/stock/unit")) setActiveTab("units")
  }, [location])

  const handleTabChange = (value: string) => {
    switch (value) {
      case "product":
        navigate("/stock/product")
        break
      case "type":
        navigate("/stock/type")
        break
      case "brands":
        navigate("/stock/brand")
        break
      case "units":
        navigate("/stock/unit")
        break
    }
  }

  return (
<Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-4xl mx-auto">
  <TabsList className="grid w-full grid-cols-4">
    <TabsTrigger value="product" className="cursor-pointer">Produto</TabsTrigger>
    <TabsTrigger value="type" className="cursor-pointer">Tipo</TabsTrigger>
    <TabsTrigger value="brands" className="cursor-pointer">Marca</TabsTrigger>
    <TabsTrigger value="units" className="cursor-pointer">Unidades</TabsTrigger>
  </TabsList>

  <div className="mt-6 min-h-[500px] flex">
    <TabsContent value="product" className="w-full h-full flex">
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
            <Label htmlFor="location">Localização</Label>
            <Input id="location" />
          </div>
          <div className="space-y-1 col-span-2">
            <Label htmlFor="observation">Observação</Label>
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
    </TabsContent>

    <TabsContent value="type" className="w-full h-full flex">
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
            <Label htmlFor="asset">Asset</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="cursor-pointer">Salvar</Button>
        </CardFooter>
      </Card>
    </TabsContent>

    <TabsContent value="brands" className="w-full h-full flex">
      <Card className="w-full flex flex-col flex-grow">
        <CardHeader>
          <CardTitle>Marca</CardTitle>
          <CardDescription>Insira do nome da marca.</CardDescription>
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
    </TabsContent>

    <TabsContent value="units" className="w-full h-full flex">
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
            <Label htmlFor="acronym">Sigla da unidade</Label>
            <Input id="acronym" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="cursor-pointer">Salvar</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  </div>
</Tabs>
  )
}