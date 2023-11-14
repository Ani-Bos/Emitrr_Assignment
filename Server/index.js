import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import http from "http";
import bodyParser from "body-parser";
import filter from "./Middleware/Middleware.js";
import user from "./Routes/Auth.js";
import question from "./Routes/Question.js"
import score from "./Routes/Score.js"
import mongoose from "mongoose";
dotenv.config();
const PORT = process.env.PORT || 5000;
const dburl = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.jzadva4.mongodb.net/?retryWrites=true&w=majority`;
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((e) => {
    console.log("MongoDB connection error : " + e);
  });

app.use("/api/auth", user);
app.use("/api/question", question);
app.use("/api/score",score)
app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));