import express from "express";
import cors from "cors";
import migrantRoutes from "./routes/migrant.routes.js";
import emergencyRoutes from "./routes/emergency.routes.js";
import helpCenterRoutes from "./routes/helpCenter.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors());
app.use(express.json()); 
app.use(cookieParser());
app.use("/api/admin", adminRoutes);
app.use("/api/help-centers", helpCenterRoutes);
app.use("/api/migrants", migrantRoutes);
app.use("/api/emergency", emergencyRoutes);
app.get("/", (req, res) => {
  res.send("Migrant Connect API running");
});

export default app;
