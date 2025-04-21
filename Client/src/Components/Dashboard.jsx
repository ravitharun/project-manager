import {
  FaProjectDiagram,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import ClientForm from "./ClientForm";
import Navbar from "./Navbar";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate(" ");

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const AuthToken = localStorage.getItem("token");
    if (AuthToken) {
      setIsAuthenticated(true);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    toast.success("Welcome to the Dashboard! 🚀");
  }, []);
  let completed = 10;

  let pending = 10;
  let progess = 10;
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <Navbar />
      </div>
      {/* <br /> */}
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Project Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <FaProjectDiagram className="text-4xl text-blue-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold">Total Projects</h2>
            <p className="text-2xl text-blue-600">{0}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <FaCheckCircle className="text-4xl text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold">Completed</h2>
            <p className="text-2xl text-green-600">{completed}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <FaTimesCircle className="text-4xl text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold">Pending</h2>
            <p className="text-2xl text-red-600">4</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <FaSpinner className="text-4xl text-yellow-600 mx-auto mb-4 animate-spin" />
            <h2 className="text-xl font-bold">In Progress</h2>
            <p className="text-2xl text-yellow-600">5</p>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="mt-6 bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-gray-800">
            <FaRegCalendarAlt className="inline mr-2 text-2xl" />
            Upcoming Deadlines
          </h2>
          <ul className="mt-2 text-gray-600">
            <li>
              🚀 Project A - <span className="text-red-500">Due Tomorrow</span>
            </li>
            <li>
              📅 Project B -{" "}
              <span className="text-yellow-500">Due in 3 Days</span>
            </li>
          </ul>
        </div>

        {/* Chart Placeholder */}
        <div className="flex flex-wrap gap-4 justify-center p-6 mt-20">
          {/* Completed Progress */}
          <div className="bg-white p-4 rounded-xl shadow-md w-80">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              <FaCheckCircle className="inline mr-2 text-green-600" />
              Project Progress (completed)
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
              <div
                className="h-full text-center text-white font-semibold transition-all duration-500"
                style={{ width: `${completed}%`, backgroundColor: "green" }}
              >
                {completed}%
              </div>
            </div>
          </div>

          {/* Pending Progress */}
          <div className="bg-white p-4 rounded-xl shadow-md w-80">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              <FaTimesCircle className="inline mr-2 text-red-600" />
              Project Progress (Pending)
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
              <div
                className="h-full text-center text-white font-semibold transition-all duration-500"
                style={{ width: `${pending}%`, backgroundColor: "red" }}
              >
                {pending}%
              </div>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white p-4 rounded-xl shadow-md w-80">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              <FaSpinner className="inline mr-2 text-yellow-600 animate-spin" />
              Project Progress (In Progress)
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
              <div
                className="h-full text-center text-black font-semibold transition-all duration-500"
                style={{ width: `${progess}%`, backgroundColor: "yellow" }}
              >
                {progess}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <ClientForm />
    </>
  );
}

export default Dashboard;
