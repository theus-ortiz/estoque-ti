// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/ui/sidebar";
import About from "./pages/about";
import Contact from "./pages/contact";
import Home from "./pages/home";

export function App() {
  return (
    // <>
    //   <div className="p-6 max-w-4xl mx-auto">
    //     <div className="border rounded">
    //     <Table>
    //       <TableCaption>A list of your recent invoices.</TableCaption>
    //       <TableHeader>
    //         <TableRow>
    //           <TableHead className="w-[100px]">Invoice</TableHead>
    //           <TableHead>Status</TableHead>
    //           <TableHead>Method</TableHead>
    //           <TableHead className="text-right">Amount</TableHead>
    //         </TableRow>
    //       </TableHeader>
    //       <TableBody>
    //         <TableRow>
    //           <TableCell className="font-medium">INV001</TableCell>
    //           <TableCell>Paid</TableCell>
    //           <TableCell>Credit Card</TableCell>
    //           <TableCell className="text-right">$250.00</TableCell>
    //         </TableRow>
    //       </TableBody>
    //     </Table>
    //     </div>
    //   </div>
    // </>

    <Router>
      <div className="flex">
        <Sidebar />
        <div className="ml-64 flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}