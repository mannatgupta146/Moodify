const songModel = require("../models/song.model")
const id3 = require('node-id3')

const uploadSong = async (req, res) => {
    const songBuffer = req.file.buffer
    const tags = id3.read(songBuffer)
}

module.exports = {
    uploadSong,

}