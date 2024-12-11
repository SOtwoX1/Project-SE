import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import Match from "../models/Match.js";

// get all chat room that user have
export const getAllChatRoom = async (req, res) => {
  try {
    const { userID } = req.params;
    if (!userID) {
      return res.status(400).json({ message: 'Missing userID' });
    }
    const matchRooms = await Match.aggregate([
      {
        $match: {
          $and: [
            { $or: [{ userID1: userID }, { userID2: userID }] },
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
                  $or: [{ $eq: ['$userID', '$$userID1'] }, { $eq: ['$userID', '$$userID2'] }]
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
}

// get chat history from chat room
export const getChatHistory = async (req, res) => {
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
}

// send message to chat room
export const sendMessage = async (req, res) => {
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
}