import React, { useState } from 'react';
import axios from "axios";
import { useUser } from "@clerk/clerk-react"

const AppointmentClassical = () => {
  const [name, setName] = useState('');
  const [service, setService] = useState("");
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const { user } = useUser();
	let userID;

	try {
		const userId = user.id;
		userID = userId;
	} catch (error) {
		console.error("Error reading user.id:", error);
	}
  const userId = userID;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name,
      service,
      time,
      date,
      phoneNo,
      email,
    };

    try {
      const response = await axios.post('http://localhost:5555/appointmentSPA', data);
      const newAppointment = response.data; // This contains the newly created appointment object with its ID
      await axios.post("http://localhost:5555/bill", {
        User_ID: userId,
        date: new Date().toISOString().split('T')[0],
        Value: 245000,
        type: "Treatment",
        status: "unpaid",
      });
      
      await axios.post("http://localhost:5555/noti", {
        date: new Date().toISOString(),
        status: "unread",
        description: `Your Classical Spa Package has been addded`,
        topic: "spa",
        userID: userId,
      });
     
      // Redirect to the Service Confirm page
      window.location.assign(`/service-confirm?appointmentId=${newAppointment.id}`);
    } catch (error) {
      console.error('Error saving data to database:', error.message);
      // You can show an error message to the user
    }
  };

  const handleTimeChange = (event) => {
    const selectedTime = event.target.value;

    // Business hours (24-hour format)
    const businessHours = {
      morning: { start: '08:00', end: '11:00' },
      afternoon: { start: '12:00', end: '15:00' },
      evening: { start: '17:00', end: '20:00' }
    };

    // Get the time slot's period (morning, afternoon, or evening)
    let period = '';
    if (selectedTime >= businessHours.morning.start && selectedTime <= businessHours.morning.end) {
      period = 'morning';
    } else if (selectedTime >= businessHours.afternoon.start && selectedTime <= businessHours.afternoon.end) {
      period = 'afternoon';
    } else if (selectedTime >= businessHours.evening.start && selectedTime <= businessHours.evening.end) {
      period = 'evening';
    }

    // Check if the selected time falls within business hours
    if (period === '') {
      // If the selected time is outside business hours, reset the time to empty string
      setTime('');
      alert('Please select a time within business hours.');
    } else {
      setTime(selectedTime);
    }
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
     // Get today's date
     const today = new Date();

     // Create a Date object from the selected date
     const selectedDateTime = new Date(selectedDate);
 
     // Check if the selected date is in the past or today
     if (selectedDateTime <= today) {
       alert('Please select a future date.');
       // Reset the date field
       setDate('');
     } else {
       // Update the state with the selected date
       setDate(selectedDate);
     }
   };

  return (
    <div className="flex justify-center items-center h-screen bg-[#fcecae]">
      <div className="max-w-xl w-full px-6 py-4 shadow-2xl bg-white rounded overflow-hidden">
        <h4 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Classical SPA Rituals Service Appointment
        </h4>
        <div className="max-w-xl rounded overflow-hidden shadow-lg bg-[#D1FAE5] p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm text-gray-700 font-bold mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="service" className="block text-sm text-gray-700 font-bold mb-1">
                Service to be booked
              </label>
              <select
                id="service"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={service}
                onChange={(event) => setService(event.target.value)}
              >
                <option value="">Select a service</option>
                <option value="RELAX AND REBALANCE">RELAX AND REBALANCE</option>
                <option value="DETOX AND REFRESH">DETOX AND REFRESH</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="time" className="block text-sm text-gray-700 font-bold mb-1">
                Time
              </label>
              <p>Morning   8AM  -11AM</p>
              <p>Afternoon 12 NOON - 3PM</p>
              <p>Evening   5PM -8PM</p>
              <br />
              <input
                type="time"
                id="time"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={time}
                onChange={handleTimeChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block text-sm text-gray-700 font-bold mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={date}
                onChange={handleDateChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNo" className="block text-sm text-gray-700 font-bold mb-1">
                Mobile Number
              </label>
              <input
                type="text"
                id="phoneNo"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={phoneNo}
                onChange={(event) => {
                  const inputVal = event.target.value;
                  // Limit input to 10 digits
                  if (/^\d{0,10}$/.test(inputVal)) {
                    setPhoneNo(inputVal); // Update phoneNo state
                  }
                }}
                maxLength={10} // Limit maximum input length to 10 characters
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm text-gray-700 font-bold mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="bg-[#34D399] hover:bg-[#064E3B] text-black font-bold py-2 px-4 rounded transition duration-200 w-full">
                BOOK NOW
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AppointmentClassical;
