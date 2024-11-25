import React, { useEffect, useState } from "react";
import Buttons from "../../components/Header/Buttons";
import SearchBar from "../../components/Header/SearchBar";
import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/Footer/Footer";

import LogoRentals from "../../components/rental/logoRentals";
import TimeSelector from "../../components/rental/TimeSelector";
import { useParams } from "react-router-dom";
import RatingReviewForm from "../../components/ratings/createrating";
import RatingView from "../../components/ratings/ratingview";

function VehicalRental() {
  let { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5555/api/cars/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch car details");
        }
        const data = await response.json();
        setCar(data.car);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching car details:", error);
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  return (
    <div className="bg-[#c7aa6d]">
      {console.log(id)}
      <div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Coda&family=Fira+Sans&family=Dancing+Script&family=Kay+Pho+Du&family=Spirax&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Abel&family=Cantora+One&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sacramento&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bad+Script&display=swap"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.5.1/css/all.css"
        />
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-light.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Protest+Revolution&display=swap"
          rel="stylesheet"
        />
      </div>
      <div className="bg-yellow h-[114px] w-[100%] fixed z-20">
      <LogoRentals/>
        <Buttons />
        <SearchBar />
        <Navbar />
      </div>
      <br></br>

      <div>
        <div className="flex flex-row items-left h-screen mt-28">
          <div className="ml-72">
            {loading ? (
              <p>Loading...</p>
            ) : car ? (
              <>
                <h1 className="text-[40pt] font-CantoraOne">{car.brand}</h1>
                <h2 className="text-[20pt] font-Times New Roman">{`Rs.${car.price} Rent per hour/-`}</h2>
                <h3 className="text-[20pt] font-Times New Roman">
                  {`Fuel type: ${car.fuelType}`}
                  <br />
                  {`Max Persons: ${car.maxPersons}`}
                </h3>
                <br />
                <br />
                <br />
                <TimeSelector car={car} />
           
              </>
            ) : (
              <p>Car not found</p>
            )}
          </div>
          {car && (
            <img
              src={car.imageUrl}
              alt={car.brand}
              className="w-[500px] h-[400px] absolute right-0 mr-[150px] mt-[120px] rounded-[22px]"
            />
          )}
        </div>
         <RatingReviewForm productID={id} />
         <RatingView productID={id}/> 
      </div>
      <Footer />
    </div>
  );
}

export default VehicalRental;
