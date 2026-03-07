import React, { useState } from "react"

const MOODS = [
  "happy",
  "sad",
  "angry",
  "surprised",
  "neutral",
  "excited"
]

const UploadSong = () => {

  const [file, setFile] = useState(null)
  const [mood, setMood] = useState("happy")

  const uploadSong = async () => {

    if (!file) return

    const formData = new FormData()

    formData.append("song", file)
    formData.append("mood", mood)

    await fetch("/api/songs", {
      method: "POST",
      body: formData
    })

    alert("Song uploaded")

    window.location.reload()
  }

  return (
    <div className="upload">

      <input
        type="file"
        accept="audio/mp3"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <select onChange={(e) => setMood(e.target.value)}>
        {MOODS.map(m => (
          <option key={m}>{m}</option>
        ))}
      </select>

      <button onClick={uploadSong}>
        Upload Song
      </button>

    </div>
  )
}

export default UploadSong