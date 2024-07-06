import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "../routes/user.route"

dotenv.config();

mongoose
  .connect(process.env.MONGO || "")
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB: " + error);
  });

const app: Express = express();
const port = 3000;

app.use("/api/user", userRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
