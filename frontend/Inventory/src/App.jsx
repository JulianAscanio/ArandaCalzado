import { Routes, Route, Navigate } from "react-router-dom";
import InventoryPage from "./pages/InventoryPage";
import NewMaterialPage from "./pages/NewMaterialPage";
import MovementsPage from "./pages/MovementPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/inventario" />} />
      <Route path="/inventario" element={<InventoryPage />} />
      <Route path="/nuevo-material" element={<NewMaterialPage />} />
      <Route path="/movimientos" element={<MovementsPage/>} />
    </Routes>
  );
}