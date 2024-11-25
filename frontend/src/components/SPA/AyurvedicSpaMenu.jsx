import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import spamenu from "../../images/ayurvedic-spa-menu.png";

function AyurvedicSpaMenuComponent({ service }) {
  return (
    <div className="w-80 p-6 m-6 border border-gray-300 rounded-md flex flex-col justify-between">
      <h2 className="text-xl font-bold mb-4 text-center">{service.topic}</h2>
      <p className="text-gray-700 text-justify mb-4">{service.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-gray-700 font-bold">{service.Time}</p>
        <p className="text-gray-700 font-bold">{service.Price}</p>
      </div>
    </div>
  );
}

function AyurvedicSpaMenu() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5555/ayurvedicSPA");
        setServices(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to fetch services");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredServices = services.filter((service) =>
    service.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100" style={{ backgroundImage: `url(${spamenu})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1 className="text-5xl font-bold mb-8 mt-20 font-mono antialiased font-weight-600 flex items-center">
        Ayurvedic SPA Menu
        <div className="ml-8 mb-5">
          <input
            type="text"
            placeholder="Search Services..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border-4 border-[#a07628] bg-[#ececbe] h-11 w-[255px] pl-3 pr-16 rounded-[14px] text-[13pt] focus:outline-none"
          />
        </div>
      </h1>
      <Link to="/appoitment">
        <button className="bg-[#059669] hover:bg-[#065F46] text-white font-bold py-2 px-4 rounded">
          BOOK NOW
        </button>
      </Link>

      <br />
      <br />
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : filteredServices.length === 0 ? (
        <p>No Services Found</p>
      ) : (
        <div className="flex flex-wrap justify-center">
          {filteredServices.map((service, index) => (
            <div className="bg-white bg-opacity-90 p-8 rounded-lg mb-8 mx-4 shadow-xl transform transition duration-300 hover:scale-105" key={index}>
              <AyurvedicSpaMenuComponent service={service} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default AyurvedicSpaMenu;
