import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from "@clerk/clerk-react"


function RatingReviewForm({ productID }) { // Destructure productID from props
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const { user } = useUser();
	let userID;

	try {
		const userId = user.id;
		userID = userId;
	} catch (error) {
		console.error("Error reading user.id:", error);
	}
  const userId = userID;

  const idd=userId;

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5555/ratingreviews', {
        userId: idd,
        productId: productID, // Use productID prop here
        rating: rating,
        review: review,
      });
      window.alert('Rating and review submitted successfully!');
      setRating(0);
      setReview('');
      window.location.reload();
    } catch (error) {
      console.error('Error submitting rating and review:', error);
    }
  };

  return (
    <div className="mx-auto my-8 p-6 shadow-md rounded-md">
      <h2 className="text-2xl text-center font-bold mb-4">Rate Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <div className="mb-4">
            <div className='mt-[20px] mb-[20px] w-[300px] text-center mx-auto'>
              <div>
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    onClick={() => handleRatingChange(value)}
                    className={`text-5xl cursor-pointer ${value <= rating ? 'text-[#e6cb32]' : 'text-gray-400'}`}
                  >
                    {value <= rating ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <center>
          <button type="submit" className="ml-[100px] w-[200px] bg-[#a1a1dd] text-black px-4 py-2 rounded hover:bg-blue-600">Submit</button>
        </center>
      </form>
    </div>
  );
}

export default RatingReviewForm;
