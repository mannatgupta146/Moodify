import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision"

export const init = async ({ videoRef, landmarkerRef, setEmotion, streamRef }) => {
  streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true })
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

  if (
  video.readyState !== 4 ||
  video.videoWidth === 0
) {
  setEmotion("Camera not ready");
  return;
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
