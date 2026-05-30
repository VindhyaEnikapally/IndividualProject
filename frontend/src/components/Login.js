import "../styles/Auth.css";

import axios from "axios";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    // Handle Input
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Login User
    const handleLogin = async () => {

        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            alert(response.data.message);

            navigate("/dashboard");

        } catch(error){

            console.log(error);

            if(error.response){
                alert(error.response.data.message);
            }
            else{
                alert("Server Error");
            }
        }
    };

    return (

        <div className="auth-container">

            <div className="auth-box">

                <h2>Login</h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button onClick={handleLogin}>
                    Login
                </button>

                <p>
                    Don't have an account?{" "}
                    <span onClick={() => navigate("/register")}>Register</span>
                </p>

            </div>

        </div>
    );
}

export default Login;