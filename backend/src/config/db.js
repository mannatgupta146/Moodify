const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/moodify`);
    console.log("Connected to MongoDB ✅");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

module.exports = connectToDb;