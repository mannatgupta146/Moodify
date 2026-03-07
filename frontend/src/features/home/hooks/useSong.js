import { useContext } from "react"
import { SongContext } from "../context/song.context"
import { getSong } from "../service/song.api"

export const useSong = () => {

  const {
    song,
    setSong,
    songs,
    setSongs,
    mood,
    setMood,
    loading,
    setLoading
  } = useContext(SongContext)

  const handleGetSong = async ({ mood }) => {

    setLoading(true)
    setMood(mood)

    const data = await getSong({ mood })

    setSongs(data.songs)

    if (data.songs.length > 0) {
      setSong(data.songs[0])
    }

    setLoading(false)
  }

  return {
    song,
    songs,
    mood,
    setSong,
    setMood,
    handleGetSong
  }
}