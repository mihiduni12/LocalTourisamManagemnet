import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ConnectedLinkComponent = ({ link }) => {
  // Extract imageUrl from URL params
  const searchParams = new URLSearchParams(window.location.search);
  const imageUrl = searchParams.get('imageUrl');

  useEffect(() => {
    const handlePopstate = () => {
      // Remove 'imageUrl' parameter when navigating back
      searchParams.delete('imageUrl');
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.replaceState({}, '', newUrl);
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [searchParams]);

  const handleBackClick = () => {
    // Remove 'imageUrl' parameter when clicking Back
    searchParams.delete('imageUrl');
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, '', newUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <br/>
      <div className="max-w-xl p-4 border-2 border-gray-300 rounded-lg mb-4">
        {/* Image with frame */}
        <img src={imageUrl} alt="Connected Link" className="w-full" />
      </div>
      {/* Space for the link */}
      <div className="mb-4">
        {/* You can replace the text with your actual link */}
        <a href={link} className="text-[#0000FF]">{link}</a>
      </div>
      {/* Button */}
      <Link to="/received">
        <button onClick={handleBackClick} className="bg-[#FF0000] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back</button>
      </Link>
    </div>
  );
};

export default ConnectedLinkComponent;
