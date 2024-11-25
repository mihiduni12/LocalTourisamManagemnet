import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import { useUser } from "@clerk/clerk-react"

const Bill = () => {
  const [billAmounts, setBillAmounts] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const { user } = useUser();
	let userID;

	try {
		const userId = user.id;
		userID = userId;
	} catch (error) {
		console.error("Error reading user.id:", error);
	}
  
  const idd=userID;
  localStorage.setItem('id', JSON.stringify(idd));
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get("http://localhost:5555/bill");
        const unpaidBills = response.data.filter(
          (bill) => bill.status === 'unpaid' && bill.User_ID === idd
        );
  
        // Extract bill IDs
        const billIds = unpaidBills.map(bill => bill._id);
  
        // Save bill IDs to local storage
        localStorage.setItem('filteredBillIds', JSON.stringify(billIds));
  
        let totalAmount = 0;
        unpaidBills.forEach((bill) => {
          totalAmount += bill.Value;
        });
  
        setBillAmounts(unpaidBills);
        setTotal(totalAmount);
      } catch (error) {
        console.error('Error fetching bills:', error);
      }
    };
  
    fetchBills();
  }, []);
  

  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Set background color
    doc.setFillColor(219, 218, 147);
    doc.rect(0, 0, 210, 297, 'F');
  
    let y = 20;
  
    // Set color for the top three lines to red
    doc.setFillColor(142, 237, 226);
    doc.rect(0, 0, 210, 10, 'F');
    doc.rect(0, 10, 210, 10, 'F');
    doc.rect(0, 20, 210, 10, 'F');
  
    // Add bill topic
    doc.setFillColor(255, 255, 0); // Reset color to yellow
    doc.setFont('courier', 'bold'); // Change font to a bold one
    doc.setFontSize(24);
    doc.text("Total Bill", 105, y, { align: "center" });
    y += 20;
  
    // Add bill items
    doc.setFillColor(255, 255, 0); // Reset color to yellow
    doc.setFont('courier', 'bold'); // Change font to a monospace bold font
    doc.text(`\n   Service \tValue`, 20, y);
    billAmounts.forEach((bill, index) => {
     
    doc.text(`\n\n\n${index + 1}. ${bill.type}\t Rs.${bill.Value}`, 20, y);
    y += 10;
    });
  
    // Add total
    doc.setFont('times', 'bold'); // Make the font bold
    doc.text(`\n\n\n\n\tTotal \t\t\t  Rs.${total}`, 20, y);
    y += 20;
  
    // Save the PDF with a filename
    doc.save("bill.pdf");
  };

  const handleCheckout = () => {
    if (selectedOption === null) {
      alert("Please select a payment method");
    } else {
      if (selectedOption === "card") {
        window.location.href = `/checkout/card`;
      } else if (selectedOption === "slip") {
        window.location.href = `/checkout/slip`;
      }
    }
  };
  localStorage.setItem('total', JSON.stringify(total));
  
  return (
    <div className="w-1/2 mx-auto bg-white shadow-md rounded-lg text-xl overflow-hidden">
     
      {total <= 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto mt-20 flex flex-col justify-center items-center text-center">
          <h2 className="text-teal-500 text-5xl font-bold mb-4">No Bills Available</h2>
          <Link to="/">
            <button
              id="returnHomeButton"
              className="mt-4 bg-[#008000] w-48 h-16 text-xl hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              Return to Home
            </button>
          </Link>
        </div>
      ) : (
        <div className="px-6 py-4">
           <div className="flex justify-end mt-4 mr-4">
        
      </div>
          {/* Render bill amounts */}
          <div className="max-w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-2" style={{color: '#FF5733', fontSize: '25px', fontFamily: 'Arial, sans-serif'}}>Type</th>
                  <th className="text-left pb-2" style={{color: '#FF5733', fontSize: '25px', fontFamily: 'Arial, sans-serif'}}>Date</th>
                  <th className="text-right pb-2" style={{color: '#FF5733', fontSize: '25px', fontFamily: 'Arial, sans-serif'}}>Value</th>
                </tr>
              </thead>
              <tbody>
                {billAmounts.map((bill, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2" style={{color: 'blue'}}>{bill.type}</td>
                    <td className="py-2" style={{color: 'blue'}}>{bill.date}</td>
                    <td className="text-right py-2" style={{color: 'blue'}}>{bill.Value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Total */}
          <div className="flex justify-between items-center my-4">
            <span className="text-gray-700 font-semibold text-3xl">Total</span>
            <span className="font-bold text-3xl">{total}</span>
          </div>
          {/* Checkout Dropdown */}
          <div className="mb-4">
            <select
              className="w-full bg-gray-200 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Select Payment Method</option>
              <option value="card">Card</option>
              <option value="slip">Slip</option>
            </select>
          </div>
          {/* Checkout Button */}
          <div className="text-right">
            <button
              className="bg-[#008000] hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleCheckout}
            >
              Go to Checkout
            </button>
            <br/> <br/>
            <button
          className="bg-[#A020F0] hover:bg-[#1976D2] text-white font-bold py-2 px-4 rounded focus:shadow-outline"
          onClick={generatePDF}
        >
          Download Bill as PDF
        </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bill;
