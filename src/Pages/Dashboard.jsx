import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Map from "../Components/Map/Map";
import Card from "../Components/Card/Card";
import NewsCard from "../Components/NewsCard/NewsCard";
import ShipmentTable from "../Components/ShipmentTable/ShipmentTable";

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
  const shipments = [
    {
      vessel: "Vessel 1",
      originPort: "Port XYZ",
      destinationPort: "Port ABC",
      impact: 2.9,
      delay: "0 Day",
    },
    {
      vessel: "Vessel 2",
      originPort: "Port DEF",
      destinationPort: "Port GHI",
      impact: 4.5,
      delay: "1 Day",
    },
    {
      vessel: "Vessel 3",
      originPort: "Port JKL",
      destinationPort: "Port MNO",
      impact: 4.1,
      delay: "1 Day",
    },
    {
      vessel: "Vessel 4",
      originPort: "Port GLP",
      destinationPort: "Port VYS",
      impact: 5.6,
      delay: "2 Day",
    },
  ];
  return (
    <div className="w-full flex flex-col h-screen items-center">
      <Navbar />
      <div className="w-full flex flex-col md:flex-row justify-center mt-16 items-center px-5 md:px-14 py-10 gap-5">
        <div className="w-full md:w-1/2">
          <Map mapData={mapData} />
        </div>
        <div className="w-full h-full md:w-1/2 grid grid-cols-4 grid-row-9 gap-2">
          <div id="newsArea" className="col-span-2 row-span-4">
            <NewsCard
              title="News 1"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
            />
          </div>
          <div className="col-span-2 row-span-1">
            <Card title="Shipments Intransit" count={50} state="normal" />
          </div>
          <div className="col-span-2 row-span-1">
            <Card title="Shipments Not Affected" count={20} state="normal" />
          </div>
          <div className="col-span-2 row-span-1">
            <Card title="Shipments Under Caution" count={20} state="caution" />
          </div>
          <div className="col-span-2 row-span-1">
            <Card title="Shipments Under Danger" count={20} state="danger" />
          </div>
          <div className="col-span-4 row-span-5">
            <ShipmentTable shipments={shipments} />
          </div>
        </div>
      </div>
    </div>
  );
}
