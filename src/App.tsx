import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./components/layout"
import { TabsStock } from "./components/tabs-demo"
import Borrowing from "./control/borrowing"
import Employess from "./control/employees"
import Home from "./pages/home"

export function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stock/*" element={<StockRoutes />} />
            <Route path="/control/borrowing" element={<Borrowing />} />
            <Route path="/control/employess" element={<Employess />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  )
}

function StockRoutes() {
  return (
    <div className="flex-grow flex flex-col">
      <TabsStock />
    </div>
  )
}