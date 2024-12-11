import { Schema, model } from 'mongoose';

const promotionSchema = new Schema({
    promoID: { type: String, AutoIncrement: true },
    restaurantID: { type: String, required: true },
    discountEnd: { type: Date, default: Date.now },
    description: { type: String }
});

promotionSchema.index({ discountEnd: 1 }, { expireAfterSeconds: 10800 }); // Add expiration time 3 hours.

promotionSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const lastPromotion = await this.constructor.findOne().sort({ promoID: -1 });
            let newIDNumber;
            if (lastPromotion && lastPromotion.promoID) {
                const lastIDNumber = parseInt(lastPromotion.promoID.slice(1), 10); // remove 'P' prefix
                newIDNumber = lastIDNumber + 1;
            } else {
                newIDNumber = 1;
            }
            this.promoID = `P${newIDNumber.toString().padStart(3, '0')}`;
        } catch (err) {
            return next(err);
        }
    }
    next();
});

const Promotion = model('Promotions', promotionSchema);

export default Promotion;