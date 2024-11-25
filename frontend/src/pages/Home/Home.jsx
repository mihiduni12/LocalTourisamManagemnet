import React from "react";
import { motion } from "framer-motion";
import GradientOpen from "../../components/Home/Content/GradientOpen.jsx";
import HeaderText from "../../components/Home/Content/HeaderText.jsx";
import GradientClose from "../../components/Home/Content/GradientClose.jsx";
import Header from "../../components/Home/Header/Header.jsx";
import GradientOpen2 from "../../components/Home/Content/GradientOpen2.jsx";
import GradientClose2 from "../../components/Home/Content/GradientClose2.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import HeaderText1 from "../../components/Home/Content/HeaderText1.jsx";
import HeaderText2 from "../../components/Home/Content/HeaderText2.jsx";
import HeaderText3 from "../../components/Home/Content/HeaderText3.jsx";
import HeaderText4 from "../../components/Home/Content/HeaderText4.jsx";
import GradientOpen3 from "../../components/Home/Content/GradientOpen3.jsx";
import HeaderText5 from "../../components/Home/Content/HeaderText5.jsx";
import HeaderText6 from "../../components/Home/Content/HeaderText6.jsx";
import HeaderText7 from "../../components/Home/Content/HeaderText7.jsx";

const Home = () => {

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
          <div className="bg-[#ffb372] h-[570px] w-[100%] mb-0 "></div>
          <GradientOpen />
          <HeaderText1 />
          <GradientClose />
          <div className="bg-[#ffb372] h-[440px] w-[100%] ">
            <HeaderText2 />
          </div>
          <GradientOpen2 />
          <HeaderText3 />
          <GradientClose2 />
          <div className="bg-[#ffb372] h-[455px] w-[100%] mb-0 relative">
            <HeaderText4 />
          </div>
          <GradientOpen3 />
          <HeaderText5 />
          <GradientClose/>
          <div className="bg-[#ffb372] h-[505px] w-[100%] mb-0 relative">
            <HeaderText6 />
          </div>
          <GradientOpen />
          <HeaderText7 />
          <GradientClose />
        </div>
        <Footer />
      </motion.div>
    </div>
  );
};

export default Home;
