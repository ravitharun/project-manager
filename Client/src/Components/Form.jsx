import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ValidatingData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", { email, password });
  
      if (response.status === 200) {
        const token = response.data.token; // Get JWT token from response
        localStorage.setItem("token", token); // Store it in localStorage
        toast.success("Login Successful!");
        localStorage.setItem("UserEmail", response.data.Email); // Store user data in localStorage
        setTimeout(() => {
          window.location.href = "/"; // Redirect to Dashboard after 3 seconds
        }, 3000);
      }
    } catch (error) {
      console.error("Login Failed:", error.response?.data?.message || error.message);
      toast.error("Invalid credentials! Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-center justify-center min-h-screen">
        <form
          className="bg-white p-8 rounded-xl shadow-xl w-96"
          // Form submission handled here
          onSubmit={ValidatingData}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Login
          </h2>

          <label className="block mb-2 text-gray-600 font-semibold">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            required
          />

          <label className="block mt-4 mb-2 text-gray-600 font-semibold">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            required
          />

          <button
            type="submit" // No need for onClick, handled by form onSubmit
            className="w-full mt-6 p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>

          <Link to="/Sign">
            <p
              className="text-center text-gray-600 mt-4"
           
            >
              Don't have an account?{" "}
              <span className="text-blue-500 font-semibold hover:underline">
                Sign Up
              </span>
            </p>
          </Link>
        </form>
      </div>
    </>
  );
}
