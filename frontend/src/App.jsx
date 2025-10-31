import React, { useContext } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateModel from "./components/CreateModel.jsx";
import VueHost from "./components/Vuehost.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Home from "./components/Home.jsx";
import ProtectedRoute from "./contexts/ProtectedRoute.jsx";
import AdminProtected from "./contexts/AdminProtected.jsx";

const DynamicTableForm = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/models" element={<VueHost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-model" element={<ProtectedRoute><AdminProtected><CreateModel /></AdminProtected></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );

};

export default DynamicTableForm;
