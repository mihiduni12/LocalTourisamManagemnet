import express from "express";
import { AyurvedicSpa } from "../models/ayurvedicSpaModel.js";

const ayurvedicroute =express.Router();


// Route to save an Ayurvedic SPA service 
ayurvedicroute.post('/', async (request, response) => {
    try {
        if (!request.body.topic || !request.body.description || !request.body.Time || !request.body.Price) {
            return response.status(400).send({
                message: 'Send all required fields'
            });
        }

        const newAyurvedicSpa = {
            topic: request.body.topic,
            description: request.body.description,
            Time: request.body.Time,
            Price: request.body.Price,
        };

        const ayurvedicspa = await AyurvedicSpa.create(newAyurvedicSpa);

        return response.status(201).send(ayurvedicspa);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to GET all the services from the database
ayurvedicroute.get('/', async (request, response) => {
    try {
        const ayurvedicspa = await AyurvedicSpa.find({});
        return response.status(200).json({
            count: ayurvedicspa.length,
            data: ayurvedicspa,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to GET one service from the database by ID
ayurvedicroute.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const ayurvedicspa = await AyurvedicSpa.findById(id);
        return response.status(200).json(ayurvedicspa);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to update an Ayurvedic SPA service 
ayurvedicroute.put('/:id', async (request, response) => {
    try {
        if (!request.body.topic || !request.body.description || !request.body.Time || !request.body.Price) {
            return response.status(400).send({
                message: 'Send all required fields'
            });
        }

        const { id } = request.params;
        const result = await AyurvedicSpa.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Service not found!' });
        }
        return response.status(200).send({ message: 'Service updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for deleting a service 
ayurvedicroute.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await AyurvedicSpa.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Service not found!' });
        }
        return response.status(200).send({ message: 'Service deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default ayurvedicroute;