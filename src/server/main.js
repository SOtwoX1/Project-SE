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

const app = express();

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

// MongoDB Connection
const mongoURI = 'mongodb+srv://get:1234@se-project.qqqt0.mongodb.net/DatingApp?retryWrites=true&w=majority';

mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully to DatingApp!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define a Mongoose Schema and Model for the Collections
const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Optional: Track user registration time
});
const profileSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  name: { type: String },
  address: String,
  dob: String,
  photo: [String],
  bio: String,
  education: String,
  job: String,
  genderinterest: String,
  gender: String,
  hobby: String,
  tags: [String],
  isPremium : { type: Boolean, default: false },
  swipeDailyCount: { type: Number, default: 0 }, // counter to track daily swipe limit for free users
  acceptDailyCount: { type: Number, default: 0 },
  location: {
    latitude: Number,
    longitude: Number
  },
  //Users can set their status as free or not free for matching. If set to free, they can be automatically matched with other available users.
  isFree: { type: Boolean, default: false },
  isPremium: { type: Boolean, default: false },
});
const cardpaymentSchema = new mongoose.Schema({
  userID: String,
  CardID: { type: String, AutoIncrement: true },
  holderName: String,
  cardNumber: String,
  MMYY: Date,
  cvv: String
});
const matchSchema = new mongoose.Schema({
  matchID: { type: String, AutoIncrement: true },
  userID1: { type: String, required: true },
  userID2: { type: String, required: true },
  isMatch: { type: Boolean, default: false },
  restaurantID: { type: String },
  matchTime: { type: Date, default: Date.now },
  createdAt: { type: Date } // Add expiration time same as chat
});
matchSchema.index({ createdAt: 1 }, { expireAfterSeconds: 180 }); // Add expiration time 3 days
const chatSchema = new mongoose.Schema({
  chatID: { type: String, AutoIncrement: true },
  matchID: { type: String, required: true },
  all_messageIDs: [String],
  createdAt: { type: Date, default: Date.now }
});
chatSchema.index({ createdAt: 1 }, { expireAfterSeconds: 180 }); // Add expiration time 3 days
const messageSchema = new mongoose.Schema({
  chatID: { type: String, required: true },
  messageID: { type: String, required: false },
  userID_sender: { type: String, required: true },
  text: String,
  time_send: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date } // Add expiration time same as chat
});
messageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 180 }); // Add expiration time 3 days

const restaurantSchema = new mongoose.Schema({
  restaurantID: { type: String, AutoIncrement: true },
  name: { type: String, required: true },
  tags: [String],
  location: {
    latitude: Number,
    longitude: Number
  },
  photo: [String],
  description: { type: String },
  hasPromo: { type: Boolean, default: false }
});

