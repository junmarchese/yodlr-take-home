import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import AdminDashboard from "./components/AdminDashboard";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
    return (
        <BrowserRouter>
            <div className="container mt-4">
                <h1 className="text-center">Yodlr App</h1>
                <nav className="mb-3 text-center">
                    <a href="/" className="btn btn-primary me-2">Register</a>
                    <a href="/admin" className="btn btn-secondary">Admin Dashboard</a>
                </nav>
                <Routes>
                    <Route path="/" element={<RegistrationForm />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/signup.html" element={<Navigate to="/" />} />
                    <Route path="/admin.html" element={<Navigate to="/admin" />} />
                    <Route path="*" element={<h2 className="text-center">404 Not Found</h2>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}


export default App;
