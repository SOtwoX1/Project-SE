import { Schema, model } from 'mongoose';

const profileSchema = new Schema({
    userID: { type: String, required: true },
    name: { type: String },
    address: String,
    dob: String,
    photo: [String],
    bio: String,
    education: String,
    job: String,
    genderinterest: String,
    gender: String,
    hobby: String,
    tags: [String],
    swipeDailyCount: { type: Number, default: 0 }, // counter to track daily swipe limit for free users
    acceptDailyCount: { type: Number, default: 0 },
    location: {
        latitude: Number,
        longitude: Number
    },
    //Users can set their status as free or not free for matching. If set to free, they can be automatically matched with other available users.
    isFree: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },
});

export default Profile = model('Profiles', profileSchema);