

// Ticketing Importing 
import './components/ticketPanels/createTicketCSS.css';
import './components/ticketPanels/adminTicket.css';
import './components/ticketPanels/ticketSubmitted.css';
import CreateTicket from './components/ticketPanels/createTicket';
import AdminTicket from './components/ticketPanels/adminTicket';
import TicketSubmitted from './components/ticketPanels/ticketSubmitted';
// Tikceting Importing Ending 


// Booking Importing 
import AdminBooking from './components/bookingPanels/adminBooking/AdminBooking';
import CreateBooking from './components/bookingPanels/createBooking/CreateBooking';
import BookingSubmitted from './components/bookingPanels/createBooking/bookingSubmitted';
import './components/bookingPanels/createBooking/bookingSubmitted.css';
import './components/bookingPanels/createBooking/CreateBooking.css';

// Booking Importing Ending



// Admin Importing 

import AdminPanel from './components/adminPanels/Admin_Panel';

// Admin Importing Ending


// Homepage Importing 

import Home from './components/homepagePanel/Home';
import BookTicket from './components/homepagePanel/bookticket';
import SignUp from './components/homepagePanel/signup';

// Homepage Importing Ending


import {BrowserRouter, Routes, Route} from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css'

<link 
href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;400;600;900&display=swap" 
rel="stylesheet">
</link>

function App() {
  return (
    <div>
       <BrowserRouter>
       <Routes>
       <Route path='/viewTickets' element= {<AdminTicket />} ></Route>
        <Route path='/createTicket' element= {<CreateTicket />} ></Route>
        <Route path='/ticketSubmitted' element= {<TicketSubmitted />} ></Route>
        <Route path='/viewBookings' element={<AdminBooking />}></Route>
        <Route path='/createBooking' element= {<CreateBooking />} ></Route>
        <Route path='/bookingSubmitted' element= {<BookingSubmitted />} ></Route>
        <Route path="/adminPanel" element={<AdminPanel />} /> 
        <Route path='/' element= {<Home />} ></Route>
        <Route path='/bookTicket' element= {<BookTicket />} ></Route>
        <Route path='/signup' element= {<SignUp />} ></Route>

       </Routes>
  </BrowserRouter> 
       </div>  
  );
}

export default App;
