import React from "react";
// import {assets} from "../assets/assets"
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import User from "../../Pages/User/User";

const Navbar = () => {

const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
}



  const navigate = useNavigate();

  return (
    <div className="Navbar">
      <h2>User Panel</h2>
      <div className="navbar-right">
        <img src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}alt=""/>
        <ul className="profile-dropdown">
          <li onClick={logOut}> Log Out</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