const chillingSchema = new mongoose.Schema({
  chillingID: { type: String, AutoIncrement: true },
  userID: { type: String, required: true },
  restaurantID: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
chillingSchema.index({ createdAt: 1 }, { expireAfterSeconds: 10800 }); // Add expiration time 3 hours.
const promotionSchema = new mongoose.Schema({
  promoID: { type: String, AutoIncrement: true },
  restaurantID: { type: String, required: true },
  discountEnd: { type: Date, default: Date.now },
  description: { type: String }
});
promotionSchema.index({ discountEnd: 1 }, { expireAfterSeconds: 10800 }); // Add expiration time 3 hours.
// Before saving the document to the collection, generate a new string ID in the format 'M001', 'MSG003'
matchSchema.pre('save', async function (next) {
  // Only generate a new matchID if it's a new document
  if (this.isNew) {
    try {
      // Find the last match by matchID (sorted in descending order)
      const lastMatch = await this.constructor.findOne().sort({ matchID: -1 });
      let newIDNumber;
      if (lastMatch && lastMatch.matchID) {
        // Extract the numeric part of the matchID, increment it, and format it
        const lastIDNumber = parseInt(lastMatch.matchID.slice(1), 10); // remove 'M' prefix
        newIDNumber = lastIDNumber + 1;
      } else {
        // Start at 1 if there are no previous matches
        newIDNumber = 1;
      }
      // Set the new matchID with 'm' prefix and zero-padding to 3 digits
      this.matchID = `M${newIDNumber.toString().padStart(3, '0')}`;
    } catch (err) {
      return next(err);
    }
  }
  next();
});
chatSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const lastChat = await this.constructor.findOne().sort({ chatID: -1 });
      let newIDNumber;
      if (lastChat && lastChat.chatID) {
        const lastIDNumber = parseInt(lastChat.chatID.slice(1), 10); // remove 'C' prefix
        newIDNumber = lastIDNumber + 1;
      } else {
        newIDNumber = 1;
      }
      this.chatID = `C${newIDNumber.toString().padStart(3, '0')}`;
    } catch (err) {
      return next(err);
    }
  }
  next();
});
messageSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const lastChat = await this.constructor.findOne().sort({ messageID: -1 });
      let newIDNumber;
      if (lastChat && lastChat.messageID) {
        const lastIDNumber = parseInt(lastChat.messageID.slice(3), 10); // remove 'MSG' prefix
        newIDNumber = lastIDNumber + 1;
      } else {
        newIDNumber = 1;
      }
      this.messageID = `MSG${newIDNumber.toString().padStart(3, '0')}`;
    } catch (err) {
      return next(err);
    }
  }
  next();
});
chillingSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const lastChilling = await this.constructor.findOne().sort({ chillingID: -1 });

      let newIDNumber;
      if (lastChilling && lastChilling.chillingID) {
        const lastIDNumber = parseInt(lastChilling.chillingID.slice(3), 10); // remove 'CHL' prefix
        newIDNumber = lastIDNumber + 1;
      } else {
        newIDNumber = 1;
      }
      this.chillingID = `CHL${newIDNumber.toString().padStart(3, '0')}`;
    } catch (err) {
      return next(err);
    }
  }
  next();
});
promotionSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const lastPromotion = await this.constructor.findOne().sort({ promoID: -1 });
      let newIDNumber;
      if (lastPromotion && lastPromotion.promoID) {
        const lastIDNumber = parseInt(lastPromotion.promoID.slice(1), 10); // remove 'P' prefix
        newIDNumber = lastIDNumber + 1;
      } else {
        newIDNumber = 1;
      }
      this.promoID = `P${newIDNumber.toString().padStart(3, '0')}`;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

// Target the collections
const CardPayment = mongoose.model('CardPayment', cardpaymentSchema);
const User = mongoose.model('Users', userSchema);
const Profile = mongoose.model('Profile', profileSchema);
const Match = mongoose.model('Matches', matchSchema);
const Chat = mongoose.model('Chats', chatSchema);
const Message = mongoose.model('Messages', messageSchema);
const Restaurant = mongoose.model('Restaurants', restaurantSchema);
const Chilling = mongoose.model('Chilling', chillingSchema);
const Promotion = mongoose.model('Promotions', promotionSchema);

// A cron job allows you to execute something on a schedule or a task to be executed sometime in the future.
cron.schedule("0 0 * * *", async () => {
  try {
    // set acceptDailyCount, and swipeDailyCount in Profile as 0 every midnight
    const result = await Profile.updateMany({}, { $set: { acceptDailyCount: 0, swipeDailyCount: 0 } })
  } catch (error) {
    console.error('Error resetting count: ', error);
  }
});

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
    res.status(200).json({ message: 'Login successful', username: user.username });
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
  const { email, password } = req.body;

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
// get profile user ------------------------------------------------------------------------------------
app.get('/api/get-profile/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;
    if (!userID) {
      return res.status(400).json({ message: 'Missing userID' });
    }
    const profile = await Profile.findOne({ userID });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    // calculate age
    const currentDate = new Date();
    const dob = new Date(profile.dob);
    let age = currentDate.getUTCFullYear() - dob.getUTCFullYear();
    const monthDifference = currentDate.getMonth() - dob.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < dob.getDate())) {
      age--;
    }
    // add age to profile but not save to database
    const profileDict = profile.toObject();
    profileDict.age = age;
    res.status(200).json(profileDict);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
