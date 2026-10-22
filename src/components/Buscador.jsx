function Buscador({
  categoria,
  setCategoria,
  busqueda,
  setBusqueda,
  filtroSecundario,
  setFiltroSecundario,
  opcionesFiltro = [],
  labelFiltro = 'Todos',
  onLimpiar
}) {
  return (
    <div className="buscador-contenedor">
      {/* Selector de categoría: Películas, Personajes y Locaciones */}
      <div className="filtro-categoria">
        <button
          type="button"
          className={`btn-categoria ${categoria === 'films' ? 'activo' : ''}`}
          onClick={() => setCategoria('films')}
        >
          🎬 Películas
        </button>
        <button
          type="button"
          className={`btn-categoria ${categoria === 'people' ? 'activo' : ''}`}
          onClick={() => setCategoria('people')}
        >
          👥 Personajes
        </button>
        <button
          type="button"
          className={`btn-categoria ${categoria === 'locations' ? 'activo' : ''}`}
          onClick={() => setCategoria('locations')}
        >
          🏰 Locaciones
        </button>
      </div>

      <div className="buscador">
        <input
          type="text"
          placeholder={
            categoria === 'films'
              ? 'Buscar película por título...'
              : categoria === 'people'
              ? 'Buscar personaje por nombre...'
              : 'Buscar locación por nombre...'
          }
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />

        {opcionesFiltro.length > 0 && (
          <select
            value={filtroSecundario}
            onChange={e => setFiltroSecundario(e.target.value)}
          >
            <option value="">{labelFiltro}</option>
            {opcionesFiltro.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}

        <button type="button" onClick={onLimpiar}>
          Limpiar
        </button>
      </div>
    </div>
  )
}

export default Buscador
