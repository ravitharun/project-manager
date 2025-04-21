import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import toast, { Toaster } from "react-hot-toast";
import TimeZone from "./TimeZone";
import axios from "axios";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
function Projects() {
  const navigate = useNavigate();
  const [TechStack, setTechStack] = useState("");
  const [email, setEmail] = useState([]);
  const [Projecttite, setProjecttite] = useState("");
  const [PriorityChange, setPriorityChange] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [Budget, setBudget] = useState("");
  const [Description, setDescription] = useState("");
  const [projects, setProjects] = useState([]);
  const [Disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [isOpen, setIsOpen] = useState(false);
  const [Status, setstatus] = useState("");
  const [Err, seterr] = useState("");
  const statuses = ["Completed", "Pending", "In Progress"];
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // rendernig the data
  useEffect(() => {
    const AuthToken = localStorage.getItem("token");
    if (AuthToken) {
      setIsAuthenticated(true);
    } else {
      navigate("/login");
    }
  }, []);

  // getting the user email from local storage
  let Useremail = localStorage.getItem("UserEmail");

  useEffect(() => {
    setTimeout(() => {
      toast.success("Let’s get started! Click on a project to begin. 🎯");
    }, 3400);

    // Fetch Projects from Backend
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getProjects", {
          params: { Useremail },
        });

        // Store projects in localStorage
        if (response.data.message === "No projects found") {
          seterr(response.data.message); // Set projects in state
        } else {
          setProjects(response.data); // Set projects in state
          console.log(response.data.message); // Set projects in state
        }
        localStorage.setItem("projects", JSON.stringify(response.data));

        // Update total count in localStorage
        localStorage.setItem("Total", response.data.length);

        // Store project status if available
        const statuses = response.data.map((project) => project.status);
        localStorage.setItem("Status", JSON.stringify(statuses.length));
      } catch (err) {
        console.log("err", err.message);
      }
    };

    fetchProjects();
    // map method for END DATE OF THE PROJECT
  }, []);

  // budget adding total
  let Arraybudget = [];

  const budget = projects.map((data) => {
    // Ensure Budget is a number, use 0 as a fallback
    return Number(data.Budget) || 0;
  });

  const totalbudget = budget.reduce((acc, curr) => acc + curr, 0);


  
  // Handle Form Submission
  const handleAddProject = async (event) => {
    const d = new Date();
    event.preventDefault();
    const newProject = {
      id: Date.now(),
      TechStack,
      PriorityChange: PriorityChange || "Low",
      Budget,
      email,
      Description,
      StartDate: StartDate || d.toLocaleString(),
      EndDate,
      Projecttite,
      UserEmail: Useremail,
      CreatedAt: d.getTime(),
      Status: Status || "Pending",
    };
    if (
      email == "" &&
      TechStack == "" &&
      Budget == "" &&
      Description == "" &&
      EndDate == "" &&
      Projecttite == ""
    ) {
      toast.error("Fill The Missing Details");
    } else {
      try {
        const res = await axios.post("http://localhost:3000/Send", newProject);
        if (
          res.data.message === "Project saved successfully!" ||
          res.data.message == "Emails sent successfully!" ||
          res.data.message == "No valid emails found."
        ) {
          toast.success("Project added successfully!");
          setTimeout(() => {
            toast.success("Emails sent successfully!");
          }, 1500);
          setProjects([...projects, newProject]); // Update UI
          setTimeout(() => {
            navigate("/dashboard");
            toast.success("FILL THE CLIENT DETAILS");
          }, 2500);
        } else {
          toast.error("Error adding project!");
        }
      } catch (err) {
        console.error("Error:= ", err.message);
      }
    }
  };
  // sortByBudgetHighToLow
  const sortByBudgetHighToLow = () => {
    const SortedData = [...projects].sort((a, b) => b.Budget - a.Budget);
    setProjects(SortedData);
  };
  // sortByBudgetLowToHigh
  const sortByBudgetLowToHigh = () => {
    const SortedData = [...projects].sort((a, b) => a.Budget - b.Budget);
    setProjects(SortedData);
  };

  // sortByPriorityHigh
  const sortByPriorityHigh = () => {
    // (a, b) => a.PriorityChange==="High"
    const SortPriorioty = [...projects].filter(
      (Priority) => Priority.PriorityChange == "High"
    );
    setProjects(SortPriorioty);
  };
  // sortByPriorityHigh
  const sortByPriorityLow = () => {

    const SortPriorioty = [...projects].filter(
      (Priority) => Priority.PriorityChange == "Low"
    );
    setProjects(SortPriorioty);
  };
  // handelEditing

  const handelEditing = async (_id) => {
    try {
      const editing = await axios.post(`http://localhost:3000/Edit/${_id}`); // No colon before the ID
      console.log(editing.data);
    } catch (error) {
      console.log(error);
    }
  };

  // handelDelete
  const handleDelete = async (id) => {
    try {
      const deleting = await axios.delete(`http://localhost:3000/delete/${id}`);

      // Filter out the deleted project from the state
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );

      toast.success("Data is deleted");
      console.log(deleting);
      window.location.reload();
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };
  // handelDeleteAll

  const handleDeleteAll = () => {
    toast.success("Data is Deleted All successfully");
  };

  // handelCompleted

  const handelCompleted = (id) => {
    toast.success("Successfully Completed");
    setDisabled(true);
    console.log(id);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <Navbar />
      </div>

      <div className="bg-gray-50 min-h-screen pt-20 px-6">
        <TimeZone />
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md w-100">
          <h1 className="text-lg font-semibold text-gray-800">
            Total Budget: {totalbudget.toLocaleString()}
            <span
              className={`ml-2 font-medium ${
                totalbudget > 100000 || totalbudget >= 0
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {totalbudget > 100000 || totalbudget >= 0
                ? "(Too High)📈"
                : "(TO Low) 📉"}
            </span>
          </h1>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800">Manage Projects</h1>

          {/* Sorting Options Container */}
          <div className="flex gap-4">
            {/* First Sort Menu */}
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="bg-red-300 text-black px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition hover:text-white">
                Sort By Budget <ChevronDownIcon className="size-5 text-white" />
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-2">
                <MenuItem>
                  {({ active }) => (
                    <button
                      className={`block w-full text-left px-3 py-2 rounded-md ${
                        active ? "bg-gray-100" : ""
                      }`}
                      onClick={sortByBudgetHighToLow}
                    >
                      ₹ Budget High to Low
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      className={`block w-full text-left px-3 py-2 rounded-md ${
                        active ? "bg-gray-100" : ""
                      }`}
                      onClick={sortByBudgetLowToHigh}
                    >
                      ₹ Budget Low to High
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>

            {/* Second Sort Menu */}
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="bg-red-300 text-black px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition hover:text-white">
                Sort By Priority{" "}
                <ChevronDownIcon className="size-5 text-white" />
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-2">
                <MenuItem>
                  {({ active }) => (
                    <button
                      className={`block w-full text-left px-3 py-2 rounded-md ${
                        active ? "bg-gray-100" : ""
                      }`}
                      onClick={sortByPriorityHigh}
                    >
                      🔴 High Priority First
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      className={`block w-full text-left px-3 py-2 rounded-md ${
                        active ? "bg-gray-100" : ""
                      }`}
                      onClick={sortByPriorityLow}
                    >
                      🟢 Low Priority First
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleDeleteAll}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out"
          >
            Delete All
          </button>
        </div>

        <br />
        <br />

        <br />
        {/* <br /> */}

        {/* Layout: Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Add Project Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Add Project
            </h2>
            <form className="grid grid-cols-2 gap-4">
              {/* Project Title */}
              <div className="col-span-2">
                <label className="font-semibold text-gray-700">
                  Project Title:
                </label>
                <input
                  type="text"
                  placeholder="Enter project title"
                  className="p-3 border rounded-lg w-full"
                  onChange={(e) => setProjecttite(e.target.value)}
                  required
                />
              </div>

              {/* Priority */}
              <div>
                <label className="font-semibold text-gray-700">Priority:</label>
                <select
                  className="p-3 border rounded-lg w-full"
                  onChange={(e) => setPriorityChange(e.target.value)}
                >
                  <option value="Low">🟢 Low</option>
                  <option value="Medium">🟡 Medium</option>
                  <option value="High">🔴 High</option>
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="font-semibold text-gray-700">
                  Budget (₹):
                </label>
                <input
                  type="number"
                  placeholder="Enter budget"
                  className="p-3 border rounded-lg w-full"
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="font-semibold text-gray-700">
                  Start Date:
                </label>
                <input
                  type="date"
                  className="p-3 border rounded-lg w-full"
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              {/* End Date */}
              <div>
                <label className="font-semibold text-gray-700">End Date:</label>
                <input
                  type="date"
                  className="p-3 border rounded-lg w-full"
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>

              {/* Tech Stack */}
              <div className="col-span-2">
                <label className="font-semibold text-gray-700">
                  Tech Stack:
                </label>
                <input
                  type="text"
                  placeholder="Enter tech stack"
                  className="p-3 border rounded-lg w-full"
                  onChange={(e) => setTechStack(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="font-semibold text-gray-700">
                  Add Team Members (Email)
                </label>
                <form>
                  <input
                    type="email"
                    placeholder="Enter tech stack"
                    className="p-3 border rounded-lg w-full"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </form>
              </div>

              {/* Project Description */}
              <div className="col-span-2">
                <label className="font-semibold text-gray-700">
                  Project Description:
                </label>
                <textarea
                  placeholder="Enter project description"
                  className="p-3 border rounded-lg h-24 resize-none w-full"
                  onChange={(e) => setDescription(e.target.value)}
                  required={true}
                ></textarea>
              </div>
              {/* Project Status Dropdown */}
              <div>
                <label className="font-semibold text-gray-700">
                  Project Status:
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between p-3 border rounded-lg w-full bg-white text-gray-700 font-semibold shadow-sm hover:bg-gray-100 transition"
                  >
                    {status || "Select Status"}
                  </button>

                  {isOpen && (
                    <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-all duration-200 ease-in-out z-10">
                      {statuses.map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setStatus(item);
                            setIsOpen(false);
                            setstatus(item);
                          }}
                          className={`block w-full px-4 py-2 text-left transition-all duration-200 ease-in-out ${
                            item === "Completed"
                              ? "text-green-700 hover:bg-green-100"
                              : item === "Pending"
                              ? "text-yellow-700 hover:bg-yellow-100"
                              : "text-red-700 hover:bg-red-100"
                          } ${status === item ? "bg-gray-200 font-bold" : ""}`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-span-2 flex justify-center">
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                  onClick={handleAddProject}
                >
                  ADD TASK
                </button>
              </div>
            </form>
          </div>

          {/* Right: Project List */}
          <div className="lg:col-span-2 bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Project List
            </h2>
            {Err ? (
              <h1 className="text-gray-600 text-red-500 text-center">{Err.toUpperCase()}</h1>
            ) : (
              <div className="grid gap-4">
                <center>
                  <p className="text-lg font-semibold text-red-500 hover:text-black transition duration-300">
                    Total projects:{projects.length}{" "}
                    {projects.length &&
                      localStorage.setItem("Total_Projects", projects.length)}
                  </p>
                </center>

                {projects.map((project, _id) => (
                  <div
                    key={_id}
                    className="bg-white p-5 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <h3 className="text-xl font-bold text-blue-600">
                      Project Title:{" "}
                      <i className="text-gray-400 hover:text-black">
                        {project.Projecttite}
                      </i>
                    </h3>
                    <strong className="text-gray-900">Tech Stack:</strong>{" "}
                    {project.TechStack.map((tech) => (
                      <span key={tech.id} className="text-gray-700">
                        {tech},{" "}
                      </span>
                    ))}
                    {/* <p className="text-gray-700">
                      <strong className="text-gray-900">Email:</strong>
                      {Array.isArray(project.email) ? (
                        project.email.map((email, index) => (
                          <p key={index}>{email}</p>
                        ))
                      ) : (
                        <p>{project.email}</p>
                      )}
                    </p> */}
                    <p className="flex items-center gap-2">
                      <strong className="text-gray-900">Priority:</strong>
                      {project.PriorityChange === "High" && (
                        <span className="text-red-500 font-bold">🔴 High</span>
                      )}
                      {project.PriorityChange === "Medium" && (
                        <span className="text-yellow-500 font-bold">
                          🟡 Medium
                        </span>
                      )}
                      {project.PriorityChange === "Low" && (
                        <span className="text-green-500 font-bold">🟢 Low</span>
                      )}
                    </p>
                    <p className="text-red-700">
                      <strong className="text-gray-900">Budget:</strong> ₹{" "}
                      {project.Budget}
                      {project.Budget > 100000 ? "(Too high)" : "(Too low)"}
                    </p>
                    <p className="text-gray-700">
                      <strong className="text-gray-900">Start Date:</strong>{" "}
                      {project.StartDate}
                    </p>
                    <p className="text-gray-700">
                      <strong className="text-gray-900">End Date:</strong>{" "}
                      {project.EndDate}
                    </p>
                    <p className="text-gray-700">
                      <strong className="text-gray-900">Created At:</strong>{" "}
                      {project.CreatedAt}
                    </p>
                    <p className="text-gray-700">
                      <strong className="text-gray-900">Days Left:</strong>{" "}
                      {project.Status}
                    </p>
                    <p className="text-gray-700">
                      <strong className="text-gray-900">Status:</strong>{" "}
                      {project.daysLeft}
                    </p>
                    <div className="mt-4 flex gap-3">
                      <button
                        className="delete-btn bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
                        onClick={() => handleDelete(project._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="edit-btn bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all"
                        onClick={() => handelEditing(project._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="edit-btn bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all"
                        onClick={() => handelCompleted(project._id)}
                        disabled={Disabled}
                      >
                        Completed
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <br />
    </>
  );
}

export default Projects;
