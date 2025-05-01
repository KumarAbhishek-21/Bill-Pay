// import React from "react";
// import {useNavigate} from "react-router-dom";

// const PrivateRoute = ({children})=> {
//     const navigate = useNavigate();
//     const token = localStorage.getItem("token");
//     if(!token){
       
//         alert("You are not authorized to access this page. Please log in first.");
        
//         navigate("/");
//         return null;
//     }
//     return children;
// }

// export default PrivateRoute;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("You are not authorized to access this page. Please log in first.");
      navigate("/");
    }
  }, [token, navigate]);

  if (!token) {
    return null; // Prevent rendering protected content while redirecting
  }

  return children;
};

export default PrivateRoute;
