import { useContext } from "react"
import { SongContext } from "../context/song.context"
import {
  getSong,
  uploadSong as uploadSongApi,
  deleteSong as deleteSongApi,
  updateSongMood as updateSongMoodApi,
} from "../service/song.api"

export const useSong = () => {
  const { song, setSong, songs, setSongs, mood, setMood, loading, setLoading } =
    useContext(SongContext)

  const handleGetSong = async ({ mood }) => {
    setLoading(true)
    setMood(mood)

    const data = await getSong({ mood })

    setSongs(data.songs)

    if (data.songs.length > 0) {
      setSong(data.songs[0])
    } else {
      setSong(null)
    }

    setLoading(false)
  }

  const handleUploadSong = async ({ file, mood: uploadMood }) => {
    setLoading(true)
    await uploadSongApi({ file, mood: uploadMood })
    if (mood === uploadMood) {
      const data = await getSong({ mood: uploadMood })
      setSongs(data.songs)
    }
    setLoading(false)
  }

  const handleDeleteSong = async (id) => {
    setLoading(true)
    await deleteSongApi(id)
    const updated = songs.filter((s) => s._id !== id)
    setSongs(updated)
    if (song?._id === id) {
      setSong(updated.length > 0 ? updated[0] : null)
    }
    setLoading(false)
  }

  const handleUpdateMood = async (id, newMood) => {
    setLoading(true)
    await updateSongMoodApi(id, newMood)
    // remove from current list since mood changed
    const updated = songs.filter((s) => s._id !== id)
    setSongs(updated)
    if (song?._id === id) {
      setSong(updated.length > 0 ? updated[0] : null)
    }
    setLoading(false)
  }

  return {
    song,
    songs,
    mood,
    loading,
    setSong,
    setMood,
    handleGetSong,
    handleUploadSong,
    handleDeleteSong,
    handleUpdateMood,
  }
}
