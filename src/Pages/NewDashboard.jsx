import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import MapWithShipments from "../Components/Map/MapWithShipments";
import Card from "../Components/Card/Card";
import NewsCarousel from "../Components/NewsCarousel/NewsCarousel";
import ShipmentTable from "../Components/ShipmentTable/ShipmentTable";
import { motion } from "motion/react";
import { useUser } from "../Context/User";
import parseIncidentsData from "../Services/ParseResponse";
import NewsCardRotator from "../Components/NewsCarousel/NewsCardRotator";

export default function NewDashboard() {
  const { getSummaryCount, getIncidents } = useUser();
  const [summaryCount, setSummaryCount] = useState({});
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
        getAllSummaryCount();
        const response = await getIncidents();
        const parsedData = parseIncidentsData(response);
        setMapDataAPI(parsedData.mapData);
        setShipmentsAPI(parsedData.shipments);
        setNewsItems(parsedData.news);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllIncidents();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col">
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
      <div className="w-full flex-1 grid sm:grid-cols-4 grid-cols-2 sm:grid-rows-7 grid-rows-9 gap-4 p-4 overflow-auto">
        <div
          id="insightCards"
          className="row-span-1 sm:col-span-4 col-span-2 gap-5 grid grid-cols-2 sm:grid-cols-4"
        >
          <Card
            count={summaryCount.shipmentInTransit}
            title="Shipments In Transit"
            state="normal"
          />
          <Card
            count={summaryCount.shipmentNotAffected}
            title="Shipments Not Affected"
            state="normal"
          />
          <Card
            count={summaryCount.shipmentUnderCaution}
            title="Shipments Under Caution"
            state="caution"
          />
          <Card
            count={summaryCount.shipmentUnderDanger}
            title="Shipments Under Danger"
            state="danger"
          />
        </div>
        <div
          id="map"
          className="sm:col-span-2 sm:row-span-6 col-span-2 row-span-2"
        >
          <MapWithShipments mapData={mapDataAPI} shipments={shipmentsAPI} />
        </div>
        <div
          id="newsCarousel"
          className="sm:col-span-1 sm:row-span-3 col-span-2 row-span-2"
        >
          <NewsCardRotator newsItems={newsItems} />
        </div>
        <div
          id="charts"
          className="sm:col-span-1 sm:row-span-3 col-span-2 row-span-2 bg-white shadow-sm"
        >
          Chartss
        </div>
        <div
          id="table"
          className="sm:col-span-2 sm:row-span-3 col-span-2 row-span-2"
        >
          <ShipmentTable shipments={shipmentsAPI} />
        </div>
      </div>
    </div>
  );
}
