import { useState } from "react";
import { useOrders } from "../context/OrdersContext";

export default function MovemmentModal({ order, onClose }) {
    const { registerStage } = useOrders();

    const [stageName, setStageName] = useState();
    const [hoveredButton, setHoveredButton] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        registerStage({
            orderId: order.id,
            orderName: order.name,
            stageName,
        });

        alert("Estado registrado correctamente")
        onClose();
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <div style={headerStyle}>
                    <div>
                        <h2 style={{ marginTop: 0, marginBottom: "4px", fontSize: "24px", fontWeight: "700" }}>Registrar movimiento</h2>
                        <p style={{ color: "#8b7b78", marginBottom: 0, fontSize: "14px", fontWeight: "500" }}>{order.name}</p>
                    </div>
                    <button 
                        onClick={onClose}
                        style={closeButtonStyle}
                        title="Cerrar"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <label style={labelStyle}>Estados</label>

                    <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
                    <button
                            type="button"
                            onClick={() => setStageName("pendiente")}
                            onMouseEnter={() => setHoveredButton("pendiente")}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                ...typeButtonStyle,
                                backgroundColor:
                                    stageName === "pendiente" ? "#b1223a" : hoveredButton === "pendiente" ? "#f0f0f0" : "#f5f5f5",
                                color: stageName === "pendiente" ? "white" : "#2d1f20",
                                borderColor: stageName === "pendiente" ? "#b1223a" : "#e8dcd2",
                                boxShadow: stageName === "pendiente" ? "0 4px 12px rgba(177, 34, 58, 0.2)" : "0 2px 8px rgba(0, 0, 0, 0.04)",
                                fontWeight: stageName === "pendiente" ? "600" : "500",
                            }}
                        >
                            Pendiente
                        </button>

                        <button
                            type="button"
                            onClick={() => setStageName("en producción")}
                            onMouseEnter={() => setHoveredButton("en producción")}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                ...typeButtonStyle,
                                backgroundColor:
                                    stageName === "en producción" ? "#f39c12" : hoveredButton === "en producción" ? "#f0f0f0" : "#f5f5f5",
                                color: stageName === "en producción" ? "white" : "#2d1f20",
                                borderColor: stageName === "en producción" ? "#f39c12" : "#e8dcd2",
                                boxShadow: stageName === "en producción" ? "0 4px 12px rgba(243, 156, 18, 0.2)" : "0 2px 8px rgba(0, 0, 0, 0.04)",
                                fontWeight: stageName === "en producción" ? "600" : "500",
                            }}
                        >
                            En Producción
                        </button>

                        <button
                            type="button"
                            onClick={() => setStageName("terminado")}
                            onMouseEnter={() => setHoveredButton("terminado")}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                ...typeButtonStyle,
                                backgroundColor:
                                    stageName === "terminado" ? "#0066cc" : hoveredButton === "terminado" ? "#f0f0f0" : "#f5f5f5",
                                color: stageName === "terminado" ? "white" : "#2d1f20",
                                borderColor: stageName === "terminado" ? "#0066cc" : "#e8dcd2",
                                boxShadow: stageName === "terminado" ? "0 4px 12px rgba(0, 102, 204, 0.2)" : "0 2px 8px rgba(0, 0, 0, 0.04)",
                                fontWeight: stageName === "terminado" ? "600" : "500",
                            }}
                        >
                            Terminado
                        </button>

                        <button
                            type="button"
                            onClick={() => setStageName("enviado")}
                            onMouseEnter={() => setHoveredButton("enviado")}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                                ...typeButtonStyle,
                                backgroundColor:
                                    stageName === "enviado" ? "#0f9d58" : hoveredButton === "enviado" ? "#f0f0f0" : "#f5f5f5",
                                color: stageName === "enviado" ? "white" : "#2d1f20",
                                borderColor: stageName === "enviado" ? "#0f9d58" : "#e8dcd2",
                                boxShadow: stageName === "enviado" ? "0 4px 12px rgba(15, 157, 88, 0.2)" : "0 2px 8px rgba(0, 0, 0, 0.04)",
                                fontWeight: stageName === "enviado" ? "600" : "500",
                            }}
                        >
                            Enviado
                        </button>
                    </div>

                    <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
                        <button 
                            type="submit" 
                            style={confirmButtonStyle}
                            onMouseEnter={() => setHoveredButton("confirm")}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
                            Confirmar
                        </button>

                        <button 
                            type="button" 
                            onClick={onClose} 
                            style={{
                                ...cancelButtonStyle,
                                background: hoveredButton === "cancel" ? "#e8dcd2" : "#f5f0ed",
                            }}
                            onMouseEnter={() => setHoveredButton("cancel")}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    animation: "fadeInOverlay 0.3s ease-out",
    backdropFilter: "blur(2px)",
};

const modalStyle = {
    width: "100%",
    maxWidth: "420px",
    background: "white",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.6)",
    animation: "slideUpModal 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    border: "1px solid rgba(255,255,255,0.8)",
};

const labelStyle = {
    display: "block",
    marginBottom: "10px",
    marginTop: "0",
    fontWeight: "600",
    color: "#2d1f20",
    fontSize: "14px",
    textTransform: "capitalize",
};

const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
    paddingBottom: "16px",
    borderBottom: "1px solid #f0ede8",
};

const closeButtonStyle = {
    background: "none",
    border: "none",
    fontSize: "24px",
    color: "#b9a39a",
    cursor: "pointer",
    padding: "0",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    transition: "all 0.2s ease",
};

const typeButtonStyle = {
    flex: 1,
    padding: "13px 14px",
    border: "2px solid",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
};

const confirmButtonStyle = {
    flex: 1,
    padding: "13px 16px",
    background: "linear-gradient(135deg, #0f9d58 0%, #0b7d46 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 6px 16px rgba(15, 157, 88, 0.25)",
};

const cancelButtonStyle = {
    flex: 1,
    padding: "13px 16px",
    background: "#f5f0ed",
    color: "#2d1f20",
    border: "1.5px solid #e8dcd2",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
};