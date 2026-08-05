const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for the Next.js frontend (adjust origin when connecting for real)
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "crate-lite-backend" });
});

app.listen(PORT, () => {
  console.log(`Crate Lite API listening on http://localhost:${PORT}`);
});
