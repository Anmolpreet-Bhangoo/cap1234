import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateTicket = () => {
   // Initialize default values for category and priority
  const getInitialState = () => {
    const category = "General";
    return category;
  };

  const getInitialState1 = () => {
    const priority = "Low";
    return priority;
  };

    // State variables to manage form inputs

  const [subject, setSubject] = useState("");

  const [description, setDescription] = useState("");

  const [category, setCategory] = useState(getInitialState); // Initialize with default category

  const [priority, setPriority] = useState(getInitialState1); // Initialize with default priority

  const navigate = useNavigate();

  const [file, setFile] = useState();

  // Handle file input change

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  }

  const currentTime = new Date();

  // Handle form submission

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData();
    formData.append('image', file);
    formData.append('date', currentTime);
    formData.append('category', category);
    formData.append('priority', priority);
    formData.append('subject', subject);
    formData.append('description', description);
    
    // Make a POST request to submit the ticket

    axios.post("https://back1234.onrender.com/createTicket", formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        // Display success message
        Swal.fire({
          icon: 'success',
          title: 'Ticket Issued Successfully'
        })
        // Navigate to ticketSubmitted page
        navigate("/ticketSubmitted");
        console.log(res);
      })
      .catch((err) =>  Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while processing your request. Please try again later. Thanks!',
      })
      );
  }

    // Navigate back to home page

  function goToHome(){
    navigate("/bookTicket");
  }


  return (
    <div id="creating">
      <div id="formContainer">

    <div id="createTicket_issueTicket">
      

      <form  id="createTicket_form" onSubmit={handleSubmit}>
        <header id="createTicket_ticketHeader">
          <li>  <h1 >Create Ticket</h1>   </li>
         
        </header>

        <br />
        <main id="createTicket_issueTicketMain">
          {/* Dropdown for issue category */}
          <label id="createTicket_label" for="createTicket_inputTicketCategory">Issue Category</label>
          <select
            id="createTicket_inputTicketCategory"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
             {/* Options for issue categories */}
            <option value="Technical">Technical</option>
            <option value="Leakage">Leakage</option>
            <option value="Furniture">Furniture</option>
            <option value="Electrical">Electrical</option>
            <option value="Bathroom">Bathroom</option>
            <option value="Flooring">Flooring</option>
            <option value="other">Others</option>
          </select>

            {/* Dropdown for priority */}
          <label id="createTicket_label" for="createTicket_inputTicketPriority">Priority</label>
          <select
            id="createTicket_inputTicketPriority"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {/* Priority levels */}
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
           {/* Input for ticket subject */}
          <label  id="createTicket_label" for="createTicket_inputTicketSubject">Ticket Subject</label>
          <input
            type="text"
            id="createTicket_inputTicketSubject"
            name="subject"
            placeholder="Write the Subject for Issue"
            maxLength={500}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
  {/* Textarea for ticket description */}
          <label  id="createTicket_label" for="createTicket_inputTicketDescription">Description</label>
          <textarea
            id="createTicket_inputTicketDescription"
            name="description"
            cols="30"
            rows="10"
            placeholder="Add Description"
            maxLength={1800}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          {/* adding a picture 
          status to add in adming panel
          adding the vendor name */}

          <br />
 {/* File input for attaching images */}
 <input type="file" onChange={handleFile}/>
  {/* Submit and cancel buttons */}
          <input type="submit" value="Issue Ticket" />
          <input type="reset" value="Cancel" onClick={goToHome} />
        </main>
      </form>
      
    </div>

  </div>

    </div>
  );
};

export default CreateTicket;
