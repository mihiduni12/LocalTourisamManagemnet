import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import BillLogo from "./BillLogo";
import moment from 'moment-timezone';

// Get current time in Sri Lanka
const currentTimeSL = moment().tz('Asia/Colombo');

const currentDate = new Date().toISOString().split('T')[0];
  
const ReceivedSlips = () => {
  const [receivedSlips, setReceivedSlips] = useState([]);

  useEffect(() => {
    const fetchSlips = async () => {
      try {
        const response = await axios.get("http://localhost:5555/slips");
        setReceivedSlips(response.data.filter(slip => slip.status === 'pending'));
      } catch (error) {
        console.error('Error fetching slips:', error);
      }
    };
    fetchSlips();
  }, []);

  const acceptSlip = async (id, user_id, value) => {
    const confirmAccept = window.confirm("Are you sure you want to accept this slip?");
    if (!confirmAccept) {
      return;
    }
    try {
      const fetchBills = async () => {
        try {
          const response = await axios.get("http://localhost:5555/bill");
          const unpaidBills = response.data.filter(
            (bill) => bill.status === 'pending' && bill.User_ID === user_id
          );
          await Promise.all(unpaidBills.map(async (bill) => {
            await axios.put(`http://localhost:5555/bill/${bill._id}`, { status: "paid" });
          }));
        } catch (error) {
          console.error('Error fetching bills:', error);
        }
      };
      await axios.post("http://localhost:5555/pay", {
        User_ID: user_id,
        pmethod: "Slip",
        date: currentDate,
        Value: value,
      });
      await axios.put(`http://localhost:5555/slips/${id}`, { status: "Accepted" });
      setReceivedSlips(prevSlips =>
        prevSlips.filter(slip => slip._id !== id)
      );

      // Create new notification
      await axios.post("http://localhost:5555/noti", {
        date: currentTimeSL, // Include current date in the notification payload
        status: "unread",
        description: "Your slip has been Accepted",
        topic: "Slip",
        userID: id,
      });
      await axios.post("http://localhost:5555/pay", {
        User_ID: user_id,
        date: currentDate,
        Value: value
      });
      await fetchBills();
  
      
    } catch (error) {
      console.error('Error accepting slip:', error);
    }
  };
  

  const rejectSlip = async (id, user_id) => {
    const confirmReject = window.confirm("Are you sure you want to reject this slip?");
    if (!confirmReject) {
      return;
    }
    try {
      const fetchBills = async () => {
        try {
          const response = await axios.get("http://localhost:5555/bill");
          const unpaidBills = response.data.filter(
            (bill) => bill.status === 'pending' && bill.User_ID === user_id
          );
          await axios.put(`http://localhost:5555/slips/${id}`, { status: "Rejected" });
          setReceivedSlips(prevSlips =>
            prevSlips.filter(slip => slip._id !== id)
          );
          await Promise.all(unpaidBills.map(async (bill) => {
            await axios.put(`http://localhost:5555/bill/${bill._id}`, { status: "unpaid" });
          }));
        } catch (error) {
          console.error('Error fetching bills:', error);
        }
      };
  
      await fetchBills();
  
      // Create new notification
      await axios.post("http://localhost:5555/noti", {
        date: new Date().toISOString(),
        status: "unread",
        description: "Your slip has been rejected",
        topic: "Slip",
        userID: user_id
      });
    } catch (error) {
      console.error('Error rejecting slip:', error);
    }
  };
  
  const viewSlip = (image) => {
    // In the viewSlip function
    window.location.href = `/viewslip?imageUrl=${encodeURIComponent(image)}`;
  };
  

  return (
    <div>
      <div className="bg-[#DAF7A6]">
        <BillLogo />
        <br/><br/><br/><br/><br/>
      </div>
      <div>
        <br/><br/>
      </div>
      <center>
        <div className="max-w-[1300px] w-full">
          {receivedSlips.length === 0 ? (
            <div className="text-center text-gray-600 font-semibold">
              No slips available for review
            </div>
          ) : (
            receivedSlips.map((slip) => (
              <div
                key={slip._id}
                className="bg-[#E8DFCA] rounded-lg shadow-md mb-4 p-4"
              >
                <div className="mb-2">
                  <span className="text-gray-600 font-semibold">User ID: </span>
                  <span>{slip.User_ID}</span>
                </div>
                <div className="mb-2">
                  <span className="text-gray-600 font-semibold">Amount: </span>
                  <span>LKR: {slip.Value}</span>
                </div>
                <div className="mb-2">
                  <span className="text-gray-600 font-semibold">Status: </span>
                  <span>{slip.status}</span>
                </div>
                <button
                  onClick={() => acceptSlip(slip._id, slip.User_ID, slip.Value)}
                  className="bg-[#3350df] text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => rejectSlip(slip._id, slip.User_ID)}
                  className="bg-[#df3339] text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Reject
                </button>
                <Link to={`/viewslip`}>
                  <button
                    onClick={() => viewSlip(slip.imagePath)}
                    className="bg-[#3df5f5] text-white font-bold py-2 px-4 rounded"
                  >
                    View Slip
                  </button>
                </Link>
              </div>  
            ))
          )}
          <div className="flex justify-center"></div>
        </div>
      </center>
    </div>
  );
};
export default ReceivedSlips;
