import React from 'react';
import { Link } from 'react-router-dom';

const HomePageBody = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {/* SPA */}
      <Link to="/SPAhome">
      <div className="w-64 h-64 bg-[#41C9E2] m-4 flex justify-center items-center">
        <span className="text-black text-3xl">SPA</span>
      </div>
      </Link>
      {/* Payment */}
      <Link to="/pay">
      <div className="w-64 h-64 bg-[#41C9E2] m-4 flex justify-center items-center">
        <span className="text-black text-3xl">Payment</span>
      </div>
      </Link>
      {/* Articles */}
      <Link to="/arts">
      <div className="w-64 h-64 bg-[#41C9E2] m-4 flex justify-center items-center">
        <span className="text-black text-3xl">Articles</span>
      </div>
      </Link>
      {/* Tours */}
      <Link to="/tour">
      <div className="w-64 h-64 bg-[#41C9E2] m-4 flex justify-center items-center">
        <span className="text-black text-3xl">Tours</span>
      </div>
      </Link>
      <Link to="/trans">      <div className="w-64 h-64 bg-[#41C9E2] m-4 flex justify-center items-center">
        <span className="text-black text-3xl">Transport</span>
      </div>
      </Link>

      {/* Shop */}
      <Link to="/shop">
      <div className="w-64 h-64 bg-[#41C9E2] m-4 flex justify-center items-center">
        <span className="text-black text-3xl">Shop</span>
      </div>
      </Link>
      {/* Events */} 
      <Link to="/even">
      <div className="w-64 h-64 bg-[#41C9E2] m-4 flex justify-center items-center">
        <span className="text-black text-3xl">Events</span>
      </div>
      </Link>
       {/* Events */}
       <Link to="/noti">
       <div className="w-64 h-64 bg-[#41C9E2] m-4 flex justify-center items-center">
        <span className="text-black text-3xl">Notifications</span>
      </div>
      </Link>
    </div>
  );
};

export default HomePageBody;
