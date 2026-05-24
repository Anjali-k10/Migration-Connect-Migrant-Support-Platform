import express from "express";
import cors from "cors";
import migrantRoutes from "./routes/migrant.routes.js";
import emergencyRoutes from "./routes/emergency.routes.js";
import helpCenterRoutes from "./routes/helpCenter.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import healthRoutes from "./routes/health.routes.js";
import { corsOptions } from "./config/cors.js";
import { serveClientIfEnabled } from "./middleware/serveClient.middleware.js";

import cookieParser from "cookie-parser";
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/health", healthRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/help-centers", helpCenterRoutes);
app.use("/api/migrants", migrantRoutes);
app.use("/api/emergency", emergencyRoutes);

app.get("/api", (req, res) => {
  res.json({
    message: "Migrant Connect API",
    endpoints: {
      health: "/api/health",
      migrants: "/api/migrants",
      helpCenters: "/api/help-centers",
      emergency: "/api/emergency",
      admin: "/api/admin"
    }
  });
});

serveClientIfEnabled(app);

app.get("/", (req, res) => {
  if (process.env.SERVE_CLIENT === "true") {
    return res.redirect("/");
  }
  res.send("Migrant Connect API running — use /api/health");
});

export default app;
