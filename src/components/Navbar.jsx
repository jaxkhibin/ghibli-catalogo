import { NavLink } from 'react-router-dom'

function Navbar({ favoritosCount, usuariosCount }) {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">🎬 Ghibli Catálogo</NavLink>
      <div className="navbar-links">
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/lista">Lista</NavLink>
        <NavLink to="/favoritos">
          Favoritos
          {favoritosCount > 0 && <span className="badge">{favoritosCount}</span>}
        </NavLink>
        <NavLink to="/registro">
          Registro
          {usuariosCount > 0 && <span className="badge">{usuariosCount}</span>}
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
