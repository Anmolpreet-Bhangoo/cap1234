import { useNavigate } from "react-router-dom";
import logo from "./logo.png";

const BookingSubmitted = () => {
  const navigate = useNavigate();

  function issueAnotherBooking() {
    navigate("/createBooking");
  }
  //need to change once login page is done
  function logOut() {
    navigate("/");
  }

  return (
    <div className="bookingSubmitted">
      <header id="ticketSubmittedHeader">
        <img id="bookinglogoPic1" src={logo} alt="Logo" />
      </header>
      <br/>
      <h1 id="bookingSubmittedText">Thank You For Booking a Room With Us!</h1>
      <br/><br/>
      <h2 id="bookingTextEmail">A confromation Email has been Sent</h2> 
      <br/><br/>
      <button id="bookingSubmittedAnother" className="bookingSubmittedclass" onClick={issueAnotherBooking}>Issue Another Booking</button>
      <br></br>
      <button id="bookingSubmittedAnother" onClick={logOut}>Log Out</button>
    </div>
  );
};

export default BookingSubmitted;
