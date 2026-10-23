# Ghibli Catálogo — Películas, Personajes y Locaciones

Aplicación web desarrollada con *React 19* y *Vite* para explorar el universo animado de *Studio Ghibli, cubriendo de forma integral sus **películas, **personajes* y *locaciones*, con soporte para guardar favoritos en almacenamiento local y administrar usuarios registrados mediante un CRUD controlado.

---

## Integrantes del Grupo
- *Juan Jimenez*
- *Andres Lopez*

---

## API Utilizada
- *Nombre:* Studio Ghibli API
- *Tema Asignado:* Películas, personajes y locaciones de Studio Ghibli.
- *URL Base:* [https://ghibliapi.vercel.app](https://ghibliapi.vercel.app)
- *Endpoints implementados:*
  - GET /films — Obtención de la lista completa de películas (imagen, título, director, fecha, puntuación).
  - GET /films/{id} — Consulta de información detallada de una película específica por su ID.
  - GET /people — Explorador de personajes (género, edad, color de ojos y cabello) y vinculación directa dentro de cada película.
  - GET /locations — Explorador de locaciones mágicas (clima, terreno, agua superficial) y vinculación con las películas.
  - GET /species — Consulta y resolución de las especies de los personajes de forma textual.

---

## Pantallas y Funcionalidades

1. *Barra de navegación (Navbar):*
   - Enlaces mediante NavLink (con resaltado de ruta activa).
   - Contador en tiempo real de favoritos guardados (badge).
   - Contador en tiempo real de usuarios registrados (badge).
2. *Inicio (/):*
   - Presentación de la aplicación y descripción del tema asignado (Películas, personajes y locaciones).
   - Especificación de la API de Studio Ghibli y botón de acceso al catálogo.
3. *Catálogo Multicategoría (/lista):*
   - Selector de categoría: *Películas (22), **Personajes (57)* y *Locaciones (25)*.
   - Buscador por texto en tiempo real.
   - Filtros dinámicos según categoría:
     - En Películas: filtro desplegable por *Director*.
     - En Personajes: filtro desplegable por *Género*.
     - En Locaciones: filtro desplegable por *Clima*.
   - Paginación progresiva con botón *«Cargar más»* (12 iniciales).
   - Renderizado condicional de estados: Cargando, Error y Sin resultados.
4. *Detalle de Película (/detalle/:id):*
   - Ruta dinámica con parámetro :id procesado con useParams y useEffect.
   - Banner panorámico, póster oficial y más de 5 metadatos (director, productor, fecha, duración, calificación RT y sinopsis).
   - *Personajes asociados a la película:* tarjetas con nombre, especie (textual), género, edad y características de los personajes que aparecen en dicho filme.
   - *Locaciones asociadas a la película:* tarjetas con nombre, clima y terreno.
   - Botón interactivo para agregar o quitar de favoritos y botón para regresar al listado.
5. *Favoritos (/favoritos):*
   - Colección de películas marcadas como favoritas.
   - Persistencia automática en el navegador con localStorage.
   - Opción para eliminar de favoritos con un clic.
   - Mensaje informativo cuando la lista está vacía con enlace al catálogo.
6. *Registro de Usuarios (/registro):*
   - CRUD completo gestionado en estado de React (useState): crear, listar, editar y eliminar.
   - Formulario controlado (identificacion, nombre, correo).
   - Validaciones en pantalla: campos obligatorios, identificación numérica, correo con @ y bloqueo de identificaciones duplicadas.
   - Edición en la misma posición de la lista y cancelación automática si se elimina el usuario en edición.
   - Confirmación mediante window.confirm para eliminación segura.
7. **Página 404 (*):**
   - Mensaje amigable y botón para volver al inicio ante rutas no encontradas.
8. *Pie de página (Footer):*
   - Créditos de los integrantes (Juan Jimenez y Andres Lopez), API utilizada y enlace a la documentación.
