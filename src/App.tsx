// import Brand from "@/stock/brand";
// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Layout from "./components/layout";
// import Home from "./pages/home";
// import Product from "./stock/product";
// import Type from "./stock/type";
// import Unit from "./stock/unit";
// import Borrowing from "./control/borrowing";
// import Employess from "./control/employees";

// export function App() {
//   return (
//     <Router>
      
//       <div>
//         <Layout>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/stock/type" element={<Type />} />
//             <Route path="/stock/brand" element={<Brand />} />
//             <Route path="/stock/product" element={<Product />} />
//             <Route path="/stock/unit" element={<Unit />} />
//             <Route path="/cotrol/borrowing" element={<Borrowing />} />
//             <Route path="/cotrol/employess" element={<Employess/>} />
//           </Routes>
//         </Layout>
//       </div>
//    </Router>
//   )
// }

import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./pages/home"
import Borrowing from "./control/borrowing"
import Employess from "./control/employees"
import { TabsDemo } from "./components/tabs-demo"

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
      <TabsDemo />
    </div>
  )
}