import { createContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const url = "http://localhost:3000/api/admin"; // Backend URL

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [bills, setBills] = useState([]);
  const [complaints, setComplaints] = useState([]);

  

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(url + "/users"); // Backend API to get all users
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Fetch selected user's bills

  const fetchUserBills = async (userId) => {
    try {
      const response = await axios.get(`${url}/bills/${userId}`);
      setBills(response.data);
      setSelectedUser(userId);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  // Handle adding a new bill
  const handleAddBill = async (newBill) => {
    try {
      const response = await axios.post(
        `${url}/bills/${selectedUser}`,
        newBill
      );
      setBills([...bills, response.data]); // Update UI after adding a new bill
    } catch (error) {
      console.error("Error adding bill:", error);
    }
  };

  // Handle updating bill status
  const updateBillStatus = async (billId, status) => {
    try {
      await axios.put(`${url}/bills/${billId}`, { status });
      setBills(
        bills.map((bill) => (bill._id === billId ? { ...bill, status } : bill))
      );
    } catch (error) {
      console.error("Error updating bill status:", error);
    }
  };

  const token = localStorage.getItem("token");
  const getUserComplaintsById = async (userId) => {
    try {
     
      const res = await axios.get(`${url}/complaints/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(res.data);
    } catch (err) {
      console.error("❌ Error fetching complaints:", err);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        url,
        fetchUserBills,
        users,
        selectedUser,
        bills,
        handleAddBill,
        updateBillStatus,
        getUserComplaintsById,
        complaints,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};
