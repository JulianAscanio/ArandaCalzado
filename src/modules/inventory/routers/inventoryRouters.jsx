import { Route } from "react-router-dom";
import InventoryPage from "../pages/InventoryPage";
import NewMaterialPage from "../pages/NewMaterialPage";
import MovementPage from "../pages/MovementPage";

export const inventoryRoutes = (
    <>
        <Route path="/inventario" element={<InventoryPage />} />
        <Route path="/nuevo-material" element={<NewMaterialPage />} />
        <Route path="/movimientos" element={<MovementPage />} />
    </>
)