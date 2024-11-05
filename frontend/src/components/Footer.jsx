// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-900 p-6 text-center text-white">
    <p>&copy; {new Date().getFullYear()} NotesMaker. All rights reserved.</p>
    <nav className="mt-4">
      <Link to="/privacy" className="hover:underline mx-2">Privacy Policy</Link>
      <Link to="/terms" className="hover:underline mx-2">Terms of Service</Link>
    </nav>
  </footer>
);

export default Footer;
