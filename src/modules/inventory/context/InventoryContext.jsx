import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";

export const InventoryContext = createContext();

export function InventoryProvider({ children }) {
    const [materials, setMaterials] = useState([]);
    const [movements, setMovements] = useState(() => {
        const savedMovements = localStorage.getItem("inventory-movements");
        return savedMovements ? JSON.parse(savedMovements) : [];
    });

    const { token, logout } = useAuth();

    useEffect(() => {
        if (token) {
            fetchMaterials();
        }
    }, [token]);

    const fetchMaterials = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/inventario/materiales/", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.status === 401) {
                logout();
                return;
            }
            if (response.ok) {
                const data = await response.json();
                setMaterials(data);
            }
        } catch (error) {
            console.error("Error fetching materials:", error);
        }
    };

    useEffect(() => {
        localStorage.setItem("inventory-movements", JSON.stringify(movements));
    }, [movements]);

    const addMaterial = async (newMaterial) => {
        try {
            const response = await fetch("http://localhost:8000/api/inventario/materiales/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newMaterial)
            });

            if (response.ok) {
                const data = await response.json();
                setMaterials((prev) => [...prev, data]);
            } else {
                console.error("Error creating material", await response.text());
            }
        } catch (error) {
            console.error("Error posting material:", error);
        }
    };

    const deleteMaterial = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/inventario/materiales/${id}/`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                setMaterials((prev) => prev.filter((material) => material.id !== id));
            }
        } catch (error) {
            console.error("Error deleting material:", error);
        }
    };

    const updateMaterial = async (id, updatedMaterial) => {
        const response = await fetch(`http://localhost:8000/api/inventario/materiales/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updatedMaterial)
        });
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(JSON.stringify({ errorData }));
        }

        const data = await response.json();
        setMaterials((prev) =>
            prev.map((material) => (material.id === id ? data : material))
        );

        return data;
    };

    const registerMovement = async ({ materialId, materialName, movementType, quantity, reason }) => {

        const material = materials.find((m) => m.id === materialId);
        if (!material) return;

        let newStock = material.stock;
        if (movementType === "entrada") {
            newStock = material.stock + quantity;
        } else if (movementType === "salida") {
            newStock = material.stock - quantity;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/inventario/materiales/${materialId}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ stock: newStock })
            });

            if (response.ok) {
                setMaterials((prev) =>
                    prev.map((m) => m.id === materialId ? { ...m, stock: newStock, lastEntry: "Hoy" } : m)
                );

                const newMovement = {
                    id: Date.now(),
                    materialId,
                    materialName,
                    movementType,
                    quantity,
                    reason,
                    date: new Date().toLocaleString(),
                };

                setMovements((prev) => [newMovement, ...prev]);
            }
        } catch (error) {
            console.error("Error updating stock:", error);
        }
    }

    const resetInvetoryData = () => {
        localStorage.removeItem("inventory-materials");
        localStorage.removeItem("inventory-movements");
        setMaterials([]);
        fetchMaterials();
        setMovements([]);
    }

    return (
        <InventoryContext.Provider value={{ materials, movements, addMaterial, deleteMaterial, updateMaterial, registerMovement, resetInvetoryData }}>
            {children}
        </InventoryContext.Provider>
    );
}

export function useInventory() {
    return useContext(InventoryContext);
}