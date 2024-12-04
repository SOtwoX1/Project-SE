import Match from "../models/Match";
import Profile from "../models/profile";
import Chat from "../models/Chat";
import { calAge } from "./profileService";

// get other profile that match the user interest the same style
export const getMatchProfile = async (userID) => {
    try {
        const match = await Match.findOne({ userID });
        if (!match) {
            return res.status(404).json({ message: "Match not found" });
        }
        const profile = await Profile.findOne({ userID: match.matchID });
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
        const matchedProfilesWithAge = matchedProfile.map(profile => {
            return { ...profile.toObject(), age: calAge(profile.dob) };
        });
        res.status(200).json(matchedProfilesWithAge || { message: "No matching user found" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// send request to match other user
export const sendMatchRequest = async (userID, otherUserID) => {
    try {
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
};

// get all match request
export const getAllMatchRequest = async (userID) => {
    try {
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
};

// accept match request from other user change isMatch to true and create chat
export const acceptMatchRequest = async (userID, matchID) => {
    try {
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
}

// decline match request from other user
export const declineMatchRequest = async (matchID) => {
    try {
        if (!matchID) {
            return res.status(400).json({ message: 'Missing matchID' });
        }
        const match = await Match.findOne({ matchID });
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }
        // Delete the match
        await Match.deleteOne({ matchID });
        res.status(200).json({ message: 'Match declined' });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}