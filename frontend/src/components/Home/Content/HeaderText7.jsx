import React from 'react';
import pay from '../../../images/Home/pay.jpg'
import { Link } from 'react-router-dom';


const HeaderText7 = () => {
    return (
        <div >
            <div className="font-CantoraOne ml-[15%] mt-[50pt] text-7xl absolute text-[#000000] z-21">
                <div>
                    <div className='mt-[-25px]' />Easy payments. <div className='mb-[10px]' />Amplify your,<div className='mb-[10px]' /> online presence.  <div className="font-Abel text-2xl mt-[20px]">
                    Limitless possibilities with our secure payment solutions.
                    </div>
                    <Link to='/pay'>
                    <button className='text-[18px] text-[#fff] font-Coda bg-[#000] p-[10px] rounded-[12px]'>Payment</button>
                    </Link>
                </div>
                <div className='absolute w-[900px] right-[-195%] top-[-20px] '>
                    <img src={pay} className='h-[370px] rounded-[14px] border-[8px] border-[#ffffff89]' alt="" />
                </div>
            </div>

        </div>
    );
}


export default HeaderText7;
