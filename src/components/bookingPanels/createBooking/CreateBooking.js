
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

// Importing Google Fonts for styling
<link
  href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;400;600;900&display=swap"
  rel="stylesheet"
></link>;

export default function CreateBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  // State variables to store form inputs
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [roomID, setRoomID] = useState("");
  const [date, setDate] = useState("");
  const [time, setStartTime] = useState("");
  const [totalHours, setTotalHours] = useState("");
  const [enquiry, setEnquiry] = useState("");
  const [endTime, setEndTime] = useState("");

  // Populate the form fields if state is provided (for editing an existing booking)
  useEffect(() => {
    if (state) {
      setId(state.id || "");
      setName(state.name || "");
      setRoomID(state.roomID || "");
      setDate(state.bookingDate || "");
      setStartTime(state.startTime || "");
      setTotalHours(state.totalHours || "");
      setEnquiry(state.enquiry || "");
      setEndTime(state.endTime || "");
    }
  }, [state]);

  // Function to handle form submission when booking a room
  function handleSubmit(event) {
  event.preventDefault();
  Axios.post("https://back1234.onrender.com/booking", {
    roomID,
    name,
    date,
    time,
    totalHours,
    enquiry,
  })
    .then((res) => {
      console.log(res);
      // Show a success message using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Booking Created Successfully'
      });
      // Navigate to the bookingSubmitted page 
      navigate("/bookingSubmitted");
    })
    .catch((err) => {
      // Handle errors, such as when the room is already booked for the selected time
      if (err.response && err.response.data) {
        const { startTime, endTime } = err.response.data;
        Swal.fire({
          icon: "error",
          title: `This Room Is Already Booked Between ${startTime} And ${endTime}. Kindly Book Another Room.`
        });
      } else {
        // Show a generic error message using SweetAlert2
        Swal.fire({
          icon: "error",
          title: "An error occurred while processing your request."
        });
      }
    });
}
  
  // Function to handle cancel button click, navigating to the viewBookings page
  function handleCancel() {
    navigate("/viewBookings");
  }

  // Function to handle cancel button click when creating a new booking, navigating to the bookTicket page
  function handleCancelToBookTicket(){
    navigate("/bookTicket");
  }

  // Function to handle updating an existing booking
  const update = (event) => {
    event.preventDefault();
    Axios.put("https://back1234.onrender.com/update", {
      id: id,
      roomID: roomID,
      name: name,
      bookingDate: date,
      startTime: time,
      totalHours: totalHours,
      enquiry: enquiry,
      endTime: endTime,
    })
      .then(() => {
        // Show a success message using SweetAlert2
        Swal.fire({
          title: "<strong>Update completed.</strong>",
          html: `<i> Booking request made by ${name} was included in successfully</i>`,
          icon: "success",
        }).then(() => {
          // Navigate to the viewBookings page after successful update
          navigate('/viewBookings');
        });
      })  
      .catch(function (error) {
        // Handle errors during update
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            JSON.parse(JSON.stringify(error)).message === "Network Error"
              ? "Please, try again this operation later"
              : JSON.parse(JSON.stringify(error)).message,
        });
      });
  };

  return (
    <>
      {/* Rendering the form for creating or updating a booking */}
     <div className="createBookingBackground">

      <div className="main-ct">
      <header id="header-ct">
        <h1>CREATE BOOKING</h1>
      </header>

        <div className="form-ct">
          <div className="insideForm-ct">
            <form onSubmit={handleSubmit}>

              {/* Form fields for name, room number, date, start time, total hours, and enquiry */}
                <label className="label-ct">Name</label>
                <input
                  type="text"
                  className="input-ct"
                  placeholder="Add your name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                ></input>

                <label className="label-ct">Select Room Number</label>
                <select
                  onChange={(e) => setRoomID(e.target.value)}
                  className="select-ct"
                  value={roomID}
                  required
                >
                  {/* Options for different room numbers */}
                  <option value="">Choose a Room Number</option>
                  <option value="Resource Centre">Resource Centre - Max Capacity (15 Person)</option>
                  <option value="Business Centre 1">Business Centre 1 - Max Capacity (14 Person)</option>
                  <option value="Business Centre 2">Business Centre 2 - Max Capacity (19 Person)</option>
                  <option value="Business Centre 3">Business Centre 3 - Max Capacity (21 Person)</option>
                  <option value="Room 1">Room 1 - Max Capacity (5 Person)</option>
                  <option value="Room 2">Room 2 - Max Capacity (5 Person)</option>
                  <option value="Room 3">Room 3 - Max Capacity (5 Person)</option>
                </select>

                <label className="label-ct">Date Of Booking</label>
                <input
                  type="date"
                  className="input-ct"
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  required
                ></input>
             
                <label className="label-ct">Start Time</label>
                <input
                  type="time"
                  onChange={(e) => setStartTime(e.target.value)}
                  className="input-ct"
                  value={time}
                  required
                ></input>
                
                <label className="label-ct">Select Number Of Hours</label>
                <select
                  onChange={(e) => setTotalHours(e.target.value)}
                  className="select-ct"
                  value={totalHours}
                  required
                >
                  <option value="">Choose Number Of Hours</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
          
                <label className="label-ct">Any enquiries or concerns</label>
                <textarea
                  className="textarea-ct"
                  cols="40"
                  rows="10"
                  placeholder="Add Description"
                  onChange={(e) => setEnquiry(e.target.value)}
                  value={enquiry}
                ></textarea>
           
                {state ? (
                  // If state is available (editing an existing booking), render update and cancel buttons
                  <>
                    <button className="update-ct" onClick={update}>
                      Update
                    </button>
                    <button className="cancel-ct" type="button" onClick={handleCancel}>
                      Cancel
                    </button>
                  </>
                ) : (
                  // If state is not available (creating a new booking), render submit and cancel buttons
                  <>
                  <input className="submit-ct" type="submit" value="Book Room!" />
                  <button className="cancelToBookTicket-ct" type="button" onClick={handleCancelToBookTicket}> Cancel </button>
                  </>
                )}
            </form>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export { CreateBooking };

