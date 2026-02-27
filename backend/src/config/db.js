const mongoose = require("mongoose");
require("dotenv").config();

const connectToDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/moodify`);
    console.log("Connected to MongoDB ✅");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

module.exports = connectToDb;