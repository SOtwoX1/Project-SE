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

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Middleware
app.use(cors());
app.use(bodyParser.json());

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);


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
const mongoURI = 'mongodb+srv://pair:1234@se-project.qqqt0.mongodb.net/DatingApp?retryWrites=true&w=majority';

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
  userID: { type: String, required: true },
  name: { type: String},
  address : String,
  dob: String,
  photo: [String],
  bio: String,
  education: String,
  job: String,
  genderinterest: String,
  gender: String,
  hobby: String,
  tags: [String],
  swipeDailyCount: { type: Number, default: 0 },
  acceptDailyCount: { type: Number, default: 0 },
  location: {
    latitude: Number,
    longitude: Number
  },
  isFree: { type: Boolean, default: false },
  isPremium: { type: Boolean, default: false },
});
const cardpaymentSchema = new mongoose.Schema({
  userID: String,
  CardID: {type:String, AutoIncrement: true}, 
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
  matchTime: { type: Date, default: Date.now }
});
matchSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const lastMessage = await this.constructor.findOne().sort({ matchID: -1 });

      let newIDNumber;
      if (lastMessage && lastMessage.matchID) {
        const lastIDNumber = parseInt(lastMessage.matchID.slice(1), 10); // remove 'MSG' prefix
        newIDNumber = lastIDNumber + 1;
      } else {
        newIDNumber = 1;
      }
      this.matchID = `M${newIDNumber.toString().padStart(3, '0')}`;
    } catch (err) {
      return next(err);
    }
  }
  next();
});
const chatSchema = new mongoose.Schema({
  chatID: { type: String, AutoIncrement: true },
  matchID: { type: String, required: true },
  all_messageIDs: [String],
  createdAt: { type: Date, default: Date.now } // Add expiration time
});
chatSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const lastMessage = await this.constructor.findOne().sort({ chatID: -1 });

      let newIDNumber;
      if (lastMessage && lastMessage.chatID) {
        const lastIDNumber = parseInt(lastMessage.chatID.slice(3), 10); // remove 'MSG' prefix
        newIDNumber = lastIDNumber + 1;
      } else {
        newIDNumber = 1;
      }
      this.messageID = `C${newIDNumber.toString().padStart(3, '0')}`;
    } catch (err) {
      return next(err);
    }
  }
  next();
});
const messageSchema = new mongoose.Schema({
  chatID: { type: String, required: true },
  messageID: { type: String, required: true },
  userID_sender: { type: String, required: true },
  text: String,
  time_send: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }
});
messageSchema.pre('save', async function (next) {
  // Only generate a new messageID if it's a new document
  if (this.isNew) {
    try {
      // Find the last message by messageID (sorted in descending order)
      const lastMessage = await this.constructor.findOne().sort({ messageID: -1 });

      let newIDNumber;
      if (lastMessage && lastMessage.messageID) {
        // Extract the numeric part of the messageID, increment it, and format it
        const lastIDNumber = parseInt(lastMessage.messageID.slice(3), 10); // remove 'MSG' prefix
        newIDNumber = lastIDNumber + 1;
      } else {
        // Start at 1 if there are no previous messages
        newIDNumber = 1;
      }

      // Set the new messageID with 'm' prefix and zero-padding to 3 digits
      this.messageID = `MSG${newIDNumber.toString().padStart(3, '0')}`;
    } catch (err) {
      return next(err);
    }
  }
  next();
});
const restaurantSchema = new mongoose.Schema({
  restaurantID: String,
  name: { type: String, required: true },
  tag: [String],
  location: {
    latitude: Number,
    longitude: Number
  },
  photo: [String],
  description: { type: String }
});

const CardPayment = mongoose.model('CardPayment', cardpaymentSchema);
const User = mongoose.model('Users', userSchema); // Target the `Users` collection
const Profile = mongoose.model('Profile', profileSchema);
const Match = mongoose.model('Matches', matchSchema);
const Chat = mongoose.model('Chats', chatSchema);
Chat.createIndexes({ "createdAt": 1 }, { expireAfterSeconds: 259200 }); // delete chat after 3 days
const Message = mongoose.model('Messages', messageSchema);
const Restaurant = mongoose.model('Restaurants', restaurantSchema);

