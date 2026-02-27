import React, { useRef, useEffect, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);

  const [emotion, setEmotion] = useState("Loading camera...");

  // 🎥 start camera & load model once
  useEffect(() => {
    const init = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;

      await new Promise((resolve) => {
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          resolve();
        };
      });

      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        },
        runningMode: "VIDEO",
        outputFaceBlendshapes: true,
      });

      setEmotion("Ready 😊");
    };

    init();
  }, []);

  // 🧠 detect ONCE when button clicked
  const detectEmotion = () => {
    const video = videoRef.current;
    const faceLandmarker = landmarkerRef.current;

    if (!video || !faceLandmarker) return;

    const result = faceLandmarker.detectForVideo(video, Date.now());

    if (result.faceBlendshapes.length === 0) {
      setEmotion("No face detected");
      return;
    }

    const shapes = result.faceBlendshapes[0].categories;
    const get = (name) =>
      shapes.find((s) => s.categoryName === name)?.score || 0;

    const smile = get("mouthSmileLeft") + get("mouthSmileRight");
    const mouthOpen = get("jawOpen");
    const browDown = get("browDownLeft") + get("browDownRight");
    const browInnerUp = get("browInnerUp");
    const browOuterUp = get("browOuterUpLeft") + get("browOuterUpRight");
    const eyeWide = get("eyeWideLeft") + get("eyeWideRight");

    let mood = "Neutral 😐";

    if (browOuterUp > 0.6 && eyeWide > 0.5 && mouthOpen > 0.5)
      mood = "Surprised 😲";
    else if (smile > 0.5 && mouthOpen > 0.6 && browOuterUp > 0.3)
      mood = "Excited 🤩";
    else if (smile > 0.7 && browDown < 0.3)
      mood = "Happy 😊";
    else if (browDown > 0.7 && smile < 0.3)
      mood = "Angry 😠";
    else if (browInnerUp > 0.5 && smile < 0.2)
      mood = "Sad 😔";

    setEmotion(mood);
  };

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

      <button onClick={detectEmotion}>
        Detect Expression
      </button>
    </div>
  );
}