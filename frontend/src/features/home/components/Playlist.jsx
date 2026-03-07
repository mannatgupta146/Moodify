import React, { useState } from "react"
import { useSong } from "../hooks/useSong"
import "../style/playlist.scss"

const MOODS = ["happy", "sad", "angry", "surprised", "neutral"]

const Playlist = () => {
  const {
    songs,
    mood,
    song,
    handleGetSong,
    setSong,
    handleDeleteSong,
    handleUpdateMood,
  } = useSong()
  const [editingId, setEditingId] = useState(null)

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
    <div className="playlist">
      <div className="playlist__header">
        <button className="playlist__arrow" onClick={prevMood}>
          &#8592;
        </button>
        <h2 className="playlist__mood-title">{mood} Songs</h2>
        <button className="playlist__arrow" onClick={nextMood}>
          &#8594;
        </button>
      </div>

      <ul className="playlist__list">
        {songs.length === 0 && (
          <li className="playlist__empty">No songs for this mood</li>
        )}
        {songs.map((s) => (
          <li
            key={s._id}
            className={`playlist__item ${song?._id === s._id ? "playlist__item--active" : ""}`}
          >
            <div className="playlist__item-main" onClick={() => setSong(s)}>
              {s.posterUrl && (
                <img
                  className="playlist__thumb"
                  src={s.posterUrl}
                  alt={s.title}
                />
              )}
              <span className="playlist__song-title">
                {s.title || "Untitled"}
              </span>
            </div>

            <div className="playlist__actions">
              {editingId === s._id ? (
                <select
                  className="playlist__mood-select"
                  defaultValue={s.mood}
                  onChange={(e) => {
                    handleUpdateMood(s._id, e.target.value)
                    setEditingId(null)
                  }}
                  onBlur={() => setEditingId(null)}
                  autoFocus
                >
                  {MOODS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              ) : (
                <button
                  className="playlist__action-btn"
                  title="Change mood"
                  onClick={(e) => {
                    e.stopPropagation()
                    setEditingId(s._id)
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    width="14"
                    height="14"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              )}
              <button
                className="playlist__action-btn playlist__action-btn--delete"
                title="Delete song"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteSong(s._id)
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="14"
                  height="14"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Playlist
