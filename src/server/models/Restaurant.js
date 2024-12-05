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

const Restaurant = model('Restaurants', restaurantSchema);

export default Restaurant;