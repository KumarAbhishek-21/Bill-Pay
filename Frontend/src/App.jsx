import React from "react";
import "./App.css";
import Body from "./Components/Body/Body";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Complaints from "./Pages/Complaints/Complaints";
import Transactions from "./Pages/Transactions/Transactions";
import Bills from "./Pages/Bills/Bills";
import UserPage from "./Pages/UserPage/UserPage";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route
          path="/userpage"
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/complaints"
          element={
            <PrivateRoute>
              <Complaints />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          }
        />
        <Route path="/bills" element={<Bills />} />
      </Routes>
    </div>
  );
};

export default App;
