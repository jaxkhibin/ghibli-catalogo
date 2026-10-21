import { Link } from 'react-router-dom'

function Inicio() {
  return (
    <div className="inicio-hero">
      <h1>🎬 Ghibli Catálogo</h1>
      <p>
        Explora el universo mágico de Studio Ghibli: todas sus películas, directores y puntuaciones
        en un solo lugar. Guarda tus favoritas y gestiona tu propio registro de usuarios.
      </p>

      <div className="inicio-api-info">
        <h3>API utilizada: Studio Ghibli API</h3>
        <p><strong>URL base:</strong> https://ghibliapi.vercel.app</p>
        <p><strong>Endpoints:</strong> /films, /films/{'{id}'}</p>
        <p>
          <a href="https://ghibliapi.vercel.app" target="_blank" rel="noreferrer">
            Ver documentación →
          </a>
        </p>
      </div>

      <Link to="/lista">
        <button className="btn-primario">Ver catálogo de películas</button>
      </Link>
    </div>
  )
}

export default Inicio
