import { Schema, model } from 'mongoose';

const chillingSchema = new Schema({
    chillingID: { type: String, AutoIncrement: true },
    userID: { type: String, required: true },
    restaurantID: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

chillingSchema.index({ createdAt: 1 }, { expireAfterSeconds: 10800 }); // Add expiration time 3 hours.

chillingSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const lastChilling = await this.constructor.findOne().sort({ chillingID: -1 });

            let newIDNumber;
            if (lastChilling && lastChilling.chillingID) {
                const lastIDNumber = parseInt(lastChilling.chillingID.slice(3), 10); // remove 'CHL' prefix
                newIDNumber = lastIDNumber + 1;
            } else {
                newIDNumber = 1;
            }
            this.chillingID = `CHL${newIDNumber.toString().padStart(3, '0')}`;
        } catch (err) {
            return next(err);
        }
    }
    next();
});

export default Chilling = model('Chilling', chillingSchema);