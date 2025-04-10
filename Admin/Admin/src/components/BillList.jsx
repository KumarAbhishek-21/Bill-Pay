import React, { useContext } from "react";
import axios from "axios";
import "./BillList.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";



const BillList = ({ bills, updateBillStatus, refreshBills }) => {
  const { url } = useContext(StoreContext);

  const navigate = useNavigate();

  const handleDelete = async (billId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bill?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${url}/bills/delete/${billId}`);
      alert("Bill deleted successfully!");
      refreshBills();
    } catch (error) {
      console.error("Error deleting bill:", error);
      alert("Failed to delete bill");
    }
  };

  return (
    <table className="bills-table">
      <thead>
        <tr>
          {/* <th>Bill No</th> */}
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Action</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bills.map((bill) => {
          // console.log(bill); // Debugging output
          return (
            <tr key={bill._id}>
              {/* <td>{bill.billNo}</td> */}
              <td>{new Date(bill.billDate).toLocaleDateString()}</td>
              <td>Rs.{bill.totalAmount}</td>
              <td>{bill.status}</td>
              <td>
                {bill.status === "PENDING" && (
                  <button
                    onClick={() => updateBillStatus(bill._id, "PAID")}
                    className="paid-btn"
                  >
                    Mark as Paid
                  </button>
                )}
              </td>
              <td>
                <button
                  onClick={() => navigate(`/admin/edit-bill/${bill._id}`)}
                  className="edit-btn"
                  disabled={bill.status === "PAID"}
                  style={{
                    cursor: bill.status === "PAID" ? "not-allowed" : "pointer",
                    opacity: bill.status === "PAID" ? 0.5 : 1,
                  }}
                  title={bill.status === "PAID" ? "Cannot edit paid bills" : "Edit bill"}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(`${bill._id}`)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BillList;
