import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import TotalBill from "./pages/pay/TotalBill.jsx";
import Notification from "./pages/Noti/Notification.jsx";
import CardPayment from "./pages/pay/CardPayment.jsx";
import UploadSlip from "./pages/pay/UploadSlip.jsx";
import PaymentSuccess from "./pages/pay/Paymentsucess.jsx";
import SlipUploaded from "./pages/pay/SlipUploaded.jsx";
import Homepagee from "./pages/Hom/Homepagee.jsx";
import ReceivedSlips from "./components/Bill/ReceivedSlips.jsx";
import ConnectedLinkComponent from "./pages/pay/slipview.jsx";
import Nobills from "./pages/pay/nobills.jsx";
import AcceptedSlips from "./components/Bill/Acceptedslips.jsx";
import EventPage from "./pages/event/EventPage.jsx";
import Food from "./components/event/Food.jsx";
import Festival from "./components/event/Festival.jsx";
import Sport from "./components/event/Sport.jsx";
import Payment from "./components/event/payment.jsx";
import EventPack from "./components/event/EventPackages.jsx";
import ArtLandmarks from "./pages/Articles/ArtLandmarks.jsx";
import ArtNatWon from "./pages/Articles/ArtNatWon.jsx";
import ArtCulturalExpr from "./pages/Articles/ArtCulturalExpr.jsx";
import ArtHistorical from "./pages/Articles/ArtHistorical.jsx";
import ArticleInter from "./pages/Articles/ArticleInter.jsx";
import ArtCatorgeries from "./pages/Articles/Artcat.jsx";
import ViewArticle from "./pages/Articles/ViewArticle.jsx";

import BusRental from "./pages/rental/BusRent.jsx";
import VanRental from "./pages/rental/VanRent.jsx";
import VehicalRental from "./pages/rental/VehicleRent.jsx";
import CarRental from "./pages/rental/CarRent.jsx";
import ShowTours from "./pages/Tours/ShowTours.jsx";
import TourCusHome from "./pages/Tours/TourCusHome.jsx";

