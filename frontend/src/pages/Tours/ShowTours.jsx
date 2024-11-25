import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/Tours/BackButton';
import Spinner from '../../components/Tours/Spinner';
import CreateBooking from '../../components/Tours/CreateBooking';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import TourLogo from '../../components/Tours/TOURLOGO';
import RatingReviewForm from '../../components/ratings/createrating';
import RatingView from '../../components/ratings/ratingview';

const ShowTours = () => {
  const [tour, setTour] = useState({});
  const [loading, setLoading] = useState(false);
  const [showCreateBooking, setShowCreateBooking] = useState(false); // State to control the visibility of CreateBooking popup
  const { id } = useParams();

  const fetchTourDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5555/tours/${id}`);
      setTour(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tour:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTourDetails();
  }, [id]);

  const handleBookNow = () => {
    setShowCreateBooking(true); // Show the CreateBooking popup when "Book now" button is clicked
  };

  const handleCloseCreateBooking = () => {
    setShowCreateBooking(false); // Close the CreateBooking popup
  };

  return (
    <div className=''>
      <TourLogo/>
      <BackButton />
      <br />
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex justify-center '>
        <div className='flex flex-col border-1 bg-[#cbe6f7] p-4 w-2/4'>
          <div className='my-4 text-5xl font-bold font-mono text-center tracking-wider text-lime-400'>
            {tour.title}
          </div>
          {/* Render all tour details */}
          <div className='my-4'>
          <center><img src={tour.imageurl} alt="Event Image" className=" h-96	" /></center>
          </div>
          <div className='my-4 '>
            
            <span className='text-black'>{tour.description}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-amber-100'>Category:</span>
            <span className='text-black'>{tour.category} Hikes</span>
          </div>
          
          <div className="flex justify-center mt-4">
            <div className="mr-4">
              <button onClick={handleBookNow} className='bg-[#2E86C1] text-black w-28 h-10 rounded-md'>Book now</button>
            </div>
          </div> 
          {/* Render CreateBooking component as a popup */}
          {showCreateBooking && (
            <div className="fixed inset-0 z-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="relative z-20 p-8 rounded-xl">
                <CreateBooking onCancel={handleCloseCreateBooking} tourId={id} />
              </div>
            </div>
          )}
         
        </div>
        <div className='w-1/4 bg-[#c5d39e]'>   <RatingReviewForm productID={id} />     <RatingView productID={id}/>   
        <div className='my-4 text-[#616823] font-bold text-center'>
            <span className='text-xl mr-4 text-amber-100'>Price:</span>
            <span className='text-black'>{tour.price}/= per person</span>
          </div>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default ShowTours;
