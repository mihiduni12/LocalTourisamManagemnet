import mongoose from "mongoose";

const classicalspaschema = mongoose.Schema(
    {
    topic: {
    type: String,
    required: true,
    },
    
    description: {
    type: String,
    required: true,
    },
    
    Time: {
    type: String,
    required: true,
    },

    Price: {
    type: Number,
    required: true,
    },
    },
    {
        timestamps: true,
    }
    );


export const ClassicalSpa = mongoose.model('classicalspa',classicalspaschema);