import express from "express";
import cors from "cors";
import migrantRoutes from "./routes/migrant.routes.js";
import emergencyRoutes from "./routes/emergency.routes.js";
const app = express();

app.use(cors());
app.use(express.json()); // must be before routes

app.use("/api/migrants", migrantRoutes);
app.use("/api/emergency", emergencyRoutes);
app.get("/", (req, res) => {
  res.send("Migrant Connect API running");
});

export default app;
