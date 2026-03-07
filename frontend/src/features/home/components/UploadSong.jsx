import React, { useState } from "react"
import { useSong } from "../hooks/useSong"
import { toast } from "react-toastify"

const MOODS = ["happy", "sad", "angry", "surprised", "neutral"]

const UploadSong = () => {
  const [file, setFile] = useState(null)
  const [uploadMood, setUploadMood] = useState("happy")
  const { handleUploadSong, loading } = useSong()

  const handleUpload = async () => {
    if (!file) {
      toast.warn("Please select a file first")
      return
    }
    await handleUploadSong({ file, mood: uploadMood })
    setFile(null)
  }

  return (
    <div className="upload">
      <h3 className="upload__title">Upload Song</h3>

      <label className="upload__file-label">
        {file ? file.name : "Choose audio file..."}
        <input
          type="file"
          accept="audio/mp3,audio/mpeg"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>

      <select
        value={uploadMood}
        onChange={(e) => setUploadMood(e.target.value)}
      >
        {MOODS.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <button
        className="upload__btn"
        onClick={handleUpload}
        disabled={!file || loading}
      >
        {loading ? "Uploading..." : "Upload Song"}
      </button>
    </div>
  )
}

export default UploadSong
