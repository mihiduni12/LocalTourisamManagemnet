import React from 'react';
import BillLogo from '../../components/Bill/BillLogo';
import BillTopic from '../../components/Bill/BillTopic';
import Footer from '../../components/Footer/Footer';
import Bill from '../../components/Bill/TBill';
import Navbar from '../../components/Header/Navbar';

function TotalBill() {

  return (
    <div className='Totalbill'>
      <div className='bg-[#b9faf2]'>
        <BillTopic />
        <BillLogo />
        <br/>
        <Navbar />
        <br />
        <br />
        <br />
        <br />
      </div>
      <div style={{ backgroundColor: '#e8eec8', minHeight: '100vh' }}>
        <br />
        <br />
        <br />
        <Bill /> 
        <br/><br/><br/>
      </div>

      <Footer />
    </div>
  );
}
export default TotalBill;
