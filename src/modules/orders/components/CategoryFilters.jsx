const categories = ["Todos", "Pendiente", "En Producción", "Terminado", "Enviado"];

export default function CategoryFilters({
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          style={{
            marginRight: "8px",
            marginBottom: "8px",
            padding: "8px 14px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            backgroundColor:
              activeCategory === category ? "#b1223a" : "#e8ded8",
            color: activeCategory === category ? "white" : "#4b3a35",
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}