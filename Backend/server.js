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

app.post("/routes", async (req, res) => {
  const { origin, destination, travelMode } = req.body;
  console.log("server", origin, destination, travelMode);
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${origin}&destination=place_id:${destination}&mode=${travelMode}&key=${googleAPI}`
    );
    console.log("요청");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching directions:", error);
  }
});
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
