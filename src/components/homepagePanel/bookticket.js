import { useNavigate } from "react-router-dom";
import React from "react";
import logo from "./photo/logo.png";
import "./bookticket.css";

export default function BookTicket() {
  const navigate = useNavigate();

  // Function to handle the "TICKET" button click
  function handleTicket(event) {
    event.preventDefault();
    navigate("/createTicket"); // Redirect to the "createTicket" page
  }

  // Function to handle the "BOOKING" button click
  function handleBooking(event) {
    event.preventDefault();
    navigate("/createBooking"); // Redirect to the "createBooking" page
  }

  return (
    <div className="wholeHomePage">
      <div className="containerBookTicket">
        <div className="logo_bookticket">
          <img className="logo-book-ticket" src={logo} alt="Logo" />
        </div>
        <div className="sentence-container">
          <p className="sentence">
            To make a reservation for accommodations, kindly select the
            "Booking" option. For any inquiries or to raise a specific concern,
            please choose the "Ticket" option.{" "}
          </p>
        </div>

        <div className="book-ticket-button">
          <input
            className="booking-button"
            type="submit"
            value="BOOKING"
            onClick={handleBooking}
          />
          <input
            className="ticket-button"
            type="submit"
            value="TICKET"
            onClick={handleTicket}
          />
        </div>
      </div>
    </div>
  );
}
