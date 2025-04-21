import { useState, useEffect } from "react";

function TimeZone() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCurrentTime(d.toLocaleTimeString()); // Update state with formatted time
    //   console.log(d.toLocaleTimeString())
    };

    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 1000); // Update time every second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <>
   < br/>
   < br/>
   < br/>
    <div className="fixed right-5 top-20 text-lg font-semibold text-white  p-2 rounded-lg shadow-md bg-orange-500">
      🕒 {currentTime}
    </div>
    </>
  );
}

export default TimeZone;
