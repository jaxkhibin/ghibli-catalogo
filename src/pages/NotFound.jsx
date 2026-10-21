import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>La ruta que buscas no existe en este catálogo.</p>
      <Link to="/">
        <button className="btn-primario">Volver al inicio</button>
      </Link>
    </div>
  )
}

export default NotFound
