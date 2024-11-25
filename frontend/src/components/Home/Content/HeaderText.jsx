import React from 'react';
import FoodPic from '../../../images/Home/tourism3.png'

const HeaderText = () => {
    return (
        <div >             
            <div className="font-CantoraOne ml-[15.5%] mt-[150pt] text-7xl absolute text-[#ffffff] z-21">
            <div className='mt-[-15px]'/>Experience &<div className='mb-[10px]' /> Discover<div className='mb-[10px]' />Connect, Inspire <div className='mb-[10px]' /> 
                <div className="font-Abel text-2xl mt-[60px]">
                    Eat Clean, Live Green, and Feel Amazing
                </div>
                <div className='absolute w-[900px] right-[-180%] top-[-30px] '>
                    <img src={FoodPic} className='h-[380px]' alt="" />
                </div>
            </div>

        </div>
    );
}


export default HeaderText;
