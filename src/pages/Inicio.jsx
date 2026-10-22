import { Link } from 'react-router-dom'

function Inicio() {
  return (
    <div className="inicio-hero">
      <h1>🎬 Studio Ghibli Catálogo</h1>
      <p>
        Explora el universo completo de Studio Ghibli: sus <strong>películas</strong>, sus memorables{' '}
        <strong>personajes</strong>, sus fantásticas <strong>locaciones</strong> y sus{' '}
        <strong>especies</strong> legendarias. Guarda tus favoritas y administra usuarios en el sistema.
      </p>

      <div className="inicio-api-info">
        <h3>Tema asignado: Películas, personajes y locaciones</h3>
        <p><strong>API oficial:</strong> Studio Ghibli API</p>
        <p><strong>URL base:</strong> https://ghibliapi.vercel.app</p>
        <p>
          <strong>Endpoints implementados:</strong> <code>/films</code>, <code>/films/:id</code>,{' '}
          <code>/people</code>, <code>/locations</code> y <code>/species</code>
        </p>
        <p>
          <a href="https://ghibliapi.vercel.app" target="_blank" rel="noreferrer">
            Ver documentación de la API →
          </a>
        </p>
      </div>

      <Link to="/lista">
        <button className="btn-primario">Explorar catálogo completo</button>
      </Link>
    </div>
  )
}

export default Inicio
