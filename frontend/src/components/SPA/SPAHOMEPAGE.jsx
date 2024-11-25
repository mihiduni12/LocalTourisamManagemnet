import React, { useEffect, useState } from "react";
import homepage from "../../images/homepage.png";
import spamenu from "../../images/ayurvedic-spa-menu.png";
import classicalspa from "../../images/classical-spa-rituals.png";
import { Link } from "react-router-dom";

const ScrollFadeIn = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const top = window.scrollY;
      const windowHeight = window.innerHeight;
      const element = document.getElementById("fade-in-element");
      if (element) {
        const elementTop = element.offsetTop;
        if (top + windowHeight > elementTop + 100) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <p
      id="fade-in-element"
      className={`text-2xl text-gray-800 font-serif leading-relaxed ${isVisible ? "animate-fadeInSlow" : "opacity-0"}`}
    >
      {children}
    </p>
  );
};

function SPAHOMEPAGE() {
  return (
    <div>
      <div className="spa-menu p-20 max-w-7.5xl mx-auto text-center" style={{ backgroundImage: 'linear-gradient(to bottom, #2ECC71, #001F3F)' }}>
        <div className="spa-menu p-10 max-w-6xl mx-auto text-center bg-[#f0e9b9] rounded-3xl">

          <div className="relative">
            <img
              src={homepage}
              alt="HomePage"
              className="border border-black w-[100%] h-auto object-cover mb-10 mt-4"
              style={{ minHeight: '360px', filter: 'brightness(50%)' }}
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <h2 className="text-7xl text-[#478f65] mb-100 font-Satisfy antialiased font-medium text-center animate-fadeInSlow" style={{ WebkitTextStrokeWidth: '0.3px', WebkitTextStrokeColor: 'white' }}>
                Harmony through Nature, Wellness for All 
              </h2>
            </div>
          </div>

          <div className="flex justify-center items-center bg-gradient-to-b from-[#FCE5D4] to-[#F8BDD8] rounded-lg p-8 mb-12">
            <div className="max-w-4xl text-center">
              <ScrollFadeIn>
                Explore the hidden gems of tranquility at our Ceylon Vibes SPA in Kandy. Immerse yourself in a journey of self-discovery through our curated menu of wellness offerings.
              </ScrollFadeIn>
              <br></br>
              <div className="treatments mb-12">
                <h4 className="text-5xl text-[#064E3B]  mb-12 font-bold leading-snug">
                <ScrollFadeIn>
                  Unveil Your Serenity
                  </ScrollFadeIn>
                </h4>

                <h3 className="text-2xl text-gray-800 font-mono leading-relaxed">
                <ScrollFadeIn>
                  Browse through the menu of our Ceylon Vibes SPA in Kandy to discover the treatment that best suits you
                  </ScrollFadeIn>
                </h3>

                <div className="flex justify-center spa-categories grid grid-cols-1 gap-8"></div>

              </div>
            </div>
          </div>

          <div className="flex justify-center spa-categories grid grid-cols-1 gap-8">
            <div className="ayurvedic-spa bg-white p-6 rounded-lg shadow-xl mb-8 border border-[#78bf3a] transform transition duration-300 hover:scale-105">
              <img src={spamenu} alt="Ayurvedic-spa-menu" className="w-full h-64 object-cover mb-4" />
              <h4 className="text-3xl font-mono antialiased text-gray-800 mb-2 font-weight-700">AYURVEDIC SPA MENU</h4>
              <p className="text-black font-serif leading-relaxed">Browse through the menu of our Ayurveda SPA in Kandy to discover the treatment that best suits you. The Ayurvedic SPA Menu at The Ceylon Vibes & Spa features a host of luxurious therapies that are designed to improve the well-being of your mind and body.</p>
              <br />
              <Link to="/ayurvedic-spa-menu">
                <button className="bg-[#059669] hover:bg-[#065F46] text-white font-bold py-2 px-4 rounded-md shadow-lg transition duration-200">
                  View for More
                </button>
              </Link>
            </div>
          </div>

          <br></br>
          <br></br>
          <br></br>


          <div className="flex justify-center spa-categories grid grid-cols-1 gap-8">
            <div className="classical-spa-rituals bg-white p-6 rounded-lg shadow-xl mb-8 border border-[#92b6da] transform transition duration-300 hover:scale-105">
              <img src={classicalspa} alt="classical-spa-rituals" className="w-full h-64 object-cover mb-4" />
              <h4 className="text-3xl font-mono antialiased text-gray-800 mb-2">CLASSICAL SPA RITUALS</h4>
              <p className="text-black font-serif leading-relaxed">For treatments that are ideal for your well-being, browse through the list of Classical SPA Rituals at our SPA hotel. We guarantee a luxurious and holistic experience perfect for your mind, body and soul.</p>
              <br />
              <Link to="/ayurvedic-spa-classical">
                <button className="bg-[#059669] hover:bg-[#065F46] text-white font-bold py-2 px-4 rounded transition duration-200">
                  View for More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SPAHOMEPAGE;
