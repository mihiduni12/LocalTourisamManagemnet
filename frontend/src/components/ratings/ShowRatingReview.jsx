import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowRatingReview = () => {
  const [ratingReview, setRatingReview] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchRatingReviewDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5555/ratingreviews/${id}`);
      setRatingReview(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching rating and review:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatingReviewDetails();
  }, [id]);

  return (
    <div className='p-4 bg-teal-950'>
      <BackButton />
      <br />
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl p-4'>
          <div className='my-4 text-5xl font-bold font-mono text-center tracking-wider text-lime-400'>
            Rating and Review ID: {id}
          </div>
          {/* Render all rating and review details */}
          <div className='my-4'>
            <span className='text-xl mr-4 text-amber-100'>User ID:</span>
            <span className='text-white'>{ratingReview.userId}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-amber-100'>Product ID:</span>
            <span className='text-white'>{ratingReview.productId}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-amber-100'>Rating:</span>
            <span className='text-white'>{ratingReview.rating}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-amber-100'>Review:</span>
            <span className='text-white'>{ratingReview.review}</span>
          </div>
          {/* Display rating and review ID */}
          <div className="mt-4 text-white text-center">Rating and Review ID: {id}</div>
        </div>
      )}
    </div>
  );
};

export default ShowRatingReview;
