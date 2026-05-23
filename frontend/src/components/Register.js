import "../styles/Auth.css";

import axios from "axios";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Register
  const handleRegister = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {

      console.log(error);

      if (error.response) {

        alert(error.response.data.message);

      } else {

        alert("Server Error");
      }
    }
  };

  return (

    <div className="auth-container">

      <div className="auth-box">

        <h2>Register</h2>

        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          autoComplete="off"
        />

        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="off"
        />

        <input
          type="password"
          placeholder="Create Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
        />

        <button onClick={handleRegister}>
          Create Account
        </button>

      </div>

    </div>
  );
}

export default Register;