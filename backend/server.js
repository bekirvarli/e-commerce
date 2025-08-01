  const express = require("express");
  const mongoose = require("mongoose");
  const dotenv =  require("dotenv");
  const app = express();
  const logger = require("morgan");
  const mainRoute = require("./routes/index.js")
  const port = 5000;

  dotenv.config();

  const connect = async() => 
  {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected to DB")
    } catch (error) {
      throw error;
    }
  }

  // middlewares (dönüşüm)
app.use(logger("dev"));
  app.use(express.json()); // gelen tüm verileri jsn formatına çevir

  app.use("/api", mainRoute);
  
  app.listen(5000,()=>{
    
    connect();
    console.log(`Sunucu ${port} portunda calisiyor`);

  })