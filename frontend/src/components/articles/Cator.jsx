import React from 'react';
import { Link } from 'react-router-dom';

function Cator() {
  return (
    <div>
   
      <div className="bg-[#7e4b4b] border border-gray-400 p-10 rounded mb-[120px] text-center m-auto mt-[140px] w-[800px] h-[450px]">
        <h1 className='text-black font-bold text-4xl'>Categories</h1>
      <Link to="/artLand">
        <button className="bg-[#879d62] hover:bg-blue-700 text-black font-bold py-2 px-4 rounded mb-2 w-[400px] h-[50px] mt-[50px]">
          Attraction and Landmarks
        </button>
        </Link>
        <br/>

        <Link to="/artNature">
        <button className="bg-[#879d62] hover:bg-green-700 text-black font-bold py-2 px-4 rounded mb-2  w-[400px] h-[50px]">
          Natural Wonders
        </button>
        <br/>
        </Link>

        <Link to="/artCulture">
        <button className="bg-[#879d62] hover:bg-red-700 text-black font-bold py-2 px-4 rounded mb-2  w-[400px] h-[50px]">
          Cultural Expirence
        </button><br/>
        </Link>

        <Link to="/artHistorical">
        <button className="bg-[#879d62] hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded w-[400px] h-[50px]">
          Historical Sites
        </button>
        </Link>
      </div>
    </div>
  );
}

export default Cator;
