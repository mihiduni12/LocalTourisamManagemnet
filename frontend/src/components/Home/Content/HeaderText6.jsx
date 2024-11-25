import React from 'react';
import spa from '../../../images/Home/spa4.jpg'
import { Link } from 'react-router-dom';


const HeaderText6 = () => {
    return (
        <div >
            <div className="font-CantoraOne ml-[15%] mt-[50pt] text-7xl absolute text-[#ffffff] z-21">
                <div>
                    <div className='mt-[-25px]' />Harmony <div className='mb-[10px]' />through  Nature,<div className='mb-[10px]' /> Wellness for All
                    <div className="font-Abel text-2xl mt-[20px]">
                        Eat Clean, Live Green, and Feel Amazing
                    </div>
                    <Link to='/SPAhome'>
                    <button className='text-[18px] text-[#fff] font-Coda bg-[#000] p-[10px] rounded-[12px]'>View page</button>
                    </Link>
                </div>
                <div className='absolute w-[900px] right-[-195%] top-[-20px] '>
                    <img src={spa} className='h-[370px] rounded-[14px] border-[8px] border-[#ffffff89]' alt="" />
                </div>
            </div>

        </div>
    );
}


export default HeaderText6;
