import React from 'react';
import { Link } from 'react-router-dom';

const Nobills = () => {
  return (
    <div className="bg-[#7bb7f7] min-h-screen flex justify-center items-center">
     <div className="bg-white rounded-lg shadow-md p-8 w-[1200px] h-[500px] flex flex-col justify-center items-center text-center">
     <h2 className="text-teal-500 text-5xl font-bold mb-4">No Bills Available</h2>

        <Link to="/homee">
          <br></br>
          <button
            id="returnHomeButton"
            className="mt-4 bg-[#4CCD99] w-[200px] h-[80px] text-2xl hover:bg-[#72c737] text-white font-semibold py-2 px-4 rounded"
          >
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Nobills;
