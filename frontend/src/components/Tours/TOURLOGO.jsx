import React from "react"
import SearchBar from "../Header/SearchBar"
import Buttons from "../Header/Buttons"
import Navbar from "../Header/Navbar"

export default function TourLogo() {
    return (
        <div className="bg-[#98e7f0] flex justify-between h-32">
            <div className="font-Spirax text-[30pt]">CeylonVibes</div>
        <div className="font-Natural text-[17pt] ml-[10px]">Tour Homepage</div>
      <div className="flex items-center">
        <Buttons />
        <Navbar />

      
      <SearchBar />
    </div>
    </div>
    )
}