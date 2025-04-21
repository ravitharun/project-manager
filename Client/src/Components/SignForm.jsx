import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignForm() {
  const [name, setName] = useState("");
  const [useremail, setEmail] = useState("");
  const [userpassword, setPassword] = useState("");
  let navigate = useNavigate();
  const GetusrData = async (event) => {
    event.preventDefault();
    try {
      const userdata = { name, userpassword, useremail };
      const senddata = await axios.post("http://localhost:3000/Sign", userdata);
      console.log(senddata.data.user._id);
      if (senddata.data.message === "User created successfully") {
        localStorage.setItem("userid", senddata.data.user._id);
        console.log(localStorage.getItem("userid"));
        toast.success("User Created");
        setName(""); // ✅ Clears input
        setPassword(""); // ✅ Clears input
        setEmail(""); // ✅ Clears input
        // /login
        navigate("/login")
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-center justify-center min-h-screen">
        <form
          className="bg-white p-8 rounded-xl shadow-xl w-96"
          onSubmit={GetusrData}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Create Account
          </h2>

          <label className="block mb-2 text-gray-600 font-semibold">Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="John Doe"
            required
            value={name} // ✅ Controlled component
            onChange={(e) => setName(e.target.value)}
          />

          <label className="block mt-4 mb-2 text-gray-600 font-semibold">
            Email
          </label>
          <input
            type="email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="john@example.com"
            value={useremail} // ✅ Controlled component
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block mt-4 mb-2 text-gray-600 font-semibold">
            Password
          </label>
          <input
            type="password"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="••••••••"
            value={userpassword} // ✅ Controlled component
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full mt-6 p-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 transition duration-300"
          >
            Sign Up
          </button>

          <Link to="/login">
            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <span className="text-purple-500 font-semibold hover:underline">
                Login
              </span>
            </p>
          </Link>
        </form>
      </div>
    </>
  );
}
