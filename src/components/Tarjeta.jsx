import { Link } from 'react-router-dom'

function Tarjeta({ item, tipo = 'films', toggleFavorito, esFavorito }) {
  // 1. Renderizado para Películas
  if (tipo === 'films') {
    const favorito = esFavorito ? esFavorito(item.id) : false

    return (
      <div className="tarjeta">
        <img
          className="tarjeta-img"
          src={item.image}
          alt={item.title}
          loading="lazy"
          onError={e => {
            e.target.src = 'https://placehold.co/220x300?text=Sin+imagen'
          }}
        />
        <div className="tarjeta-body">
          <p className="tarjeta-titulo">{item.title}</p>
          <p className="tarjeta-meta">
            Dir. {item.director} · {item.release_date}
          </p>
          <p className="tarjeta-score">⭐ {item.rt_score}%</p>
          <div className="tarjeta-acciones">
            <Link to={`/detalle/${item.id}`}>Ver detalle</Link>
            {toggleFavorito && (
              <button
                className={`btn-favorito${favorito ? ' activo' : ''}`}
                onClick={() => toggleFavorito(item)}
                title={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                {favorito ? '♥ Quitar' : '♡ Favorito'}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // 2. Renderizado para Personajes
  if (tipo === 'people') {
    return (
      <div className="tarjeta tarjeta-entidad">
        <div className="tarjeta-icono">👤</div>
        <div className="tarjeta-body">
          <p className="tarjeta-titulo">{item.name}</p>
          {item.nombreEspecie && (
            <p className="tarjeta-meta">
              <strong>Especie:</strong> {item.nombreEspecie}
            </p>
          )}
          <p className="tarjeta-meta">
            <strong>Género:</strong> {item.gender || 'No especificado'}
          </p>
          <p className="tarjeta-meta">
            <strong>Edad:</strong> {item.age || 'Desconocida'}
          </p>
          <p className="tarjeta-meta">
            <strong>Ojos:</strong> {item.eye_color} · <strong>Cabello:</strong> {item.hair_color}
          </p>
        </div>
      </div>
    )
  }

  // 3. Renderizado para Locaciones
  return (
    <div className="tarjeta tarjeta-entidad">
      <div className="tarjeta-icono">🏰</div>
      <div className="tarjeta-body">
        <p className="tarjeta-titulo">{item.name}</p>
        <p className="tarjeta-meta">
          <strong>Clima:</strong> {item.climate || 'No especificado'}
        </p>
        <p className="tarjeta-meta">
          <strong>Terreno:</strong> {item.terrain || 'No especificado'}
        </p>
        <p className="tarjeta-meta">
          <strong>Agua superficial:</strong> {item.surface_water ? `${item.surface_water}%` : 'N/A'}
        </p>
      </div>
    </div>
  )
}

export default Tarjeta
