function ListaUsuarios({ usuarios, onEditar, onEliminar, mensajeGlobal }) {
  return (
    <div className="lista-usuarios-card">
      <h2>Usuarios Registrados</h2>
      <p className="total-usuarios">Total: {usuarios.length} usuario{usuarios.length !== 1 ? 's' : ''}</p>

      {mensajeGlobal.texto && (
        <div className={`msg-form ${mensajeGlobal.tipo}`}>{mensajeGlobal.texto}</div>
      )}

      {usuarios.length === 0 ? (
        <p className="usuarios-vacio">Aún no hay usuarios registrados.</p>
      ) : (
        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.identificacion}>
                <td>{u.identificacion}</td>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                <td>
                  <div className="acciones-td">
                    <button className="btn-advertencia" onClick={() => onEditar(u)}>Editar</button>
                    <button className="btn-peligro" onClick={() => onEliminar(u.identificacion)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ListaUsuarios
