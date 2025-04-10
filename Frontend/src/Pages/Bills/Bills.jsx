import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Bills.css";
import { StoreContext } from "../../context/StoreContext";
import { useLocation } from "react-router-dom";


const Bills = () => {
  const [activeTab, setActiveTab] = useState("due");
  const [historyBills, setHistoryBills] = useState([]);
  const [dueBills, setDueBills] = useState([]);
  const { url } = useContext(StoreContext);

  useEffect(() => {
    const fetchBills = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("❌ No token found. User may not be logged in.");
        return;
      }

      try {
        const response = await axios.get(`${url}/user/my-bills`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const bills = response.data;

        setHistoryBills(bills.filter((bill) => bill.status === "PAID"));
        setDueBills(bills.filter((bill) => bill.status === "PENDING"));
      } catch (error) {
        console.error(
          "🚨 Error fetching bills:",
          error.response?.data || error
        );
      }
    };

    fetchBills();
  }, [url]);

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab");
    if (tab == "history" || tab === "due") {
      setActiveTab(tab);
    }
  }, [location.search]);

  return (
    <div className="bills-container">
      <h1>Bills</h1>
      <div className="tabs">
        <button
          className={`tab ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          History
        </button>
        <button
          className={`tab ${activeTab === "due" ? "active" : ""}`}
          onClick={() => setActiveTab("due")}
        >
          Due
        </button>
      </div>

      {activeTab === "due" ? (
        dueBills.length === 0 ? (
          <p>No past bills available.</p>
        ) : (
          <table className="bills-table">
            <thead>
              <tr>
                {/* <th>Bill No.</th> */}
                <th>Bill Date</th>
                <th>Room Rent</th>
                <th>Units Consumed</th>
                <th>E-Amount</th>
                <th>Total Amount</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dueBills.map((bill, index) => (
                <tr key={index}>
                  {/* <td>{bill.billNo}</td>  */}
                  <td>{new Date(bill.billDate).toLocaleDateString()}</td>
                  <td>{bill.RoomRent}</td>
                  <td>{bill.unitsConsumed}</td>
                  <td>{bill.totalAmount - bill.RoomRent}</td>
                  <td>{bill.totalAmount}</td>
                  <td>{new Date(bill.dueDate).toLocaleDateString()}</td>
                  <td>
                    <button className="pay-btn">PAY</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      ) : historyBills.length === 0 ? (
        <p>No paid bills avialable.</p>
      ) : (
        <table className="bills-table">
          <thead>
            <tr>
              <th>Bill Date</th>
              <th>Units Consumed</th>
              <th>E-Amount</th>
              <th>Dues</th>
              <th>Payable</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {historyBills.map((bill, index) => (
              <tr key={index}>
                <td>{new Date(bill.billDate).toLocaleDateString()}</td>
                <td>{bill.unitsConsumed}</td>
                <td>{bill.totalAmount - bill.RoomRent}</td>{" "}
                {/* Electricity Amount */}
                <td>{bill.dues}</td>
                <td>{bill.totalAmount}</td>
                <td className="paid">{bill.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Bills;


