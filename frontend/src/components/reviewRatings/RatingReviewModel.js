import mongoose from "mongoose";

const RatingReviewSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        productId: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        review: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const RatingReview = mongoose.model('RatingReview', RatingReviewSchema);