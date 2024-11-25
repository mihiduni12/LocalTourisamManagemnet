import express from 'express';
import { Tour } from '../models/tourModel.js';
import multer from 'multer';

const tourRouter = express.Router();

// Route for saving a new tour
tourRouter.post("/", async (req, res) => {
    try {
        req.body.views = 0;
      const tour = new Tour(req.body);
      await tour.save();
      res.status(201).send(tour);
    } catch (error) {
      res.status(400).send(error);
    }
  });
// Routes to get all tours from the database
tourRouter.get('/', async (request, response) => {
    try{
        const tours = await Tour.find({});

        return response.status(200).json({
            count: tours.length,
            data: tours
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get a tour by ID from the database
tourRouter.get('/:id', async (request, response) => {
    try{
        const { id } = request.params;

        const tour = await Tour.findById(id);

        return response.status(200).json(tour);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for updating a tour
tourRouter.put('/:id', async (request, response) =>{
    try{
        if(
            !request.body.title ||
            !request.body.price ||
            !request.body.description ||
            !request.body.category
        ){
            return response.status(400).send({
                message:'Send all required fields: title, price, description, category',
            });
        }

        const { id } = request.params;

        const result = await Tour.findByIdAndUpdate(id, request.body);
         
        if (!result){
            return response.status(404).json({message: 'Tour not found'});
        }

        return response.status(200).send({message: 'Tour updated successfully'});
    } catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

// Route for deleting a tour
tourRouter.delete('/:id', async (request, response) => {
    try{
        const { id } = request.params;

        const result= await Tour.findByIdAndDelete(id);

        if (!result){
            return response.status(404).json({message: 'Tour not found'});
        }

        return response.status(200).send({message: 'Tour deleted successfully'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

// Route for incrementing views of a tour
tourRouter.put('/:id/addview', async (request, response) => {
    try {
      const { id } = request.params;
      // Find the tour by ID
      const tour = await Tour.findById(id);
      if (!tour) {
        return response.status(404).json({ message: 'Tour not found' });
      }
      // Increment the views
      tour.views += 1;
      // Save the updated tour
      await tour.save();
      return response.status(200).json({ message: 'Views incremented successfully' });
    } catch (error) {
      console.error(error.message);
      return response.status(500).json({ message: error.message });
    }
  });

export default tourRouter;
