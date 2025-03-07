"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

interface Tab {
  value: string
  label: string
  content: React.ReactNode
}

interface TabsContainerProps {
  tabs: Tab[]
  basePath: string // Caminho base para as rotas (ex: "/stock", "/control", "/property")
}

export function TabsContainer({ tabs, basePath }: TabsContainerProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(tabs[0]?.value || "")

  // Atualiza a aba ativa com base na rota atual
  useEffect(() => {
    const path = location.pathname
    const activeTabFromPath = tabs.find(tab => path.includes(`${basePath}/${tab.value}`))?.value
    if (activeTabFromPath) setActiveTab(activeTabFromPath)
  }, [location, tabs, basePath])

  // Navega para a rota correspondente à aba selecionada
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    navigate(`${basePath}/${value}`)
  }

  // Calcula o número de colunas com base no número de abas
  const gridCols = `grid-cols-${tabs.length}`

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-4xl mx-auto">
      <TabsList className={`grid w-full ${gridCols}`}>
        {tabs.map(tab => (
          <TabsTrigger key={tab.value} value={tab.value} className="cursor-pointer">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="mt-6 min-h-[500px] flex">
        {tabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value} className="w-full h-full flex">
            {tab.content}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}