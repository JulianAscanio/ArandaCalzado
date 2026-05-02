import { Route } from "react-router-dom";
import OrdersPage from "../pages/OrdersPage";
import NewOrderPage from "../pages/NewOrderPage";

export const ordersRoutes = (
    <>
        <Route path="/pedidos" element={<OrdersPage />} />
        <Route path="/nuevo-pedido" element={<NewOrderPage />} />
    </>
);