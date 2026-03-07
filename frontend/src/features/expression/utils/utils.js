import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision"

export const init = async ({
  videoRef,
  landmarkerRef,
  setEmotion,
  streamRef,
}) => {
  streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true })
  if (!videoRef.current) return
  videoRef.current.srcObject = streamRef.current

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

export const detectEmotion = ({ videoRef, landmarkerRef, setEmotion }) => {
  const video = videoRef.current
  const faceLandmarker = landmarkerRef.current

  if (!video || !faceLandmarker) return

  if (video.readyState !== 4 || video.videoWidth === 0) {
    setEmotion("Camera not ready")
    return
  }

  const result = faceLandmarker.detectForVideo(video, Date.now())

  if (!result.faceBlendshapes || result.faceBlendshapes.length === 0) {
    setEmotion("No face detected")
    return
  }

  const shapes = result.faceBlendshapes[0].categories
  const get = (name) => shapes.find((s) => s.categoryName === name)?.score || 0

  const smile = get("mouthSmileLeft") + get("mouthSmileRight")
  const mouthOpen = get("jawOpen")
  const browInnerUp = get("browInnerUp")
  const browUp = get("browOuterUpLeft") + get("browOuterUpRight")
  const browDown = get("browDownLeft") + get("browDownRight")
  const mouthFrown = get("mouthFrownLeft") + get("mouthFrownRight")
  const eyeWide = get("eyeWideLeft") + get("eyeWideRight")

  let mood = "Neutral 😐"

  // 😲 SURPRISED (wide open mouth + eyes, not angry)
  if (mouthOpen > 0.1 && eyeWide > 0.1 && browDown < 0.2) {
    mood = "Surprised 😲"
  }

  // 😠 ANGRY
  else if (browDown > 0.4 && smile < 0.2) {
    mood = "Angry 😠"
  }

  // 😊 HAPPY (clear smile)
  else if (smile > 0.35) {
    mood = "Happy 😊"
  }

  // ☹️ SAD (frown or inner brow raise, mouth NOT wide open)
  else if (
    mouthOpen < 0.15 &&
    ((mouthFrown > 0.05 && smile < 0.2) || (browInnerUp > 0.1 && smile < 0.15))
  ) {
    mood = "Sad ☹️"
  }

  setEmotion(mood)

  const moodMap = {
    "Neutral 😐": "neutral",
    "Surprised 😲": "surprised",
    "Happy 😊": "happy",
    "Angry 😠": "angry",
    "Sad ☹️": "sad",
  }

  return moodMap[mood]
}
