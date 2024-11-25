import React, { useState, useEffect } from "react";
import axios from 'axios';
import BillLogo from '../../components/Bill/BillLogo';
import { Link } from "react-router-dom";

const AcceptedSlips = () => {
  const [acceptedSlips, setAcceptedSlips] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState(""); // State to store current sort type
  const [currentPage, setCurrentPage] = useState(1); // State to store current page number
  const [billAvailable, setBillAvailable] = useState(false); 

  useEffect(() => {
    const fetchAcceptedSlips = async () => {
      try {
        const response = await axios.get("http://localhost:5555/slips");
        setAcceptedSlips(response.data.filter(slip => slip.status === 'Accepted'));
        const billExists = response.data.some(slip => slip.status === 'Accepted' && slip.billAvailable);
        setBillAvailable(billExists);
      } catch (error) {
        console.error('Error fetching accepted slips:', error);
      }
    };
    fetchAcceptedSlips();
  }, []);

  const filteredSlips = acceptedSlips.filter(slip =>
    slip.User_ID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle sorting by various criteria
  const handleSort = (type) => {
    setSortType(type);
    let sortedSlips = [...filteredSlips];
    switch(type) {
      case 'firstToLast':
        sortedSlips.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'lastToFirst':
        sortedSlips.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'highestValue':
        sortedSlips.sort((a, b) => b.Value - a.Value);
        break;
      default:
        sortedSlips.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    setAcceptedSlips(sortedSlips);
  };

  // Function to handle changing current page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to handle deletion of all slips
  // const handleDeleteAllSlips = async () => {
  //   try {
  //     // Iterate through filteredSlips array and delete each slip
  //     for (const slip of filteredSlips) {
  //       await axios.delete(`http://localhost:5555/slips/${slip._id}`);
  //     }
  //     setAcceptedSlips([]); // Clear the state after deletion
  //   } catch (error) {
  //     console.error('Error deleting slips:', error);
  //   }
  // };
  

  // Calculate start and end index for current page
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;

  return (
    <div className="accept">
      <div className='bg-[#DAF7A6]'>
        <br/><div className="mt-[10px] ml-[650px] font-Spirax absolute text-[30pt] ">
          Accepted Slips
        </div>
        <BillLogo />
        <div className="">
          <div
            className="mr-[45px] mt-0 pl-[297px] float-right overflow-hidden flex w-[500px]"
            style={{ background: "#edf2f7;" }}
          >
            <div className="relative mx-auto font-bold">
              <input
                className="border-2 border-[#a07628] bg-[#f9f9e9] h-11 w-[200px] pl-5 pr-16 rounded-[14px] text-[13pt] focus:outline-none"
                type="search"
                name="search"
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                <svg
                  className="text-gray-600 h-4 w-4 fill-current "
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  xmlSpace="preserve"
                  width="512px"
                  height="512px"
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <br/><br/><br/><br/>
      </div>
      <br/>
      <div className="container mx-auto px-4 py-8 bg-[#b3eca5]">
        {/* Button to delete all slips
        <button onClick={handleDeleteAllSlips} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2">
          Delete All Slips
        </button> */}

        {/* Dropdown for sorting  */}
        <div className="flex justify-end mb-4">
          <select onChange={(e) => handleSort(e.target.value)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            <option value="firstToLast">First to Last</option>
            <option value="lastToFirst">Last to First</option>
            <option value="highestValue">Highest Value</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-[#808080] text-left text-xs font-5xl text-white uppercase tracking-wider">Index</th>
                <th className="px-6 py-3 bg-[#808080] text-left text-xs font-5xl text-white uppercase tracking-wider">User ID</th>
                <th className="px-6 py-3 bg-[#808080] text-left text-xs font-5xl text-white uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 bg-[#808080] text-left text-xs font-5xl text-white uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 bg-[#808080] text-left text-xs font-5xl text-white uppercase tracking-wider">Image</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSlips.slice(startIndex, endIndex).map((slip, index) => (
                <tr key={slip._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{startIndex + index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{slip.User_ID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(slip.date).toLocaleDateString()}</td>
                 
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{slip.Value}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <img src={slip.imagePath} alt="Slip" className="h-10 w-10 rounded-full" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(filteredSlips.length / 10) }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`mx-2 px-3 py-1 rounded-lg border ${currentPage === i + 1 ? 'bg-midnight text-white' : 'bg-white text-blue-500'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <center>
        <Link to="/received">
            <button className="bg-[#008000] text-white font-bold py-2 px-4 rounded mt-4">
              Back
            </button>
          </Link>
          </center>
      </div>
    </div>
  );
};

export default AcceptedSlips;
