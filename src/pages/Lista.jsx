import { useState, useEffect } from 'react'
import { getFilms } from '../services/ghibliService'
import Tarjeta from '../components/Tarjeta'
import Buscador from '../components/Buscador'
import MensajeEstado from '../components/MensajeEstado'

const POR_PAGINA = 12

function Lista({ toggleFavorito, esFavorito }) {
  const [peliculas, setPeliculas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [director, setDirector] = useState('')
  const [mostrados, setMostrados] = useState(POR_PAGINA)

  useEffect(() => {
    const cargar = async () => {
      setCargando(true)
      setError(null)
      try {
        const datos = await getFilms()
        setPeliculas(datos)
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [])

  const directores = [...new Set(peliculas.map(p => p.director))].sort()

  const filtradas = peliculas.filter(p => {
    const coincideBusqueda = p.title.toLowerCase().includes(busqueda.toLowerCase())
    const coincideDirector = director === '' || p.director === director
    return coincideBusqueda && coincideDirector
  })

  const limpiarFiltros = () => {
    setBusqueda('')
    setDirector('')
    setMostrados(POR_PAGINA)
  }

  const visibles = filtradas.slice(0, mostrados)

  if (cargando) return <MensajeEstado tipo="cargando" texto="Cargando películas..." />
  if (error) return <MensajeEstado tipo="error" texto={`No se pudieron cargar los datos: ${error}`} />

  return (
    <div>
      <div className="lista-header">
        <h1>Catálogo de Películas</h1>
        <p>{filtradas.length} película{filtradas.length !== 1 ? 's' : ''} encontrada{filtradas.length !== 1 ? 's' : ''}</p>
      </div>

      <Buscador
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        director={director}
        setDirector={setDirector}
        directores={directores}
        onLimpiar={limpiarFiltros}
      />

      {filtradas.length === 0 ? (
        <MensajeEstado tipo="vacio" texto="No se encontraron películas con esos criterios." />
      ) : (
        <>
          <div className="grid-tarjetas">
            {visibles.map(pelicula => (
              <Tarjeta
                key={pelicula.id}
                pelicula={pelicula}
                toggleFavorito={toggleFavorito}
                esFavorito={esFavorito}
              />
            ))}
          </div>

          {mostrados < filtradas.length && (
            <div className="paginacion">
              <button
                className="btn-primario"
                style={{ marginTop: '1.5rem' }}
                onClick={() => setMostrados(prev => prev + POR_PAGINA)}
              >
                Cargar más ({filtradas.length - mostrados} restantes)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Lista
