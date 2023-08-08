// Import necessary dependencies and styles
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for navigation
import logo from './photo/logo.png'; // Import the logo image
import './bookticket.css'; // Import the custom CSS styles

// Define the BookTicket component
export default function BookTicket() {
  const navigate = useNavigate(); // Initialize the navigation hook

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

  // Render the component
  return (
    <div className='wholeHomePage'> {/* Container for the entire page */}
      <div className='logo_bookticket'> {/* Container for the logo */}
        <img src={logo} alt="Logo" /> {/* Display the logo image */}
      </div>

      <div className='containerBookTicket'> {/* Container for the ticket and booking options */}
        <p className='sentence'> {/* Paragraph with descriptive text */}
          To make a reservation for accommodations, kindly select the "Booking" option.
          For any inquiries or to raise a specific concern, please choose the "Ticket" option.
        </p>
        
        {/* Button for booking option */}
        <input className='optionbox' type="submit" value="BOOKING" onClick={handleBooking}/>
        
        <br></br> {/* Line break */}
        
        {/* Button for ticket option */}
        <input className='optionboxTwo' type="submit" value="TICKET" onClick={handleTicket}/>
      </div>
    </div>
  )
}
