import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CategoryFilters from "../components/CategoryFilters";
import InventoryTable from "../components/InventoryTable";
import MovemmentModal from "../components/MovementModal";
import { materials } from "../data/inventoryData";

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const filteredMaterials = useMemo(() => {
    return materials.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "Todos" || item.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div style={{ padding: "30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "14px",
        }}
      >
        <div>
          <h1 style={{ marginBottom: "10px" }}>Gestión de Inventario</h1>
          <p style={{ color: "#6f5d56" }}>
            Control de materias primas y materiales
          </p>
        </div>

        <Link
          to="/nuevo-material"
          style={{
            textDecoration: "none",
            background: "#b1223a",
            color: "white",
            padding: "12px 16px",
            borderRadius: "12px",
          }}
        >
          + Nuevo material
        </Link>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <CategoryFilters
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>

      <InventoryTable items={filteredMaterials} onOpenModal={setSelectedMaterial} />
      {
        selectedMaterial && (
          <MovemmentModal
            material={selectedMaterial}
            onClose={() => setSelectedMaterial(null)}
          />
        )
      }
    </div>
  );
}