// import React, { useState } from "react";
// import "./Header.css";
// import { useNavigate } from "react-router-dom";


// function Header() {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
  
//   const navigate = useNavigate();
//   const HandleSignIn = () => {

//     if(!email || !password){
//       alert("Please enter email and password");
//       return
//     }
//     navigate("/userpage");
//   };
//   return (
//     <header className="header">
//       <h1 className="title">E-Billing System</h1>
//       <div className="login-form">
//         <input type="email" placeholder="Email" className="input-field" value={email} onChange={(e)=>setEmail(e.target.value)} />
//         <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
//         <button className="login-button" onClick={HandleSignIn}>Sign in</button>
//       </div>
//     </header>
//   );
// }

// export default Header;


// import React, { useContext, useState } from "react";
// import "./Header.css";
// import { useNavigate } from "react-router-dom";
// import { storeContext } from "../../context/storeContext";

// function Header() {
//   const {url, setToken} = useContext(storeContext);
//   const [role, setRole] = useState("user");
  
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//     role: "",
//   });
//   const navigate = useNavigate();

//   const onChangeHandler = ()=> {
//     setData({...data, [e.target.name]: e.target.value,});
//   }

//   const HandleSignIn = async (event) => {
//     if(!data.email || !data.password){
//       alert("Please enter email and password");
//       return
//     }
//     let newUrl = url;
//     event.preventDefault();

//     if(role == "user"){
//       newUrl += "/user/login";
//     }else{
//       newUrl += "/admin/login";
//     }

//     const response = await axios.post(newUrl, data);
//     if(response.data.success && role == "user"){
//       setToken(response.data.token);
//       localStorage.setItem("token", response.data.token);
//       navigate("/userpage");
      
//     } else if(response.data.success && role == "admin"){
//       setToken(response.data.token);
//       localStorage.setItem("token", response.data.token);
//       navigate("/adminpage");
//     } else{
//       alert("Something Went Wrong");
//     }
//   };

//   return (
//     <header className="header">
//       <h1 className="title">E-Billing System</h1>
//       <div className="login-form">
//         <input 
//           name="email" 
//           placeholder="Email" 
//           className="input-field" 
//           value={data.email} 
//           onChange={onChangeHandler}
//           required
//         />
//         <input 
//           name="password" 
//           placeholder="Password" 
//           className="input-field" 
//           value={data.password} 
//           onChange={onChangeHandler}
//           required
//         />
//         <select 
//           className="input-field" 
//           name="role"
//           value={data.role} 
//           onChange={onChangeHandler}
//         >
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//         </select>
//         <button className="login-button" onClick={HandleSignIn}>Sign in</button>
//       </div>
//     </header>
//   );
// }

// export default Header;


import React, { useContext, useState } from "react";
import axios from "axios"; // Import axios
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";



function Header() {
  const { url, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
    role: "user", // Default to "user" for consistency
  });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const HandleSignIn = async (event) => {
    event.preventDefault(); // Prevent form submission
  
    if (!data.email || !data.password) {
      alert("Please enter email and password");
      return;
    }
  
    let loginUrl = `${url}/${data.role}/login`; // Concise URL handling
  
    try {
      const response = await axios.post(loginUrl, data);
  
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        
        setData({
          email: "",
          password: "",
          role: "user", 
        });
        // Redirect based on role
        navigate(data.role === "user" ? "/userpage" : "/adminpage");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message); // Show backend error message
      } else {
        alert("Login failed. Please check your connection.");
      }
    }
  };
  

  return (
    <header className="header">
      <h1 className="title">E-Billing System</h1>
      <div className="login-form">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input-field"
          value={data.email}
          onChange={onChangeHandler}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input-field"
          value={data.password}
          onChange={onChangeHandler}
          required
        />
        <select
          className="input-field"
          name="role"
          value={data.role}
          onChange={onChangeHandler}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="login-button" onClick={HandleSignIn}>
          Sign in
        </button>
      </div>
    </header>
  );
}

export default Header;
