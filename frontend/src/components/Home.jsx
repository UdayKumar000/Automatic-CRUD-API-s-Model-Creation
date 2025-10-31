import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Database, LogIn, UserPlus, Eye } from "lucide-react";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            {/* App Icon and Title */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8"
            >
                <div className="flex items-center justify-center mb-4">
                    <Database size={50} className="text-indigo-600" />
                </div>
                <h1 className="text-5xl font-extrabold text-gray-800 mb-2">
                    Dynamic Model & CRUD Generator
                </h1>
                <p className="text-gray-600 max-w-md mx-auto text-lg">
                    Build, visualize, and manage your data models instantly — with
                    automated CRUD endpoints.
                </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-5"
            >
                <button
                    onClick={() => navigate("/login")}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
                >
                    <LogIn size={20} />
                    Login
                </button>

                <button
                    onClick={() => navigate("/register")}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 hover:scale-105 transition-all duration-300"
                >
                    <UserPlus size={20} />
                    Register
                </button>

                <button
                    onClick={() => navigate("/models")}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl shadow-md hover:bg-gray-800 hover:scale-105 transition-all duration-300"
                >
                    <Eye size={20} />
                    View Models
                </button>
            </motion.div>

            {/* Subtle footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-4 text-gray-500 text-sm"
            >
                ⚙️ Built for Developers — Automate your backend workflow
            </motion.footer>
        </div>
    );
};

export default Home;
