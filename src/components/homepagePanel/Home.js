// Importing required libraries and dependencies
import React, { useState, useEffect } from 'react';
import logo from './photo/logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
<link 
href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;400;600;900&display=swap" 
rel="stylesheet">
</link>

// Home component representing the login page
export default function Home() {

  // Setting up the navigation hook
  const navigate = useNavigate();

  // Side effect to initialize the Tiledesk settings and load an external script
  useEffect(() => {
    window.tiledeskSettings = {
      projectid: '64a388b12fb10000130a3fe6',
    };
    (function (d, s, id) {
      //...
    })(document, 'script', 'tiledesk-jssdk');
  }, []);

  // Function to handle the login form submission
  function handleLogin(event) {
    event.preventDefault();

    // Getting email and password from the form
    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;

    // Sending a POST request to the server for user authentication
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
          // Login failed, displaying an error message using SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.error,
          });
        } else {
          // Login successful, displaying a success message using SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Login Successful'
          });

          // Checking if the user is an admin and redirecting accordingly
          if (data.isAdmin) {
            navigate('/adminPanel'); // Redirect to the admin panel for admin users
          } else {
            navigate('/bookTicket'); // Redirect to another page for non-admin users
          }
        }
      })
      .catch((error) => {
         // Handling errors during login and displaying an alert message
         console.error("Error during login:", error);
         alert("An error occurred during login. Please try again later.");
      });
  }

  // Function to handle the signup button click
  function handleSignup(event) {
    event.preventDefault();
    navigate('/signup'); // Redirecting to the signup page
  }

  // Function to toggle password visibility
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

  // Rendering the login page content
  return (
    <div className='wholeHomePage'>
      <div className='homepagelogin'>
        <div className='logo-Login'>
          <img src={logo} alt="Logo" />
        </div>
        <div className='div-login'>
          <form>
            {/* Login form */}
            <h1 className='h1-LoginTitle'>LOGIN</h1>
            <br></br>
            
            <label>Email</label>
            <br></br>

            <input class="inputHomepage" 
            required 
            type="text" 
            id="emailLogin" 
            placeholder="Enter your email" />

            <br></br>
            <label>Password</label>
            <input class="inputHomepage" 
            required 
            type="password" 
            id="passwordLogin" 
            name="password" 
            placeholder="Enter your password" /><br />

            <i className='showhide' 
            id="showButton1" 
            class="bi bi-eye" 
            onClick={togglePasswordVisibility}></i>

            <i className='showhide' 
            id="showButton2" 
            class="bi bi-eye-slash" 
            onClick={togglePasswordVisibility}></i>

            <div className='postionFix'>
              {/* Login and signup buttons */}
              <input className='boxes' type="submit" value="Log In" onClick={handleLogin} />
              <input className='boxes' type="submit" value="Sign Up" onClick={handleSignup} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
