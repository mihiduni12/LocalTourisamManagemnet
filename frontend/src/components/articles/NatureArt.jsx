import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ArticleComponent({ articles }) {
  const [viewCounts, setViewCounts] = useState({});

  useEffect(() => {
    const fetchViewCounts = async () => {
      try {
        const viewCountsData = {};
        for (const article of articles) {
          const response = await axios.get(
            `http://localhost:5555/api/articles/${article._id}`
          );
          viewCountsData[article._id] = response.data.article.views;
        }
        setViewCounts(viewCountsData);
      } catch (error) {
        console.error("Error fetching view counts:", error);
      }
    };

    fetchViewCounts();
  }, [articles]);

  const incrementView = async (articleId) => {
    try {
      await axios.put(`http://localhost:5555/api/articles/increment-views/${articleId}`);
      // Update the local state to reflect the incremented view count
      setViewCounts(prevCounts => ({
        ...prevCounts,
        [articleId]: prevCounts[articleId] + 1
      }));
    } catch (error) {
      console.error("Error incrementing view count:", error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      {articles.map((article, index) => (
        <div
          key={index}
          className="w-64 p-4 m-4 rounded-md bg-[#fff]"
        >
          <h2 className="text-lg font-bold mb-2">{article.title}</h2>
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-40 object-cover mb-2"
          />
          <p className="mb-2">Views: {viewCounts[article._id]}</p>
          <Link to={`/view-article/${article._id}`}>
            <button
              onClick={() => incrementView(article._id)}
              className="bg-[#879d62] text-Black font-bold py-2 px-4 rounded"
            >
              View Article
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}

function Nature1({ searchQuery }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [found, setFound] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/api/articles?category=Natural%20Wonders&title=${searchQuery}`
        );
        setFound(true);

        if (!response.data || !Array.isArray(response.data.articles)) {
          throw new Error("Invalid response from server");
        }

        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setArticles([]);
          setFound(false);
          setLoading(false);
        } else {
          console.error("Error fetching articles:", error);
          setError("Failed to fetch articles. Please try again.");
          setLoading(false);
        }
      }
    };

    fetchArticles();
  }, [searchQuery]); // Run effect when searchQuery changes

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Natural Wonders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : found ? (
        <ArticleComponent articles={articles} />
      ) : (
        <p>No Articles found</p>
      )}
    </div>
  );
}

export default Nature1;
