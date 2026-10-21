import { Link } from 'react-router-dom'

function Tarjeta({ pelicula, toggleFavorito, esFavorito }) {
  const favorito = esFavorito(pelicula.id)

  return (
    <div className="tarjeta">
      <img
        className="tarjeta-img"
        src={pelicula.image}
        alt={pelicula.title}
        loading="lazy"
        onError={e => { e.target.src = 'https://placehold.co/220x300?text=Sin+imagen' }}
      />
      <div className="tarjeta-body">
        <p className="tarjeta-titulo">{pelicula.title}</p>
        <p className="tarjeta-meta">Dir. {pelicula.director} · {pelicula.release_date}</p>
        <p className="tarjeta-score">⭐ {pelicula.rt_score}%</p>
        <div className="tarjeta-acciones">
          <Link to={`/detalle/${pelicula.id}`}>Ver detalle</Link>
          <button
            className={`btn-favorito${favorito ? ' activo' : ''}`}
            onClick={() => toggleFavorito(pelicula)}
            title={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            {favorito ? '♥ Quitar' : '♡ Favorito'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Tarjeta
