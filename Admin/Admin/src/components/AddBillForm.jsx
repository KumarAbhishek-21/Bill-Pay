
import React, { useState } from "react";
import "./AddBillForm.css";

const AddBillForm = ({ addBill }) => {
  const [bill, setBill] = useState({
    // billNo: "",
    billDate: "",
    RoomRent: "",
    unitsConsumed: "",
    amountPerUnit: "",
    dueDate: "",
    status: "PENDING",
  });

  const handleChange = (e) => {
    setBill({ ...bill, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure correct data types
    const formattedBill = {
      ...bill,
      RoomRent: Number(bill.RoomRent),
      unitsConsumed: Number(bill.unitsConsumed),
      amountPerUnit: Number(bill.amountPerUnit),
      totalAmount: Number(bill.RoomRent) + Number(bill.unitsConsumed) * Number(bill.amountPerUnit), // Calculate totalAmount
    };

    addBill(formattedBill);

    // Reset form
    setBill({
      // billNo: "",
      billDate: "",
      RoomRent: "",
      unitsConsumed: "",
      amountPerUnit: "",
      dueDate: "",
      status: "PENDING",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-bill-form">
      {/* <input type="text" name="billNo" placeholder="Bill No" value={bill.billNo} onChange={handleChange} required /> */}
      <input type="date" name="billDate" value={bill.billDate} onChange={handleChange} required />
      <input type="number" name="RoomRent" placeholder="Room Rent" value={bill.RoomRent} onChange={handleChange} required />
      <input type="number" name="unitsConsumed" placeholder="Units Consumed" value={bill.unitsConsumed} onChange={handleChange} required />
      <input type="number" step="0.01" name="amountPerUnit" placeholder="Amount per Unit" value={bill.amountPerUnit} onChange={handleChange} required />
      <input type="date" name="dueDate" value={bill.dueDate} onChange={handleChange} required />
      <button type="submit">Add Bill</button>
    </form>
  );
};

export default AddBillForm;
