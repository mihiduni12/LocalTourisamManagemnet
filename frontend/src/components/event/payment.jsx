import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import EventHeader from './EventHeader';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import RatingReviewForm from '../ratings/createrating';
import RatingView from '../ratings/ratingview';
import { useUser } from "@clerk/clerk-react"

const EventDetails = ({ eventId }) => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [standardPrice, setStandardPrice] = useState(0); // Initialize standardPrice state
  
  
  const { user } = useUser();
	let userID;

	try {
		const userId = user.id;
		userID = userId;
	} catch (error) {
		console.error("Error reading user.id:", error);
	}
  const idd=userID;
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/events/${id}`);
        if (response.status === 200) {
          setEventData(response.data);
          setStandardPrice(response.data.ticketPrice); // Set standardPrice from eventData
        } else {
          setError("Failed to fetch event data");
        }
        
      } catch (error) {
        setError("Failed to fetch event data");
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]);

  
//Validation
  
const handleTicketCountChange = (e) => {
  const count = parseInt(e.target.value);
  if(count>5)
    {
      window.alert('Ticket count cannot be more than 5');
      setTicketCount(5)
    }
   else if(count<0)
    {
      window.alert('Ticket count cannot be negative');
      setTicketCount(1)
    } 
    else{
    setTicketCount(count);
    }
};
  

  const totalPrice =  standardPrice * ticketCount ;

  const handleSubmit = () => {
    const data = {
      User_ID: idd,
      date: new Date().toISOString(),
      TicketCount: ticketCount,
      value: totalPrice,
      status: "unpaid",
      Eventid: id
    };

    axios.post("http://localhost:5555/Ticket", data)
      .then(response => {
        console.log("Data saved successfully:", response.data);
        // Reset the form or perform any other necessary actions upon successful save
      })
      .catch(error => {
        console.error("Error saving data:", error);
        // Handle any errors that occur during the save process
      });
     axios.post("http://localhost:5555/bill", {
        User_ID: idd,
        date : new Date().toISOString().split('T')[0],
        Value:totalPrice,
        type:"ticket",
        status:"unpaid",
      });
      axios.post("http://localhost:5555/noti", {
            date: new Date().toISOString(),
            status: "unread",
            description: `Your tickets for the show ${eventData.EventName} has been added for the cart `,
            topic: "event",
            userID: idd,
          });
          window.alert('Tickets added to the cart successfully!');
          window.location('/event');
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex mx-[100px]">
      <div className="w-1/2 p-4">
        <img src={eventData.imageUrl} alt={eventData.EventName} className="w-[550px] h-[700px]" />
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-xl font-semibold mb-4">{eventData.EventName}</h2>
        <p className="mb-4">{eventData.Description}</p>
        <p className="font-bold mb-4">Location: {eventData.Location}</p>
        <p className="font-bold mb-4">Date: {eventData.Date}</p>
        <div className="mb-4"></div>
        <div className="mb-4">
        <label htmlFor="ticketCount" className="block font-semibold mb-2">Ticket Count</label>
        <input type="number" id="ticketCount" className="block w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" value={ticketCount} onChange={handleTicketCountChange} />
        </div>
        <div className="mb-4">
          <p className="font-bold mb-4">Ticket Price: {standardPrice}</p>
          <p className="font-semibold">Total Price: Rs.{totalPrice}.00</p>
        </div>
        <div>
          <button className="bg-[#75df44] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSubmit}>
            <Link to="/even">Buy Tickets</Link>
          </button>
        </div><RatingReviewForm productID={eventData._id} />     <RatingView productID={eventData._id}/> </div>   
    </div>
  );
};

EventDetails.propTypes = {
  eventId: PropTypes.string.isRequired
};

const Payment = () => {
  const { id } = useParams();

  return (
    <div className="h-24 bg-[#eba5f1]">
      <EventHeader />
      <div className="pt-[100px] container mx-auto py-8">
        <EventDetails eventId={id} />
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
