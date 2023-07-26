import React, { useState, useEffect } from 'react';
import logo from './photo/logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;400;600;900&display=swap" rel="stylesheet">
</link>

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
            <i className='showhide' id="showButton1" class="bi bi-eye" onClick={togglePasswordVisibility}></i>
            <i className='showhide' id="showButton2" class="bi bi-eye-slash" onClick={togglePasswordVisibility}></i>


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