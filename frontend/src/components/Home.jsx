import React, { useState, useEffect } from "react";
import Header from "./Header";

const HomePage = () => {
  const [tagline, setTagline] = useState("");
  const [currentTagline, setCurrentTagline] = useState("");
  const [index, setIndex] = useState(0);
  const [typing, setTyping] = useState(false);

  const taglines = [
    "Create Memories, Capture Moments",
    "Video to Knowledge, One Click",
    "Summarize Learning, Simplify Notes",
    "Effortless Notes from Videos",
    "Videos to Highlights, Learn Smart",
    "Personal Video Notes in Seconds",
    "Transform Videos to Notes",
    "Unlock Knowledge, One Video"
];


  useEffect(() => {
    const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];
    setTagline(randomTagline);
    setIndex(0);
    setCurrentTagline("");
    setTyping(true);
  }, []);

  useEffect(() => {
    if (typing) {
      const typingInterval = setInterval(() => {
        if (index < tagline.length) {
          setCurrentTagline((prev) => prev + tagline[index]);
          setIndex((prev) => prev + 1);
        } else {
          clearInterval(typingInterval);
          setTyping(false);
        }
      }, 40); // Adjust the typing speed here (in milliseconds)

      return () => clearInterval(typingInterval);
    }
  }, [typing, index, tagline]);

  return (
    <div className="animated-bg min-h-screen flex flex-col text-black">
      <Header />
      
      {/* Main Content */}
      <div className="flex justify-center items-center mt-20 flex-grow">
        <div className="w-full max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6">{currentTagline}</h1>
          <p className="text-lg text-gray-500 mb-8">
            Welcome to our video-to-notes summarization app. We simplify the process of note-taking for educational videos, making learning efficient and quick.
          </p>
          
          {/* Grid of Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-gray-800 rounded-lg text-white shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-3">Upload Your Video</h3>
              <p>
                Easily upload any educational video you want to summarize. We support a wide range of formats, making it simple to get started.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="p-6 bg-gray-800 rounded-lg text-white shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-3">Generate Notes</h3>
              <p>
                Our AI-powered model quickly processes the video to extract key points, helping you get accurate and concise notes in seconds.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="p-6 bg-gray-800 rounded-lg text-white shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-3">Interactive Interface</h3>
              <p>
                Enjoy a user-friendly interface that provides a seamless experience while uploading videos and reviewing your notes.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="p-6 bg-gray-800 rounded-lg text-white shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-3">Personalized Learning</h3>
              <p>
                Tailor the notes generation based on your preferences, making sure you capture the most relevant insights from each video.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          {/* Footer Text */}
          <div className="mb-4 sm:mb-0">
            <p>&copy; 2024 NotesMaker. All rights reserved.</p>
          </div>
          
          {/* Footer Links */}
          <div className="flex space-x-4">
            <a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="/terms" className="text-gray-400 hover:text-white">Terms of Service</a>
            <a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
