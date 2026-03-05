const songModel = require("../models/song.model")
const id3 = require("node-id3")
const storageService = require("../services/storage.service")

const uploadSong = async (req, res) => {
  const { mood } = req.body

  const songBuffer = req.file.buffer
  const tags = id3.read(songBuffer)

  const [songFile, posterFile] = await Promise.all([
    
    storageService.uploadFile({
      buffer: songBuffer,
      filename: tags.title + ".mp3",
      folder: "/moodify/songs",
    }),

    storageService.uploadFile({
      buffer: tags.image.imageBuffer,
      filename: tags.title + "jpeg",
      folder: "/moodify/posters",
    }),
  ])

  const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    posterUrl: posterFile.url,
    mood,
  })

  res.status(201).json({
    message: "Song uploaded successfully",
    song,
  })
}

const getSong = async (req, res) => {
  const {mood} = req.body

  const song = await songModel.findOne(mood)

  res.status(200).json({
    message: "song fetched successfully",
    song
  })
}

module.exports = {
  uploadSong,
  getSong
}
