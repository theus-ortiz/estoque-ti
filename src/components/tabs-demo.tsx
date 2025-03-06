"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

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
            <Label htmlFor="asset">Patrimônio</Label>
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
            <Label htmlFor="acronym">Sigla</Label>
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

export function TabsControl() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState("employees")
  const [phoneNumber, setPhoneNumber] = useState("")

  useEffect(() => {
    const path = location.pathname
    if (path.includes("/control/employees")) setActiveTab("employees")
    else if (path.includes("/control/loans")) setActiveTab("loans")
  }, [location])

  const handleTabChange = (value: string) => {
    switch (value) {
      case "employees":
        navigate("/control/employees")
        break
      case "loans":
        navigate("/control/loans")
        break
    }
  }

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, '')
    const phoneNumberLength = phoneNumber.length

    if (phoneNumberLength < 3) return phoneNumber
    if (phoneNumberLength < 7) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value)
    setPhoneNumber(formattedPhoneNumber)
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="employees" className="cursor-pointer">Funcionários</TabsTrigger>
        <TabsTrigger value="loans" className="cursor-pointer">Empréstimos</TabsTrigger>
      </TabsList>

      <div className="mt-6 min-h-[500px] flex">
        <TabsContent value="employees" className="w-full h-full flex">
          <Card className="w-full flex flex-col flex-grow">
            <CardHeader>
              <CardTitle>Funcionários</CardTitle>
              <CardDescription>Insira os detalhes do funcionário.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 flex-grow">
              <div className="space-y-1">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="sector">Setor</Label>
                <Input id="sector" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="badge">Crachá</Label>
                <Input id="badge" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  maxLength={15}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="cursor-pointer">Salvar</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="loans" className="w-full h-full flex">
          <Card className="w-full flex flex-col flex-grow">
            <CardHeader>
              <CardTitle>Empréstimos</CardTitle>
              <CardDescription>Insira os detalhes do empréstimo.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="space-y-1">
                <Label htmlFor="product">Produto</Label>
                <Input id="product" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="employee">Funcionário</Label>
                <Input id="employee" />
              </div>
              <div className="flex flex-col space-y-2 mt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="homeoffice" />
                  <Label htmlFor="homeoffice">Homeoffice</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="delayed" />
                  <Label htmlFor="delayed">Atrasado</Label>
                </div>
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

export function TabsProperty() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState("branch")

  useEffect(() => {
    const path = location.pathname
    if (path.includes("/property/branch")) setActiveTab("branch")
    else if (path.includes("/property/department")) setActiveTab("department")
    else if (path.includes("/property/suppliers")) setActiveTab("suppliers")
  }, [location])

  const handleTabChange = (value: string) => {
    switch (value) {
      case "branch":
        navigate("/property/branch")
        break
      case "department":
        navigate("/property/department")
        break
      case "suppliers":
        navigate("/property/suppliers")
        break
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="branch" className="cursor-pointer">Filiais</TabsTrigger>
        <TabsTrigger value="department" className="cursor-pointer">Setores</TabsTrigger>
        <TabsTrigger value="suppliers" className="cursor-pointer">Fornecedores</TabsTrigger>
      </TabsList>

      <div className="mt-6 min-h-[500px] flex">
        <TabsContent value="branch" className="w-full h-full flex">
          <Card className="w-full flex flex-col flex-grow">
            <CardHeader>
              <CardTitle>Filiais</CardTitle>
              <CardDescription>Insira os detalhes da filial.</CardDescription>
            </CardHeader>
            <CardContent className="gap-4 flex-grow">
              <div className="space-y-1">
                <Label htmlFor="name">Nome filial</Label>
                <Input id="name" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="cursor-pointer">Salvar</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="department" className="w-full h-full flex">
          <Card className="w-full flex flex-col flex-grow">
            <CardHeader>
              <CardTitle>Setores</CardTitle>
              <CardDescription>Insira os detalhes do setor.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="space-y-1">
                <Label htmlFor="product">Nome</Label>
                <Input id="product" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="employee">Filial</Label>
                <Input id="employee" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="cursor-pointer">Salvar</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="w-full h-full flex">
          <Card className="w-full flex flex-col flex-grow">
            <CardHeader>
              <CardTitle>Fornecedores</CardTitle>
              <CardDescription>Insira os detalhes do fornecedor.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="space-y-1">
                <Label htmlFor="product">Nome</Label>
                <Input id="product" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="employee">CNPJ</Label>
                <Input id="employee" />
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

export function TabsUsers() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState("listUser")

  useEffect(() => {
    const path = location.pathname
    if (path.includes("/users/listUser")) setActiveTab("listUser")
    else if (path.includes("/users/creatUser")) setActiveTab("creatUser")
  }, [location])

  const handleTabChange = (value: string) => {
    switch (value) {
      case "listUser":
        navigate("/users/listUser")
        break
      case "creatUser":
        navigate("/users/creatUser")
        break
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="listUser" className="cursor-pointer">Listar Usuários</TabsTrigger>
        <TabsTrigger value="creatUser" className="cursor-pointer">Criar Usuários</TabsTrigger>
      </TabsList>

      <div className="mt-6 min-h-[500px] flex">
        <TabsContent value="listUser" className="w-full h-full flex">
          <Card className="w-full flex flex-col flex-grow">
            <CardHeader>
              <CardTitle>Usuários</CardTitle>
              <CardDescription>Insira os detalhes do usuário.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 flex-grow">
              <div className="space-y-1">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="sector">Tipo Usuário</Label>
                <Input id="sector" />
              </div>
              <div className="space-y-1 col-span-2">
                <Label htmlFor="badge">Email</Label>
                <Input id="badge" />
              </div>
              <div className="space-y-1 col-span-2">
                <Label htmlFor="email">Senha</Label>
                <Input id="email" type="email" />
              </div>
              <div className="space-y-1 col-span-2">
                <Label htmlFor="phone">Confirmar Senha</Label>
                <Input id="phone" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="cursor-pointer">Salvar</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="creatUser" className="w-full h-full flex">
        <Card className="w-full flex flex-col flex-grow">
            <CardHeader>
              <CardTitle>Usuários</CardTitle>
              <CardDescription>Insira os detalhes do usuário.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 flex-grow">
              <div className="space-y-1">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="sector">Tipo Usuário</Label>
                <Input id="sector" />
              </div>
              <div className="space-y-1  col-span-2">
                <Label htmlFor="badge">Email</Label>
                <Input id="badge" />
              </div>
              <div className="space-y-1  col-span-2">
                <Label htmlFor="email">Senha</Label>
                <Input id="email" type="email" />
              </div>
              <div className="space-y-1  col-span-2">
                <Label htmlFor="phone">Confirmar Senha</Label>
                <Input id="phone" />
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