import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
})

export const getSong = async ({ mood }) => {
  const response = await api.get(`/api/songs?mood=${encodeURIComponent(mood)}`)
  return response.data
}

export const uploadSong = async ({ file, mood }) => {
  const formData = new FormData()
  formData.append("song", file)
  formData.append("mood", mood)
  const response = await api.post("/api/songs", formData)
  return response.data
}

export const deleteSong = async (id) => {
  const response = await api.delete(`/api/songs/${id}`)
  return response.data
}

export const updateSongMood = async (id, mood) => {
  const response = await api.patch(`/api/songs/${id}/mood`, { mood })
  return response.data
}
