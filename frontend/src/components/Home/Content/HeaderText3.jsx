import React from 'react';
import tourism2 from '../../../images/Organic Items/food61.jpg'
import { Link } from 'react-router-dom';


const HeaderText3 = () => {
    return (
        <div className='mb-[420px]'>
            <div className="font-CantoraOne ml-[13.5%] mt-[20pt] text-7xl absolute text-[#ffffff] z-21 ">
                <div className='absolute w-[900px] left-[1%] top-[-30px] '>
                    <img src={tourism2} className='h-[440px] rounded-[17px] border-[7px] border-[#b69e81]' alt="" />
                </div>
                <div className='ml-[104%] text-[#8c9861] text-right w-[520px] mt-[-10px]'>
                    Embark on <div className='mb-[10px]' />the path <div className='mb-[10px]' />to wellness
                    <div className="font-Abel text-2xl mt-[30px] mb-[10px]">
                        Eat Clean, Live Green, and Feel Amazing
                    </div>
                    <Link to='/Shop'>
                    <button className='text-[18px] text-[#fff] font-Coda bg-[#000] p-[10px] rounded-[12px] '>View page</button>
                    </Link>
                </div>
            </div>

        </div>
    );
}


export default HeaderText3;
