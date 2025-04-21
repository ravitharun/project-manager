import axios from "axios";
import { useEffect, useState } from "react";
import ClientDetails from "./ClientDetails";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ClientForm() {
  const [name, setClient] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [CompanyImgUrl, setCompanyImgUrl] = useState("");
  const [getalldata, setAllData] = useState("");
  const navigate = useNavigate("");
  
  // Fetching client data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cliendata = await axios.get("http://localhost:3000/Getallclient");
        setAllData(cliendata.data);
        console.log("getalldata" + getalldata.EndDate);
      } catch (error) {
        console.log("Error fetching client data:", error);
      }
    };

    fetchData();
  }, []);

  // Handling data submission
  const senddata = async (event) => {
    event.preventDefault();
    const clientData = { name, email, phone, company, CompanyImgUrl };
    try {
      const response = await axios.post(
        "http://localhost:3000/submit-client-data",
        clientData
      );
      if (response.data.message === "Success") {
        toast.success("Data submitted successfully");
        setTimeout(() => {
          navigate("/projects");
        }, 1500);
      } else {
        toast.error("Error:", response.data);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section: Form */}
          <div className="w-full lg:w-1/3 p-6 bg-white shadow-md rounded-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Client Information Form
            </h2>
            <form onSubmit={senddata} className="space-y-4">
              <div className="flex flex-col">
                <label className="text-gray-600">Client Name</label>
                <input
                  type="text"
                  className="p-3 border border-gray-300 rounded-md mt-2 w-full"
                  value={name}
                  onChange={(e) => setClient(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600">Client Email</label>
                <input
                  type="email"
                  className="p-3 border border-gray-300 rounded-md mt-2 w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600">Client Phone</label>
                <input
                  type="tel"
                  className="p-3 border border-gray-300 rounded-md mt-2 w-full"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600">Client Address</label>
                <input
                  type="text"
                  className="p-3 border border-gray-300 rounded-md mt-2 w-full"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600">Company Image URL</label>
                <input
                  type="url"
                  className="p-3 border border-gray-300 rounded-md mt-2 w-full"
                  value={CompanyImgUrl}
                  onChange={(e) => setCompanyImgUrl(e.target.value)}
                />
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Right Section: Display Client Data */}
          <div className="w-70 lg:w-2/3 p-6 bg-gray-100 shadow-md rounded-md">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              All Clients
            </h3>
            <ClientDetails getalldata={getalldata} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientForm;
