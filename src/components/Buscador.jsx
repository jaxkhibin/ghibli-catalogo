function Buscador({ busqueda, setBusqueda, director, setDirector, directores, onLimpiar }) {
  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Buscar película..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />
      <select value={director} onChange={e => setDirector(e.target.value)}>
        <option value="">Todos los directores</option>
        {directores.map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
      <button onClick={onLimpiar}>Limpiar</button>
    </div>
  )
}

export default Buscador
