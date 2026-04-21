import { Routes, Route, Navigate } from "react-router-dom";
import { inventoryRoutes } from "../../modules/inventory/routers/inventoryRouters";
//import { ordersRoutes } from "../../modules/orders/routers/ordersRouters";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/inventario" />} />
      {inventoryRoutes}
    </Routes>
  );
}