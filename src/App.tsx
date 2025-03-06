import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./components/layout"
import { TabsProperty, TabsStock, TabsUsers } from "./components/tabs-demo"
import Home from "./pages/home"
import { TabsControl } from "./components/tabs-demo"

export function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stock/*" element={<StockRoutes />} />
            <Route path="/control/*" element={<ControlRoutes />} />
            <Route path="/property/*" element={<PropertyRoutes />} />
            <Route path="/users/*" element={<UsersRoutes />} />
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

function ControlRoutes() {
  console.log("ControlRoutes rendered")
  return (
    <div className="flex-grow flex flex-col">
      <TabsControl />
    </div>
  )
}

function PropertyRoutes() {
  console.log("PropertyRoutes rendered")
  return (
    <div className="flex-grow flex flex-col">
      <TabsProperty />
    </div>
  )
}

function UsersRoutes() {
  console.log("PropertyRoutes rendered")
  return (
    <div className="flex-grow flex flex-col">
      <TabsUsers />
    </div>
  )
}