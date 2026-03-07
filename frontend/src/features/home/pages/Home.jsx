import React from "react"
import FaceExpression from "../../expression/component/FaceExpression"
import Player from "../components/Player"
import Playlist from "../components/Playlist"
import UploadSong from "../components/UploadSong"
import { useSong } from "../hooks/useSong"
import { useAuth } from "../../auth/hooks/useAuth"
import "../style/home.scss"

const Home = () => {
  const { song, mood, handleGetSong } = useSong()
  const { user, handleLogout } = useAuth()

  return (
    <div className="home">
      <header className="home__header">
        <div className="home__brand">
          <h1>Moodify</h1>
          <p className="subtitle">Detect your mood and play music</p>
        </div>
        <div className="home__user">
          {user && <span className="home__username">{user.username}</span>}
          <button className="home__logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="home__container">
        <div className="home__left">
          <FaceExpression
            onClick={(expression) => handleGetSong({ mood: expression })}
          />

          {song && <Player />}
        </div>

        <div className="home__right">
          <UploadSong />

          <Playlist />
        </div>
      </div>
    </div>
  )
}

export default Home
