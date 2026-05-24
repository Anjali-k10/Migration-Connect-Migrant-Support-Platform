import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import { seedDatabase } from "./utils/seed.js";
import { cleanupResolvedEmergencies } from "./utils/cleanupResolvedEmergencies.js";

dotenv.config();

const start = async () => {
  await connectDB();
  await seedDatabase();
};

start();
setInterval(() => {
  cleanupResolvedEmergencies();
}, 60 * 60 * 1000);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
