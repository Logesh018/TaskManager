const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoute");
const taskRoutes = require("./routes/taskRoutes");


const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Middleware to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL ? [process.env.CLIENT_URL] : ["http://your-frontend-url.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);


// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start Server
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));