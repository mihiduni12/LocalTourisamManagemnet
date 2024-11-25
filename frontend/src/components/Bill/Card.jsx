import React, { useState } from "react";
import axios from "axios";

const Card = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const id = JSON.parse(localStorage.getItem("id"));
  const total = JSON.parse(localStorage.getItem("total"));

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [cvvError, setCvvError] = useState("");

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
    if (e.target.value.length !== 16 || isNaN(e.target.value)) {
      setCardNumberError("Please enter a valid 16-digit card number.");
    } else {
      setCardNumberError("");
    }
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
    if (e.target.value.length !== 3 || isNaN(e.target.value)) {
      setCvvError("Please enter a valid 3-digit CVV.");
    } else {
      setCvvError("");
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      setCardNumberError("Please enter a valid 16-digit card number.");
      return;
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
      setCvvError("Please enter a valid 3-digit CVV.");
      return;
    }

    try {
      // Update bill statuses to "paid"
      const storedIds = localStorage.getItem('filteredBillIds');
      if (!storedIds) {
        alert("No filtered bill IDs found in local storage.");
        return;
      }
      const filteredBillIds = JSON.parse(storedIds);

      // Iterate over each filtered bill ID and update its status to "paid"
      for (const billId of filteredBillIds) {
        await axios.delete(`http://localhost:5555/bill/${billId}`);
      }

      // Create payment record
      await axios.post("http://localhost:5555/pay", {
        User_ID: id,
        pmethod: "card",
        date: currentDate,
        Value: total,
      });
      await axios.post("http://localhost:5555/noti", {
        date: new Date().toISOString(),
        status: "unread",
        description: `Your payment amount ${total} has been received Thank you !!`,
        topic: "card",
        userID: id,
      });
      // Redirect to success page after all payments are confirmed
      window.location.href = "/success";
    } catch (error) {
      console.error('Error updating status or creating payment record:', error);
      alert(`Failed to confirm payment. Please check the console for details.`);
    }

    console.log("Card Number:", cardNumber);
    console.log("Expiry Date:", expiryDate);
    console.log("CVV:", cvv);
    console.log("Name:", name);
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      
      <div className="px-6 py-4">
        
        <h2 className="text-lg font-semibold mb-2">Card Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
              Card Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cardNumber"
              type="text"
              placeholder="Enter card number"
              value={cardNumber}
              onChange={handleCardNumberChange}
              required
            />
            {cardNumberError && <p className="text-red-500 text-xs italic">{cardNumberError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
              Expiry Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="expiryDate"
              type="date"
              placeholder="Select expiry date"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
              CVV
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cvv"
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={handleCvvChange}
              required
            />
            {cvvError && <p className="text-red-500 text-xs italic">{cvvError}</p>}
          </div>
          <button 
            className="bg-[#44d658] text-Black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Confirm Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Card;
