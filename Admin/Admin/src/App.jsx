import { Route, Router, Routes } from "react-router-dom";
import ManageBills from "./components/ManageBills";
import Add from "./Pages/Add.";
import React from 'react';

import AddBillForm from "./components/AddBillForm";
import EditBills from "./Pages/Edit_Bills/EditBills";
// import axios from 'axios';
const App = () => {

  return(
    
    
        <Routes>
          <Route path="/" element={<ManageBills />} />
          <Route path = "/admin/edit-bill/:billId" element={<EditBills/>} />
          <Route path="/admin/add-bill" element={<AddBillForm/>} />
        </Routes>
    
      
    
  )
}

export default App;