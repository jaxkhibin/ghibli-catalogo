import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getFilmById, getPeople, getLocations, getSpecies } from '../services/ghibliService'
import MensajeEstado from '../components/MensajeEstado'

function Detalle({ toggleFavorito, esFavorito }) {
  const { id } = useParams()
  const [pelicula, setPelicula] = useState(null)
  const [personajes, setPersonajes] = useState([])
  const [locaciones, setLocaciones] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelado = false

    const cargar = async () => {
      setCargando(true)
      setError(null)
      try {
        const [datosPelicula, todosPersonajes, todasLocaciones, todasEspecies] = await Promise.all([
          getFilmById(id),
          getPeople().catch(() => []),
          getLocations().catch(() => []),
          getSpecies().catch(() => [])
        ])

        if (!cancelado) {
          setPelicula(datosPelicula)

          // Mapa de Especies (id -> nombre de especie textual)
          const mapaEspecies = new Map(todasEspecies.map(s => [s.id, s.name]))

          // Personajes vinculados a esta película con su especie resuelta textualmente
          const personajesPelicula = todosPersonajes
            .filter(p => p.films && p.films.some(f => f.includes(id)))
            .map(p => {
              let nombreEspecie = ''
              if (p.species) {
                const spId = p.species.split('/').filter(Boolean).pop()
                nombreEspecie = mapaEspecies.get(spId) || ''
              }
              return { ...p, nombreEspecie }
            })

          // Locaciones vinculadas a esta película
          const locacionesPelicula = todasLocaciones.filter(
            l => l.films && l.films.some(f => f.includes(id))
          )

          setPelicula(datosPelicula)
          setPersonajes(personajesPelicula)
          setLocaciones(locacionesPelicula)
        }
      } catch (err) {
        if (!cancelado) setError(err.message)
      } finally {
        if (!cancelado) setCargando(false)
      }
    }

    cargar()
    return () => {
      cancelado = true
    }
  }, [id])

  if (cargando) return <MensajeEstado tipo="cargando" texto="Cargando detalles de la película..." />
  if (error) return <MensajeEstado tipo="error" texto={`Error al cargar la película: ${error}`} />
  if (!pelicula) return null

  const favorito = esFavorito ? esFavorito(pelicula.id) : false

  return (
    <div className="detalle-container">
      {pelicula.movie_banner && (
        <img
          className="detalle-banner"
          src={pelicula.movie_banner}
          alt={`Banner de ${pelicula.title}`}
          onError={e => {
            e.target.style.display = 'none'
          }}
        />
      )}

      <div className="detalle-contenido">
        <img
          className="detalle-poster"
          src={pelicula.image}
          alt={pelicula.title}
          onError={e => {
            e.target.src = 'https://placehold.co/220x320?text=Sin+imagen'
          }}
        />

        <div className="detalle-info">
          <h1>{pelicula.title}</h1>
          <p className="detalle-subtitulo">
            <em>{pelicula.original_title} ({pelicula.original_title_romanised})</em>
          </p>
          <p className="detalle-descripcion">{pelicula.description}</p>

          <ul className="detalle-datos">
            <li><span>Director:</span> {pelicula.director}</li>
            <li><span>Productor:</span> {pelicula.producer}</li>
            <li><span>Año de estreno:</span> {pelicula.release_date}</li>
            <li><span>Duración:</span> {pelicula.running_time} min</li>
            <li><span>Puntuación RT:</span> ⭐ {pelicula.rt_score}%</li>
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

      {/* Sección de Personajes de la película con especie textual en cada personaje */}
      {personajes.length > 0 && (
        <section className="detalle-seccion">
          <h2>👥 Personajes de la Película ({personajes.length})</h2>
          <div className="grid-mini-cards">
            {personajes.map(p => (
              <div key={p.id} className="mini-card">
                <h4>{p.name}</h4>
                {p.nombreEspecie && (
                  <p><strong>Especie:</strong> {p.nombreEspecie}</p>
                )}
                <p><strong>Género:</strong> {p.gender}</p>
                <p><strong>Edad:</strong> {p.age}</p>
                <p><strong>Ojos:</strong> {p.eye_color}</p>
                <p><strong>Cabello:</strong> {p.hair_color}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sección de Locaciones de la película */}
      {locaciones.length > 0 && (
        <section className="detalle-seccion">
          <h2>🏰 Locaciones de la Película ({locaciones.length})</h2>
          <div className="grid-mini-cards">
            {locaciones.map(l => (
              <div key={l.id} className="mini-card">
                <h4>{l.name}</h4>
                <p><strong>Clima:</strong> {l.climate}</p>
                <p><strong>Terreno:</strong> {l.terrain}</p>
                <p><strong>Agua superficial:</strong> {l.surface_water}%</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default Detalle
