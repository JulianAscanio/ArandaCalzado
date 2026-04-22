import { createContext, useContext, useEffect, useState } from "react";
import { materials as initialMaterials } from "../data/inventoryData";

export const InventoryContext = createContext();

export function InventoryProvider({ children }) {
    const [materials, setMaterials] = useState(() => {
        const savedMaterials = localStorage.getItem("inventory-materials");
        return savedMaterials ? JSON.parse(savedMaterials) : initialMaterials;
    });

    const [movements, setMovements] = useState(() => {
        const savedMovements = localStorage.getItem("inventory-movements");
        return savedMovements ? JSON.parse(savedMovements) : [];
    });

    useEffect(() => {
        localStorage.setItem("inventory-materials", JSON.stringify(materials));
    }, [materials]);

    useEffect(() => {
        localStorage.setItem("inventory-movements", JSON.stringify(movements));
    }, [movements]);

    const addMaterial = (newMaterial) => {
        const materialWithId = {
            ...newMaterial,
            id: Date.now(),
            lastEntry: "Hoy",
        };

        setMaterials((prev) => [...prev, materialWithId]);
    };

    const registerMovement = ({ materialId, materialName, movementType, quantity, reason }) => {
        setMaterials((prev) =>
            prev.map((material) => {
                if (material.id !== materialId) return material;

                let newStock = material.category.stock;

                if (movementType === "entrada") {
                    newStock = material.stock + quantity;
                }

                if (movementType === "salida") {
                    newStock = material.stock - quantity;
                }

                return {
                    ...material,
                    stock: newStock,
                    lastEntry: "Hoy",
                };

            })
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

    const resetInvetoryData = () => {
        localStorage.removeItem("inventory-materials");
        localStorage.removeItem("inventory-movements");
        setMaterials(initialMaterials);
        setMovements([]);
    }

    /*const updateStock = ({ materialId, movementType, quantity }) => {
        setMaterials((prev) =>
            prev.map((material) => {
                if (material.id !== materialId) return material;

                let newStock = material.stock;

                if (movementType === "entrada") {
                    newStock = material.stock + quantity;
                }

                if (movementType === "salida") {
                    newStock = material.stock - quantity;
                }

                return {
                    ...material,
                    stock: newStock,
                    lastEntry: "Hoy",
                };
            })
        );
    };*/

    return (
        <InventoryContext.Provider value={{ materials, movements, addMaterial, registerMovement, resetInvetoryData }}>
            {children}
        </InventoryContext.Provider>
    );
}

export function useInventory() {
    return useContext(InventoryContext);
}