import User from '../models/userModel.js';
import Profile from '../models/profileModel.js';
import CardPayment from '../models/cardPaymentModel.js';

// Register
export const register = async (req, res) => {
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
};

// Login
export const login = async (req, res) => {
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
};

// Fotget Password
export const forgotPassword = async (req, res) => {
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
};

// Set password
export const setPassword = async (req, res) => {
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
};

// Reset password
export const resetPassword = async (req, res) => {
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
};

// Create cardpayment
export const createCardPayment = async (req, res) => {
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
};

// Delete account
export const deleteAccount = async (req, res) => {
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
};