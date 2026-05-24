js id = "j7o5zg"
import dotenv from "dotenv";
import app from "./app.js";
import express from "express";
import connectDB from "./config/db.js";
import { cleanupResolvedEmergencies } from "./utils/cleanupResolvedEmergencies.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

connectDB();

setInterval(() => {
  cleanupResolvedEmergencies();
}, 60 * 60 * 1000);

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend static files
app.use(
  express.static(path.join(__dirname, "../frontend/dist"))
);

// React Router fix
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/dist/index.html")
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});

