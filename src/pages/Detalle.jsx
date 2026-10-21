import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getFilmById } from '../services/ghibliService'
import MensajeEstado from '../components/MensajeEstado'

function Detalle({ toggleFavorito, esFavorito }) {
  const { id } = useParams()
  const [pelicula, setPelicula] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const cargar = async () => {
      setCargando(true)
      setError(null)
      try {
        const datos = await getFilmById(id)
        setPelicula(datos)
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [id])

  if (cargando) return <MensajeEstado tipo="cargando" texto="Cargando detalle..." />
  if (error) return <MensajeEstado tipo="error" texto={`Error al cargar la película: ${error}`} />
  if (!pelicula) return null

  const favorito = esFavorito(pelicula.id)

  return (
    <div className="detalle-container">
      {pelicula.movie_banner && (
        <img
          className="detalle-banner"
          src={pelicula.movie_banner}
          alt={`Banner de ${pelicula.title}`}
          onError={e => { e.target.style.display = 'none' }}
        />
      )}

      <div className="detalle-contenido">
        <img
          className="detalle-poster"
          src={pelicula.image}
          alt={pelicula.title}
          onError={e => { e.target.src = 'https://placehold.co/220x320?text=Sin+imagen' }}
        />

        <div className="detalle-info">
          <h1>{pelicula.title}</h1>
          <p className="detalle-descripcion">{pelicula.description}</p>

          <ul className="detalle-datos">
            <li><span>Director:</span> {pelicula.director}</li>
            <li><span>Productor:</span> {pelicula.producer}</li>
            <li><span>Año de estreno:</span> {pelicula.release_date}</li>
            <li><span>Duración:</span> {pelicula.running_time} min</li>
            <li><span>Puntuación RT:</span> {pelicula.rt_score}%</li>
          </ul>

          <div className="detalle-acciones">
            <button
              className={`btn-favorito${favorito ? ' activo' : ''}`}
              onClick={() => toggleFavorito(pelicula)}
            >
              {favorito ? '♥ Quitar de favoritos' : '♡ Agregar a favoritos'}
            </button>
            <Link to="/lista">
              <button className="btn-secundario">← Volver al listado</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detalle
