const BASE_URL = 'https://ghibliapi.vercel.app'

export const getFilms = async () => {
  const res = await fetch(`${BASE_URL}/films`)
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`)
  return res.json()
}

export const getFilmById = async (id) => {
  const res = await fetch(`${BASE_URL}/films/${id}`)
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`)
  return res.json()
}
