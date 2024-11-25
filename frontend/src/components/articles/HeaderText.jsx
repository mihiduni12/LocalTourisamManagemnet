import React from "react";
import img1 from "../../images/Sigiriya.jpg"
import { Link } from "react-router-dom";



export default function HeaderText() {
  return (
    <div>
      <div className="flex flex-col items-left h-screen">
        <div className="h-[200px]"></div>
        <div className="w-[600px] ml-[90px]">
        <h1 className="text-[35pt] text-left font-CantoraOne ml-[30px]">Engaging articles<br/> covering diverse <br/>topics to  entertain, <br/> and inspire</h1>
        </div><img src={img1} alt="" className="w-[500px] h-[400px] absolute right-0 mr-[100px] mt-[160px] rounded-[22px]"/>
        <Link to="/artIn">
      <button className="bg-[#879d62] w-[300px] hover:bg-yellow-500 text-black font-bold py-2 px-4 ml-[120px] mt-[40px] rounded-full ">
        View Articles
      </button>
      </Link>
      </div>
    </div>
  );
}