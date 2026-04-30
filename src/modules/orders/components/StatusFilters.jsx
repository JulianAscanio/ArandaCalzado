const statuses = ["Todos", "Pendiente", "En Producción", "Terminado", "Enviado"];

export default function StatusFilters({
  activeStatus,
  setActiveStatus,
}) {
  return (
    <div>
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => setActiveStatus(status)}
          style={{
            marginRight: "8px",
            marginBottom: "8px",
            padding: "8px 14px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            backgroundColor:
              activeStatus === status ? "#b1223a" : "#e8ded8",
            color: activeStatus === status ? "white" : "#4b3a35",
          }}
        >
          {status}
        </button>
      ))}
    </div>
  );
}