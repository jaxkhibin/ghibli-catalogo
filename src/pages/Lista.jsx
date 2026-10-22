import { useState, useEffect } from 'react'
import { getFilms, getPeople, getLocations, getSpecies } from '../services/ghibliService'
import Tarjeta from '../components/Tarjeta'
import Buscador from '../components/Buscador'
import MensajeEstado from '../components/MensajeEstado'

const POR_PAGINA = 12

function Lista({ toggleFavorito, esFavorito }) {
  // Datos de la API
  const [peliculas, setPeliculas] = useState([])
  const [personajes, setPersonajes] = useState([])
  const [locaciones, setLocaciones] = useState([])

  // Estados de control
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Categoría activa: 'films' | 'people' | 'locations'
  const [categoria, setCategoria] = useState('films')

  // Filtros
  const [busqueda, setBusqueda] = useState('')
  const [filtroSecundario, setFiltroSecundario] = useState('')
  const [mostrados, setMostrados] = useState(POR_PAGINA)

  // Carga inicial de datos de los endpoints de Studio Ghibli
  useEffect(() => {
    const cargarTodo = async () => {
      setCargando(true)
      setError(null)
      try {
        const [filmsData, peopleData, locationsData, speciesData] = await Promise.all([
          getFilms(),
          getPeople().catch(() => []),
          getLocations().catch(() => []),
          getSpecies().catch(() => [])
        ])

        // Mapa de ID de especie -> Nombre de especie
        const mapaEspecies = new Map(speciesData.map(s => [s.id, s.name]))

        // Enriquecer personajes con el nombre de su especie resuelto de forma textual
        const personajesEnriquecidos = peopleData.map(p => {
          let nombreEspecie = ''
          if (p.species) {
            const especieId = p.species.split('/').filter(Boolean).pop()
            nombreEspecie = mapaEspecies.get(especieId) || ''
          }
          return { ...p, nombreEspecie }
        })

        setPeliculas(filmsData)
        setPersonajes(personajesEnriquecidos)
        setLocaciones(locationsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }
    cargarTodo()
  }, [])

  // Cambiar de categoría resetea los filtros y paginación
  const handleCambiarCategoria = (nuevaCat) => {
    setCategoria(nuevaCat)
    setBusqueda('')
    setFiltroSecundario('')
    setMostrados(POR_PAGINA)
  }

  const limpiarFiltros = () => {
    setBusqueda('')
    setFiltroSecundario('')
    setMostrados(POR_PAGINA)
  }

  // Opciones dinámicas para el select según categoría
  let opcionesFiltro = []
  let labelFiltro = 'Todos'

  if (categoria === 'films') {
    opcionesFiltro = [...new Set(peliculas.map(p => p.director).filter(Boolean))].sort()
    labelFiltro = 'Todos los directores'
  } else if (categoria === 'people') {
    opcionesFiltro = [...new Set(personajes.map(p => p.gender).filter(Boolean))].sort()
    labelFiltro = 'Todos los géneros'
  } else if (categoria === 'locations') {
    opcionesFiltro = [...new Set(locaciones.map(l => l.climate).filter(Boolean))].sort()
    labelFiltro = 'Todos los climas'
  }

  // Filtrado reactivo de elementos
  const listaBase =
    categoria === 'films' ? peliculas : categoria === 'people' ? personajes : locaciones

  const filtrados = listaBase.filter(item => {
    const nombreOtitulo = (item.title || item.name || '').toLowerCase()
    const coincideBusqueda = nombreOtitulo.includes(busqueda.toLowerCase())

    let coincideFiltro = true
    if (filtroSecundario) {
      if (categoria === 'films') coincideFiltro = item.director === filtroSecundario
      if (categoria === 'people') coincideFiltro = item.gender === filtroSecundario
      if (categoria === 'locations') coincideFiltro = item.climate === filtroSecundario
    }

    return coincideBusqueda && coincideFiltro
  })

  const visibles = filtrados.slice(0, mostrados)

  if (cargando) return <MensajeEstado tipo="cargando" texto="Cargando catálogo de Studio Ghibli..." />
  if (error) return <MensajeEstado tipo="error" texto={`No se pudieron cargar los datos: ${error}`} />

  const titulos = {
    films: 'Catálogo de Películas',
    people: 'Catálogo de Personajes',
    locations: 'Catálogo de Locaciones'
  }

  return (
    <div>
      <div className="lista-header">
        <h1>{titulos[categoria]}</h1>
        <p>
          {filtrados.length} elemento{filtrados.length !== 1 ? 's' : ''} encontrado{filtrados.length !== 1 ? 's' : ''}
        </p>
      </div>

      <Buscador
        categoria={categoria}
        setCategoria={handleCambiarCategoria}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        filtroSecundario={filtroSecundario}
        setFiltroSecundario={setFiltroSecundario}
        opcionesFiltro={opcionesFiltro}
        labelFiltro={labelFiltro}
        onLimpiar={limpiarFiltros}
      />

      {filtrados.length === 0 ? (
        <MensajeEstado tipo="vacio" texto="No se encontraron elementos con esos criterios de búsqueda." />
      ) : (
        <>
          <div className="grid-tarjetas">
            {visibles.map(item => (
              <Tarjeta
                key={item.id}
                item={item}
                tipo={categoria}
                toggleFavorito={toggleFavorito}
                esFavorito={esFavorito}
              />
            ))}
          </div>

          {mostrados < filtrados.length && (
            <div className="paginacion">
              <button
                className="btn-primario"
                style={{ marginTop: '1.5rem' }}
                onClick={() => setMostrados(prev => prev + POR_PAGINA)}
              >
                Cargar más ({filtrados.length - mostrados} restantes)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Lista
