import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Map from "../Components/Map/Map";

export default function () {
  const mapData = {
    danger: {
      coordinates: [
        [72.8777, 19.076],
        [121.4737, 31.2304],
        [139.6917, 35.6895],
        // [-5.71523, 35.971261],
      ],
      names: [
        "Mumbai Port",
        "Shanghai Port",
        "Tokyo Port",
        // "Mediterranean Sea",
      ],
      radius: [
        15, 12, 10,
        // 10
      ],
    },
    caution: {
      coordinates: [
        [77.1025, 28.7041],
        [114.1095, 22.3964],
        [103.8198, 1.3521],
      ],
      names: ["Delhi Port", "Hong Kong Port", "Singapore Port"],
      radius: [10, 8, 12],
    },
  };
  return (
    <div className="w-full flex flex-col h-screen items-center">
      <Navbar />
      <div className="w-full flex flex-col md:flex-row justify-center items-center px-14 py-10 gap-5">
        <div className="w-full md:w-1/2">
          <Map mapData={mapData} />
        </div>
        <div className="w-full md:w-1/2">
          <Map mapData={mapData} />
        </div>
      </div>
    </div>
  );
}
