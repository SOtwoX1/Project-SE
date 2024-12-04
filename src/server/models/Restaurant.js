import { Schema, model } from 'mongoose';

const restaurantSchema = new Schema({
    restaurantID: { type: String, required: true },
    name: { type: String, required: true },
    tags: [String],
    location: {
        latitude: Number,
        longitude: Number
    },
    photo: [String],
    description: { type: String },
    hasPromo: { type: Boolean, default: false }
});

export default Restaurant = model('Restaurants', restaurantSchema);