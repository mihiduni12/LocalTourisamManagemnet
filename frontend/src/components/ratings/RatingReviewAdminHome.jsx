import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../Spinner';
import { BsInfoCircle } from 'react-icons/bs'; 
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const RatingReviewAdminHome = () => {
  const [ratingReviews, setRatingReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5555/ratingreviews")
      .then((response) => {
        setRatingReviews(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDeleteRatingReview = (id) => {
    axios
        .delete(`http://localhost:5555/ratingreviews/${id}`)
        .then(() => {
            // Assuming you want to refresh the list after deletion
            axios.get("http://localhost:5555/ratingreviews")
              .then((response) => {
                setRatingReviews(response.data.data);
              })
              .catch((error) => {
                console.log(error);
              });
        })
        .catch((error) => {
            console.error(error);
        });
  };

  return (
    <div className="overflow-x-auto bg-green-200 h-screen">
      <h1 className="text-3xl my-8 text-center">Rating and Reviews List</h1>
      
      <div className="overflow-x-auto bg-gray-300">
        <table className="border-collapse border border-gray-200 w-full">
          <thead>
            <tr className="bg-gray-400">
              <th className="border border-gray-200 rounded-md px-4 py-2">Product ID</th>
              <th className="border border-gray-200 rounded-md px-4 py-2">Rating</th>
              <th className="border border-gray-200 rounded-md px-4 py-2">Review</th>
              <th className="border border-gray-200 rounded-md px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ratingReviews.map((ratingReview) => (
              <tr key={ratingReview._id}>
                <td className="border border-gray-200 rounded-md px-4 py-2">{ratingReview.productId}</td>
                <td className="border border-gray-200 rounded-md px-4 py-2">{ratingReview.rating}</td>
                <td className="border border-gray-200 rounded-md px-4 py-2">{ratingReview.review}</td>
                <td className="border border-gray-200 rounded-md px-4 py-2">
                  <center>
                  <button onClick={() => handleDeleteRatingReview(ratingReview._id)} className="bg-[#FF0000] hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-300">
                    Delete
                  </button>
                  </center>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RatingReviewAdminHome;
