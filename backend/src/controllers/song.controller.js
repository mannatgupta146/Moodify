const songModel = require("../models/song.model")

const uploadSong = async (req, res) => {
    console.log(req.file)
}

module.exports = {
    uploadSong,

}