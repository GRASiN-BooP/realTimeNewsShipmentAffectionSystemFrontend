import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Map from "../Components/Map/Map";

export default function () {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Map />
    </div>
  );
}
