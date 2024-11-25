import React from 'react';
import BillLogo from '../../components/Bill/BillLogo';
import Footer from '../../components/Footer/Footer';
import Card from '../../components/Bill/Card';

function CardPayment() {
  return (
    <div className='Totalbill'>
      <div className='bg-[#FBE7C6]'>
      <div className="mt-[10px] ml-[650px] font-Spirax absolute text-[30pt] ">
        Card Payment
      </div>
        <BillLogo />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>

      {/* Rest of the content with another color */}
      <div style={{ backgroundColor: '#acf9f5', minHeight: '80vh' }}>
      <br></br>

        <br></br>
        
      <Card/>
       
       </div>

  <Footer />
    </div>

);
}

export default CardPayment;
