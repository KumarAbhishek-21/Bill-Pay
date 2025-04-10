import React, { useContext, useState } from "react";
import axios from "axios";
import "./Add.css";
import { StoreContext } from "../context/StoreContext";
const Add = () => {

  const {url}  = useContext(StoreContext);
  // console.log(url);
  
  const [newBill, setNewBill] = useState({
    userId: "123", // Example user ID
    // billNo: "",
    billDate: "",
    RoomRent: "",
    amount: "",
    unitsConsumed: '',
    dueDate: "",
    status: "PENDING",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBill({ ...newBill, [name]: value });
  };

  // Submit new bill
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(url +"/bills/add", newBill);
      alert("Bill added successfully!");
    } catch (err) {
      console.error("Error adding bill", err);
      alert("Failed to add bill");
    }
  };

  return (
    <div className="admin-container">
      <h1>Add New Bill</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="billDate"
          value={newBill.billDate}
          onChange={handleChange}
        />
        <input
          type="number"
          name="RoomRent"
          placeholder="Room Rent"
          value={newBill.RoomRent}
          onChange={handleChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount per Unit"
          value={newBill.amount}
          onChange={handleChange}
        />
        <input
          type="number"
          name="unitsConsumed"
          placeholder="Units Consumed"
          value={newBill.unitsConsumed}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dueDate"
          value={newBill.dueDate}
          onChange={handleChange}
        />
        <select name="status" value={newBill.status} onChange={handleChange}>
          <option value="PENDING">PENDING</option>
          <option value="PAID">PAID</option>
        </select>
        <button type="submit">Add Bill</button>
      </form>
    </div>
  );
};

export default Add;
