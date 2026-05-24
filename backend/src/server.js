
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import app from "./app.js";
import connectDB from "./config/db.js";
import { seedDatabase } from "./utils/seed.js";
import { cleanupResolvedEmergencies } from "./utils/cleanupResolvedEmergencies.js";

dotenv.config();

// Connect DB + seed
const start = async () => {
  await connectDB();
  await seedDatabase();
};

start();

// Cleanup task
setInterval(() => {
  cleanupResolvedEmergencies();
}, 60 * 60 * 1000);

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct frontend dist path
const frontendPath = path.resolve(
  __dirname,
  "../../frontend/dist"
);

// Serve frontend
app.use(express.static(frontendPath));

// React Router support
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});

