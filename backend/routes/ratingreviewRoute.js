import express from 'express';
import { RatingReview } from '../models/RatingReviewModel.js';

const ratingReviewRouter = express.Router();

// Route for saving a new rating and review
ratingReviewRouter.post('/', async (request, response) => {
    try {
        if (
            !request.body.userId ||
            !request.body.productId ||
            !request.body.rating ||
            !request.body.review

        ) {
            return response.status(400).send({
                message: 'Send all required fields: userId, productId, rating',
            });
        }
        
        // Create a new rating and review object
        const newRatingReview = {
            userId: request.body.userId,
            productId: request.body.productId,
            rating: request.body.rating,
            review: request.body.review,
        };

        // Create the rating and review in the database
        const ratingReview = await RatingReview.create(newRatingReview);

        return response.status(201).send(ratingReview);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Routes to get all rating and reviews from the database
ratingReviewRouter.get('/', async (request, response) => {
    try{
        const ratingReviews = await RatingReview.find({});

        return response.status(200).json({
            count: ratingReviews.length,
            data: ratingReviews
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get a rating and review by ID from the database
ratingReviewRouter.get('/:id', async (request, response) => {
    try{
        const { id } = request.params;

        const ratingReview = await RatingReview.findById(id);

        return response.status(200).json(ratingReview);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for updating a rating and review
ratingReviewRouter.put('/:id', async (request, response) =>{
    try{
        const { id } = request.params;

        const result = await RatingReview.findByIdAndUpdate(id, request.body);
         
        if (!result){
            return response.status(404).json({message: 'Rating and review not found'});
        }

        return response.status(200).send({message: 'Rating and review updated successfully'});
    } catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

ratingReviewRouter.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await RatingReview.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Rating and review not found' });
        }

        return response.status(200).send({ message: 'Rating and review deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for deleting a rating and review

export default ratingReviewRouter;
