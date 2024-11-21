import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import mysql from "mysql2";
import mongoose from "mongoose";

const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Middleware
app.use(cors());
app.use(bodyParser.json());

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
//-----------------------------------------------------------------------------------------------

// MongoDB Connection
const mongoURI = 'mongodb+srv://Otwo:1234@se-project.qqqt0.mongodb.net/DatingApp?retryWrites=true&w=majority';

mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully to DatingApp!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define a Mongoose Schema and Model for the `Users` Collection
const userSchema =  mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Optional: Track user registration time
});
const profileSchema = new mongoose.Schema({
  userID: String,
  photo: [String],
  bio: String,
  education: String,
  job: String,
  genderinterest: String,
  gender: String,
  hobby: String,
  tag: [String],
  swipeDailyCount: Number,
  acceptDailyCount: Number,
  location: {
    latitude: Number,
    longitude: Number
  },
  isRegistered: Boolean,
  isHungry: Boolean
});

const User = mongoose.model('Users', userSchema); // Target the `Users` collection
const Profile = mongoose.model('Profile', profileSchema, 'Profiles');
// POST Route for User Registration

// register ------------------------------------------------------------------------------------
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate request data
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    // Create and save new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
});

// login ------------------------------------------------------------------------------------
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Compare the provided password with the stored password (no hashing)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // If credentials are correct
    res.status(200).json({ message: 'Login successful' , username: user.username});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


// fotget password ------------------------------------------------------------------------------------
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;

  // Validate input
  if (!email) {
    return res.status(400).json({ message: 'Email are required.' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Compare the provided email with the stored email
    if (user.email !== email) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // If credentials are correct
    res.status(200).json({ message: 'Can reset password' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


// set password ------------------------------------------------------------------------------------
app.put('/api/reset-password', async (req, res) => {
  const { email , password } = req.body;

  // Validate input
  if (!email) {
    return res.status(400).json({ message: 'Email are required.' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // set password
    user.password = password;
    await user.save();

    // If credentials are correct
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.get('/api/match-profile/:user', async (req, res) => {
  try {
    const userID = req.params.user;
    const profile = await Profile.findOne({userID});
    
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const tags = profile.tag;
    const matchedProfile = await Profile.find({ 
      tag: { $in: tags},
      userID: { $ne: userID}});

    res.json(matchedProfile || { message: "No matching user found" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// set gernder interest use by username from users = userid from profiles ------------------------------------------------------------------------------------
app.put('/api/set-gender/:username', async (req, res) => {
  const { username } = req.params; // Extract username from the URL
  const { gender } = req.body; // Extract gender from the request body

  try {
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(404).json({ message: `User with username '${username}' not found.` });
      }

      // Find the profile associated with the user
      const profile = await Profile.findOne({ userID: username }); // Assuming user._id is stored in the profile
      if (!profile) {
          return res.status(404).json({ message: `Profile for user '${username}' not found.` });
      }

      // Update the gender interest
      profile.genderinterest = gender;
      await profile.save();

      res.status(200).json({ message: 'Gender interest set successfully', gender });
  } catch (error) {
      console.error('Error updating gender interest:', error);
      res.status(500).json({ message: 'Internal server error.' });
  }
});
  
// set password ------------------------------------------------------------------------------------
app.put('/api/setting/reset-password', async (req, res) => {
  const { email ,newpassword ,password } = req.body;

  // Validate input
  if (!email) {
    return res.status(400).json({ message: 'Email are required.' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    // set password
    user.password = newpassword;
    await user.save();

    // If credentials are correct
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});



ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
// http://localhost:3000