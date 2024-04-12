const mongoose= require("mongoose");
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://akshatgtc:akshat@cluster0.hxbjqwv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{console.log("MongoDB Connected")});
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

module.exports= connectDB;