import React from 'react';
import NotiLogo from '../../components/Notifications/NotificationsLogo';
import Notifications from '../../components/Notifications/notification';
import NotifiTopic from '../../components/Notifications/NotifiTopic';
import Navbar from '../../components/Header/Navbar';

function Notification() {
  return (
    <div className='Totalbill'>
      <div className='bg-[#aa1d47]'>
        <NotiLogo />
        <NotifiTopic />
        <br></br>
        <Navbar/>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>

      <div style={{ backgroundColor: '#d2d4ff', minHeight: '100vh' }}>
      <br></br>
        <br></br>
        <Notifications/>
      </div>

    </div>
  );
}

export default Notification;
