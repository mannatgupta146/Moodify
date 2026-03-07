require("dotenv").config() // 👈 MUST be FIRST

const app = require("./src/app")
const connectToDb = require("./src/config/db")

connectToDb()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})
