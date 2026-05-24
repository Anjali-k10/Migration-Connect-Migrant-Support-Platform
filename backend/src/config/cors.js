const defaultOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "https://migration-connect-migrant-support-oqec.onrender.com"
];

export function getAllowedOrigins() {
  const fromEnv = process.env.CLIENT_URL;
  if (!fromEnv) return defaultOrigins;
  return [...new Set([...defaultOrigins, ...fromEnv.split(",").map((o) => o.trim())])];
}

export const corsOptions = {
  origin(origin, callback) {
    const allowed = getAllowedOrigins();
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked origin: ${origin}`));
    }
  },
  credentials: true
};
