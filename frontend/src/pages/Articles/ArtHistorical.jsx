import React, { useState } from "react";
import LogoArticle from "../../components/articles/LogoArticle";
import Historical from "../../components/articles/Historical";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import ForY from "../../components/articles/ForY";
import Buttons from "../../components/Header/Buttons";
import SearchBar from "../../components/Header/SearchBar";
import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/Footer/Footer";
function ArtHistorical() {
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  // Function to handle search query change
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div style={{ backgroundImage: 'linear-gradient(to bottom,#f6e5e4,#259f6c' }}>
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
        <LogoArticle />
        <Buttons />
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
                onChange={handleSearchQueryChange}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-3 mr-4"
              >
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
        <Navbar />
      </div>
      <br></br>
      <br></br>

      <br></br>
      <br></br>
      <br></br>
      <div>
        <br></br>
        <div className=" flex justify-evenly w-full mx-auto">
          <Link to="/art1">
            <button className="bg-[#879d62] font-Barlow mr-4 mt-4 rounded-md h-10 w-[270px] text-black text-xl pr-[15px]">
              Attractions and Landmarks
            </button>
          </Link>

          <Link to="/art2">
            <button className="bg-[#879d62] font-Barlow mr-4 mt-4 rounded-md h-10 w-[270px] text-black text-xl">
              Natural Wonders
            </button>
          </Link>

          <Link to="/art3">
            <button className="bg-[#879d62] font-Barlow mr-4 mt-4 rounded-md h-10 w-[270px] text-black text-xl">
              Cultural Experience
            </button>
          </Link>

          <Link to="/art4">
            <button className="bg-[#7e4b4b] font-Barlow mr-4 mt-4 rounded-md h-10 w-60 text-black text-lg">
              Historical Sites
            </button>
          </Link>
        </div>
      </div>
      <br></br>
      <Historical searchQuery={searchQuery} />
      <br></br>
      <br></br>
      <Footer />
    </div>
  );
}

export default ArtHistorical;
