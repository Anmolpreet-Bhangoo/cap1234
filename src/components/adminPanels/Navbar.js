import logo from './images/logo.png';
import './Navbar.css';
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  
  function refresh(){
    navigate("/adminPanel");
  }

  return (
    <div className="Navbar">
        <div className="Logo">
            <img onClick={refresh} src={logo} alt="Prospect Now Logo" title="Prospect Now" />
        </div>
        <div className="Header">
            <h1><i class="bi bi-shield-lock-fill"></i> Admin Panel</h1>
        </div>
    </div>
  );
}

export default Navbar;
