import React from 'react'
import EventPack from '../../components/event/EventPackages'
import EventHeader from '../../components/event/EventHeader'
import Footer from '../../components/Footer/Footer'
import SearchBar from '../../components/Header/SearchBar'
export default function EventPage() {
  return (
    
    <div className="h-24 bg-[#eba5f1]"> 
    
  
<EventHeader/>  

<div className='justify-center'>
      <EventPack /> 
      </div>
      <Footer/>
      
    </div>

  )
}
