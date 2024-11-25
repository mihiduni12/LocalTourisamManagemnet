import React, { useState, useEffect } from "react";
import axios from "axios";
import GradientOpen from "../../components/Organic Items/GradientOpen.jsx";
import HeaderText from "../../components/Organic Items/HeaderText.jsx";
import GradientClose from "../../components/Organic Items/GradientClose.jsx";
import TextGrid from "../../components/Organic Items/TextGrid.jsx";
import FoodCatagory from "../../components/Organic Items/FoodCatagory.jsx";
import Header from "../../components/Header/Header.jsx";
import GradientOpen2 from "../../components/Organic Items/GradientOpen2.jsx";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import ShopInside from "./ShopInside.jsx";
import CarouselAnimation from "../../components/Organic Items/CarouselAnimation.jsx";
import Banner from "../../components/Organic Items/Banner.jsx";
import GradientClose2 from "../../components/Organic Items/GradientClose2.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { motion } from "framer-motion";
import { GlobalproductsInCart } from "./ShopInside.jsx";
import { useUser } from '@clerk/clerk-react';


const Shop = ({ catagories, fetchCatagories, offers, fetchOffers }) => {



  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          delay: 1 / 10,
        }}
      >
        <Header />
        <div>
          <HeaderText />
          <div className="bg-yellow h-[570px] w-[100%] mb-0 "></div>
          <GradientOpen />
          <TextGrid />
          <GradientClose />
          <div className="bg-yellow h-[1010px] w-[100%] mb-0 relative">
            <FoodCatagory items={catagories} fetchItems={fetchCatagories} />
          </div>
          <GradientOpen2 />
          <Banner />
          <GradientClose2 />
          <div className="bg-yellow h-[755px] w-[100%] mb-0 relative">
            <CarouselAnimation offers={offers} fetchOffers={fetchOffers} />
          </div>
        </div>
        <Footer />
      </motion.div>
    </div>
  );
};

export default Shop;
