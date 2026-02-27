import React, { useRef, useEffect, useState } from "react"
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision"

export default function FaceExpression() {
  const videoRef = useRef(null)
  const landmarkerRef = useRef(null)

  const [emotion, setEmotion] = useState("Loading camera...")

  // 🎥 start camera & load model once
  useEffect(() => {
    const init = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoRef.current.srcObject = stream

      await new Promise((resolve) => {
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
          resolve()
        }
      })

      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
      )

      landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        },
        runningMode: "VIDEO",
        outputFaceBlendshapes: true,
      })

      setEmotion("Ready 😊")
    }

    init()
  }, [])

  // 🧠 detect ONCE when button clicked
  const detectEmotion = () => {
    const video = videoRef.current
    const faceLandmarker = landmarkerRef.current

    if (!video || !faceLandmarker) return

    const result = faceLandmarker.detectForVideo(video, Date.now())

    if (result.faceBlendshapes.length === 0) {
      setEmotion("No face detected")
      return
    }

    const shapes = result.faceBlendshapes[0].categories
    const get = (name) =>
      shapes.find((s) => s.categoryName === name)?.score || 0

    const smile = get("mouthSmileLeft") + get("mouthSmileRight")
    const mouthOpen = get("jawOpen")
    const browInnerUp = get("browInnerUp")
    const browOuterUp = get("browOuterUpLeft") + get("browOuterUpRight")
    const eyeWide = get("eyeWideLeft") + get("eyeWideRight")
    const browUp =
      get("browOuterUpLeft") + get("browOuterUpRight") + get("browInnerUp")

    const oneBrowUp = Math.max(
      get("browOuterUpLeft"),
      get("browOuterUpRight"),
      get("browInnerUp"),
    )

    const browDown = get("browDownLeft") + get("browDownRight")

    let mood = "Neutral 😐"

    // 😲 SURPRISED → open mouth + any eyebrow raise
    if (mouthOpen > 0 && oneBrowUp > 0.18) {
      mood = "Surprised 😲"
    }

    // 🤩 EXCITED → smile + open mouth + slight brow lift
    else if (smile > 0.35 && mouthOpen > 0.4 && browUp > 0.25) {
      mood = "Excited 🤩"
    }

    // 😊 HAPPY → smile only
    else if (smile > 0.55 && browDown < 0.3) {
      mood = "Happy 😊"
    }

    // 😠 ANGRY → brows down & squeezed
    else if (browDown > 0.55 && smile < 0.25) {
      mood = "Angry 😠"
    }

    // 😔 SAD → inner brows raised + no smile
    else if (get("browInnerUp") > 0.3 && smile < 0.2 && mouthOpen < 0.25) {
      mood = "Sad 😔"
    }

    setEmotion(mood)
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

      <button onClick={detectEmotion}>Detect Expression</button>
    </div>
  )
}
