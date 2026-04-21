export default function InventoryTable({ items, onOpenModal }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        background: "white",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <thead>
        <tr style={{ background: "#f7f2ee" }}>
          <th style={thStyle}>Material</th>
          <th style={thStyle}>Categoría</th>
          <th style={thStyle}>Stock actual</th>
          <th style={thStyle}>Stock mínimo</th>
          <th style={thStyle}>Estado</th>
          <th style={thStyle}>Última entrada</th>
          <th style={thStyle}>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {items.map((item) => {
          const lowStock = item.stock < item.minStock;

          return (
            <tr key={item.id}>
              <td style={tdStyle}>{item.name}</td>
              <td style={tdStyle}>{item.category}</td>
              <td style={tdStyle}>
                {item.stock} {item.unit}
              </td>
              <td style={tdStyle}>
                {item.minStock} {item.unit}
              </td>
              <td style={tdStyle}>
                {lowStock ? "Stock bajo" : "Disponible"}
              </td>
              <td style={tdStyle}>{item.lastEntry}</td>
               <td style={tdStyle}>
                <button
                  onClick={() => onOpenModal(item)}
                  style={actionButtonStyle}
                >
                  Registrar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "14px",
  borderBottom: "1px solid #ddd",
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #eee",
};

const actionButtonStyle = {
  padding: "8px 16px",
  borderRadius: "10px",
  border: "none",
  background: "#e8ded8",
  cursor: "pointer",
};