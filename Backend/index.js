import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./Routes/AuthRoute.js";
import savingRoute from "./Routes/SavingRoute.js";
import cookieParser from "cookie-parser";

import axios from "axios";

dotenv.config({ path: "./.env" });

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());

// eslint-disable-next-line no-undef
const dbURI = process.env.VITE_DB_URI;

mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);
app.use("/", savingRoute);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
