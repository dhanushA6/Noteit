// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../Home.css'; 

const Header = () => (
    <header className="flex justify-between items-center p-6 bg-animated">
    <div className="text-2xl font-bold">NotesMaker</div>
    <nav className="flex space-x-6">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/about" className="hover:underline">About</Link>
      <Link to="/blog" className="hover:underline">Blog</Link>
      <Link to="/contact" className="hover:underline">Contact</Link>
    </nav>
    <div className="flex space-x-6">
      <Link to="/login" className="hover:underline">Login</Link>
      <Link to="/signup" className="hover:underline">Sign Up</Link>
    </div>
  </header>
);

export default Header;
