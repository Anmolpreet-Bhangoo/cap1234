import React, { useState, useEffect } from 'react';
import logo from './photo/logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;400;600;900&display=swap" rel="stylesheet">
</link>


let response = null;
let i;

// Method for creating modal trigger
function createTrigger() {

  if(document.getElementById('trigger') == null) {

    let btn = document.createElement("button");

    btn.id = "trigger";
    btn.type = "button";
    btn.setAttribute("data-bs-toggle", "modal");
    btn.setAttribute("data-bs-target", "#modalDisplay");
    btn.hidden = true;

    // Create Element
    document.body.appendChild(btn);

  } else {
    console.log("Can't Create modal trigger, Element exist!");
  }

}

// method for creating modal
function createModal(response) {

  // Modal Parent
  const modalDisplay = document.createElement("div");
  modalDisplay.id = "modalDisplay";
  modalDisplay.setAttribute("class", "modal fade");

  // Modal Outer Child 0
  const modalChild0 = document.createElement("div");
  modalChild0.id = "modalChild0";
  modalChild0.setAttribute("class", "modal-dialog modal-dialog-centered modal-dark");

  // Modal Inner Child 1
  const modalChild1 = document.createElement("div");
  modalChild1.id = "modalChild1";
  modalChild1.setAttribute("class", "modal-content");

    // Modal Child 1 of Inner Child 1
    const modalChild1of1 = document.createElement("div");
    modalChild1of1.id = "modalChild1of1";
    modalChild1of1.setAttribute("class", "modal-header");

      // h5 of Modal Child 1 of Inner Child 1
      const modalChild1of1H5 = document.createElement("h5");
      modalChild1of1H5.setAttribute("class", "modal-title");
      modalChild1of1H5.innerText = "Prospect Now - Admin Panel";

      // Button of Modal Child 1 of Inner Child 1
      const modalChild1of1Btn = document.createElement("button");
      modalChild1of1Btn.type = "button";
      modalChild1of1Btn.setAttribute("class", "btn-close");
      modalChild1of1Btn.setAttribute("data-bs-dismiss", "modal");
      modalChild1of1Btn.setAttribute("aria-label", "Close");

    // Modal Child 2 of Inner Child 1
    const modalChild2of1 = document.createElement("div");
    modalChild2of1.id = "modalChild2of1";
    modalChild2of1.setAttribute("class", "modal-body text-center");
    modalChild2of1.innerText = response;

    const modalChild3of1 = document.createElement("div");
    modalChild3of1.id = "modalChild3of1";
    modalChild3of1.setAttribute("class", "modal-footer");

    const modalChild3of1Btn = document.createElement("button");
    modalChild3of1Btn.type = "button";
    modalChild3of1Btn.setAttribute("class", "btn btn-success");
    modalChild3of1Btn.setAttribute("data-bs-dismiss", "modal");
    modalChild3of1Btn.innerText = "Close";

  // Create Modals
  document.body.appendChild(modalDisplay);
  document.getElementById("modalDisplay").appendChild(modalChild0);
  document.getElementById("modalChild0").appendChild(modalChild1);

  document.getElementById("modalChild1").appendChild(modalChild1of1);
  document.getElementById("modalChild1of1").appendChild(modalChild1of1H5);
  document.getElementById("modalChild1of1").appendChild(modalChild1of1Btn);

  document.getElementById("modalChild1").appendChild(modalChild2of1);

  document.getElementById("modalChild1").appendChild(modalChild3of1);
  document.getElementById("modalChild3of1").appendChild(modalChild3of1Btn);

  // Kill the parent and children will follow
  //modalDisplay.remove();
}

