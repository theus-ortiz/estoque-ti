import { Routes, Route } from "react-router-dom"
import { ListProductsTab } from "@/components/ListProductsTab"

export function ControlRoutes() {
  return (
    <Routes>
      <Route path="/employees" element={<ListProductsTab />} />
      {/* Adicione mais rotas aqui, se necessário */}
    </Routes>
  )
}