// import { TabsContainer } from "@/components/TabsContainer"
// import { ProductTab } from "@/components/ui/Tabs/Stock/ProductTab"
// import { TypeTab } from "@/components/ui/Tabs/Stock/TypeTab"
// import { BrandTab } from "@/components/ui/Tabs/Stock/BrandTab"
// // import { UnitTab } from "@/components/ui/Tabs/Stock/UnitTab"
// import { ListProductsTab } from "../components/ui/Tabs/Stock/ListProductsTab"

// export function StockRoutes() {
//   const tabs = [
//     { value: "product", label: "Produto", content: <ProductTab /> },
//     { value: "type", label: "Tipo", content: <TypeTab /> },
//     { value: "brands", label: "Marca", content: <BrandTab /> },
//     // { value: "units", label: "Unidades", content: <UnitTab /> },
//     { value: "list-products", label: "Listar Produtos", content: <ListProductsTab /> },
//   ]

//   return <TabsContainer tabs={tabs} basePath="/stock" />
// }

import { Routes, Route } from "react-router-dom"
import { ListProductsTab } from "@/components/ListProductsTab"
import { ListTypesTab } from "../components/ListTypesTab"

export function StockRoutes() {
  return (
    <Routes>
      <Route path="/product" element={<ListProductsTab />} />
      <Route path="/type" element={<ListTypesTab />}/>
      {/* Adicione mais rotas aqui, se necessário */}
    </Routes>
  )
}