// get other profile that match the user interest the same style ------------------------------------------------------------------------------------
app.get('/api/match-profile/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;
    if (!userID) {
      return res.status(400).json({ message: 'Missing userID' });
    }
    const profile = await Profile.findOne({ userID });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    const tags = profile.tags;
    const alreadyInMatch = (await Match.find({ userID2: userID }).distinct('userID1')).concat((await Match.find({ userID1: userID }).distinct('userID2')));
    const matchedProfile = await Profile.find(
      {
        tags: { $in: tags },
        userID: { $nin: alreadyInMatch.concat(userID) }
      }
    );
    // calculate age and add to each profile
    const matchedProfilesWithAge = matchedProfile.map(profile => {
      const currentDate = new Date();
      const dob = new Date(profile.dob);
      let age = currentDate.getUTCFullYear() - dob.getUTCFullYear();
      const monthDifference = currentDate.getMonth() - dob.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < dob.getDate())) {
        age--;
      }
      return { ...profile.toObject(), age };
    });
    res.status(200).json(matchedProfilesWithAge || { message: "No matching user found" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
// send request match to other user ------------------------------------------------------------------------------------
app.post('/api/like-profile/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;
    const { otherUserID } = req.query;
    if (!userID || !otherUserID) {
      return res.status(400).json({ message: 'Missing userID/otherUserID' });
    }
    const isOtherUserFree = await Profile.findOne({ userID: otherUserID }).distinct('isFree');
    const match = new Match({
      userID1: userID,
      userID2: otherUserID,
      isMatch: isOtherUserFree == 'true' ? true : false,
      createdAt: isOtherUserFree == 'true' ? Date.now() : null
    });
    await match.save();
    // if free automatically create chat
    if (isOtherUserFree == 'true') {
      const chat = new Chat({
        matchID: match.matchID,
        all_messageIDs: [],
        createdAt: match.createdAt
      });
      await chat.save();
      return res.status(201).json({ message: 'Matched and Created chat' });
    }
    res.status(201).json({ message: 'Request Matched' });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
// update swipe daily count ------------------------------------------------------------------------------------
app.put('/api/update-swipe-profile/:userID', async (req, res) => {
  try {
    const userID = req.params.userID
    if (!userID) {
      return res.status(400).json({ message: 'Missing userID' });
    }
    const profile = await Profile.findOne({ userID });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    // update swipeDailyCount
    profile.swipeDailyCount += 1;
    await profile.save();
    res.status(200).json({ message: 'Update swipe daily count success' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
// get all match request from other user ------------------------------------------------------------------------------------
app.get('/api/matches-request/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;
    if (!userID) {
      return res.status(400).json({ message: 'Missing userID' });
    }
    const matchRequests = await Match.aggregate([
      {
        $match: {
          userID2: userID,
          isMatch: false
        }
      },
      {
        // join with profiles collection
        $lookup: {
          from: 'profiles',
          localField: 'userID1',
          foreignField: 'userID',
          as: 'profile'
        }
      },
      {
        $unwind: '$profile'
      },
      {
        // join with restaurants collection
        $lookup: {
          from: 'restaurants',
          localField: 'restaurantID',
          foreignField: 'restaurantID',
          as: 'restaurant'
        }
      },
      {
        $unwind: {
          path: '$restaurant',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        // project the fields to return
        $project: {
          matchID: 1,
          userID: '$profile.userID',
          photo: '$profile.photo',
          tags: '$profile.tags',
          restaurantName: { $ifNull: ['$restaurant.name', null] },
          restaurantID: { $ifNull: ['$restaurant.restaurantID', null] }
        }
      }
    ]);
    res.status(200).json(matchRequests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
// accept match request from other user change isMatch to true and create chat ------------------------------------------------------------------------------------
app.put('/api/accept-match/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;
    const { matchID } = req.query;
    if (!userID || !matchID) {
      return res.status(400).json({ message: 'Missing userID/matchID' });
    }
    const match = await Match.findOne({ matchID });
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    // update isMatch to true
    match.isMatch = true;
    match.createdAt = Date.now();
    await match.save();
    const profile = await Profile.findOne({ userID });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    // check if user has enough accept daily count
    if (!profile.isPremium && profile.acceptDailyCount >= 1) {
      return res.status(200).json({ message: 'Not enough accept daily count' });
    }
    // update acceptDailyCount
    profile.acceptDailyCount += 1;
    await profile.save();
    // create chat
    const chat = new Chat({
      matchID: match.matchID,
      all_messageIDs: [],
      createdAt: match.createdAt
    });
    await chat.save();
    res.status(200).json({ message: 'Match accepted' });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
// get all chat room that user is in ------------------------------------------------------------------------------------
app.get('/api/get-all-chat/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    if (!userID) {
      return res.status(400).json({ message: 'Missing userID' });
    }
    const matchRooms = await Match.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [
                { userID1: userID },
                { userID2: userID }
              ]
            },
            { isMatch: true }
          ]
        }
      },
      {
        // join with chat collection to get user's chat rooms
        $lookup: {
          from: 'profiles',
          let: { userID1: '$userID1', userID2: '$userID2' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    { $eq: ['$userID', '$$userID1'] },
                    { $eq: ['$userID', '$$userID2'] }
                  ]
                }
              }
            },
            {
              $project: {
                userID: 1,
                photo: 1
              }
            }
          ],
          as: 'profiles'
        }
      },
      {
        // filter out the user's own profile
        $addFields: {
          otherUserProfile: {
            $filter: {
              input: '$profiles',
              as: 'profile',
              cond: { $ne: ['$$profile.userID', userID] }
            }
          }
        }
      },
      {
        $unwind: '$otherUserProfile'
      },
      {
        // project the fields to return
        $project: {
          _id: 1,
          matchID: 1,
          userID: '$otherUserProfile.userID',
          lastContent: 1,
          photo: "$otherUserProfile.photo"
        }
      }
    ]);
    if (!matchRooms) {
      res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(matchRooms);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// get chat history from chat room ------------------------------------------------------------------------------------
app.get('/api/get-chat/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const { matchID } = req.query;

    if (!userID) {
      return res.status(400).json({ message: 'Missing userID' });
    }
    if (!matchID) {
      return res.status(400).json({ message: 'Missing matchID' });
    }

    const chatRoom = await Chat.findOne({ matchID });
    if (!chatRoom) {
      res.status(404).json({ message: 'Not found chat' });
    }

    const chatHistory = await Message.find({
      messageID: { $in: chatRoom.all_messageIDs }
    }).sort({ messageID: -1 }); // to start from the latest message
    if (!chatHistory) {
      res.status(404).json({ message: 'Not found message' });
    }
    res.status(200).json(chatHistory);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// send message to chat room ------------------------------------------------------------------------------------
app.post('/api/send-message/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const { matchID, text } = req.query;

    if (!userID || !matchID || !text) {
      return res.status(400).json({ message: 'Missing userID/matchID/text' });
    }

    const chatRoom = await Chat.findOne({ matchID });
    if (!chatRoom) {
      res.status(404).json({ message: 'Not found' });
    }

    const newMessage = new Message({
      chatID: chatRoom.chatID,
      userID_sender: userID,
      text,
      createdAt: new Date(),
    });
    await newMessage.save();

    chatRoom.all_messageIDs.push(newMessage.messageID);
    await chatRoom.save();

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// change status to free or not free for matching ------------------------------------------------------------------------------------
app.put('/api/change-status/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const { isFree } = req.query;
    if (!userID || !isFree) {
      return res.status(400).json({ message: 'Missing userID or isFree' });
    }
    const profile = await Profile.findOne({ userID });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    // Update the profile status
    profile.isFree = isFree;
    await profile.save();
    res.status(200).json({ message: 'isFree set successfully', isFree });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
// get all restaurant ------------------------------------------------------------------------------------
app.get('/api/get-all-restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
// get restaurant by id with promotion detail ------------------------------------------------------------------------------------
app.get('/api/get-restaurant/:restaurantID', async (req, res) => {
  try {
    const { restaurantID } = req.params;
    if (!restaurantID) {
      return res.status(400).json({ message: 'Missing restaurantID' });
    }
    const restaurant = await Restaurant.findOne({ restaurantID });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    // check if restaurant has promotion
    if (!restaurant.hasPromo) {
      // no promotion
      res.status(200).json({ restaurant, promotion: false });
    }
    else {
      // get promotion detail
      const promotion = await Promotion.find({ restaurantID });
      res.status(200).json({ restaurant, promotion });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
// get all chilling at restaurant ------------------------------------------------------------------------------------
app.get('/api/get-chilling/:restaurantID', async (req, res) => {
  try {
    const { restaurantID } = req.params;
    if (!restaurantID) {
      return res.status(400).json({ message: 'Missing restaurantID' });
    }
    const chillings = await Chilling.aggregate([
      { $match: { restaurantID } },
      {
        // join with profiles collection
        $lookup: {
          from: 'profiles',
          localField: 'userID',
          foreignField: 'userID',
          as: 'profile'
        }
      },
      { $unwind: '$profile' },
      {
        // project the fields to return
        $project: {
          chillingID: 1,
          userID: 1,
          restaurantID: 1,
          createdAt: 1,
          userID: '$profile.userID',
          photo: '$profile.photo',
          tags: '$profile.tags'
        }
      }
    ]);
    res.status(200).json(chillings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
// create chilling at restaurant ------------------------------------------------------------------------------------
app.post('/api/chilling-at/:restaurantID', async (req, res) => {
  try {
    const { restaurantID } = req.params;
    const { userID } = req.query;
    if (!restaurantID || !userID) {
      return res.status(400).json({ message: 'Missing restaurantID or userID' });
    }
    // Check if the user has a chilling at another restaurant
    const existingChilling = await Chilling.findOne({ userID });
    if (existingChilling) {
      await Chilling.deleteOne({ userID });
    }
    // Create a new chilling at the specified restaurant
    const newChilling = new Chilling({
      userID,
      restaurantID
    });
    await newChilling.save();
    res.status(201).json({ message: 'Chilling created successfully' });
  } catch (error) {
    console.error('Error creating chilling:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});
// request match(chilling) with other user ------------------------------------------------------------------------------------
app.post('/api/chilling-with-you/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const { otherUserID, restaurantID } = req.query;
    if (!userID || !otherUserID) {
      return res.status(400).json({ message: 'Missing userID or otherUserID' });
    }
    if (userID === otherUserID) {
      return res.status(200).json({ message: "you can't chilling with youself" });
    }
    // Check if the user already has a match with the other user
    const existingMatch = await Match.findOne({
      $or: [
        { userID1: userID, userID2: otherUserID },
        { userID1: otherUserID, userID2: userID }
      ]
    });
    if (existingMatch) {
      // Match already exists
      return res.status(200).json({ message: 'Match already exists' });
    }
    // Create a new match request
    const match = new Match({
      userID1: userID,
      userID2: otherUserID,
      restaurantID: restaurantID
    });
    await match.save();
    res.status(201).json({ message: `${userID} want to chilling with ${otherUserID}` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
// denied match request ------------------------------------------------------------------------------------
app.delete('/api/denied-match/:matchID', async (req, res) => {
  try {
    const { matchID } = req.params;
    if (!matchID) {
      return res.status(400).json({ message: 'Missing matchID' });
    }
    const match = await Match.findOne({ matchID });
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    // Delete the match
    await Match.deleteOne({ matchID });
    res.status(200).json({ message: 'Match denied and deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
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
  const { email, newpassword, password } = req.body;

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

// create cardpayment ------------------------------------------------------------------------------------
app.post('/api/create-cardpayment', async (req, res) => {
  const { username, cardNumber, cardHolderName, expirationDate, cvv } = req.body;

  try {
    // Check userid in profile
    const profile = await Profile.findOne({ userID: username });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    // if userid already exist in cardpayment update it
    const existingCardPayment = await CardPayment.findOne({ userID: username });
    if (existingCardPayment) {
      existingCardPayment.CardID = profile._id;
      existingCardPayment.cardNumber = cardNumber;
      existingCardPayment.holderName = cardHolderName;
      existingCardPayment.YYMM = expirationDate;
      existingCardPayment.CVV = cvv;
      await existingCardPayment.save();
      return res.status(200).json({ message: 'Card payment updated successfully' });
    }

    const cardPayment = new CardPayment({
      userID: username,
      CardID: profile._id,
      cardNumber,
      holderName: cardHolderName,
      YYMM: expirationDate,
      CVV: cvv
    });

    await cardPayment.save();

    res.status(201).json({ message: 'Card payment created successfully' });
  } catch (error) {
    console.error('Error creating card payment:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// delete all account ------------------------------------------------------------------------------------
app.delete('/api/delete-account', async (req, res) => {
  const { username } = req.body;

  try {
    // Check userid in user then go to profile
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const profile = await Profile.findOne({ userID: username });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    // delete all account
    await User.deleteOne({ username });
    await Profile.deleteOne({ userID: username });
    await CardPayment.deleteOne({ userID: username });

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }

});


// Register profile endpoint -----------------------------------------------------------------
app.post('/api/register/profile', async (req, res) => {
  const { username, name, dob, gender, interestgender, address, tags } = req.body;

  // Validate request data
  if (!username || !name || !dob || !gender || !interestgender || !address || !Array.isArray(tags) || tags.length === 0) {
    return res.status(400).json({ message: 'All fields are required, and tags must be a non-empty array.' });
  }

  try {
    // Check if the user already exists in the profile collection
    const existingProfile = await Profile.findOne({ userID: username });
    if (existingProfile) {
      return res.status(400).json({ message: 'User already has a profile.' });
    }

    // Create and save the new profile
    const newProfile = new Profile({
      userID: username,
      name,
      dob,
      gender,
      genderinterest: interestgender,
      address,
      tags
    });
    await newProfile.save();

    return res.status(201).json({ message: 'Profile registered successfully!' });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
});
//---------------------------------------------------------------------------------------------------
// API endpoint to upload photos
app.post("/api/upload", upload.single("photo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Photo upload failed" });
  }
  res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
});

// API endpoint to update user photos
app.put("/api/set-photo", async (req, res) => {
  const { username, photo } = req.body;

  if (!username || !photo || photo.length < 2) {
    return res.status(400).json({ message: "Username and at least 2 photos are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // check profile exist
    const profile = await Profile.findOne({ userID: username });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    // update profile value photo
    profile.photo = photo;
    await profile.save();

    res.status(200).json({ message: "Photos updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Serve static files for uploaded images
app.use("/uploads", express.static(uploadDir));
//---------------------------------------------------------------------------------------------------
// get data profile by username
app.get('/api/get-data', async (req, res) => {
  const { username } = req.query;  // Use query parameter for username
  try {
    const profile = await Profile.findOne({ userID: username });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//--------------------------------------------------------------------------------------------------
// update data profile
app.put('/api/update-dataprofile', async (req, res) => {
  const { username, bio, name, address, dob, education, job, hobby, tags, gender } = req.body;
  try {
    const profile = await Profile.findOne({ userID: username });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    profile.bio = bio;
    profile.name = name;
    profile.address = address;
    profile.dob = dob;
    profile.education = education;
    profile.job = job;
    profile.hobby = hobby;
    profile.tags = tags;
    profile.gender = gender;
    await profile.save();
    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//---------------------------------------------------------------------------------------------------
// update payment id by username
app.put('/api/set-ispremium', async (req, res) => {
  const { username } = req.body; // Extract username from the request body

  try {
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(404).json({ message: `User with username '${username}' not found.` });
      }

      // Find the profile associated with the user
      const profile = await Profile.findOne({ userID: username }); // Using user._id to find the profile
      if (!profile) {
          return res.status(404).json({ message: `Profile for user '${username}' not found.` });
      }

      // Update the isPremium field
      profile.isPremium = true; // Corrected the boolean value to 'true'
      await profile.save();

      // Respond with success message
      res.status(200).json({ message: 'User profile updated successfully to Premium' });

  } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ message: 'Internal server error.' });
  }
});

//---------------------------------------------------------------------------------------------------
// admin api
// get data profile all user
app.get('/api/get-data-profile', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// get data User all user
app.get('/api/get-data-user', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// get data restaurant all user
app.get('/api/get-data-restaurant', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//---------------------------------------------------------------------------------------------------
// post data restaurant
// API routes
app.get('/api/get-data-restaurant', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/post-data-restaurant', async (req, res) => {
  const { restaurantID, name, tags, location, photo, description, hasPromo } = req.body;
  try {
    const newRestaurant = new Restaurant({
      restaurantID,
      name,
      tags,
      location: {
        latitude: location.latitude,
        longitude: location.longitude
      },
      photo,
      description,
      hasPromo
    });
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/delete-restaurant', async (req, res) => {
  const { restaurantID} = req.body;

  try {
    await Restaurant.deleteOne({ restaurantID });
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//---------------------------------------------------------------------------------------------------

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);