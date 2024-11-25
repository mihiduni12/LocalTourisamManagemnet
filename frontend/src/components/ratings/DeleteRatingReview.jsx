import React, { useState, useEffect } from 'react';
// import BackButton from '../components/BackButton';
import Spinner from '../Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteRatingReview = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        // Validate if the id is a valid ObjectId
        if (!mongoose.isValidObjectId(id)) {
            // If not a valid ObjectId, show error notification and navigate back
            enqueueSnackbar('Invalid Rating and Review ID', { variant: 'error' });
            navigate('/');
        }
    }, [id, navigate, enqueueSnackbar]);

    const handleDeleteRatingReview = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5555/ratingreviews/${id}`)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Rating and review deleted successfully', { variant: 'success' });
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error', { variant: 'error' });
                console.error(error);
            });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Delete Rating and Review</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
                <h3 className='text-2xl'>Are you sure you want to delete this Rating and Review?</h3>

                <button
                    className='p-4 bg-red-600 text-white m-8 w-full'
                    onClick={handleDeleteRatingReview}
                >
                    Yes, delete it
                </button>
            </div>
        </div>
    );
};

export default DeleteRatingReview;
