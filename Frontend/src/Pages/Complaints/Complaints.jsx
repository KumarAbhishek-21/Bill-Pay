

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./Complaints.css";
import Navbar from "../../Components/Navbar/Navbar";

const Complaints = () => {
  const { url } = useContext(StoreContext);
  const [complaintType, setComplaintType] = useState("");
  const [description, setDescription] = useState("");
  const [complaints, setComplaints] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch user's complaints
  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`${url}/admin/my-complaints`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(res.data);
    } catch (err) {
      console.error("Failed to fetch complaints", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${url}/admin/submit-complaint`,
        { complaintType, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Complaint submitted successfully.");
      setComplaintType("");
      setDescription("");
      fetchComplaints(); // Refresh list
    } catch (err) {
      alert("Failed to submit complaint.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "RESOLVED":
        return <span className="status resolved">✅ Resolved</span>;
      case "IN_PROGRESS":
        return <span className="status in-progress">🟠 In Progress</span>;
      case "UNRESOLVED":
      default:
        return <span className="status unresolved">🔴 Unresolved</span>;
    }
  };

  return (
    <>
    <Navbar />
 
    <div className="complaint-form">
      <h2>Submit a Complaint</h2>
      <form onSubmit={handleSubmit}>
        <label>Complaint Type</label>
        <select
          value={complaintType}
          onChange={(e) => setComplaintType(e.target.value)}
          required
        >
          <option value="">--Select--</option>
          <option value="Bill not generated">Bill not generated</option>
          <option value="Bill not correct">Bill not correct</option>
          <option value="Previous issue not resolved">
            Previous issue not resolved
          </option>
          <option value="Other">Other</option>
        </select>

        <label>Description (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      <h3>Your Complaints</h3>
      {complaints.length === 0 ? (
        <p>No complaints submitted yet.</p>
      ) : (

        <ul className="complaint-list">
          {complaints.map((c) => (
            <li key={c._id} className="complaint-item">
              <div>
                <strong>{c.complaintType}</strong>
              </div>
              <div className="complaint-meta">
                📅 <em>{new Date(c.createdAt).toLocaleDateString()}</em>
                {" | "}
                {getStatusBadge(c.status)}
              </div>
              {c.description && <div>{c.description}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
  
};


export default Complaints;
