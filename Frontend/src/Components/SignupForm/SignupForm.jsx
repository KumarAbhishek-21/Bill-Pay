// import React, { useContext } from "react";
// import "./SignupForm.css";
// import { StoreContext } from "../../context/storeContext";
// import { useState } from "react";

// const SignupForm = () => {
//   const { url, setToken } = useContext(StoreContext);

//   const [data, setData] = useState({
//     userName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     address: "",
//   });

//   const onChangeHandler = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   let newUrl = url;

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     newUrl += "/user/register";
//     const response = await axios.post(newUrl, data);
//     if (response.data.success) {
//       setToken(response.data.token);
//       localStorage.setItem("token", response.data.token);
//       // navigate("/userpage");

//       // console.log(data);
//     }

//     return (
//       <div className="signup-form">
//         <h2>Sign Up</h2>
//         <form>
//           <input
//             type="text"
//             name="userName"
//             onChange={onChangeHandler}
//             placeholder="Username"
//           />
//           <input
//             type="email"
//             name="email"
//             onChange={onChangeHandler}
//             placeholder="Email"
//           />
//           <input
//             type="password"
//             name="password"
//             onChange={onChangeHandler}
//             placeholder="Password"
//           />
//           <input
//             type="password"
//             name="confirmPassword"
//             onChange={onChangeHandler}
//             placeholder="Confirm Password"
//           />
//           <input
//             type="text"
//             name="phone"
//             onChange={onChangeHandler}
//             placeholder="Phone Number"
//           />
//           <input
//             type="text"
//             name="address"
//             onChange={onChangeHandler}
//             placeholder="Address"
//           />
//           <div className="button">
//             <button className="btn" onSubmit={submitHandler} type="submit">
//               Register
//             </button>
//           </div>
//         </form>
//       </div>
//     );
//   };
// };

// export default SignupForm;


import React, { useContext, useState } from "react";
import axios from "axios"; // Import axios
import "./SignupForm.css";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";


const SignupForm = () => {
  const { url, setToken } = useContext(StoreContext);

  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${url}/user/register`, data);
      
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        alert("Registration successful!");
        
        setData({
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          address: "",
        });


      } else {
        alert("Registration failed!");
      }
    } catch (error) {
      alert("Error during registration. Please try again.");
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="userName"
          value={data.userName}
          onChange={onChangeHandler}
          placeholder="UserName"
          required
        />
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={onChangeHandler}
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={onChangeHandler}
          placeholder="Confirm Password"
          required
        />
        <input
          type="text"
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          placeholder="Phone Number"
          required
        />
        <input
          type="text"
          name="address"
          value={data.address}
          onChange={onChangeHandler}
          placeholder="Address"
          required
        />
        <div className="button">
          <button className="btn" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
