import React, { useState } from 'react';
import axios from 'axios';
import logo from './photo/logo.png';
import './Home';
import { useNavigate } from 'react-router-dom';
import './signup.css';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"></link>


export default function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
 
  function handleSubmit(event) {
    event.preventDefault();

    axios.post('http://localhost:3001/signup', {
      firstName,
      lastName,
      email,
      password
    })
    .then(response => {
      console.log(response.data);
      alert('Sign up successful! You can now log in.');
      navigate('/'); // Redirect to the login page after successful sign-up
    })
    .catch(error => {
      console.error(error);
      alert('Sign up failed. Please try again.');
    });
  }

    function togglePasswordVisibility(event) {
      event.preventDefault ();
      let passwordInput = document.getElementById("passwordLoginSignup");
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

    <div className='logoSignUpPage' >
    <img  src={logo} alt="Logo" />
    </div>
    
  
    <div className='div-signup'>
       <div className='titleSign'><h1 className='titleSignUp'>SIGN UP</h1></div>
            <div className='ScrollBar'style={{ width: '445px', height: '260px', overflowY: 'scroll'} }> 

                <form className='SignUpForm' onSubmit={handleSubmit}>

                <div className='makeCenter'>   
                <div className='inside'>
                    <label>First Name:</label>
                    <input className='inputSignUpPage'required type="text" placeholder="Enter your first name" onChange={e => setFirstName(e.target.value)} />
                    <br></br>
                </div>
                <div className='inside'>
                    <label>Last Name:</label>
                    <input className='inputSignUpPage' required type="text" placeholder="Enter your last name" onChange={e => setLastName(e.target.value)} />
                    <br></br>
                </div>
                <div className='inside'>
                    <label>Email:</label><br></br>
                    <input className='inputSignUpPage' required type="email" placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
                    <br></br>
                </div>
                <div className='inside'>
                    <label>Password:</label>
                    <input class="inputHomepage" required type="text" id="passwordLoginSignup" name="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)} /><br/>
                    
                    <div className='eyeIconI'>
                    <i className='showhide' id="showButton1" class="bi bi-eye" onClick={togglePasswordVisibility}></i>
                    <i className='showhide' id="showButton2" class="bi bi-eye-slash" onClick={togglePasswordVisibility}></i>
                    </div>
                    
                </div>
                
                <button className='submitbox' type="submit">Sign Up</button>
                </div> 
                </form>
            </div>
        </div>
    </div>
    
  )
}