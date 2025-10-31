import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext.jsx";


const Login = () => {
    const navigate = useNavigate();

    const { setIsAuthenticated, setRole } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "" // added role field
    });

    const [message, setMessage] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {

        e.preventDefault();
        const adminEndpoint = "http://localhost:3000/admin/login";
        const userEndpoint = "http://localhost:3000/user/login";
        // you can replace this with your backend API call
        console.log("Form submitted:", formData);
        const { role, ...data } = formData
        if (role === "admin") {
            try {
                const response = await axios.post(adminEndpoint, data);
                if (!response.data) {
                    setMessage("Invalid credentials. Please try again.");
                    return;
                }
                const { token } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("role", "admin");
                setMessage("Login successful!");
                navigate("/models");

            }
            catch (error) {
                setMessage("Invalid credentials. Please try again.");
                console.log("Error during admin login:", error);
            }
        }
        else if (role === "user") {
            try {
                const response = await axios.post(userEndpoint, data);
                if (!response.data) {
                    setMessage("Invalid credentials. Please try again.");
                    return;
                }
                const { token } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("role", "user");
                setMessage("Login successful!");
                navigate("/models");
            } catch (error) {
                setMessage("Invalid credentials. Please try again.");
                console.log("Error during user login:", error);
            }
        }
        else {
            console.log("Please select a valid role.");
            setMessage("Please select a valid role.");
        }


        setFormData({ name: "", email: "", password: "", role: "" });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-lg w-80 flex flex-col gap-4"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                    Login
                </h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                {/* Role Selection */}
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                >
                    <option value="" disabled>
                        Select Role
                    </option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>

                <button
                    type="submit"
                    className="bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Login
                </button>

                {message && (
                    <p className="text-green-600 text-center font-medium mt-2">
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default Login;
