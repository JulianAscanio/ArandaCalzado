import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="brand-block">
          <div className="brand-logo">AC</div>
          <div className="brand-text">
            <h2>Aranda Calzado</h2>
            <p>Panel de control</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/inventario"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            Inventario
          </NavLink>

          <NavLink
            to="/ordenes"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            Órdenes
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-user">
        <div className="brand-logo small">AD</div>
        <div>
          <strong>Admin</strong>
          <p>Administrador</p>
        </div>
      </div>
    </aside>
  );
}