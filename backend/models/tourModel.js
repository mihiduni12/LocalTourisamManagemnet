import mongoose from "mongoose";

const tourSchema = mongoose.Schema(
    {
        imageurl: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        views: {
            type: Number
        },
        category: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

export const Tour = mongoose.model('Tour', tourSchema);

const BookingSchema = mongoose.Schema(
    {
        tourId: {
            type: String,
        },
        userId: {
            type: String,
        },
        count: {
            type: Number,
        },
        totalPrice: {
            type: Number,
        },
        date: {
            type: Date,
        }
    },
    {
        timestamps: true,
    }
);

export const Booking = mongoose.model('Booking', BookingSchema);