// callback response
const checkCallbackResponse = async () => {

  // Create modal trigger element
  createTrigger();

  // get dom element with id trigger
  const modalTrigger = document.getElementById("trigger");

  // response user add
  if(window.location.href.includes("#userAddedTrue") && !window.location.href.includes("#refresh")){

    response = "User added successfully!"; // set response string
    createModal(response); // create modal and pass on the response
    modalTrigger.click(); // trigger click event on button
    window.open(window.location.href+"#refresh", '_self'); // change the url, add #refresh so that it wont do a callback function again

  } else if(window.location.href.includes("#userAddedFalse") && !window.location.href.includes("#refresh")){

    response = "User is not added to the database!";
    createModal(response);
    modalTrigger.click();
    window.open(window.location.href+"#refresh", '_self');

  }

  // response user delete
  if(window.location.href.includes("#userDeletedTrue") && !window.location.href.includes("#refresh")){

    response = "User deleted successfully!";
    createModal(response);
    modalTrigger.click();
    window.open(window.location.href+"#refresh", '_self');

  } else if(window.location.href.includes("#userDeletedFalse") && !window.location.href.includes("#refresh")){

    response = "User is not deleted in the database! \n\nIf user is an admin you cannot use admin panel to delete another admin, you can only delete admin data directly in the database. (For Security Purposes)";
    createModal(response);
    modalTrigger.click();
    window.open(window.location.href+"#refresh", '_self');

  } 

  // response user reactivate
  if(window.location.href.includes("#userReactivatedTrue") && !window.location.href.includes("#refresh")){

    response = "User account is reactivated successfully!";
    createModal(response);
    modalTrigger.click();
    window.open(window.location.href+"#refresh", '_self');

  } else if(window.location.href.includes("#userReactivatedFalse") && !window.location.href.includes("#refresh")){

    response = "User account is not reactivated!";
    createModal(response);
    modalTrigger.click();
    window.open(window.location.href+"#refresh", '_self');

  } 

  // response user deactivate
  if(window.location.href.includes("#userDeactivatedTrue") && !window.location.href.includes("#refresh")){

    response = "User account is deactivated successfully!";
    createModal(response);
    modalTrigger.click();
    window.open(window.location.href+"#refresh", '_self');

  } else if(window.location.href.includes("#userDeactivatedFalse") && !window.location.href.includes("#refresh")){

    response = "User account is not deactivated!";
    createModal(response);
    modalTrigger.click();
    window.open(window.location.href+"#refresh", '_self');

  } 

  // response admin update pass
  if(window.location.href.includes("#passUpdatedTrue") && !window.location.href.includes("#refresh")){

    response = "Admin password updated successfully!";
    createModal(response);
    modalTrigger.click();
    window.open(window.location.href+"#refresh", '_self');

  } else if(window.location.href.includes("#passUpdatedFalse") && !window.location.href.includes("#refresh")){

    response = "Admin password is not updated!";
    createModal(response);
    modalTrigger.click();
    window.open(window.location.href+"#refresh", '_self');

  } 
}

//  Method for checking time on what greetings will be shown to user
const checkTime = (current) => {

  // Array for the greetings
  let greetsArr = ['Good Morning! 🌞', 'Good Afternoon! 🌇', 'Good Evening! 🌃'];
  let greetings;

  // check time using 24 hour format
  if(current.getHours() >= 0 && current.getHours() <= 11) {
      greetings = greetsArr[0];
  } else if(current.getHours() >= 12 && current.getHours() <= 17) {
      greetings = greetsArr[1];
  } else {
      greetings = greetsArr[2];
  }

  // return the greetings
  return greetings;

}

export default function Home() {

  const navigate = useNavigate();
  // const [dataUsers, setDataUsers] = useState(null);

  useEffect(() => {
    window.tiledeskSettings = {
      projectid: '64a388b12fb10000130a3fe6',
    };

    (function (d, s, id) {
      var w = window;
      var i = function () {
        i.c(arguments);
      };
      i.q = [];
      i.c = function (args) {
        i.q.push(args);
      };
      w.Tiledesk = i;
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.async = true;
      js.src = 'https://widget.tiledesk.com/v6/launch.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'tiledesk-jssdk');
  }, []);

  function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;

    fetch("https://back1234.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          // Login failed
          alert(data.error);
        } else {
          // Login successful
          alert("Login successful!");

          // Check if the user is an admin based on the response
          if (data.isAdmin) {
            navigate('/adminPanel'); // Redirect to signup page for admin
          } else {
            navigate('/bookTicket'); // Redirect to other page for non-admin users
          }
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again later.");
      });
  }
  function handleSignup(event) {
    event.preventDefault();
    navigate('/signup');

  }

  function togglePasswordVisibility(event) {
    event.preventDefault();
    let passwordInput = document.getElementById("passwordLogin");
    let showButton1 = document.getElementById("showButton1");
    let showButton2 = document.getElementById("showButton2");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      showButton1.style.display = "none";
      showButton2.style.display = "block";

    } else {
      passwordInput.type = "password";
      showButton1.style.display = "block";
      showButton2.style.display = "none";

    }

  }

  return (
    <div className='wholeHomePage'>
      <div className='homepagelogin'>

        <div className='logo-Login'>
          <img src={logo} alt="Logo" />
        </div>


        <div className='div-login'>
          <form >

            <h1 className='h1-LoginTitle'>LOGIN</h1>

            <br></br>

            <label >Email</label>

            <br></br>

            <input class="inputHomepage" required type="text" id="emailLogin" placeholder="Enter your email" />
            <br></br>

            <label>Password</label>

            <input class="inputHomepage" required type="password" id="passwordLogin" name="password" placeholder="Enter your password" /><br />
            
            <div id='showPassword' title='Show Password'>
              <i className='showhide' id="showButton1" class="bi bi-eye" onClick={togglePasswordVisibility}></i>
              <i className='showhide' id="showButton2" class="bi bi-eye-slash" onClick={togglePasswordVisibility}></i>
            </div>

            
      

            <div className='postionFix'>
              <input className='boxes' type="submit" value="Log In" onClick={handleLogin} />

              <input className='boxes' type="submit" value="Sign Up" onClick={handleSignup} />
            </div>

          </form>



        </div>
      </div>
    </div>
  )
} 