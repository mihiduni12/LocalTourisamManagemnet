import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BillsComponent = ({ user_id }) => {
  const [unpaidBills, setUnpaidBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get("http://localhost:5555/bill");
        const unpaidBillsData = response.data.filter(
          (bill) => bill.status === 'paid' && bill.User_ID === 'lahiru'
        );
        setUnpaidBills(unpaidBillsData);
      } catch (error) {
        console.error('Error fetching bills:', error);
      }
    };
    fetchBills();
  }, [user_id]);

  const handleDelete = async (billId) => {
    try {
      await axios.delete(`http://localhost:5555/bill/${billId}`,);
      // After successful deletion, update the unpaidBills state to reflect the changes
      setUnpaidBills(prevBills => prevBills.filter(bill => bill._id !== billId));
    } catch (error) {
      console.error('Error deleting bill:', error);
    }
  };

  return (
    <div>
      <h2>Unpaid Bills</h2>
      <ul>
        {unpaidBills.map(bill => (
          <li key={bill._id}>
            {bill.User_ID} - {bill.Value}
            <button onClick={() => handleDelete(bill._id)}>DELETE</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BillsComponent;
