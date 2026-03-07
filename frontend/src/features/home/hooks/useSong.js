import { useContext } from "react"
import { SongContext } from "../context/song.context"
import {
  getSong,
  uploadSong as uploadSongApi,
  deleteSong as deleteSongApi,
  updateSongMood as updateSongMoodApi,
} from "../service/song.api"
import { toast } from "react-toastify"

export const useSong = () => {
  const { song, setSong, songs, setSongs, mood, setMood, loading, setLoading } =
    useContext(SongContext)

  const handleGetSong = async ({ mood }) => {
    setLoading(true)
    setMood(mood)

    try {
      const data = await getSong({ mood })
      setSongs(data.songs)

      if (data.songs.length > 0) {
        setSong(data.songs[0])
      } else {
        setSong(null)
        toast.info(`No ${mood} songs found`)
      }
    } catch (error) {
      toast.error("Failed to fetch songs")
    }

    setLoading(false)
  }

  const handleUploadSong = async ({ file, mood: uploadMood }) => {
    setLoading(true)
    try {
      await uploadSongApi({ file, mood: uploadMood })
      toast.success("Song uploaded!")
      if (mood === uploadMood) {
        const data = await getSong({ mood: uploadMood })
        setSongs(data.songs)
      }
    } catch (error) {
      toast.error("Upload failed")
    }
    setLoading(false)
  }

  const handleDeleteSong = async (id) => {
    setLoading(true)
    try {
      await deleteSongApi(id)
      const updated = songs.filter((s) => s._id !== id)
      setSongs(updated)
      if (song?._id === id) {
        setSong(updated.length > 0 ? updated[0] : null)
      }
      toast.success("Song deleted")
    } catch (error) {
      toast.error("Delete failed")
    }
    setLoading(false)
  }

  const handleUpdateMood = async (id, newMood) => {
    setLoading(true)
    try {
      await updateSongMoodApi(id, newMood)
      const updated = songs.filter((s) => s._id !== id)
      setSongs(updated)
      if (song?._id === id) {
        setSong(updated.length > 0 ? updated[0] : null)
      }
      toast.success(`Mood changed to ${newMood}`)
    } catch (error) {
      toast.error("Failed to update mood")
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
