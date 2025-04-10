import React from "react";
import "./Body.css";
import SignupForm from "../SignupForm/SignupForm.jsx";
import Header from "../Header/Header";
const Body = () => {
  return (
    <div className="Body">
      <Header />
      <div className="main-content">
        <div className="info-section">
          <h1>Electricity Billing System</h1>
          <p>
            
          </p>
        </div>
        <SignupForm/>
      </div>
    </div>
  );
}

export default Body;
