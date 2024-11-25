// TotalBill.jsx
import React from 'react';
import ReceivedSlips from '../../components/Bill/ReceivedSlips';
import PALogo from '../../components/Bill/PALogo';

function PaymentAdmin() {


  return (
    <div className='Totalbill'>
      <div className='bg-[#FBE7C6]'>
       <PALogo/>
        <br />
        <br />
        <br />
        <br />
      </div>

      {/* Rest of the content with another color */}
      <div style={{ backgroundColor: '#879d62', minHeight: '80vh' }}>
        <br />
        <br />
        <ReceivedSlips/>
  
      </div>

    </div>
  );
}

export default PaymentAdmin;
