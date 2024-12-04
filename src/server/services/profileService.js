import Profile from "../models/profile";
// calculate age
export const calAge = (dob) => {
    const currentDate = new Date();
    const dob = new Date(dob);
    let age = currentDate.getUTCFullYear() - dob.getUTCFullYear();
    const monthDifference = currentDate.getMonth() - dob.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < dob.getDate())) {
        age--;
    }
    return age;
};

// Get user profile by ID
export const getUserProfile = async (userID) => {
    try {
        if (!userID) {
          return res.status(400).json({ message: 'Missing userID' });
        }
        const profile = await Profile.findOne({userID});
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
export const updateSwipe = async (userID) => {
  try {
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
export const changeStatus = async (userID, isFree) => {
  try {
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