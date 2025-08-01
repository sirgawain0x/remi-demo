const express = require("express");
const path = require("path");
const fs = require("fs");
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

// Debug route to list files
app.get("/debug", (req, res) => {
  const files = fs.readdirSync(__dirname);
  res.json({
    currentDir: __dirname,
    files: files,
    htmlExists: fs.existsSync(path.join(__dirname, "remi-demo.html")),
    testExists: fs.existsSync(path.join(__dirname, "test.html")),
    packageExists: fs.existsSync(path.join(__dirname, "package.json")),
  });
});

// Test route
app.get("/test", (req, res) => {
  const testPath = path.join(__dirname, "test.html");
  console.log(`Serving test from: ${testPath}`);

  if (!fs.existsSync(testPath)) {
    console.error(`Test file not found at: ${testPath}`);
    return res.status(404).json({ error: "Test file not found" });
  }

  res.sendFile(testPath);
});

// Serve the HTML file
app.get("/", (req, res) => {
  const htmlPath = path.join(__dirname, "remi-demo.html");
  console.log(`Serving HTML from: ${htmlPath}`);

  if (!fs.existsSync(htmlPath)) {
    console.error(`HTML file not found at: ${htmlPath}`);
    // Fallback to simple HTML response
    return res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Remi Demo</title>
        </head>
        <body>
          <h1>🚀 Remi Demo is running!</h1>
          <p>Server is working, but remi-demo.html was not found.</p>
          <p>Current directory: ${__dirname}</p>
          <p>Files available: ${fs.readdirSync(__dirname).join(", ")}</p>
          <p><a href="/test">Test Page</a> | <a href="/health">Health Check</a> | <a href="/debug">Debug Info</a></p>
        </body>
      </html>
    `);
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
    currentDir: __dirname,
    files: fs.readdirSync(__dirname),
  });
});

// Catch-all route for debugging
app.get("*", (req, res) => {
  console.log(`404 - Route not found: ${req.url}`);
  res.status(404).json({
    error: "Route not found",
    path: req.url,
    availableRoutes: ["/", "/api/key", "/health", "/test", "/debug"],
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
  console.log(`Current directory: ${__dirname}`);
  console.log(`Files in directory:`, fs.readdirSync(__dirname));

  if (!process.env.GEMINI_API_KEY) {
    console.warn("⚠️  GEMINI_API_KEY environment variable not set");
  } else {
    console.log("✅ GEMINI_API_KEY is configured");
  }
});
