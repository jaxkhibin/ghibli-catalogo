import { Link } from 'react-router-dom'
import Tarjeta from '../components/Tarjeta'

function Favoritos({ favoritos, toggleFavorito }) {
  const esFavorito = (id) => favoritos.some(f => f.id === id)

  return (
    <div>
      <div className="favoritos-header">
        <h1>Mis Favoritos</h1>
        <p style={{ color: 'var(--color-texto-claro)', fontSize: '0.9rem' }}>
          {favoritos.length} película{favoritos.length !== 1 ? 's' : ''} guardada{favoritos.length !== 1 ? 's' : ''}
        </p>
      </div>

      {favoritos.length === 0 ? (
        <div className="favoritos-vacio">
          <p style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📭</p>
          <p>Aún no tienes favoritos guardados.</p>
          <p style={{ marginTop: '0.75rem' }}>
            <Link to="/lista">Explorar el catálogo →</Link>
          </p>
        </div>
      ) : (
        <div className="grid-tarjetas">
          {favoritos.map(pelicula => (
            <Tarjeta
              key={pelicula.id}
              pelicula={pelicula}
              toggleFavorito={toggleFavorito}
              esFavorito={esFavorito}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favoritos
