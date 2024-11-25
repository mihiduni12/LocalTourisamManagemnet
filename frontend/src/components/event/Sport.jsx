import React, { useEffect, useState } from "react";
import EventHeader from "./EventHeader";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from "../Header/SearchBar";

function EventComponent({ events }) {
  return (
    <div className="flex flex-wrap justify-center">
      {events.map((event, index) => (
        <div
          key={index}
          className="w-[450px] h-[600px] p-4 m-4 border border-gray-300 rounded-md flex flex-col justify-between"
          style={{ maxWidth: "350px", maxHeight: "900px" }}
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
  );
}

function Sport() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    try {
      const response = await axios.get("http://localhost:5555/events");
      const filteredEvents = response.data.filter(
        (event) =>
          event.Category === "sport" &&
          event.EventName.toLowerCase().includes(term.toLowerCase())
      );
      setEvents(filteredEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to fetch events");
    }
  };

  useEffect(() => {
    handleSearch({ target: { value: searchTerm } });
  }, [searchTerm]);

  return (
    <div className="h-24 bg-[#eba5f1]">
      <EventHeader />
      <div className="flex flex-col justify-center pt-[25px]">
        <div className="">
          <div
            class="mr-[45px] mt-0 pl-[297px] float-right overflow-hidden flex w-[500px]"
            style={{ background: "#edf2f7;" }}
          >
            <div class="relative mx-auto font-bold">
              <input
                class="border-2 border-[#a07628] bg-[#f9f9e9] h-11 w-[200px] pl-5 pr-16 rounded-[14px] text-[13pt] focus:outline-none"
                type="search"
                name="search"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
              <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
                <svg
                  class="text-gray-600 h-4 w-4 fill-current "
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
      </div>
      <div className="pt-[100px] flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="flex justify-center mb-4">
          <Link to="/music3">
            <button className="bg-[#9d6262d3] text-Black font-bold py-2 px-4 rounded mr-4">
              Music Events
            </button>
          </Link>
          <Link to="/sport3">
            <button className="bg-[#381864d8] text-Black font-bold py-2 px-4 rounded mr-4">
              Sports Events
            </button>
          </Link>
          <Link to="/fes3">
            <button className="bg-[#9d6262d3] text-Black font-bold py-2 px-4 rounded mr-4">
              Festival Events
            </button>
          </Link>
          <Link to="/food3">
            <button className="bg-[#9d6262d3] text-Black font-bold py-2 px-4 rounded">
              Food Events
            </button>
          </Link>
        </div>
        <EventComponent events={events} />
      </div>
      <Footer />
    </div>
  );
}

export default Sport;
