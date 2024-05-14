import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(bodyParser.json());

// eslint-disable-next-line no-undef
const dbURI = process.env.VITE_DB_URI;
// eslint-disable-next-line no-undef
const googleAPI = process.env.GOOGLE_MAPS_API_KEY;

mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.get("/getAllRoutes", async (req, res) => {
  const { origin, destination } = req.query;
  try {
    const driving = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=driving&key=${googleAPI}`
    );
    const walking = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=walking&key=${googleAPI}`
    );
    const biking = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=bicycling&key=${googleAPI}`
    );

    res.json({
      driving: driving.data,
      walking: walking.data,
      biking: biking.data,
    });
  } catch (error) {
    console.error("Failed to fetch directions", error);
    res.status(500).send("Failed to fetch directions");
  }
});
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
