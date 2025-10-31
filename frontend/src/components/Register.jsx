import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "" // added role field
    });

    const [message, setMessage] = useState("");

    // handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const adminEndpoint = "http://localhost:3000/admin/register";
        const userEndpoint = "http://localhost:3000/user/register";
        // you can replace this with your backend API call
        const { role, ...data } = formData
        if (role === "admin") {
            try {
                const { name, ...adminData } = data
                console.log(adminData);
                const response = await axios.post(adminEndpoint, adminData);
                if (response.data && response.data.error) {
                    setMessage(response.data.error);
                    return;
                }
                setMessage("Admin registered successfully!");
                navigate("/models");
            }
            catch (error) {
                setMessage("Error during admin registration.");
                console.log("Error during admin registration:", error);
            }
        }
        else if (role === "user") {
            try {
                const response = await axios.post(userEndpoint, data);
                if (response.data && response.data.error) {
                    setMessage(response.data.error);
                    return;
                }
                setMessage("User registered successfully!");
                navigate("/models");
            } catch (error) {
                setMessage("Error during user registration.");
                console.log("Error during user registration:", error);
            }
        }
        else {
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
                    Register
                </h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

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
                    Register
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

export default Register;
