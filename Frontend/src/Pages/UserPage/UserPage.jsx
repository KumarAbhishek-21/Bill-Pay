import React from "react";
import { Route, Routes } from "react-router-dom";
import User from "../User/User";
import Navbar from "../../Components/Navbar/Navbar";
import Dashboard from "../Dashboard/Dashboard";
// import User from "./Pages/User/User";

const UserPage = () => {
  return (
    <div>
      <Navbar />
      <User />
    </div>
  );
};

export default UserPage;
