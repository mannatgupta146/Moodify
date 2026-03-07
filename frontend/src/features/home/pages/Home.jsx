import React from "react"
import FaceExpression from "../../expression/component/FaceExpression"
import Player from "../components/Player"
import Playlist from "../components/Playlist"
import UploadSong from "../components/UploadSong"
import { useSong } from "../hooks/useSong"
import "../style/home.scss"

const Home = () => {

  const { song, handleGetSong } = useSong()

  return (
    <div className="home">

      <div className="home__container">

        <div className="home__left">

          <h1>Moodify</h1>

          <p className="subtitle">
            Detect your mood and play music
          </p>

          <FaceExpression
            onClick={(expression) =>
              handleGetSong({ mood: expression })
            }
          />

          {song && <Player />}

        </div>

        <div className="home__right">

          <Playlist />

          <UploadSong />

        </div>

      </div>

    </div>
  )
}

export default Home