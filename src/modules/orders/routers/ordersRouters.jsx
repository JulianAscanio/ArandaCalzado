import { Route } from "react-router-dom";
import OrdersPage from "../pages/OrdersPage";

export const ordersRoutes = (
    <>
        <Route path="/pedidos" element={<OrdersPage />} />
    </>
);
