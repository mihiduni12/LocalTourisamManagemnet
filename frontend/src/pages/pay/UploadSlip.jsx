import React from 'react';
import BillLogo from '../../components/Bill/BillLogo';

import Footer from '../../components/Footer/Footer';
import Slip from '../../components/Bill/Slip';

function UploadSlip() {
  return (
    <div className='Totalbill'>
      <div className='bg-[#FBE7C6]'>
      <div className="mt-[10px] ml-[650px] font-Spirax absolute text-[30pt] ">
        Upload Slip
      </div>
        <BillLogo />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>

      <div className='bg-[#879d62]'>
        
      <Slip/>
      </div>

  <Footer />
    </div>

);
}

export default UploadSlip;
