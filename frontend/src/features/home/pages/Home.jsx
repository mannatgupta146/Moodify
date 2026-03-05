import React, { useState } from "react"
import FaceExpression from "../../expression/component/FaceExpression"
import Player from "../components/Player"
import { useSong } from "../hooks/useSong"
import "../style/home.scss"

const Home = () => {
  const { handleGetSong } = useSong()
  const [moodDetected, setMoodDetected] = useState(false)

  const handleMood = async (expression) => {
    await handleGetSong({ mood: expression })
    setMoodDetected(true)
  }

  return (
    <main className="home-page">

      <div className="home-container">

        <h1>Moodify</h1>
        <p className="home-subtitle">
          Detect your mood and play music instantly
        </p>

        <FaceExpression onClick={handleMood} />

      </div>

      {moodDetected && <Player />}

    </main>
  )
}

export default Home