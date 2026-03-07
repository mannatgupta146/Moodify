import React from "react"
import { useSong } from "../hooks/useSong"
import '../style/playlist.scss'

const MOODS = [
  "happy",
  "sad",
  "angry",
  "surprised",
  "neutral",
  "excited"
]

const Playlist = () => {

  const { songs, mood, handleGetSong, setSong } = useSong()

  const currentIndex = MOODS.indexOf(mood)

  const nextMood = () => {
    const m = MOODS[(currentIndex + 1) % MOODS.length]
    handleGetSong({ mood: m })
  }

  const prevMood = () => {
    const m = MOODS[(currentIndex - 1 + MOODS.length) % MOODS.length]
    handleGetSong({ mood: m })
  }

  if (!mood) return null

  return (
    <div className="playlist__header">

  <button
    className="playlist__arrow"
    onClick={prevMood}
  >
    ←
  </button>

  <h2>{mood ? `${mood} Songs` : "Playlist"}</h2>

  <button
    className="playlist__arrow"
    onClick={nextMood}
  >
    →
  </button>

</div>
  )
}

export default Playlist