import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';

const ServiceConfirm = () => {
  const [appointmentspa, setAppointmentSpa] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/appointmentSPA')
      .then((response) => {
        const appointments = response.data.data;
        if (appointments.length > 0) {
          const lastAppointment = appointments[appointments.length - 1];
          setAppointmentSpa([lastAppointment]);
        } else {
          setAppointmentSpa([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5555/appointmentSPA/${id}`)
      .then((response) => {
        // Filter out the deleted appointment from state
        setAppointmentSpa((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment._id !== id)
        );
        setDeleteSuccess(true);
        console.log('Appointment deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting appointment:', error);
      });
  };

  const showDeleteConfirmation = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    handleDelete(deleteId);
    setShowConfirmation(false);
  };

  return (
    <div className='p-4 bg-[#faf3d5]'>
      <div className='flex justify-center items-center'>
        <h1 className='text-4xl text-black my-4 mb-8 mt-10 font-mono antialiased font-medium text-[#0c7424]'>
          Appointment Details
        </h1>
      </div>

      <div className='flex justify-center items-center'>
        <h5 className='text-1xl font-bold my-8 mx-8'>
          Prior to finalizing your payment, we kindly request that you please consider our non-refundable policy
          and ensure your commitment to the appointment. Once the payment is processed, cancellations will not
          be eligible for refunds. We appreciate your understanding and cooperation in this matter.
        </h5>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {showConfirmation && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#F3F4F6] p-10 rounded shadow-md">
                <p className='text-lg font-semibold mb-4'>Are you sure you want to delete this appointment?</p>
                <div className='flex justify-between'>
                <Link to="/s">
                  <button className='bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold py-2 px-4 mr-2 rounded' onClick={confirmDelete}>
                    Yes, Delete
                  </button>
                  </Link>
                  <button className='bg-[#9CA3AF] hover:bg-[#6B7280] text-black font-bold py-2 px-4 rounded' onClick={() => setShowConfirmation(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

         

          <table className='w-full border-separate border-spacing-2'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border border-gray-400 px-4 py-2'>No</th>
                <th className='border border-gray-400 px-4 py-2'>Full Name</th>
                <th className='border border-gray-400 px-4 py-2'>Service</th>
                <th className='border border-gray-400 px-4 py-2'>Time</th>
                <th className='border border-gray-400 px-4 py-2'>Date</th>
                <th className='border border-gray-400 px-4 py-2'>Mobile Number</th>
                <th className='border border-gray-400 px-4 py-2'>Email</th>
                <th className='border border-gray-400 px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointmentspa.map((item, index) => (
                <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                  <td className='border border-gray-400 px-4 py-2 text-center'>{index + 1}</td>
                  <td className='border border-gray-400 px-4 py-2'>{item.name}</td>
                  <td className='border border-gray-400 px-4 py-2'>{item.service}</td>
                  <td className='border border-gray-400 px-4 py-2'>{item.time}</td>
                  <td className='border border-gray-400 px-4 py-2'>{item.date}</td>
                  <td className='border border-gray-400 px-4 py-2'>{item.phoneNo}</td>
                  <td className='border border-gray-400 px-4 py-2'>{item.email}</td>
                  <td className='border border-gray-400 px-4 py-2 text-center'>
                    <div className='flex justify-center gap-x-4'>
                      <button
                        className='p-3 bg-[#d42e2e] hover:bg-[#B91C1C] text-black m-8 font-bold py-2 px-4 rounded'
                        onClick={() => showDeleteConfirmation(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='flex justify-center mt-8'>
            <Link to='/appointment-payment'>
              <button className='bg-[#059669] hover:bg-[#065F46] text-white font-bold py-2 px-4 rounded'>
                Confirm Appointment
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceConfirm;
