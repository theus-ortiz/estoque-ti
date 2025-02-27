// src/components/ui/sidebar.tsx
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 fixed">
      <h2 className="text-xl font-bold mb-4">Minha Sidebar</h2>
      <ul>
        <li className="mb-2"><Link to="/" className="block p-2 hover:bg-gray-700">Home</Link></li>
        <li className="mb-2"><Link to="/about" className="block p-2 hover:bg-gray-700">Sobre</Link></li>
        <li className="mb-2"><Link to="/contact" className="block p-2 hover:bg-gray-700">Contato</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
