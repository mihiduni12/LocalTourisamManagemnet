import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EventPack = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5555/events");
        const filteredEvents = response.data.filter(
          (event) =>
            event.Category === "music" &&
            event.EventName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setEvents(filteredEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to fetch events");
        setLoading(false);
      }
    };

    fetchEvents();
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col justify-center pt-[25px]">
      <div className="">
        <div
          className="mr-[45px] mt-0 pl-[297px] float-right overflow-hidden flex w-[500px]"
        >
          <div className="relative mx-auto font-bold">
            <input
              class="border-2 border-[#a07628] bg-[#f9f9e9] h-11 w-[200px] pl-5 pr-16 rounded-[14px] text-[13pt] focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
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

      <div className="pt-[20px] flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="flex justify-center mb-4">
          <button className="bg-[#74629dd3] text-Black font-bold py-2 px-4 rounded mr-4">
            Music Events
          </button>
          <Link to={"/Sport"}>
            <button className="bg-[#9d6298d3] text-Black font-bold py-2 px-4 rounded mr-4">
              Sports Events
            </button>
          </Link>
          <Link to={"/Festival"}>
            <button className="bg-[#9d6262d3] text-Black font-bold py-2 px-4 rounded mr-4">
              Festival Events
            </button>
          </Link>
          <Link to={"/Food"}>
            <button className="bg-[#9d6262d3] text-Black font-bold py-2 px-4 rounded">
              Food Events
            </button>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center">
          {events.map((event, index) => (
            <div
              key={index}
              className="w-96 h-[600px] p-4 m-4 border border-gray-300 rounded-md flex flex-col justify-between"
              style={{ maxWidth: "3000px", maxHeight: "900px" }}
            >
              <h2 className="text-lg font-bold mb-2">{event.EventName}</h2>
              <img
                src={event.imageUrl}
                alt={event.EventName}
                className="w-full h-[200px] object-cover mb-2"
              />
              <p className="text-sm mb-2">{event.Description}</p>
              <p className="text-sm mb-2 font-bold">Date: {event.Date}</p>
              <p className="text-sm mb-2 font-bold">Time: {event.Time}</p>
              <p className="text-sm mb-2 font-bold">Location: {event.Location}</p>
              <p className="text-sm mb-2 font-bold">Category: {event.Category}</p>
              <Link to={`/Payment/${event._id}`}>
                <button className="bg-[#879d62] text-Black font-bold py-2 px-4 rounded">
                  Buy Ticket
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPack;
