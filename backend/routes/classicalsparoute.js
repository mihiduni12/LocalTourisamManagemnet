import express from "express";
import { ClassicalSpa } from "../models/classicalSpaModel.js";

const classicalroute =express.Router();


// Route to save an Classical SPA service 
classicalroute.post('/', async (request, response) => {
    try {
        if (!request.body.topic || !request.body.description || !request.body.Time || !request.body.Price) {
            return response.status(400).send({
                message: 'Send all required fields'
            });
        }

        const newClassicalSpa = {
            topic: request.body.topic,
            description: request.body.description,
            Time: request.body.Time,
            Price: request.body.Price,
        };

        const classicalspa = await ClassicalSpa.create(newClassicalSpa);

        return response.status(201).send(classicalspa);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to GET all the services from the database
classicalroute.get('/', async (request, response) => {
    try {
        const classicalspa = await ClassicalSpa.find({});
        return response.status(200).json({
            count: classicalspa.length,
            data: classicalspa,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to GET one service from the database by ID
classicalroute.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const classicalspa = await ClassicalSpa.findById(id);
        return response.status(200).json(classicalspa);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to update an Ayurvedic SPA service 
classicalroute.put('/:id', async (request, response) => {
    try {
        if (!request.body.topic || !request.body.description || !request.body.Time || !request.body.Price) {
            return response.status(400).send({
                message: 'Send all required fields'
            });
        }

        const { id } = request.params;
        const result = await ClassicalSpa.findByIdAndUpdate(id, request.body);

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
classicalroute.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await ClassicalSpa.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Service not found!' });
        }
        return response.status(200).send({ message: 'Service deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default classicalroute;