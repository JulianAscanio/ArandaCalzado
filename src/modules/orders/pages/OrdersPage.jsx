import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import StatusFilters from "../components/StatusFilters";
import OrdersTable from "../components/OrdersTable";
import StageModal from "../components/StageModal";
import { useOrders } from "../context/OrdersContext";
import AppLayout from "../../../shared/layout/AppLayout";

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("Todos");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { orders } = useOrders();

  const filteredOrders = useMemo(() => {
    return orders.filter((item) => {
      const matchesSearch =
        item.clientName.toLowerCase().includes(search.toLowerCase()) ||
        item.model.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        activeStatus === "Todos" || item.Status === activeStatus;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, activeStatus]);

  return (
    <AppLayout title="Pedidos">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "14px",
        }}
      >
        <div>
          <h1 style={{ marginBottom: "10px" }}>Gestión de Pedidos</h1>
          <p style={{ color: "#6f5d56" }}>
            Control de pedidos de clientes y estados de producción
          </p>
        </div>

        <Link
          to="/nuevo-pedido"
          style={{
            textDecoration: "none",
            background: "#b1223a",
            color: "white",
            padding: "12px 16px",
            borderRadius: "12px",
          }}
        >
          + Nuevo Pedido
        </Link>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <StatusFilters
          activeStatus={activeStatus}
          setActiveStatus={setActiveStatus}
        />
      </div>

      <OrdersTable items={filteredOrders} onOpenModal={setSelectedOrder} />
      {
        selectedOrder && (
          <StageModal
            material={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )
      }
    </AppLayout>
  );
}