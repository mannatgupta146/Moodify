import { createContext, useState } from "react"

export const SongContext = createContext()

export const SongProvider = ({ children }) => {

  const [song, setSong] = useState(null)
  const [songs, setSongs] = useState([])
  const [mood, setMood] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <SongContext.Provider value={{
      song,
      setSong,
      songs,
      setSongs,
      mood,
      setMood,
      loading,
      setLoading
    }}>
      {children}
    </SongContext.Provider>
  )
}