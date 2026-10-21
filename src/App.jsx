import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Lista from './pages/Lista'
import Detalle from './pages/Detalle'
import Favoritos from './pages/Favoritos'
import Registro from './pages/Registro'
import NotFound from './pages/NotFound'

function App() {
  const [favoritos, setFavoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ghibli_favoritos') || '[]')
    } catch {
      return []
    }
  })

  const [totalUsuarios, setTotalUsuarios] = useState(0)

  useEffect(() => {
    localStorage.setItem('ghibli_favoritos', JSON.stringify(favoritos))
  }, [favoritos])

  const toggleFavorito = (pelicula) => {
    setFavoritos(prev => {
      const existe = prev.some(f => f.id === pelicula.id)
      if (existe) return prev.filter(f => f.id !== pelicula.id)
      return [...prev, pelicula]
    })
  }

  const esFavorito = (id) => favoritos.some(f => f.id === id)

  return (
    <div className="app-wrapper">
      <Navbar favoritosCount={favoritos.length} usuariosCount={totalUsuarios} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/lista"
            element={<Lista toggleFavorito={toggleFavorito} esFavorito={esFavorito} />}
          />
          <Route
            path="/detalle/:id"
            element={<Detalle toggleFavorito={toggleFavorito} esFavorito={esFavorito} />}
          />
          <Route
            path="/favoritos"
            element={<Favoritos favoritos={favoritos} toggleFavorito={toggleFavorito} />}
          />
          <Route
            path="/registro"
            element={<Registro onTotalChange={setTotalUsuarios} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
