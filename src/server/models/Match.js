import { Schema, model } from 'mongoose';

const matchSchema = new Schema({
    matchID: { type: String, AutoIncrement: true },
    userID1: { type: String, required: true },
    userID2: { type: String, required: true },
    isMatch: { type: Boolean, default: false },
    restaurantID: { type: String },
    matchTime: { type: Date, default: Date.now },
    createdAt: { type: Date } // Add expiration time same as chat
});

matchSchema.index({ createdAt: 1 }, { expireAfterSeconds: 259200 }); // Add expiration time 3 days

matchSchema.pre('save', async function (next) {
    // Only generate a new matchID if it's a new document
    if (this.isNew) {
        try {
            // Find the last match by matchID (sorted in descending order)
            const lastMatch = await this.constructor.findOne().sort({ matchID: -1 });
            let newIDNumber;
            if (lastMatch && lastMatch.matchID) {
                // Extract the numeric part of the matchID, increment it, and format it
                const lastIDNumber = parseInt(lastMatch.matchID.slice(1), 10); // remove 'M' prefix
                newIDNumber = lastIDNumber + 1;
            } else {
                // Start at 1 if there are no previous matches
                newIDNumber = 1;
            }
            // Set the new matchID with 'm' prefix and zero-padding to 3 digits
            this.matchID = `M${newIDNumber.toString().padStart(3, '0')}`;
        } catch (err) {
            return next(err);
        }
    }
    next();
});

const Match = model('Matches', matchSchema);

export default Match;