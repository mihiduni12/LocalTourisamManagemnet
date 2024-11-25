import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import TourismIntro from '../../components/Tours/tourismIntro';
import TourLogo from '../../components/Tours/TOURLOGO';

const TourCusHome = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5555/tours")
            .then((response) => {
                setTours(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleTourClick = async (id) => {
        try {
            await axios.put(`http://localhost:5555/tours/${id}/addview`);
            // Update the view count locally after successful increment
            setTours(tours.map(tour =>
                tour._id === id ? { ...tour, views: tour.views + 1 } : tour
            ));
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearchChange = (tours) => {
        setSearchQuery(tours.target.value);
    };

    const filteredTours = tours.filter((tour) =>
        tour.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-[#bee3ec]">
            <TourLogo />
            <div className="flex justify-between items-center"></div>
            <TourismIntro />
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <h1 className="text-5xl my-8 font-bold text-center overline text-cyan-950 ">Plan your dream Tour</h1>
                        <p className="text-3xl my-8 font-medium font-serif">" Each day on this island promises new experiences, discoveries, and life-long memories. With so much to do,let us help you with these itineraries created just for you! "</p>
                        <div className=" rounded-l">
                            <div className=' flex justify-end items-center px-4 py-4'>
                                <br></br>
                                <input
                                    type="text"
                                    placeholder="Search Tours..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="border-4 border-[#a07628] h-11 w-[255px] pl-3 pr-16 rounded-[14px] text-[13pt] focus:outline-none mb-8"
                                />
                            </div>
                            <div className='flex justify-center'>
                                <div className='w-full max-w-6xl px-4 py-2 bg-[#adce97] rounded-2xl'>
                                    {filteredTours.map((tour) => (
                                        <div key={tour._id} className=" bg-[#ececbe] text-center rounded-xl">
                                            <Link
                                                to={`/tours/details/${tour._id}`}
                                                className="block text-center p-4 relative"
                                                onClick={() => handleTourClick(tour._id)}
                                            >

                                                <img src={tour.imageurl} alt="Event Image" className="w-full h-60 bg-fixed object-cover" />
                                                <br />
                                                <p className='text-4xl mr-4 text-green-900 font-bold'>{tour.title}</p>
                                                <p className='text-gray-700 font-medium'>{tour.views} views</p>
                                                <br />
                                                <p className='text-blue-900 text-md font-medium truncate'>{tour.description}</p>
                                                <br />
                                                <p className='text-yellow-700 text-xl font-medium absolute bottom-0 right-0 mb-4 mr-4'>LKR {tour.price} per person</p> {/* Absolute positioning */}
                                            </Link>
                                            <div className='bg-[#adce97] h-16'></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );

};

export default TourCusHome;
