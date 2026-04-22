import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return(
    <aside className='sidebar'>
      <div>
        <div className='brand-block'>
          <div className='brand-logo'> AC </div>
          <div>
            <h2>Aranda Calzado</h2>
            <p>Panel de control</p>
          </div>
        </div>
        <nav className='sidebar-nav'>
          <NavLink to={'/inventario'}>Inventario</NavLink>
          <p></p>
          <NavLink to={'/ordenes'}>Órdenes</NavLink>
        </nav>
      </div>
    </aside>
  );
}