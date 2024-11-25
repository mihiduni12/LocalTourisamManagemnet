import express from "express";
import { AppointmentSpa } from "../models/appointmentSpaModel.js";

const appoinmentroute =express.Router();
//To save an appointment 
appoinmentroute.post('/', async (request, response) => {
    try {
        if (!request.body.name || !request.body.service || !request.body.time || !request.body.date ||!request.body.phoneNo || !request.body.email) {
            return response.status(400).send({
                message: 'Send all required fields'
            });
        }

        const newAppointmentSpa = {
            name: request.body.name,
            service: request.body.service,
            time: request.body.time,
            date: request.body.date,
            phoneNo: request.body.phoneNo,
            email: request.body.email,
        };

        const appointmentspa = await AppointmentSpa.create(newAppointmentSpa);

        return response.status(201).send(appointmentspa);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to GET all filled form details from the database
appoinmentroute.get('/', async (request, response) => {
    try {
        const appointmentspa = await AppointmentSpa.find({});
        return response.status(200).json({
            count: appointmentspa.length,
            data: appointmentspa,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to GET one form details from the database by ID
appoinmentroute.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const appointmentspa = await AppointmentSpa.findById(id);
        return response.status(200).json(appointmentspa);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to GET the last filled form details from the database
appoinmentroute.get('/last', async (request, response) => {
    try {
        const lastAppointmentSpa = await AppointmentSpa.findOne().sort({ _id: -1 });

        if (!lastAppointmentSpa) {
            return response.status(404).json({ message: 'No appointments found' });
        }

        return response.status(200).json(lastAppointmentSpa);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Route for deleting a saved form detail by the client 
appoinmentroute.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await AppointmentSpa.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Service not found!' });
        }
        return response.status(200).send({ message: 'Service deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to GET appointment data based on start and end dates
appoinmentroute.get('/', async (request, response) => {
    try {
        const { startDate, endDate } = request.query;
        const appointments = await AppointmentSpa.find({
            date: { $gte: startDate, $lte: endDate }
        });
        return response.status(200).json({
            count: appointments.length,
            data: appointments,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


export default appoinmentroute;
