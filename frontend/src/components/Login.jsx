import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import Header from "./Header";
import '../Home.css'; // Ensure this file includes your CSS styles

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/main");
        toast.success("Login Successfully");
      } else {
        toast.error(data.error);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return (
    
    <div className="animated-bg min-h-screen flex flex-col text-black"> {/* Apply animated background */}
      <Header></Header>
      <div className="flex justify-center items-center mt-20 flex-grow">
        <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-lg"> {/* Matching dark background */}
          <h2 className="text-4xl font-semibold mb-8 text-white">Login to your account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600" // Consistent dark input style
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600" // Consistent dark input style
              required
            />
            <button
              type="submit"
              className="w-full bg-gray-700 hover:bg-purple-gray-600 py-3 rounded-md text-white transition-colors"
            >
              Login
            </button>
          </form>
          
          <p className="mt-4 text-gray-400">
            Don't have an account? <Link to="/signup" className="text-white-900 hover:text-white-300">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
