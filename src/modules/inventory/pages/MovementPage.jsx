import { Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";

export default function MovementsPage() {
    const { movements } = useInventory();

    return (
        <div style={{ padding: "30px" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alingItems: "center",
                    marginButton: "20px",
                }}>
                <div>
                    <h1 style={{ marginButton: "8px" }}>Historial de movimientos</h1>
                    <p style={{ color: "#6f5d56" }}>Registro de entradas y salidas del inventario</p>
                </div>
                <link
                    to="/inventario"
                    style={{
                        textDecoration: "none",
                        background: "#e8ded8",
                        color: "#4b3a35",
                        padding: "12px 16px",
                        borderRadius: "12px",
                    }}
                >
                    Volver a inventario
                </link>
            </div>
            <div
                style={{
                    background: "white",
                    borderRadius: "14px",
                    overflow: "hidden",
                }}
            >
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                    }}
                >
                    <thead>
                        <tr style={{ background: "#f7f2ee" }}>
                            <th style={thStyle}>Material</th>
                            <th style={thStyle}>Tipo</th>
                            <th style={thStyle}>Cantidad</th>
                            <th style={thStyle}>Motivo</th>
                            <th style={thStyle}>Fecha</th>
                        </tr>
                    </thead>

                    <tbody>
                        {movements.length === 0 ? (
                            <tr>
                                <td style={tdStyle} colSpan="5">
                                    No hay movimientos registrados todavía.
                                </td>
                            </tr>
                        ) : (
                            movements.map((movement) => (
                                <tr key={movement.id}>
                                    <td style={tdStyle}>{movement.materialName}</td>
                                    <td style={tdStyle}>
                                        <span
                                            style={{
                                                padding: "6px 10px",
                                                borderRadius: "999px",
                                                background:
                                                    movement.movementType === "entrada"
                                                        ? "#dff7ea"
                                                        : "#fde2e7",
                                                color:
                                                    movement.movementType === "entrada"
                                                        ? "#0f9d58"
                                                        : "#b1223a",
                                                fontWeight: "600",
                                            }}
                                        >
                                            {movement.movementType}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>{movement.quantity}</td>
                                    <td style={tdStyle}>{movement.reason || "-"}</td>
                                    <td style={tdStyle}>{movement.date}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
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