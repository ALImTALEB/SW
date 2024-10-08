import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

mongoose.connect(process.env.DATABASE);

const app = express();

import invoicesRouter from "./routes/invoices.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.get("/api/test", async (req, res) => {
  res.json({ message: "hello from sw" });
});

app.use("/api/invoices", invoicesRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log("server is running on localhost: 3000");
});
