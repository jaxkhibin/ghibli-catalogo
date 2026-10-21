import { useState, useEffect } from 'react'

function FormularioUsuario({ usuarioEditar, onGuardar, onCancelar }) {
  const [identificacion, setIdentificacion] = useState('')
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' })

  useEffect(() => {
    if (usuarioEditar) {
      setIdentificacion(usuarioEditar.identificacion)
      setNombre(usuarioEditar.nombre)
      setCorreo(usuarioEditar.correo)
      setMensaje({ tipo: '', texto: '' })
    } else {
      limpiarFormulario()
    }
  }, [usuarioEditar])

  const limpiarFormulario = () => {
    setIdentificacion('')
    setNombre('')
    setCorreo('')
    setMensaje({ tipo: '', texto: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validaciones
    if (!identificacion.trim() || !nombre.trim() || !correo.trim()) {
      setMensaje({ tipo: 'error', texto: 'Todos los campos son obligatorios.' })
      return
    }
    if (!/^\d+$/.test(identificacion.trim())) {
      setMensaje({ tipo: 'error', texto: 'La identificación debe contener solo números.' })
      return
    }
    if (!correo.includes('@')) {
      setMensaje({ tipo: 'error', texto: 'El correo debe contener "@".' })
      return
    }

    const resultado = onGuardar({
      identificacion: identificacion.trim(),
      nombre: nombre.trim(),
      correo: correo.trim(),
    })

    if (resultado.ok) {
      setMensaje({ tipo: 'exito', texto: resultado.texto })
      limpiarFormulario()
    } else {
      setMensaje({ tipo: 'error', texto: resultado.texto })
    }
  }

  const handleCancelar = () => {
    limpiarFormulario()
    onCancelar()
  }

  return (
    <div className="formulario-card">
      <h2>{usuarioEditar ? `Modificar Usuario (ID: ${usuarioEditar.identificacion})` : 'Registrar Usuario'}</h2>

      {mensaje.texto && (
        <div className={`msg-form ${mensaje.tipo}`}>{mensaje.texto}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="campo-form">
          <label htmlFor="identificacion">Identificación</label>
          <input
            id="identificacion"
            type="text"
            placeholder="Ej: 1234567"
            value={identificacion}
            onChange={e => setIdentificacion(e.target.value)}
            disabled={!!usuarioEditar}
          />
        </div>
        <div className="campo-form">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className="campo-form">
          <label htmlFor="correo">Correo</label>
          <input
            id="correo"
            type="text"
            placeholder="ejemplo@correo.com"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
          />
        </div>
        <div className="form-acciones">
          <button type="submit" className="btn-primario">
            {usuarioEditar ? 'Guardar cambios' : 'Registrar'}
          </button>
          {usuarioEditar && (
            <button type="button" className="btn-secundario" onClick={handleCancelar}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default FormularioUsuario
