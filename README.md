# 🎵 Moodify

> _Music that understands your mood._

🔗 **Live Demo:** [https://moodify-tau-one.vercel.app](https://moodify-tau-one.vercel.app)

Moodify detects your facial expression in real-time using your webcam and plays music that matches how you feel — happy, sad, angry, surprised, or neutral.

---

## ✨ Features

- **Real-time face expression detection** using MediaPipe Face Landmarker
- **Mood-based playlists** — songs are tagged and filtered by mood
- **Upload songs** with mood tags (MP3 with ID3 metadata support)
- **User authentication** with JWT + Redis token blacklisting
- **Cloud storage** for songs and poster images via ImageKit

---

## 🛠 Tech Stack

| Layer    | Tech                                                      |
| -------- | --------------------------------------------------------- |
| Frontend | React 19, Vite, React Router, SCSS, Axios, React Toastify |
| Backend  | Express 5, Mongoose, JWT, bcryptjs, Multer, cookie-parser |
| AI/ML    | MediaPipe Tasks Vision (Face Landmarker — browser-side)   |
| Database | MongoDB                                                   |
| Cache    | Redis (ioredis)                                           |
| Storage  | ImageKit                                                  |

---

## 📁 Project Structure

```
Moodify/
├── backend/
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── config/         # DB & Redis config
│       ├── controllers/    # Auth & Song controllers
│       ├── middlewares/     # Auth & Upload middlewares
│       ├── models/         # Mongoose models
│       ├── routes/         # API routes
│       └── services/       # ImageKit storage service
├── frontend/
│   └── src/
│       ├── App.jsx
│       ├── features/
│       │   ├── auth/       # Login, Register, Auth context
│       │   ├── expression/ # Face detection component & utils
│       │   └── home/       # Player, Playlist, Upload, Song context
│       └── shared/         # Global styles
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- MongoDB
- Redis

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
MONGO_URI=your_mongodb_uri
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

---

## 🎭 Supported Moods

| Mood      | Emoji | Detection                               |
| --------- | ----- | --------------------------------------- |
| Happy     | 😊    | Smiling                                 |
| Sad       | ☹️    | Frowning, no smile, mouth closed        |
| Angry     | 😠    | Brows down, no smile                    |
| Surprised | 😲    | Mouth open, eyes wide                   |
| Neutral   | 😐    | Default — no strong expression detected |

---

## 📡 API Endpoints

### Auth

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | `/api/auth/register` | Register a new user      |
| POST   | `/api/auth/login`    | Login & get JWT          |
| POST   | `/api/auth/logout`   | Logout & blacklist token |

### Songs

| Method | Endpoint                | Description             |
| ------ | ----------------------- | ----------------------- |
| POST   | `/api/songs/upload`     | Upload a song with mood |
| GET    | `/api/songs?mood=happy` | Get songs by mood       |
| DELETE | `/api/songs/:id`        | Delete a song           |
| PATCH  | `/api/songs/:id`        | Update a song's mood    |

---

## 🔐 Authentication Flow

1. User registers/logs in → server returns a **JWT** stored in an HTTP-only cookie
2. Every protected request is verified via the **auth middleware**
3. On logout, the token is **blacklisted in Redis** so it can't be reused

---

## 🧠 How Mood Detection Works

1. Webcam feed is captured via `getUserMedia`
2. **MediaPipe Face Landmarker** extracts 52+ facial blendshape scores in real-time
3. Key scores are evaluated:
   - `mouthSmileLeft/Right` → Happy
   - `jawOpen` + `eyeWideLeft/Right` → Surprised
   - `browDownLeft/Right` → Angry
   - `mouthFrownLeft/Right` + `browInnerUp` → Sad
4. The detected mood is used to fetch matching songs from the database

---

## 🎧 How It Works (User Flow)

```
Register/Login → Open Camera → Click "Detect Expression"
      ↓                              ↓
  JWT stored            MediaPipe analyzes face
  in cookie                        ↓
                        Mood detected (e.g. Happy 😊)
                                   ↓
                        Songs fetched for that mood
                                   ↓
                        Playlist loads → Play music 🎶
```

---

## 🤝 Contributing

1. Fork the repo
2. Create your branch (`git checkout -b feature/awesome`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome`)
5. Open a Pull Request

---

<p align="center">Made with ❤️ and a webcam</p>
