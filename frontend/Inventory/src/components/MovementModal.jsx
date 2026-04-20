import { useState } from "react";

export default function MovemmentModal({ material, onClose }) {
    const [movementType, setMovementType] = useState("entrada");
    const [quantity, setQuantity] = useState("");
    const [reason, setReason] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!quantity || Number(quantity) <= 0) {
            alert("la cantidad debe ser mayor a 0");
            return;
        }

        const payload = {
            materialId: material.id,
            materialName: material.name,
            movementType,
            quantity: Number(quantity),
            reason,
        };

        console.log("Movimiento registrado:", payload)
        onClose();
    };

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h2 style={{ marginTop: 0 }}>Registrar movimiento</h2>
                <p style={{ color: "#6f5d56", marginBottom: "20px" }}>{material.name}</p>

                <form onSubmit={handleSubmit}>
                    <label style={labelStyle}>Tipo de movimiento</label>

                    <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
                        <button
                            type="button"
                            onClick={() => setMovementType("entrada")}
                            style={{
                                ...typeButtonStyle,
                                backgroundColor:
                                    movementType === "entrada" ? "#0f9d58" : "#e8ded8",
                                color: movementType === "entrada" ? "white" : "#4b3a35",
                            }}
                        >
                            Entrada
                        </button>

                        <button
                            type="button"
                            onClick={() => setMovementType("salida")}
                            style={{
                                ...typeButtonStyle,
                                backgroundColor:
                                    movementType === "salida" ? "#b1223a" : "#e8ded8",
                                color: movementType === "salida" ? "white" : "#4b3a35",
                            }}
                        >
                            Salida
                        </button>
                    </div>

                    <label style={labelStyle}>Cantidad</label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        style={inputStyle}
                    />

                    <label style={labelStyle}>Motivo</label>
                    <input
                        type="text"
                        placeholder="Ej: Compra a proveedor"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        style={inputStyle}
                    />

                    <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                        <button type="submit" style={confirmButtonStyle}>
                            Confirmar
                        </button>

                        <button type="button" onClick={onClose} style={cancelButtonStyle}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const overlayStyle = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
};

const modalStyle = {
    width: "100%",
    maxWidth: "420px",
    background: "white",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
};

const labelStyle = {
    display: "block",
    marginBottom: "8px",
    marginTop: "16px",
    color: "#6f5d56",
    fontWeight: "600",
};

const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "16px",
};

const typeButtonStyle = {
    flex: 1,
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
};

const confirmButtonStyle = {
    flex: 1,
    padding: "12px",
    background: "#0f9d58",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
};

const cancelButtonStyle = {
    flex: 1,
    padding: "12px",
    background: "#e8ded8",
    color: "#4b3a35",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
};