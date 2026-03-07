const { Router } = require("express")
const upload = require("../middlewares/upload.middleware")
const songController = require("../controllers/song.controller")

const router = Router()

/**
 * @POST /api/songs/
 */
router.post("/", upload.single("song"), songController.uploadSong)

/**
 * @GET /api/songs
 */
router.get("/", songController.getSong)

/**
 * @DELETE /api/songs/:id
 */
router.delete("/:id", songController.deleteSong)

/**
 * @PATCH /api/songs/:id/mood
 */
router.patch("/:id/mood", songController.updateSongMood)

module.exports = router
