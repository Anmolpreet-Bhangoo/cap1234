import { useNavigate } from 'react-router-dom';
import React from 'react';
import logo from './photo/logo.png';
import './bookticket.css';

export default function BookTicket() {

  const navigate = useNavigate();


  function handleTicket(event){
    event.preventDefault();
    navigate('/createTicket');
 
  }


  function handleBooking(event){
    event.preventDefault();
    navigate('/createBooking');

  }
  
  return (
    
    <div className='wholeHomePage'>

    <div className='logo_bookticket' >
    <img  src={logo} alt="Logo" />
    </div>
    
  
    <div >
            <input className='optionbox' type="submit" value="BOOKING" onClick={handleBooking}/>
            

            <input className='optionboxTwo' type="submit" value="TICKET" onClick={handleTicket}/>


            
            <p className='senOne'>Book any available <br></br>room at our <br></br>establishment</p>
            
            <p className='senTwo'>Send us a ticket <br></br>in-relation to the <br></br>issues you are receiving. </p>
    </div>
    </div>
  )
}


