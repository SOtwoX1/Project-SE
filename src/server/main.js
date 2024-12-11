import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import mysql from "mysql2";
import mongoose from "mongoose";
import cron from "node-cron";
import { Card } from '@mui/material';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import adminRoutes from "./routes/adminRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { adminRoutesURL, matchRoutesURL, messageRoutesURL, profileRoutesURL, restaurantRoutesURL, userRoutesURL } from "../apiConfig.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Middleware to parse JSON bodies
app.use(express.json());

// jwt-----------------------------------------------------------------------------------------
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
}

app.get('/api/protected-route', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route.' });
});

// multer---------------------------------------------------------------------------------------
// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename
  },
});
const upload = multer({ storage });


//-----------------------------------------------------------------------------------------------
// Connect to MongoDB

// MongoDB Connection
const mongoURI = 'mongodb+srv://get:1234@se-project.qqqt0.mongodb.net/DatingApp?retryWrites=true&w=majority';

mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully to DatingApp!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use routes
app.use(adminRoutesURL.base, adminRoutes);
app.use(matchRoutesURL.base, matchRoutes);
app.use(messageRoutesURL.base, messageRoutes);
app.use(profileRoutesURL.base, profileRoutes);
app.use(restaurantRoutesURL.base, restaurantRoutes);
app.use(userRoutesURL.base, userRoutes);

// API endpoint to upload photos
app.post("/api/upload", upload.single("photo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Photo upload failed" });
  }
  res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
});

// Serve static files for uploaded images
app.use("/uploads", express.static(uploadDir));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);