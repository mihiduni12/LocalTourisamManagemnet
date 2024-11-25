import React from 'react';
import tourintro from '../../../public/images/nature1.jpg'; 

const TourismIntro = () => {
  return (
    <div className=" h-96 bg-fixed flex justify-center items-center" style={{ 
      backgroundImage: `url(${tourintro})`,
      backgroundSize: '100% 100%',
      backgroundPosition: 'center'
    }}>
      <div className="text-white text-center">
        <p className="text-8xl">Welcome to Sri Lanka</p>
      </div>
    </div>
  );
}

export default TourismIntro;
