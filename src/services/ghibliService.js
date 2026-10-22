const BASE_URL = 'https://ghibliapi.vercel.app'

/**
 * Servicio para consumir la API pública de Studio Ghibli
 * Incluye los endpoints de Películas (/films), Personajes (/people),
 * Locaciones (/locations) y Especies (/species).
 */

export const getFilms = async () => {
  const res = await fetch(`${BASE_URL}/films`)
  if (!res.ok) throw new Error(`Error HTTP: ${res.status} al cargar películas`)
  return res.json()
}

export const getFilmById = async (id) => {
  const res = await fetch(`${BASE_URL}/films/${id}`)
  if (!res.ok) throw new Error(`Error HTTP: ${res.status} al cargar la película`)
  return res.json()
}

export const getPeople = async () => {
  const res = await fetch(`${BASE_URL}/people`)
  if (!res.ok) throw new Error(`Error HTTP: ${res.status} al cargar personajes`)
  return res.json()
}

export const getLocations = async () => {
  const res = await fetch(`${BASE_URL}/locations`)
  if (!res.ok) throw new Error(`Error HTTP: ${res.status} al cargar locaciones`)
  return res.json()
}

export const getSpecies = async () => {
  const res = await fetch(`${BASE_URL}/species`)
  if (!res.ok) throw new Error(`Error HTTP: ${res.status} al cargar especies`)
  return res.json()
}
