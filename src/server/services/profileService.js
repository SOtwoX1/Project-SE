import Profile from "../models/profile.js";
import User from "../models/user.js";

// calculate age
export const calAge = (dob) => {
  const currentDate = new Date();
  const DateOfBirth = new Date(dob);
  let age = currentDate.getUTCFullYear() - DateOfBirth.getUTCFullYear();
  const monthDifference = currentDate.getMonth() - DateOfBirth.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < DateOfBirth.getDate())) {
    age--;
  }
  return age;
};

// Get user profile by ID
export const getUserProfile = async (req, res) => {
  try {
    const userID = req.params.userID;
    if (!userID) {
      return res.status(400).json({ message: 'Missing userID' });
    }
    const profile = await Profile.findOne({ userID });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    // add age to profile but not save to database
    const profileDict = profile.toObject();
    profileDict.age = calAge(profile.dob);
    res.status(200).json(profileDict);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// update swipe daily count
export const updateSwipe = async (req, res) => {
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
};

// change status to free or not free for matching
export const changeStatus = async (req, res) => {
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
};

// Set gernder interest use by username from users = userid from profiles
export const setGenderInterest = async (req, res) => {
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
};

// Register profile endpotin
export const registerProfile = async (req, res) => {
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
};

// Upload photo
export const uploadPhoto = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Photo upload failed" });
  }
  res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
};

// Update user photos
export const setPhoto = async (req, res) => {
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
};

// Get data profile by username
export const getDataProfile = async (req, res) => {
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
};

// Update data profile
export const updateDataProfile = async (req, res) => {
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
};

// Update user premium status
export const setUserPremiumStatus = async (req, res) => {
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
};