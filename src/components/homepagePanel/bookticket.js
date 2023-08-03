import { useNavigate } from 'react-router-dom';
import React from 'react';
import logo from './photo/logo.png';
import './bookticket.css';

export default function BookTicket() {
  const navigate = useNavigate();

  // Function to handle the "TICKET" button click
  function handleTicket(event) {
    event.preventDefault();
    navigate('/createTicket'); // Redirect to the "createTicket" page
  }

  // Function to handle the "BOOKING" button click
  function handleBooking(event) {
    event.preventDefault();
    navigate('/createBooking'); // Redirect to the "createBooking" page
  }
  
  return (
    <div className='wholeHomePage'>
      <div className='logo_bookticket'>
        <img src={logo} alt="Logo" />
      </div>

      <div className='containerBookTicket'>
        <input className='optionbox' type="submit" value="BOOKING" onClick={handleBooking}/>
        <input className='optionboxTwo' type="submit" value="TICKET" onClick={handleTicket}/>

      </div>
    </div>
  )
}
