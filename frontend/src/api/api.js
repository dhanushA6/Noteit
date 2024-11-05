import axios from "axios";

const API_URL = "http://localhost:5000"; // Your Flask server URL

// Create an instance of Axios with default settings
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to sign up a new user
export const signupUser = async (userData) => {
 
    const response = await apiClient.post("/signup", userData);
    return response.data; // Return the response data directly for success
  
};

// Function to log in a user
export const loginUser = async (userData) => {
  try {
    const response = await apiClient.post("/login", userData);
    return response.data; // Return the response data directly for success
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      return { error: error.response.data.error || "Login failed. Please try again." };
    } else if (error.request) {
      // Request was made but no response received
      return { error: "No response from server. Please try again later." };
    } else {
      // Something happened in setting up the request
      return { error: "An unexpected error occurred: " + error.message };
    }
  }
};
