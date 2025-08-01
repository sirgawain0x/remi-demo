const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for deployment
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files
app.use(express.static("."));

// Test route
app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "test.html"));
});

// Serve the HTML file
app.get("/", (req, res) => {
  const htmlPath = path.join(__dirname, "remi-demo.html");
  console.log(`Serving HTML from: ${htmlPath}`);

  // Check if file exists
  const fs = require("fs");
  if (!fs.existsSync(htmlPath)) {
    console.error(`HTML file not found at: ${htmlPath}`);
    return res.status(404).json({ error: "HTML file not found" });
  }

  res.sendFile(htmlPath);
});

// Secure endpoint to get API key (you could add authentication here)
app.get("/api/key", (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY environment variable not set");
    return res.status(500).json({ error: "API key not configured" });
  }
  res.json({ apiKey });
});

// Health check endpoint for deployment platforms
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    port: PORT,
  });
});

// Catch-all route for debugging
app.get("*", (req, res) => {
  console.log(`404 - Route not found: ${req.url}`);
  res.status(404).json({
    error: "Route not found",
    path: req.url,
    availableRoutes: ["/", "/api/key", "/health"],
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Server URL: http://localhost:${PORT}`);

  if (!process.env.GEMINI_API_KEY) {
    console.warn("⚠️  GEMINI_API_KEY environment variable not set");
  } else {
    console.log("✅ GEMINI_API_KEY is configured");
  }
});
