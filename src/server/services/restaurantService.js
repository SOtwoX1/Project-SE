import Restaurant from "../models/Restaurant.js";
import Chilling from "../models/Chilling.js";
import Match from "../models/Match.js";
import Promotion from "../models/Promotion.js";

// get all restaurant
export const getAllRestaurant = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// get restaurant by restaurantID
export const getRestaurantByID = async (req, res) => {
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
}

// get all who that chilling at restaurant
export const getAllChillingAt = async (req, res) => {
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
}

// post new chilling at restaurant
export const postChillingAt = async (req, res) => {
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
}

// request chilling with another user
export const postChillingWithYou = async (req, res) => {
    try {
        const { userID } = req.query;
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
}