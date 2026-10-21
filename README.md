# Ghibli Catálogo — Explorador y Gestión de Usuarios

Aplicación web desarrollada con **React** y **Vite** para explorar el catálogo de películas de **Studio Ghibli**, consultar detalles específicos, gestionar favoritos con persistencia local y administrar usuarios registrados mediante un CRUD controlado.

---

## 👥 Integrantes del Grupo
- **Juan Jimenez**
- **Andres Lopez**

---

## 🌐 API Utilizada
- **Nombre:** Studio Ghibli API
- **Tema:** Películas, personajes y locaciones de Studio Ghibli.
- **URL base:** [https://ghibliapi.vercel.app](https://ghibliapi.vercel.app)
- **Documentación oficial:** [https://ghibliapi.vercel.app](https://ghibliapi.vercel.app)
- **Endpoints utilizados:**
  - `GET /films` — Obtención de la lista completa de películas con imagen, director, puntuación y fecha.
  - `GET /films/{id}` — Consulta de información detallada de una película específica por su ID.

---

## 🚀 Instrucciones para Ejecución Local

1. **Clonar o descargar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd proyectoFinal
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Compilar para producción (opcional):**
   ```bash
   npm run build
   ```

---

## 📱 Características y Pantallas

1. **Barra de navegación (Navbar):**
   - Enlaces con `NavLink` (marcado activo).
   - Contador en tiempo real de favoritos guardados.
   - Contador en tiempo real de usuarios registrados.
2. **Inicio (`/`):**
   - Presentación de la aplicación y descripción de la API utilizada.
   - Botón de acceso directo al catálogo.
3. **Catálogo / Listado (`/lista`):**
   - Renderizado de tarjetas con datos de la API.
   - Buscador en vivo por título de película.
   - Filtro select por director.
   - Paginación dinámica con botón "Cargar más".
4. **Detalle (`/detalle/:id`):**
   - Ruta dinámica con parámetro `:id` leída mediante `useParams`.
   - Banner, póster, director, productor, año, duración y score RT.
   - Botón para agregar/quitar de favoritos.
5. **Favoritos (`/favoritos`):**
   - Películas guardadas por el usuario.
   - Persistencia automática en `localStorage`.
   - Renderizado condicional cuando no hay favoritos.
6. **Registro de Usuarios (`/registro`):**
   - CRUD completo en memoria (`useState`).
   - Formulario controlado con validaciones: campos obligatorios, identificación numérica, correo con `@` y validación de IDs no repetidos.
   - Tabla interactiva con opción de editar y eliminar (con confirmación).
7. **Página 404 (`*`):**
   - Mensaje amigable y botón para regresar al inicio ante rutas inexistentes.
8. **Pie de página (Footer):**
   - Nombres de los integrantes, API utilizada y enlace a su documentación.

---

## 🛠️ Tecnologías y Librerías
- **React 19**
- **Vite 8**
- **React Router DOM v7**
- **CSS3** nativo y responsivo (optimizado para celular 375px, tablet 768px y desktop 1280px)
- **Vercel / Netlify Rewrite** para evitar error 404 al recargar rutas con parámetros.
