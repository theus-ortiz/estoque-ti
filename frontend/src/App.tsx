import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./pages/home"
import { StockRoutes } from "./routes/StockRoutes"
// import { ControlRoutes } from "./routes/ControlRoutes"
// import { PropertyRoutes } from "./routes/PropertyRoutes"
// import { UsersRoutes } from "./routes/UsersRoutes"

export function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stock/*" element={<StockRoutes />} />
            {/* <Route path="/control/*" element={<ControlRoutes />} />
            <Route path="/property/*" element={<PropertyRoutes />} />
            <Route path="/users/*" element={<UsersRoutes />} /> */}
          </Routes>
        </Layout>
      </div>
    </Router>
  )
}