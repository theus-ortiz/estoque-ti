"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

export function TabsDemo() {
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
        <TabsTrigger value="product">Product</TabsTrigger>
        <TabsTrigger value="type">Type</TabsTrigger>
        <TabsTrigger value="brands">Brands</TabsTrigger>
        <TabsTrigger value="units">Units</TabsTrigger>
      </TabsList>
      <div className="mt-6">
        <TabsContent value="product">
          <Card>
            <CardHeader>
              <CardTitle>Product</CardTitle>
              <CardDescription>Enter product details and save.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="type">Type</Label>
                <Input id="type" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="unit">Unit of Measurement</Label>
                <Input id="unit" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="condition">Condition</Label>
                <Input id="condition" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="location">Location</Label>
                <Input id="location" />
              </div>
              <div className="space-y-1 col-span-2">
                <Label htmlFor="observation">Observation</Label>
                <Input id="observation" />
              </div>
              <div className="space-y-1 col-span-2">
                <Label htmlFor="image">Image</Label>
                <Input id="image" type="file" accept="image/*" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Product</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="type">
          <Card>
            <CardHeader>
              <CardTitle>Type</CardTitle>
              <CardDescription>Enter type details and save.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="typeName">Name</Label>
                <Input id="typeName" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="asset" />
                <Label htmlFor="asset">Asset</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Type</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="brands">
          <Card>
            <CardHeader>
              <CardTitle>Brands</CardTitle>
              <CardDescription>Enter brand name and save.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="brandName">Name</Label>
                <Input id="brandName" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Brand</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="units">
          <Card>
            <CardHeader>
              <CardTitle>Units</CardTitle>
              <CardDescription>Enter unit details and save.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="unitName">Name</Label>
                <Input id="unitName" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="acronym">Acronym</Label>
                <Input id="acronym" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Unit</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  )
}