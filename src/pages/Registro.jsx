import { useState, useEffect } from 'react'
import FormularioUsuario from '../components/FormularioUsuario'
import ListaUsuarios from '../components/ListaUsuarios'

function Registro({ onTotalChange }) {
  const [usuarios, setUsuarios] = useState([])
  const [usuarioEditar, setUsuarioEditar] = useState(null)
  const [mensajeGlobal, setMensajeGlobal] = useState({ tipo: '', texto: '' })

  useEffect(() => {
    onTotalChange(usuarios.length)
  }, [usuarios, onTotalChange])

  const mostrarMensajeGlobal = (tipo, texto) => {
    setMensajeGlobal({ tipo, texto })
    setTimeout(() => setMensajeGlobal({ tipo: '', texto: '' }), 4000)
  }

  const handleGuardar = ({ identificacion, nombre, correo }) => {
    if (usuarioEditar) {
      // Modo editar
      setUsuarios(prev =>
        prev.map(u =>
          u.identificacion === usuarioEditar.identificacion
            ? { ...u, nombre, correo }
            : u
        )
      )
      setUsuarioEditar(null)
      mostrarMensajeGlobal('exito', `Usuario ${identificacion} modificado correctamente.`)
      return { ok: true, texto: `Usuario modificado correctamente.` }
    }

    // Modo registrar — verificar duplicado
    const existe = usuarios.some(u => u.identificacion === identificacion)
    if (existe) {
      return { ok: false, texto: `Ya existe un usuario con la identificación ${identificacion}.` }
    }

    setUsuarios(prev => [...prev, { identificacion, nombre, correo }])
    mostrarMensajeGlobal('exito', `Usuario ${identificacion} registrado correctamente.`)
    return { ok: true, texto: `Usuario registrado correctamente.` }
  }

  const handleEditar = (usuario) => {
    setUsuarioEditar(usuario)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleEliminar = (identificacion) => {
    const confirmado = window.confirm(`¿Desea eliminar al usuario con ID ${identificacion}?`)
    if (!confirmado) return

    if (usuarioEditar && usuarioEditar.identificacion === identificacion) {
      setUsuarioEditar(null)
    }

    setUsuarios(prev => prev.filter(u => u.identificacion !== identificacion))
    mostrarMensajeGlobal('exito', `Usuario ${identificacion} eliminado correctamente.`)
  }

  const handleCancelar = () => {
    setUsuarioEditar(null)
  }

  return (
    <div>
      <h1 className="registro-titulo">Registro de Usuarios</h1>
      <div className="registro-layout">
        <FormularioUsuario
          usuarioEditar={usuarioEditar}
          onGuardar={handleGuardar}
          onCancelar={handleCancelar}
        />
        <ListaUsuarios
          usuarios={usuarios}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
          mensajeGlobal={mensajeGlobal}
        />
      </div>
    </div>
  )
}

export default Registro
