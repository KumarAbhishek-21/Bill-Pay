


// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { StoreContext } from "../../context/StoreContext";
// import "./Dashboard.css";
// import Navbar from "../../Components/Navbar/Navbar";

// const Dashboard = () => {
//   const { url } = useContext(StoreContext);
//   const navigate = useNavigate();
//   const [paidTotal, setPaidTotal] = useState(0);
//   const [pendingCount, setPendingCount] = useState(0);

//   useEffect(() => {
//     const fetchBills = async () => {
//       const token = localStorage.getItem("token"); // Retrieve token from localStorage

//       if (!token) {
//         alert("Session expired. Please log in again.");
//         navigate("/login");
//         return;
//       }

//       try {
//         const res = await axios.get(`${url}/user/my-bills`, {
//           headers: { Authorization: `Bearer ${token}` }, // Include token
//         });

//         const bills = res.data;

//         // Calculate paid total
//         const paidAmount = bills
//           .filter((bill) => bill.status === "PAID")
//           .reduce((sum, bill) => sum + bill.totalAmount, 0);
//         setPaidTotal(paidAmount);

//         // Count pending bills
//         const pendingBills = bills.filter((bill) => bill.status === "PENDING").length;
//         setPendingCount(pendingBills);
//       } catch (err) {
//         console.error("Error fetching user bills:", err);
//         alert("Session expired. Please log in again.");
//         navigate("/login"); // Redirect if unauthorized
//       }
//     };

//     fetchBills();
//   }, [url, navigate]);

//   return (
//     <div className="dashboard">
//       <Navbar />
//       <h1>Dashboard Overview</h1>
//       <h2>Stats</h2>
//       <div className="stats-container">
//         <div className="stats-box" onClick={() => navigate("/history")}>
//           <h3>$ {paidTotal}</h3>
//           <p>Paid Bills</p>
//         </div>
//         <div className="stats-box" onClick={() => navigate("/due")}>
//           <h3>{pendingCount}</h3>
//           <p>Pending Bills</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./Dashboard.css";
import Navbar from "../../Components/Navbar/Navbar";

const Dashboard = () => {
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [paidBillCount, setPaidBillCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchBills = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Session expired. Please log in again.");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`${url}/user/my-bills`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const bills = res.data;

        // This is for total paid amount

        // const paidAmount = bills
        //   .filter((bill) => bill.status === "PAID")
        //   .reduce((sum, bill) => sum + bill.totalAmount, 0);
        // setPaidTotal(paidAmount);

        const paidBills = bills.filter((bill) => bill.status === "PAID");
        setPaidBillCount(paidBills.length);

        // Count pending bills
        const pendingBills = bills.filter((bill) => bill.status === "PENDING").length;
        setPendingCount(pendingBills);
      } catch (err) {
        console.error("Error fetching user bills:", err);
        alert("Session expired. Please log in again.");
        navigate("/login");
      }
    };

    fetchBills();
  }, [url, navigate]);

  const goToPaidBills = () => {
    navigate("/bills?tab=history");
  };

  const goToPendingBills = () => {
    navigate("/bills?tab=due");
  }


  return (
    <div className="dashboard">
      <Navbar />
      <h1>Dashboard Overview</h1>
      <h2>Stats</h2>
      <div className="stats-container">
        <div className="stats-box" onClick={goToPaidBills}>
          <h3>{paidBillCount}</h3>
          <p>Paid Bills</p>
        </div>
        <div className="stats-box" onClick={goToPendingBills}>
          <h3>{pendingCount}</h3>
          <p>Pending Bills</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
