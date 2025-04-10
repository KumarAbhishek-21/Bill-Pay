import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./ManageBills.css";
import BillList from "./BillList";
import AddBillForm from "./AddBillForm";
import { StoreContext } from "../context/StoreContext";

const ManageBills = () => {
  const {
    url,
    fetchUserBills,
    users,
    selectedUser,
    bills,
    handleAddBill,
    updateBillStatus,
    complaints,
    getUserComplaintsById,
  } = useContext(StoreContext);

  
  const handleStatusChange = async (complaintId, newStatus) => {
   
    try {
      await axios.patch(`${url}/complaints/${complaintId}/status`, {
        status: newStatus,
      })

      getUserComplaintsById(selectedUser);
    }

   
    catch (err) {
      console.error("Error updating complaint status:", err);
    }
  };

  
  

  return (
    <div className="manage-bills">
      <h2>Manage Bills</h2>

      <div className="users-list">
        <h3>Users</h3>
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => {
              fetchUserBills(user._id);
              getUserComplaintsById(user._id);
            }}
          >
            {user.userName} ({user.email})
          </button>
        ))}
      </div>

      {selectedUser && (
        <div className="user-bills">
          <h3>Bills for User ID: {selectedUser}</h3>
          <BillList
            bills={bills}
            refreshBills={fetchUserBills}
            updateBillStatus={updateBillStatus}
          />
          <AddBillForm addBill={handleAddBill} />

          <div className="user-complaints">
            <h3>Complaints for This User</h3>
            {complaints.length === 0 ? (
              <p>No complaints from this user.</p>
            ) : (
              <ul>
                {complaints.map((complaint) => (
                  <li key={complaint._id}>
                    <strong>
                      {new Date(complaint.createdAt).toLocaleDateString()}:
                    </strong>{" "}
                    {complaint.complaintType} {"  "} {complaint.description} <br />
                    <label>status:</label> 
                    <select 
                      value={complaint.status} 
                      onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                    >
                      <option value="UNRESOLVED">Unresolved</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="RESOLVED">Resolved</option>

                    </select>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBills;
