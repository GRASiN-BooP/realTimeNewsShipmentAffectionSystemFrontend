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
  const [shipmentsAPI, setShipmentsAPI] = useState([]);
  const [mapDataAPI, setMapDataAPI] = useState({});
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllSummaryCount = async () => {
      const response = await getSummaryCount();
      setSummaryCount(response);
    };
    const getAllIncidents = async () => {
      try {
        const response = await getIncidents();
        const parsedData = parseIncidentsData(response);
        setMapDataAPI(parsedData.mapData);
        setShipmentsAPI(parsedData.shipments);
        setNewsItems(parsedData.news);
        getAllIncidents();
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllIncidents();
    getAllSummaryCount();
  }, []);

  return (
    <div className="w-full flex flex-col h-screen items-center relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 text-lg font-medium">
              Loading dashboard data...
            </p>
          </div>
        </div>
      )}
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-screen flex flex-col lg:flex-row justify-center items-center px-5 md:px-14 gap-5"
      >
        <div className="w-full lg:w-1/2">
          <MapWithShipments mapData={mapDataAPI} shipments={shipmentsAPI} />
        </div>
        <div className="w-full lg:w-1/2 grid grid-cols-4 grid-row-9 gap-2">
          <div id="newsArea" className="col-span-2 row-span-4">
            <NewsCarousel newsItems={newsItems} />
          </div>
          <div className="col-span-1 row-span-2">
            <Card
              title="Shipments In Transit"
              count={summaryCount.shipmentInTransit}
              state="normal"
            />
          </div>
          <div className="col-span-1 row-span-2">
            <Card
              title="Shipments Not Affected"
              count={summaryCount.shipmentNotAffected}
              state="normal"
            />
          </div>
          <div className="col-span-1 row-span-2">
            <Card
              title="Shipments Under Caution"
              count={summaryCount.shipmentUnderCaution}
              state="caution"
            />
          </div>
          <div className="col-span-1 row-span-2">
            <Card
              title="Shipments Under Danger"
              count={summaryCount.shipmentUnderDanger}
              state="danger"
            />
          </div>
          <div className="col-span-4 row-span-5">
            <ShipmentTable shipments={shipmentsAPI} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
