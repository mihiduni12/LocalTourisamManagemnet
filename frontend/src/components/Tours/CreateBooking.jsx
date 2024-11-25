import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../Tours/BackButton';
import Spinner from '../../components/Tours/Spinner';
import { useSnackbar } from 'notistack';
import { useUser } from "@clerk/clerk-react"


const CreateBooking = ({ onCancel, tourId }) => {
    const [count, setCount] = useState('');
    const [tour, setTour] = useState(null); // State to hold tour details
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useUser();
	let userID;

	try {
		const userId = user.id;
		userID = userId;
	} catch (error) {
		console.error("Error reading user.id:", error);
	}
  const userId = userID;

    // Fetch tour details when the component mounts
    useEffect(() => {
        const fetchTourDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/tours/${tourId}`);
                setTour(response.data);
            } catch (error) {
                console.error('Error fetching tour:', error);
            }
        };

        fetchTourDetails();
    }, [tourId]);

    // Function to calculate total price based on count and tour price
    const calculateTotalPrice = () => {
        if (tour) {
            return parseInt(count) * tour.price;
        }
        return 0;
    };

    const handleSaveBooking = () => {
        // Validate count
        if (parseInt(count) <= 0) {
            enqueueSnackbar('Cannot add minus values', { variant: 'error' });
            return; // Stop execution if count is not valid
        }

        // Validate date
        const selectedDate = new Date(date);
        const currentDate = new Date();
        if (selectedDate < currentDate) {
            enqueueSnackbar('Selected date cannot be in the future', { variant: 'error' });
            return; // Stop execution if selected date is in the future
        }

        const totalPrice = calculateTotalPrice(); // Calculate total price
       
        const data = {
            tourId,
            userId,
            count,
            totalPrice,
            date,
        };

        setLoading(true);
        
        axios.post("http://localhost:5555/bill", {
            User_ID: userId,
            date : new Date().toISOString().split('T')[0],
            Value:totalPrice,
            type:"TourBill ",
            status:"unpaid",
          });
           axios.post("http://localhost:5555/noti", {
            date: new Date().toISOString(),
            status: "unread",
            description: `Your tour package " ${tour.title}" has been booked for the date ${date} be ready to enjoy!!`,
            topic: "tour",
            userID: userId,
          });
        axios
            .post('http://localhost:5555/bookings', data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Booking created successfully', { variant: 'success'});
                onCancel(); // Close the popup after booking creation
            })
            .catch(error => {
                setLoading(false);
                enqueueSnackbar('Error', { variant: 'error'});
                console.error(error);
            });
            
    }

    return (
        <div className='overflow-auto max-h-full bg-[#B3B6B7]'>
            <div className='p-4 '>
                <BackButton onClick={onCancel} />
                <h1 className='text-3xl my-4'>Create Booking</h1>
                {loading ? <Spinner /> : ''}
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
</div>


                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Count</label>
                        <input 
                            type='number'
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                    </div>

                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Total Price</label>
                        <input 
                            type='text'
                            value={calculateTotalPrice()} // Display calculated total price
                            readOnly
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                    </div>

                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Date</label>
                        <input 
                            type='date'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                    </div> 

                    <div className="flex justify-end">
                        <button className='p-2 bg-[#E74C3C] mr-2' onClick={onCancel}>Cancel</button> 
                        <button className='p-2 bg-[#2874A6]' onClick={handleSaveBooking}>Save</button>      
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBooking;