import express from 'express';
import { Booking } from '../models/tourModel.js';

const bookingRouter = express.Router();

// Route for saving a new booking
bookingRouter.post('/', async (request, response) => {
    try {
        if (
            !request.body.tourId ||
            !request.body.userId ||
            !request.body.count ||
            !request.body.totalPrice ||
            !request.body.date
        ) {
            return response.status(400).send({
                message: 'Send all required fields: tourId, userId, count, totalPrice, date',
            });
        }
        
        // Create a new booking object
        const newBooking = {
            tourId: request.body.tourId,
            userId: request.body.userId,
            count: request.body.count,
            totalPrice: request.body.totalPrice,
            date: request.body.date
        };

        // Create the booking in the database
        const booking = await Booking.create(newBooking);

        return response.status(201).send(booking);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Routes to get all bookings from the database
bookingRouter.get('/', async (request, response) => {
    try{
        const bookings = await Booking.find({});

        return response.status(200).json({
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get a booking by ID from the database
bookingRouter.get('/:id', async (request, response) => {
    try{
        const { id } = request.params;

        const booking = await Booking.findById(id);

        return response.status(200).json(booking);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for updating a booking
bookingRouter.put('/:id', async (request, response) =>{
    try{
        if(
            !request.body.tourId ||
            !request.body.userId ||
            !request.body.count ||
            !request.body.totalPrice ||
            !request.body.date
        ){
            return response.status(400).send({
                message:'Send all required fields: tourId, userId, count, totalPrice, date',
            });
        }

        const { id } = request.params;

        const result = await Booking.findByIdAndUpdate(id, request.body);
         
        if (!result){
            return response.status(404).json({message: 'Booking not found'});
        }

        return response.status(200).send({message: 'Booking updated successfully'});
    } catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

// Route for deleting a booking
bookingRouter.delete('/:id', async (request, response) => {
    try{
        const { id } = request.params;

        const result= await Booking.findByIdAndDelete(id);

        if (!result){
            return response.status(404).json({message: 'Booking not found'});
        }

        return response.status(200).send({message: 'Booking deleted successfully'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

export default bookingRouter;
