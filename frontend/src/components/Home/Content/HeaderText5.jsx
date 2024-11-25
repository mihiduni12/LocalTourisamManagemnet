import React from 'react';
import events from '../../../images/Home/event.jpg'
import { Link } from 'react-router-dom';


const HeaderText5 = () => {
    return (
        <div className='mb-[398px]'>
            <div className="font-CantoraOne ml-[13.5%] mt-[60pt] text-7xl absolute text-[#ffffff] z-21">
                <div className='absolute w-[900px] left-[3%] top-[-30px] '>
                    <img src={events} className='h-[350px] rounded-[17px] border-[7px] border-[#ce794bd8]' alt="" />
                </div>
                <div className='ml-[104%] text-[#a4603b] text-right w-[520px] mt-[-40px]'>
                Rhythm, Energy<div className='mb-[10px]'/> <div className='mb-[10px]'/>Collective Experience
                    <div className="font-Abel text-2xl mt-[20px] mb-[0px]">
                        Eat Clean, Live Green, and Feel Amazing
                    </div>
                    <Link to='/event'>   
                    <button className='text-[18px] text-[#fff] font-Coda bg-[#000] p-[10px] rounded-[12px] '>View page</button>
                    </Link>
                </div>
            </div>

        </div>
    );
}


export default HeaderText5;
