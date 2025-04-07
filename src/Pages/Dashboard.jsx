import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import MapWithShipments from "../Components/Map/MapWithShipments";
import Card from "../Components/Card/Card";
import NewsCarousel from "../Components/NewsCarousel/NewsCarousel";
import ShipmentTable from "../Components/ShipmentTable/ShipmentTable";
import { motion } from "motion/react";
import { useUser } from "../Context/User";
import parseIncidentsData from "../Services/ParseResponse";

export default function () {
  const { getSummaryCount, getIncidents } = useUser();
  const [summaryCount, setSummaryCount] = useState(0);
  const [incidents, setIncidents] = useState([]);
  const [shipmentsAPI, setShipmentsAPI] = useState([]);
  const [mapDataAPI, setMapDataAPI] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // const mapData = {
  //   danger: {
  //     coordinates: [
  //       [72.8777, 19.076], // Mumbai
  //       [121.4737, 31.2304], // Shanghai
  //       [139.6917, 35.6895], // Tokyo
  //       [-5.71523, 35.971261], // Mediterranean
  //     ],
  //     names: [
  //       "Mumbai Port",
  //       "Shanghai Port",
  //       "Tokyo Port",
  //       "Mediterranean Sea",
  //     ],
  //     radius: [15, 12, 10, 10],
  //   },
  //   caution: {
  //     coordinates: [
  //       [77.1025, 28.7041], // Delhi
  //       [114.1095, 22.3964], // Hong Kong
  //       [103.8198, 1.3521], // Singapore
  //     ],
  //     names: ["Delhi Port", "Hong Kong Port", "Singapore Port"],
  //     radius: [10, 8, 12],
  //   },
  // };
  // const shipments = [
  //   {
  //     vessel: "Vessel 1",
  //     originPort: "Port XYZ",
  //     destinationPort: "Port ABC",
  //     impact: 2.9,
  //     delay: 0,
  //     incidentType: "Port Strike in Singapore",
  //     coordinates: [103.8198, 1.3521], // Singapore
  //   },
  //   {
  //     vessel: "Vessel 2",
  //     originPort: "Port DEF",
  //     destinationPort: "Port GHI",
  //     impact: 4.5,
  //     delay: 1,
  //     incidentType: "Port Strike in Singapore",
  //     coordinates: [103.8198, 1.3521], // Singapore
  //   },
  //   {
  //     vessel: "Vessel 3",
  //     originPort: "Port JKL",
  //     destinationPort: "Port MNO",
  //     impact: 4.1,
  //     delay: 1,
  //     incidentType: "Tsunami in Japan",
  //     coordinates: [139.6917, 35.6895], // Tokyo
  //   },
  //   {
  //     vessel: "Vessel 4",
  //     originPort: "Port GLP",
  //     destinationPort: "Port VYS",
  //     impact: 7.0,
  //     delay: 4,
  //     incidentType: "Tsunami in Japan",
  //     coordinates: [139.6917, 35.6895], // Tokyo
  //   },
  //   {
  //     vessel: "Vessel 5",
  //     originPort: "Port ABC",
  //     destinationPort: "Port XYZ",
  //     impact: 3.2,
  //     delay: 2,
  //     incidentType: "Port Strike in Singapore",
  //     coordinates: [114.1095, 22.3964], // Hong Kong
  //   },
  //   {
  //     vessel: "Vessel 6",
  //     originPort: "Port DEF",
  //     destinationPort: "Port GHI",
  //     impact: 5.8,
  //     delay: 3,
  //     incidentType: "Port Strike in Singapore",
  //     coordinates: [72.8777, 19.076], // Mumbai
  //   },
  // ];

  useEffect(() => {
    const getAllIncidents = async () => {
      try {
        const response = await getIncidents();
        setIncidents(response);
        const parsedData = parseIncidentsData(response);
        setMapDataAPI(parsedData.mapData);
        setShipmentsAPI(parsedData.shipments);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllIncidents();
  }, []);

  return (
    <div className="w-full flex flex-col h-screen items-center">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col lg:flex-row justify-center mt-16 items-center px-5 md:px-14 py-10 gap-5"
      >
        <div className="w-full lg:w-1/2 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600">Loading map data...</p>
              </div>
            </div>
          )}
          <MapWithShipments mapData={mapDataAPI} shipments={shipmentsAPI} />
        </div>
        <div className="w-full h-full lg:w-1/2 grid grid-cols-4 grid-row-9 gap-2">
          <div id="newsArea" className="col-span-2 row-span-4">
            <NewsCarousel />
          </div>
          <div className="col-span-1 row-span-2">
            <Card title="Shipments In Transit" count={50} state="normal" />
          </div>
          <div className="col-span-1 row-span-2">
            <Card title="Shipments Not Affected" count={20} state="normal" />
          </div>
          <div className="col-span-1 row-span-2">
            <Card title="Shipments Under Caution" count={20} state="caution" />
          </div>
          <div className="col-span-1 row-span-2">
            <Card title="Shipments Under Danger" count={20} state="danger" />
          </div>
          <div className="col-span-4 row-span-5 relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-600">Loading shipment data...</p>
                </div>
              </div>
            )}
            <ShipmentTable shipments={shipmentsAPI} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
