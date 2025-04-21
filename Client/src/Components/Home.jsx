import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const AuthToken = localStorage.getItem("token");
    if (AuthToken) {
      setIsAuthenticated(true);
    }
    else{
      navigate("/login")
    }
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
    <div className="sticky top-0 bg-white shadow-md z-50">
  <Navbar />
</div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-screen text-center px-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to WebFlow Manager
        </h1>
        <h2 className="mt-2 text-2xl text-indigo-600 font-semibold">
          Your Ultimate Project Tracking Solution 🚀
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Stay organized and boost productivity with powerful project tracking
          tools. Set priorities, manage budgets, and monitor progress—all in one
          place!
        </p>
        <Link to="/dashboard">
        <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-500 cursor-pointer">
          Get Started →
        </button>
        </Link>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 ">
          <div className="p-6 bg-orange-800 rounded-lg shadow hover:bg-orange-500 hover:cursor-pointer">
            <h3 className="text-xl font-semibold text-white">
              Project Tracking
            </h3>
            <p className="text-white mt-2">
              Monitor progress in real-time with detailed insights.
            </p>
          </div>
          <div className="p-6 bg-green-400 rounded-lg shadow hover:bg-green-500 hover:cursor-pointer hover:text-white">
            <h3 className="text-xl font-semibold">Priority Management</h3>
            <p className="text-white mt-2">
              Set priorities for tasks and never miss important deadlines.
            </p>
          </div>
          <div className="p-6 bg-blue-200 rounded-lg shadow hover:bg-blue-500 hover:cursor-pointer">
            <h3 className="text-xl font-semibold">Budget Control</h3>
            <p className="text-gray-700 mt-2">
              Track your budget and optimize project expenses.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          What Our Users Say
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow rounded-lg hover:scale-80 hover:rotate-y-45">
            <p
              className="text-violet-500 "
              style={{ fontSize: "20px", fontFamily: "cursive" }}
            >
              " This project management tool has completely changed the way we
              work. Tracking progress is now easier than ever!"
            </p>
            <h4 className="mt-4 font-semibold">- John Doe, Developer</h4>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <p
              className="text-gray-700 italic"
              style={{ fontSize: "20px", fontFamily: "cursive" }}
            >
              "I love how simple and intuitive the UI is. Managing budgets and
              priorities is now stress-free!"
            </p>
            <h4 className="mt-4 font-semibold">
              - Jane Smith, Project Manager
            </h4>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <p
              className="text-violet-700 italic"
              style={{ fontSize: "20px", fontFamily: "cursive" }}
            >
              "I love how simple and intuitive the UI is. Managing budgets and
              priorities is now stress-free!"
            </p>
            <h4 className="mt-4 font-semibold">
              - Jane Smith, Project Manager
            </h4>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-white text-center">
        <p>© 2025 Project Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}
