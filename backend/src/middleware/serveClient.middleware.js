import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function serveClientIfEnabled(app) {
  if (process.env.SERVE_CLIENT !== "true") return;

  const distPath = path.resolve(__dirname, "../../../frontend/dist");

  app.use(express.static(distPath));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(distPath, "index.html"), (err) => {
      if (err) next(err);
    });
  });
}
