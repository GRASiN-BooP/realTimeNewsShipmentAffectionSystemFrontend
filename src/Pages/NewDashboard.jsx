import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import MapWithShipments from "../Components/Map/MapWithShipments";
import Card from "../Components/Card/Card";
import NewsCarousel from "../Components/NewsCarousel/NewsCarousel";
import ShipmentTable from "../Components/ShipmentTable/ShipmentTable";
import ShipmentStatusPieChart from "../Components/Charts/ShipmentStatusPieChart";
import { useUser } from "../Context/User";
import parseIncidentsData from "../Services/ParseResponse";
import NewsCardRotator from "../Components/NewsCarousel/NewsCardRotator";
import Ship from "../svgs/Ship";
import Secure from "../svgs/Secure";
import Danger from "../svgs/Danger";
import Caution from "../svgs/Caution";
export default function NewDashboard() {
  const { getSummaryCount, getIncidents, getShipmentStatusChartData } =
    useUser();
  const [summaryCount, setSummaryCount] = useState({
    shipmentInTransit: 0,
    shipmentNotAffected: 0,
    shipmentUnderCaution: 0,
    shipmentUnderDanger: 0,
  });
  const [shipmentsAPI, setShipmentsAPI] = useState([]);
  const [mapDataAPI, setMapDataAPI] = useState({});
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shipmentStatusChartData, setShipmentStatusChartData] = useState({});

  useEffect(() => {
    const getAllSummaryCount = async () => {
      const response = await getSummaryCount();
      setSummaryCount(response);
    };
    const getAllShipmentStatusChartData = async () => {
      const response = await getShipmentStatusChartData();
      setShipmentStatusChartData(response);
    };
    const getAllIncidents = async () => {
      try {
        getAllSummaryCount();
        getAllShipmentStatusChartData();
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
            mySvg={<Ship />}
          />
          <Card
            count={summaryCount.shipmentNotAffected}
            title="Shipments Not Affected"
            state="secure"
            mySvg={<Secure />}
          />
          <Card
            count={summaryCount.shipmentUnderCaution}
            title="Shipments Under Caution"
            state="caution"
            mySvg={<Caution />}
          />
          <Card
            count={summaryCount.shipmentUnderDanger}
            title="Shipments Under Danger"
            state="danger"
            mySvg={<Danger />}
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
          className="sm:col-span-1 sm:row-span-3 col-span-2 row-span-2"
        >
          <ShipmentStatusPieChart
            inTransit={shipmentStatusChartData.shipmentInTransit}
            delivered={shipmentStatusChartData.shipmentDelivered}
          />
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
