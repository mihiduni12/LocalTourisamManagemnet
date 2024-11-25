import mongoose from "mongoose";

const appointmentspaschema = mongoose.Schema(
    {
    name: {
    type: String,
    required: true,
    },
    
    service: {
    type: String,
    required: true,
    },
    
    time: {
    type: String,
    required: true,
    },

    date: {
    type: String,
    required: true,
    },

    phoneNo: {
        type: String,
        required: true,
        },

    email: {
        type: String,
        required: true,
        },
    },
    {
        timestamps: true,
    }
    );


export const AppointmentSpa = mongoose.model('spaappointments',appointmentspaschema);