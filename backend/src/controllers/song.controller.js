const songModel = require("../models/song.model")
const id3 = require("node-id3")
const storageService = require("../services/storage.service")

const uploadSong = async (req, res) => {
  const { mood } = req.body

  const songBuffer = req.file.buffer

  const tags = id3.read(songBuffer)

  const posterBuffer = tags.image ? tags.image.imageBuffer : null

  const songFile = await storageService.uploadFile({
    buffer: songBuffer,
    filename: tags.title + ".mp3",
    folder: "/moodify/songs",
  })

  let posterUrl = ""

  if (posterBuffer) {
    const posterFile = await storageService.uploadFile({
      buffer: posterBuffer,
      filename: tags.title + ".jpeg",
      folder: "/moodify/posters",
    })

    posterUrl = posterFile.url
  }

  const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    posterUrl,
    mood,
  })

  res.status(201).json({
    message: "Song uploaded successfully",
    song,
  })
}

const getSong = async (req, res) => {
  const { mood } = req.query

  const songs = await songModel.find({ mood })

  res.status(200).json({
    message: "song fetched successfully",
    songs,
  })
}

const deleteSong = async (req, res) => {
  const { id } = req.params

  const song = await songModel.findByIdAndDelete(id)

  if (!song) {
    return res.status(404).json({ message: "Song not found" })
  }

  res.status(200).json({
    message: "Song deleted successfully",
  })
}

const updateSongMood = async (req, res) => {
  const { id } = req.params
  const { mood } = req.body

  const song = await songModel.findByIdAndUpdate(id, { mood }, { new: true })

  if (!song) {
    return res.status(404).json({ message: "Song not found" })
  }

  res.status(200).json({
    message: "Song mood updated",
    song,
  })
}

module.exports = {
  uploadSong,
  getSong,
  deleteSong,
  updateSongMood,
}
