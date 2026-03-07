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

  if (result.faceBlendshapes.length === 0) {
    setEmotion("No face detected")
    return
  }

  const shapes = result.faceBlendshapes[0].categories
  const get = (name) => shapes.find((s) => s.categoryName === name)?.score || 0

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
  const mouthFrown = get("mouthFrownLeft") + get("mouthFrownRight")

  let mood = "Neutral 😐"

  // 🤩 EXCITED → smile + eyebrows raised (check BEFORE happy)
  if (smile > 0.25 && browUp > 0.1) {
    mood = "Excited 🤩"
  }

  // 😊 HAPPY → clear smile, no frown
  else if (smile > 0.1 && browDown < 0.2) {
    mood = "Happy 😊"
  }

  // 😲 SURPRISED → mouth wide open, no smile
  else if (smile > 0.5 && browUp > 0.2) {
    mood = "Surprised 😲"
  }

  // 😠 ANGRY → brows down hard
  else if (browDown > 0.45 && smile < 0.2) {
    mood = "Angry 😠"
  }

  // ☹️ SAD → frown or flat face with slight brow tension, no smile
  else if (
    smile < 0.1 &&
    mouthOpen < 0.15 &&
    (mouthFrown > 0.05 || browDown > 0.15)
  ) {
    mood = "Sad ☹️"
  }

  setEmotion(mood)

  const moodMap = {
    "Neutral 😐": "neutral",
    "Surprised 😲": "surprised",
    "Excited 🤩": "excited",
    "Happy 😊": "happy",
    "Angry 😠": "angry",
    "Sad ☹️": "sad",
  }

  return moodMap[mood]
}
