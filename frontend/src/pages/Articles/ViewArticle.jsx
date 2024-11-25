import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";
import ForY from "../../components/articles/ForY";
import LogoArticle from "../../components/articles/LogoArticle";
import Buttons from "../../components/Header/Buttons";
import SearchBar from "../../components/Header/SearchBar";
import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/Footer/Footer";
import RatingReviewForm from "../../components/ratings/createrating";
import RatingView from "../../components/ratings/ratingview";

function ViewArticle() {
  const { id } = useParams(); // Extracting the article ID from the URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/api/articles/${id}`
        );
        if (!response.data || !response.data.article) {
          throw new Error("Invalid response from server");
        }
        setArticle(response.data.article);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching article:", error);
        setError("Failed to fetch article. Please try again.");
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]); // Run effect when the article ID changes

  return (

    
    <div className="bg-[#c8bf9f] ">
      <div className="bg-yellow h-[114px] w-[100%] fixed z-20 mt-[-100px]">
          <LogoArticle />
          <Buttons />
          <SearchBar />
          <Navbar />
          <br/>
        </div>
      <div className="p-5 mt-20 ">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <div className="text-5xl font-extrabold mb-5 font-CantoraOne text-center">
              {article.title}
            </div>
            <div>
              <div>
                <img
                  src={article.imageUrl}
                  className="w-[700px] h-auto mx-auto"//500
                  alt={article.title}
                />
                <p className="mt-4 p-10 font-Spirax font-semibold text-xl">
                  {article.description}
                </p>
              </div>
              <div className="text-right font-bold p-10">{article.author}</div>
            <Link to="/derecttour">
             <button className="bg-[#879d62] font-Barlow mr-4 mt-4 rounded-md h-10 w-60 text-black text-lg pr-[15px] ">
              Contact the Tourguide
             </button></Link>
             <RatingReviewForm productID={article._id} />     <RatingView productID={article._id}/> 
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>

    
  );
}

export default ViewArticle;