import SpaHomepage from "./pages/SPA/SpaHomepage.jsx";
import AyurvedicPage from "./pages/SPA/AyurvedicSPAM.jsx";
import ClassicalPage from "./pages/SPA/AyurvedicSPAC.jsx";
import SpaAppointmentPage from "./pages/SPA/SpaServiceAppointment.jsx";
import ClassicalAppointmentPage from "./pages/SPA/ClassicalAppoitment.jsx";
import ServiceConfirmPage from "./pages/SPA/SpaServiceConfirm.jsx";
import ServicePaymentPage from "./pages/SPA/SpaPayment.jsx";
import axios from "axios";
import "./App.css"
import { SignedOut } from "@clerk/clerk-react";
import SignInPage from "./components/Header/sign-in.jsx";
import UserProfilePage from "./components/Header/user-profile.jsx";
import Payhistory from "./components/Bill/Paymenthis.jsx";
import RatingReviewAdminHome from "./components/ratings/RatingReviewAdminHome.jsx";
import Home from "./pages/Home/Home.jsx";
import Shop from "./pages/OrganicItems/Shop.jsx";
import ShopInside from "./pages/OrganicItems/ShopInside.jsx";
import EditRatingReview from "./components/ratings/EditRatingReview.jsx";
import DeleteRatingReview from "./components/ratings/DeleteRatingReview.jsx";
const App = () => {
  // console.disableYellowBox = true;

  const [nuts, setNuts] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [sweetners, setSweetners] = useState([]);
  const [catagories, setCatagories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [cart, setCart] = useState([]);

  axios.defaults.baseURL = `http://localhost:5555`;

  const fetchNuts = async () => {
    try {
      const response = await axios.get("/api/Nuts&Seeds");
      setNuts(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const fetchSnacks = async () => {
    try {
      const response = await axios.get("/api/Snacks");
      setSnacks(response.data.data);
      console.log("OK")
    } catch (error) {
      console.error("Error fetching snacks:", error);
      console.log("not OK")
    }
  };
  const fetchSweetners = async () => {
    try {
      const response = await axios.get("/api/Sweetners");
      setSweetners(response.data.data);
    } catch (error) {
      console.error("Error fetching sweetners:", error);
    }
  };



  const fetchCatagories = async () => {
    try {
      const response = await axios.get("/api/catagories");
      setCatagories(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchItemsCatagory = async () => {
    try {
      const response = await axios.get("/api/catagories");
      setCatagories(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchOffers = async () => {
    try {
      const response = await axios.get("/api/offers");
      setOffers(response.data.data);
      console.log(setOffers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get("/api/lists");
      setCart(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  // console.log(cart)

  return (

    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/RatingReview" element={<RatingReviewAdminHome />} />
      <Route path="/checkout/card" element={<CardPayment />} />
      <Route path="/checkout/slip" element={<UploadSlip />} />
      <Route path="/checkout/slip" component={<UploadSlip />} />
      <Route path="/success" element={<PaymentSuccess />} />
      <Route path="/uploaded" element={<SlipUploaded />} />
      <Route path="/home" element={<Homepagee />} />
      <Route path="/homee" element={<Homepagee />} />
      <Route path="/pay" element={<TotalBill />} />
      <Route path="/noti" element={<Notification />} />
      <Route path="/received" element={<ReceivedSlips />} />
      <Route path="/nobills" element={<Nobills />} />
      <Route path="/viewslip" element={<ConnectedLinkComponent />} />
      <Route path="/acceptedslips" element={<AcceptedSlips />} />

      <Route path="/Shop" element={<Shop catagories={catagories} fetchCatagories={fetchCatagories} offers={offers} fetchOffers={fetchOffers} />} />
      <Route
        path="/shopInside/:id"
        element={<ShopInside nuts={nuts} fetchNuts={fetchNuts} snacks={snacks} fetchSnacks={fetchSnacks} sweetners={sweetners} fetchSweetners={fetchSweetners} fetchCartItems={fetchCart} cartItems={cart} />}
      />
      <Route path="/editrating" element={<EditRatingReview />} />
      
      <Route path="/event" element={<EventPage />} />
      <Route path="/Food" element={<Food />} />
      <Route path="/Festival" element={<Festival />} />
      <Route path="/Sport" element={<Sport />} />
      <Route path="/Payment/:id" element={<Payment />} />

      <Route path="/fes3" element={<Festival />} />
      <Route path="/sport3" element={<Sport />} />
      <Route path="/music3" element={<EventPage />} />
      <Route path="/food3" element={<Food />} />

      <Route path="/fes" element={<Festival />} />
      <Route path="/sport1" element={<Sport />} />
      <Route path="/music1" element={<EventPage />} />
      <Route path="/food1" element={<Food />} />

      <Route path="/fes2" element={<Festival />} />
      <Route path="/sport2" element={<Sport />} />
      <Route path="/music2" element={<EventPage />} />
      <Route path="/food2" element={<Food />} />

      <Route path="/art1" element={<ArtLandmarks />} />
      <Route path="/art2" element={<ArtNatWon />} />
      <Route path="/art3" element={<ArtCulturalExpr />} />
      <Route path="/art4" element={<ArtHistorical />} />

      <Route path="/arts" element={<ArticleInter />} />
      <Route path="/artIn" element={<ArtCatorgeries />} />
      <Route path="/artLand" element={<ArtLandmarks />} />
      <Route path="/artNature" element={<ArtNatWon />} />
      <Route path="/artCulture" element={<ArtCulturalExpr />} />
      <Route path="/artHistorical" element={<ArtHistorical />} />
      <Route path="/view-article/:id" element={<ViewArticle />} />

      <Route path="/trans" element={<CarRental />} />
      <Route path="/car" element={<CarRental />} />
      <Route path="/van" element={<VanRental />} />
      <Route path="/bus" element={<BusRental />} />
      <Route path="/Vehicle/:id" element={<VehicalRental />} />
      {/* <Route path="/vehicle" component={VehicalRental} /> */}

      <Route path="/car1" element={<CarRental />} />
      <Route path="/van1" element={<VanRental />} />
      <Route path="/bus1" element={<BusRental />} />
      <Route path="/car2" element={<CarRental />} />
      <Route path="/van2" element={<VanRental />} />
      <Route path="/bus2" element={<BusRental />} />
      <Route path="/Transport" element={<CarRental />} />

      <Route path="/tour" element={<TourCusHome />} />
      <Route path='/tours/details/:id' element={<ShowTours />} />

      {/* SPA Customer-side routes */}
      <Route path="/SPAhome" element={<SpaHomepage />} />
      <Route path="/ayurvedic-spa-menu" element={<AyurvedicPage />} />
      <Route path="/ayurvedic-spa-classical" element={<ClassicalPage />} />
      <Route path="/appoitment" element={<SpaAppointmentPage />} />
      <Route path="/appointmentc" element={<ClassicalAppointmentPage />} />
      <Route path="/service-confirm" element={<ServiceConfirmPage />} />
      <Route path="/appointment-payment" element={<ServicePaymentPage />} />

      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignedOut />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/paymentss" element={<Payhistory />} />

      <Route path='/ratingreview/edit/:id' element={<EditRatingReview />} />
      <Route path='/ratingreview/delete/:id' element={<DeleteRatingReview />} />
      <Route path='/derecttour' element={<TourCusHome />} />
    </Routes>

  );
};

export default App;