import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignupPage from "./components/Signup";
import LoginPage from "./components/Login";
import DummyPage from "./components/Main";
import Home from "./components/Home";
import Main from "./components/Main";

const App = () => {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/main"
          element={<Main/>}
        />
        <Route
          path="/"
          element={<Home />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
