import React from 'react';
import tourism2 from '../../../images/Home/tourism4.jpg'
import { Link } from 'react-router-dom';


const HeaderText1 = () => {
    return (
        <div >
            <div className="font-CantoraOne ml-[13.5%] mt-[30pt] text-7xl absolute text-[#ffffff] z-21">
                <div className='absolute w-[900px] left-[1%] top-[-30px] '>
                    <img src={tourism2} className='h-[380px] rounded-[17px] border-[7px] border-[#dcdcdc]' alt="" />
                </div>
                <div className='ml-[104%] text-[#7b7b7b] text-right w-[520px]'>
                    <div className='mt-[-40px]' />Explore, Connect<div className='mb-[13px]' /> Adventure <div className='mb-[13px]' />Memories
                    <div className="font-Abel text-2xl mt-[20px] mb-[-20px]">
                        Highlighting the exploration of new places, connecting with different cultures or environments
                    </div>
                    <Link to='/tour'>
                        <button className='text-[18px] text-[#fff] font-Coda bg-[#000] p-[10px] rounded-[12px]'>View page</button>
                    </Link>
                </div>
            </div>

        </div>
    );
}


export default HeaderText1;
