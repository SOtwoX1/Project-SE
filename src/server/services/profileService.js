import Profile from "../models/profile.js";

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
    const { userID } = req.params;
    if (!userID) {
      return res.status(400).json({ message: 'Missing userID' });
    }
    const profile = await Profile.findOne({ userID: userID });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    // add age to profile but not save to database
    const profileDict = profile.toObject();
    profileDict.age = calAge(profileDict.dob);
    res.status(200).json(profileDict);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// update swipe daily count
export const updateSwipe = async (req, res) => {
  try {
    const { userID } = req.params;
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