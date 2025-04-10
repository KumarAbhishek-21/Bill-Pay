import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

// import "./EditBill.css";

const EditBills = () => {
  const { url } = useContext(StoreContext);
  const { billId } = useParams();
  const navigate = useNavigate();
  const [bill, setBill] = useState(null);

//   Fetch Bill Data
  useEffect(() => {
    const fetchBill = async () => {
      try {
        const response = await axios.get(url +`/bills/${billId}`);
        setBill(response.data);
      } catch (error) {
        console.error("Error fetching bill:", error);
      }
    };
    fetchBill();
  }, [billId, url]);

  // Handle Input Change
  const handleChange = (e) => {
    setBill({ ...bill, [e.target.name]: e.target.value });
  };

  // Update Bill
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(url+`/bills/edit/${billId}`, bill);
      alert("Bill updated successfully!");
      navigate("/"); // Redirect to admin panel after update
    } catch (error) {
      console.error("Error updating bill:", error);
      alert("Failed to update bill");
    }
  };

  if (!bill) return <p>Loading...</p>;

  return (
    <div className="edit-bill-container">
      <h1>Edit Bill</h1>
      <form onSubmit={handleSubmit}>
        {/* <input type="text" name="billNo" value={bill.billNo} onChange={handleChange} readOnly /> */}
        <input type="date" name="billDate" value={bill.billDate} onChange={handleChange} />
        <input placeholder="Enter Rent" type="number" name="RoomRent" value={bill.RoomRent} onChange={handleChange} />
        <input placeholder="Amount per unit" type="number" name="amountPerUnit" value={bill.amountPerUnit} onChange={handleChange} />
        <input placeholder="units consumed" type="number" name="unitsConsumed" value={bill.unitsConsumed} onChange={handleChange} />
        <input type="date" name="dueDate" value={bill.dueDate} onChange={handleChange} />
        <select name="status" value={bill.status} onChange={handleChange}>
          <option value="PENDING">PENDING</option>
          <option value="PAID">PAID</option>
        </select>
        <button type="submit">Update Bill</button>
      </form>
    </div>
  );
};

export default EditBills;
