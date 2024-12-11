import Profile from '../models/profile.js';
import User from '../models/user.js';
import Restaurant from '../models/Restaurant.js';

// Get data `Profile` all user
export const getDataProfile = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).json(profiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get data `User` all user
export const getDataUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get data `Restaurant` all user
export const getDataRestaurant = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Post data restaurant
export const postDataRestaurant = async (req, res) => {
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
};

// Delete restaurant
export const deleteRestaurant = async (req, res) => {
    const { restaurantID } = req.body;

    try {
        await Restaurant.deleteOne({ restaurantID });
        res.status(200).json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};