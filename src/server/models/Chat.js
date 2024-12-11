import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
  chatID: { type: String, AutoIncrement: true },
  matchID: { type: String, required: true },
  all_messageIDs: [String],
  createdAt: { type: Date, default: Date.now  }
});

chatSchema.index({ createdAt: 1 }, { expireAfterSeconds: 259200 }); // Add expiration time 3 days

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

const Chat = model('Chats', chatSchema);

export default Chat;