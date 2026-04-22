import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import AppLayout from "../../../shared/layout/AppLayout";

export default function NewMaterialPage() {
  const navigate = useNavigate();
  const { addMaterial } = useInventory();

  const [form, setForm] = useState({
    name: "",
    unit: "",
    category: "",
    stock: "",
    minStock: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!form.name || !form.unit || !form.category || !form.stock || !form.minStock){
      alert("Por favor, completa todos los campos.");
      return;
    }

    const newMaterial = {
      ...form,
      stock: Number(form.stock),
      minStock: Number(form.minStock),
    };

    addMaterial(newMaterial);
    alert("Material creado exitosamente.");
    navigate("/inventario");
  };

  return (
    <AppLayout title="Gestión de Inventario">
      <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={{ marginTop: 0, marginBottom: "8px" }}>Registrar nuevo material</h1>
        <p style={{ color: "#6f5d56", marginBottom: "24px" }}>
          Agrega un nuevo material al inventario
        </p>

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Nombre del material</label>
          <input
            style={inputStyle}
            type="text"
            name="name"
            placeholder="Ej: Cuero vegano negro"
            value={form.name}
            onChange={handleChange}
          />

          <div style={rowStyle}>
            <div>
              <label style={labelStyle}>Unidad de medida</label>
              <input
                style={inputStyle}
                type="text"
                name="unit"
                placeholder="Ej: dm², pares, litros"
                value={form.unit}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={labelStyle}>Categoría</label>
              <select
                style={inputStyle}
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="Cuero">Cuero</option>
                <option value="Suelas">Suelas</option>
                <option value="Adhesivos">Adhesivos</option>
                <option value="Plantillas">Plantillas</option>
                <option value="Accesorios">Accesorios</option>
              </select>
            </div>
          </div>

          <div style={rowStyle}>
            <div>
              <label style={labelStyle}>Stock inicial</label>
              <input
                style={inputStyle}
                type="number"
                min="0"
                name="stock"
                placeholder="0"
                value={form.stock}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={labelStyle}>Stock mínimo</label>
              <input
                style={inputStyle}
                type="number"
                min="0"
                name="minStock"
                placeholder="0"
                value={form.minStock}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={actionsStyle}>
            <button type="submit" style={saveButtonStyle}>
              Guardar material
            </button>

            <button
              type="button"
              style={cancelButtonStyle}
              onClick={() => navigate("/inventario")}
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
  maxWidth: "700px",
  background: "white",
  padding: "30px",
  borderRadius: "18px",
  boxShadow: "0 8px 22px rgba(0, 0, 0, 0.06)",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  marginBottom: "14px",
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
  gap: "12px",
  gridTemplateColumns: "1fr 1fr",
};

const actionsStyle = {
  display: "flex",
  gap: "12px",
  marginTop: "24px",
};

const saveButtonStyle = {
  background: "#b1223a",
  color: "white",
  border: "none",
  padding: "12px 24px",
  borderRadius: "12px",
  cursor: "pointer",
};

const cancelButtonStyle = {
  background: "#e8ded8",
  color: "#4b3a35",
  border: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer",
};