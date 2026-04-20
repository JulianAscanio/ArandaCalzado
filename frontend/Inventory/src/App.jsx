import { Routes, Route, Navigate } from "react-router-dom";
import InventoryPage from "./pages/InventoryPage";
import NewMaterialPage from "./pages/NewMaterialPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/inventario" />} />
      <Route path="/inventario" element={<InventoryPage />} />
      <Route path="/nuevo-material" element={<NewMaterialPage />} />
    </Routes>
  );
}