// A cron job allows you to execute something on a schedule or a task to be executed sometime in the future.
cron.schedule("0 0 * * *", async () => {
  try {
    const result = await Profile.updateMany({}, { $set: {acceptDailyCount: 0, swipeDailyCount: 0}})
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

// get profile user
app.get('/api/get-profile/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;

    if (!userID) {
      return res.status(400).json({ message: 'Missing userID' });
    }

    const profile = await Profile.findOne({userID});
    
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// get other profile that match the user interest
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
    const tags = profile.tag;
    const alreadyInMatch = (await Match.find({userID2: userID}).distinct('userID1')).concat((await Match.find({userID1: userID}).distinct('userID2')));
    const matchedProfile = await Profile.find(
      {
      tag: { $in: tags},
      userID: {$nin:alreadyInMatch.concat(userID)}
    }
  );

    res.status(200).json(matchedProfile || { message: "No matching user found" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

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
      isMatch: isOtherUserFree === 'true' ? true : false
    });

    await match.save();

    if (isOtherUserFree === 'true') {
      //create chat
      const chat = new Chat({
        matchID: match.matchID,
        all_messageIDs: []
      });
      await chat.save();

      return res.status(201).json({ message: 'Matched and Created chat' });
    }

    res.status(201).json({ message: 'Request Matched' });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.put('/api/dislike-profile/:userID', async (req, res) => {
  try {
    const userID = req.params.userID

    if (!userID) {
      return res.status(400).json({ message: 'Missing userID' });
    }

    const profile = await Profile.findOne({ userID });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    profile.swipeDailyCount += 1;
    await profile.save();

    res.status(200).json({ message: 'Update swipe daily count success' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

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
        $project: {
          matchID: 1,
          userID: '$profile.userID',
          photo: '$profile.photo',
          tag: '$profile.tag'
        }
      }
    ]);

    if (!matchRequests.length) {
      return res.status(404).json({ message: 'No match requests found' });
    }

    res.status(200).json(matchRequests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

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
    const profile = Profile.findOne({ userID });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    profile.acceptDailyCount += 1;
    match.isMatch = true;
    await match.save();
    await profile.save();

    res.status(200).json({ message: 'Match accepted' });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post('api/create-chat/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;
    const { matchID } = req.query;

    if (!userID || !matchID) {
      return res.status(400).json({ message: 'Missing userID/matchID' });
    }

    const chat = new Chat({
      matchID,
      all_messageIDs: []
    });

    await chat.save();

    res.status(201).json({ message: 'Chat created' });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

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
      res.status(404).json({ message: 'Not found'});
    }

    res.status(200).json(matchRooms);

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.get('/api/get-chat/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const matchID = req.query.matchID;

    if (!userID) {
      return res.status(400).json({ message: 'Missing userID' });
    }
    if (!matchID) {
      return res.status(400).json({ message: 'Missing matchID' });
    }

    const chatRoom = await Chat.findOne({ matchID });

    if (!chatRoom) {
      res.status(404).json({ message: 'Not found chat'});
    }
    const chatHistory = await Message.find({
      messageID: { $in: chatRoom.all_messageIDs }
    })
    if (!chatHistory) {
      res.status(404).json({ message: 'Not found message'});
    }
    res.status(200).json(chatHistory);    

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post('/api/send-message/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const { matchID, text } = req.query;

    if (!userID || !matchID || !text) {
      return res.status(400).json({ message: 'Missing userID/matchID/text' });
    }

    const chatRoom = await Chat.findOne({ matchID });

    if (!chatRoom) {
      res.status(404).json({ message: 'Not found'});
    }

    const newMessage = new Message({
      chatID: chatRoom.chatID,
      userID_sender: userID,
      text
    });

    await newMessage.save();

    chatRoom.all_messageIDs.push(newMessage.messageID);
    await chatRoom.save();

    res.status(200).json({ message: 'Message sent' });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

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

app.get('/api/get-all-restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
})
app.get('/api/get-restaurant/:restaurantID', async (req, res) => {
  try {
    const { restaurantID } = req.params;
    const { promo } = req.query;

    if (!restaurantID) {
      return res.status(400).json({ message: 'Missing restaurantID' });
    }

    const restaurant = await Restaurant.findOne({ restaurantID });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    if (!promo) {
      res.status(200).json(restaurant);
    }
    else {
      //restaurant that have promotion coming soon
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
})

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

// set photo ------------------------------------------------------------------------------------
app.put('/api/set-photo', async (req, res) => {
  const { username, photo } = req.body;

  // Validate input
  if (!username || !Array.isArray(photo)) {
    return res.status(400).json({ message: 'Username and photo are required.' });
  }

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
    // set photo
    profile.photo = photo;
    await profile.save();

    res.status(200).json({ message: 'Photo uploaded successfully' });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});