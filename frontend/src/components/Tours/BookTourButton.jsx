import React, { useState } from 'react';
import axios from 'axios';

const ourButton = ({ tourId, onUpdate }) => {
    const handleClick = async () => {
        try {
            // Make POST request to increment count
            const response = await axios.post(`/tours/${tourId}/increment-count`);

            // If request is successful, update table
            if (response.status === 200) {
                onUpdate(tourId, response.data.tour.count); // Update table with new count
            }
        } catch (error) {
            console.error('Error incrementing count:', error);
        }
    };

    return (
        <button onClick={handleClick}>Increment Count</button>
    );
};

export default TourButton;
