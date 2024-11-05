import React, { useState } from "react";
// import { saveAs } from "file-saver";

import { jsPDF } from "jspdf";

const Main = () => {
  const [videoURL, setVideoURL] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulating an API call to process the video URL and get generated text
      const response = await fetch("http://localhost:5000/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoURL }),
      });

      const data = await response.json();
      setGeneratedText(data.generatedText); // This should come from the model

      // Add the video URL to history
      setHistory((prevHistory) => [...prevHistory, videoURL]);
    } catch (error) {
      console.error("Error fetching generated text:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text(generatedText, 10, 10);
    doc.save("generated_notes.pdf");
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Left Sidebar */}
      <div className="w-1/4 p-4 border-r border-gray-700">
        <h2 className="text-2xl font-semibold mb-6">Profile</h2>
        {/* Profile Section */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <p className="text-lg">User Name</p>
          <p className="text-sm">user@example.com</p>
        </div>

        {/* History Section */}
        <h2 className="text-2xl font-semibold mb-4">History</h2>
        <ul className="space-y-2">
          {history.map((url, index) => (
            <li key={index} className="bg-gray-800 p-2 rounded-md">
              {url}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Input for the YouTube video URL */}
        <form onSubmit={handleSubmit} className="mb-8">
          <label className="block mb-4 text-2xl font-semibold">Enter YouTube Video URL:</label>
          <input
            type="text"
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
            placeholder="Paste YouTube video URL here..."
            className="w-full p-4 bg-gray-800 rounded-md text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-600"
            required
          />
          <button type="submit" className="w-full bg-green-600 hover:bg-gray-700 py-3 rounded-md mt-4">
            {loading ? "Processing..." : "Generate Notes"}
          </button>
        </form>

        {/* Display generated text in a conversational style */}
        {generatedText && (
          <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 bg-gray-700 w-10 h-10 rounded-full" />
              <div className="bg-gray-700 p-4 rounded-lg w-full">
                <p className="text-white">{generatedText}</p>
              </div>
            </div>

            {/* Download as PDF button */}
            <button
              onClick={handleDownload}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 py-3 rounded-md"
            >
              Download Notes as PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
