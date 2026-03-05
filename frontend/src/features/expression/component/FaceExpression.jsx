import React, { useRef, useEffect, useState } from "react"
import { detectEmotion, init } from "../utils/utils"

export default function FaceExpression({onClick = () => {}}) {
  const videoRef = useRef(null)
  const landmarkerRef = useRef(null)
  const streamRef = useRef(null)

  const [emotion, setEmotion] = useState("Loading camera...")

  // 🎥 start camera & load model once
  useEffect(() => {
    init({ videoRef, landmarkerRef, setEmotion, streamRef })
  }, [])

  const handleClick = async () => {
    const expression = detectEmotion({ videoRef, landmarkerRef, setEmotion })
    onClick(expression)
  }

  return (
    <div style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width="420"
        style={{ borderRadius: "12px" }}
      />

      <h2 style={{ marginTop: 15 }}>{emotion}</h2>

      <button onClick={handleClick}>Detect Expression</button>
    </div>
  )
}
