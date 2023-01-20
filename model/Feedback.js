import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema({
    user: {
        username: String,
        userId: String,
    },
    reviewContent: [{
        reviewTitle: String,
        feedback: String,
        rating: {
            type: Number,
            min: 0,
            max:5,
            default: 0
        },
    }]
});

export default mongoose.model('Review', ReviewSchema)