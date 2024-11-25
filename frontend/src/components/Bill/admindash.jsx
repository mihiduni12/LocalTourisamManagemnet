import React from "react";
import { Link } from "react-router-dom";

const PaymentAdmin = () => {
  return (
    <div className="container mx-auto mt-10">
      <center><h1 className="text-3xl font-semibold mb-6">Payments</h1></center>
      <br/>
      <br/>
 
         <div className="flex justify-center space-x-6">
        
         <Link to="/received">    
         <button className="bg-[#7f77f3] hover:bg-[#4255b6] text-black font-semibold py-4 px-8 rounded-lg shadow-md">
          View Received Slips
        </button>
        </Link>
        <Link to="/acceptedslips">
        <button className="bg-[#80e685] hover:bg-[#378f3b] text-black font-semibold py-4 px-8 rounded-lg shadow-md">
          View Accepted Slips
        </button>
        </Link>
        <Link to="/paymentss">
        <button className="bg-[#e1e971] hover:bg-[#667629] text-black font-semibold py-4 px-8 rounded-lg shadow-md">
          Payment History
        </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentAdmin;
