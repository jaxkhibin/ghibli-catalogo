function MensajeEstado({ tipo, texto }) {
  const iconos = {
    cargando: '⏳',
    error: '❌',
    vacio: '📭',
  }

  return (
    <div className="mensaje-estado">
      <div className="icono">{iconos[tipo] || '❓'}</div>
      <p>{texto}</p>
    </div>
  )
}

export default MensajeEstado
