import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../Spinner';
import { BsInfoCircle } from 'react-icons/bs'; 
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react"

const RatingView = ({ productID }) => {
    const [ratingReviews, setRatingReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const productId = productID; // Specify the productId here
    const { user } = useUser();
    let userID;
  
    try {
      const userId = user.id;
      userID = userId;
    } catch (error) {
      console.error("Error reading user.id:", error);
    }
    const userId = userID;
  
    useEffect(() => {
      axios
        .get("http://localhost:5555/ratingreviews")
        .then((response) => {
          setRatingReviews(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }, []);
  
    useEffect(() => {
      if (!loading && !error) {
        const filtered = ratingReviews.filter(review => review.productId === productId);
        setFilteredReviews(filtered);
      }
    }, [loading, error, ratingReviews]);
  
    // Calculate the average rating
    const calculateAverageRating = () => {
      let totalRating = 0;
      for (let i = 0; i < filteredReviews.length; i++) {
        totalRating += filteredReviews[i].rating;
      }
      return filteredReviews.length > 0 ? totalRating / filteredReviews.length : 0;
    };
  
    const average = calculateAverageRating();
  
    // Delete a review
    const deleteReview = (reviewId) => {
      axios.delete(`http://localhost:5555/ratingreviews/${reviewId}`)
        .then(() => {
          // Remove the deleted review from the state
          setFilteredReviews(filteredReviews.filter(review => review._id !== reviewId));
        })
        .catch(error => {
          console.error("Error deleting review:", error);
        });
    };
  
    if (loading) return <Spinner />;
    if (error) return <div>Error: {error.message}</div>;
  
    return (
      <div className="overflow-x-auto bg-green-200 h-screen">
        <h1 className="text-3xl my-8 text-center font-bold">Average rating : {average}</h1>
        
        <div className="ml-[50px] w-3/4 overflow-x-auto bg-white border rounded-lg border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-400">
                <th className="rounded-md px-4 py-2">Rating</th>
                <th className="rounded-md px-4 py-2">Review</th>
                <th className="rounded-md px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((ratingReview) => (
                <tr key={ratingReview._id} className="border-b border-gray-200">
                  <td className="px-4 py-2 font-bold">{ratingReview.rating}</td>
                  <td className="px-4 py-2 font-bold">{ratingReview.review}</td>
                  <td className="px-4 py-2">
                    {/* Check if the review belongs to the current user */}
                    {ratingReview.userId === userId && (
                      <React.Fragment>
                        <Link to={`/ratingreview/edit/${ratingReview._id}`} // Adjust the route as per your application
                          className="text-blue-500 hover:text-blue-700 mr-2"
                          style={{ color: '#2196F3' }} // Set the color to #2196F3
                        >
                          <MdOutlineAddBox /> Edit
                        </Link>
                        <button
                          onClick={() => deleteReview(ratingReview._id)}
                          className="text-red-500 hover:text-red-700"
                          style={{ color: '#FF0000', cursor: 'pointer' }}
                        >
                          <MdOutlineDelete /> Delete
                        </button>
                      </React.Fragment>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default RatingView;
