import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    chatID: { type: String, required: true },
    messageID: { type: String, required: false },
    userID_sender: { type: String, required: true },
    text: String,
    time_send: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date } // Add expiration time same as chat
});

messageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 259200 }); // Add expiration time 3 days

messageSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const lastChat = await this.constructor.findOne().sort({ messageID: -1 });
            console.log('Last chat:', lastChat);
            let newIDNumber;
            if (lastChat && lastChat.messageID) {
                const lastIDNumber = parseInt(lastChat.messageID.slice(3), 10); // remove 'MSG' prefix
                newIDNumber = lastIDNumber + 1;
            } else {
                newIDNumber = 1;
            }
            this.messageID = `MSG${newIDNumber.toString().padStart(3, '0')}`;
        } catch (err) {
            return next(err);
        }
    }
    next();
});

const Message = model('Messages', messageSchema);

export default Message;