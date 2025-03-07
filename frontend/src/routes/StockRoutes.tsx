import { TabsContainer } from "@/components/ui/TabsContainer"
import { ProductTab } from "@/components/ui/Tabs/Stock/ProductTab"
import { TypeTab } from "@/components/ui/Tabs/Stock/TypeTab"
import { BrandTab } from "@/components/ui/Tabs/Stock/BrandTab"
// import { UnitTab } from "@/components/ui/Tabs/Stock/UnitTab"
import { ListProductsTab } from "../components/ui/Tabs/Stock/ListProductsTab"

export function StockRoutes() {
  const tabs = [
    { value: "product", label: "Produto", content: <ProductTab /> },
    { value: "type", label: "Tipo", content: <TypeTab /> },
    { value: "brands", label: "Marca", content: <BrandTab /> },
    // { value: "units", label: "Unidades", content: <UnitTab /> },
    { value: "list-products", label: "Listar Produtos", content: <ListProductsTab /> },
  ]

  return <TabsContainer tabs={tabs} basePath="/stock" />
}