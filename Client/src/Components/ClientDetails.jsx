function ClientDetails({ getalldata }) {
  return (
    <div className="my-8 px-4">
      <center>
        <h1
          className="text-violet-500 "
          style={{ fontFamily: "monospace", fontSize: "20px" }}
        >
          Total Clients <b className="text-black">{getalldata.length}</b>
        </h1>
      </center>
      <br />
      <div className="">
        {" "}
        {/* Add this wrapper for responsiveness */}
        <table className="min-w-full max-w-4xl bg-white border border-gray-200 shadow-lg rounded-lg mx-auto">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium uppercase">
                Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium uppercase">
                Email
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium uppercase">
                Phone
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium uppercase">
                Company
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium uppercase">
                Company Logo
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium uppercase">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(getalldata) && getalldata.length > 0 ? (
              getalldata.map((data) => (
                <tr
                  key={data._id}
                  className="text-center hover:bg-gray-50 transition-colors duration-300"
                >
                  <td className="py-4 px-4 border-b text-sm font-medium">
                    {data.name}
                  </td>

                  <td className="py-4 px-4 border-b text-sm">
                    {" "}
                    <a href={`mailto:${data.email}`}>{data.email}</a>
                  </td>
                  <td className="py-4 px-4 border-b text-sm">{data.phone}</td>
                  <td className="py-4 px-4 border-b text-sm">{data.company}</td>
                  <td className="py-4 px-4 border-b">
                    <img
                      src={data.CompanyImgUrl}
                      alt={data.company}
                      title={data.name}
                      className="w-16 h-16 object-cover rounded-full mx-auto shadow-md"
                    />
                  </td>
                  <td className="py-4 px-4 border-b">
                    <div className="flex justify-center gap-2">
                      <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-6 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientDetails;
