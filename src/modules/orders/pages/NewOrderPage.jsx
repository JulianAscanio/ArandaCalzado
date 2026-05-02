import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "../../../shared/layout/AppLayout";
import { useOrders } from "../context/OrdersContext";

export default function NewOrderPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { orders, addOrder, updateOrder } = useOrders();

  const isEditMode = Boolean(id);

  const [form, setForm] = useState({
    clientName: "",
    clientPhone: "",
    clientAdress: "",
    model: "",
    color: "",
    date: new Date().toISOString().split("T")[0],
    total: "",
    status: "",
  });

  useEffect(() => {
    if (isEditMode) {
      const orderToEdit = orders.find(
        (item) => String(item.id) === String(id)
      );

      if (orderToEdit) {
        setForm({
          clientName: orderToEdit.clientName || "",
          clientPhone: orderToEdit.clientPhone || "",
          clientAdress: orderToEdit.clientAdress || "",
          model: orderToEdit.model || "",
          color: orderToEdit.color || "",
          date: orderToEdit.date || new Date().toISOString().split("T")[0],
          total: orderToEdit.total ?? "",
          status: orderToEdit.status || "",
        });
      }
    }
  }, [id, isEditMode, orders]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      form.clientName.trim() === "" ||
      form.clientPhone.trim() === "" ||
      form.clientAdress.trim() === "" ||
      form.model.trim() === "" ||
      form.color.trim() === "" ||
      form.date.trim() === "" ||
      form.total === "" ||
      form.status.trim() === ""
    ) {
      alert("Completa todos los campos obligatorios");
      return;
    }

    const payload = {
      clientName: form.clientName,
      clientPhone: form.clientPhone,
      clientAdress: form.clientAdress,
      model: form.model,
      color: form.color,
      date: form.date,
      total: Number(form.total),
      status: form.status,
    };

    try {
      if (isEditMode) {
        await updateOrder(id, payload);
        alert("Pedido actualizado correctamente");
      } else {
        await addOrder(payload);
        alert("Pedido registrado correctamente");
      }

      navigate("/pedidos");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al guardar el pedido");
    }
  };

  return (
    <AppLayout title={isEditMode ? "Editar pedido" : "Nuevo pedido"}>
      <div style={pageStyle}>
        <div style={cardStyle}>
          <h1 style={{ marginTop: 0, marginBottom: "8px" }}>
            {isEditMode ? "Editar pedido" : "Registrar nuevo pedido"}
          </h1>
          <p style={{ color: "#6f5d56", marginBottom: "24px" }}>
            {isEditMode
              ? "Actualiza la información del pedido"
              : "Agrega un nuevo pedido"}
          </p>

          <form onSubmit={handleSubmit}>
            <div style={rowStyle}>
              <div>
                <label style={labelStyle}>Nombre del Cliente</label>
                <input
                  style={inputStyle}
                  type="text"
                  name="clientName"
                  value={form.clientName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label style={labelStyle}>Teléfono del Cliente</label>
                <input
                  style={inputStyle}
                  type="text"
                  name="clientPhone"
                  value={form.clientPhone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={rowStyle}>
              <div>
                <label style={labelStyle}>Dirección del Cliente</label>
                <input
                  style={inputStyle}
                  type="text"
                  name="clientAdress"
                  value={form.clientAdress}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label style={labelStyle}>Estado del Pedido</label>
                <select
                  style={inputStyle}
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option selected value="Pendiente">Pendiente</option>
                  <option value="En Producción">En Producción</option>
                  <option value="Terminado">Terminado</option>
                  <option value="Enviado">Enviado</option>
                </select>
              </div>
            </div>

            <div style={rowStyle}>
              <div>
                <label style={labelStyle}>Modelo</label>
                <input
                  style={inputStyle}
                  type="text"
                  name="model"
                  placeholder="Ej: Cuero vegano"
                  value={form.model}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label style={labelStyle}>Color</label>
                <input
                  style={inputStyle}
                  type="text"
                  name="color"
                  placeholder="Ej: Negro"
                  value={form.color}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={rowStyle}>
              <div>
                <label style={labelStyle}>Monto Total</label>
                <input
                  style={inputStyle}
                  type="number"
                  min="0"
                  name="total"
                  value={form.total}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label style={labelStyle}>Fecha</label>
                <input
                  style={inputStyle}
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={actionsStyle}>
              <button type="submit" style={saveButtonStyle}>
                {isEditMode ? "Actualizar pedido" : "Guardar pedido"}
              </button>

              <button
                type="button"
                style={cancelButtonStyle}
                onClick={() => navigate("/pedidos")}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}

const pageStyle = {
  padding: "30px",
};

const cardStyle = {
  maxWidth: "900px",
  background: "white",
  padding: "28px",
  borderRadius: "18px",
  boxShadow: "0 8px 22px rgba(0,0,0,0.06)",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  marginTop: "14px",
  fontWeight: "600",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #d8ccc4",
  boxSizing: "border-box",
};

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
};

const actionsStyle = {
  display: "flex",
  gap: "12px",
  marginTop: "24px",
};

const saveButtonStyle = {
  border: "none",
  background: "#b1223a",
  color: "white",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer",
};

const cancelButtonStyle = {
  border: "none",
  background: "#e8ded8",
  color: "#4b3a35",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer",
};