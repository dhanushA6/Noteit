import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import toast from 'react-hot-toast'; 
import Header from "./Header";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/login");
        toast.success("Registered Successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="animated-bg min-h-screen flex flex-col text-black"> {/* Dark background with animated effect */}
      <Header></Header>
      <div className="flex justify-center items-center mt-20 flex-grow">
    
        <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-lg"> {/* Matching dark background */}
          
        
          <h2 className="text-4xl font-semibold mb-8 text-white">Create an account</h2> {/* White heading */}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-4">
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                placeholder="First name" 
                className="w-full p-3 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600" 
                required 
              />
              <input 
                type="text" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
                placeholder="Last name" 
                className="w-full p-3 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600" 
                required 
              />
            </div>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Email" 
              className="w-full p-3 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600" 
              required 
            />
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="Enter your password" 
              className="w-full p-3 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600" 
              required 
            />
            <button 
              type="submit" 
              className="w-full bg-gray-700 hover:bg-gray-600 py-3 rounded-md text-white transition-colors"
            >
              Create account
            </button>
          </form>

          <p className="mt-4 text-gray-400">
            Already have an account? <Link to="/login" className="text-gray-400 hover:text-gray-600">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
