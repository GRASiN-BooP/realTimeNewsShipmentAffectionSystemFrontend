import React, { useState, useMemo, useEffect } from "react";
import Modal from "../Modal/Modal";
import { useUser } from "../../Context/User";

export default function ShipmentTable({ shipments = [] }) {
  const [incidentFilter, setIncidentFilter] = useState("All Shipments");
  const [sortField, setSortField] = useState("delay");
  const [sortOrder, setSortOrder] = useState("asc"); // Default to ascending
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [placeNames, setPlaceNames] = useState({});
  const { getPlaceName } = useUser();

  // Fetch place names for all shipments when component loads
  useEffect(() => {
    const fetchPlaceNames = async () => {
      const newPlaceNames = {};
      for (const shipment of shipments) {
        if (
          shipment.coordinates &&
          shipment.coordinates.latitude &&
          shipment.coordinates.longitude
        ) {
          const key = `${shipment.coordinates.latitude},${shipment.coordinates.longitude}`;
          if (!newPlaceNames[key]) {
            try {
              const placeName = await getPlaceName(
                shipment.coordinates.latitude,
                shipment.coordinates.longitude,
                shipment.shipment
              );
              newPlaceNames[key] = placeName || "Unknown";
            } catch (error) {
              console.error("Error fetching place name:", error);
              newPlaceNames[key] = "Unknown";
            }
          }
        }
      }

      setPlaceNames(newPlaceNames);
    };

    fetchPlaceNames();
  }, [shipments, getPlaceName]);

  // Unique incidents for filtering
  const uniqueIncidents = [
    "All Shipments",
    ...new Set(shipments.map((s) => s.incidentType)),
  ];

  // Handle sorting
  const handleSort = (field) => {
    setSortOrder(sortField === field && sortOrder === "asc" ? "desc" : "asc");
    setSortField(field);
  };

  // Handle row click
  const handleRowClick = (shipment) => {
    // Add place name to the shipment data before opening modal
    const shipmentWithPlaceName = { ...shipment };
    if (
      shipment.coordinates &&
      shipment.coordinates.latitude &&
      shipment.coordinates.longitude
    ) {
      const key = `${shipment.coordinates.latitude},${shipment.coordinates.longitude}`;
      shipmentWithPlaceName.placeName = placeNames[key] || "Unknown";
    }

    setSelectedShipment(shipmentWithPlaceName);
    setIsModalOpen(true);
  };

  // Memoized filtering and sorting
  const filteredShipments = useMemo(() => {
    return shipments
      .filter((shipment) =>
        incidentFilter === "All Shipments"
          ? true
          : shipment.incidentType === incidentFilter
      )
      .sort((a, b) => {
        if (sortField === "delay") {
          return sortOrder === "asc" ? a.delay - b.delay : b.delay - a.delay;
        } else if (sortField === "impact") {
          return sortOrder === "asc"
            ? a.impact - b.impact
            : b.impact - a.impact;
        }
        return sortOrder === "asc"
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField]);
      });
  }, [shipments, incidentFilter, sortField, sortOrder]);

  return (
    <div className="flex-1 bg-white rounded-lg shadow-md px-4 py-5  w-full">
      {/* Incident Filter Dropdown */}
      <div className="mb-4 flex justify-between">
        <select
          className="p-2 border border-gray-300 outline-none rounded-lg text-gray-500"
          value={incidentFilter}
          onChange={(e) => setIncidentFilter(e.target.value)}
        >
          {uniqueIncidents.map((incident, index) => (
            <option key={index} value={incident}>
              {incident}
            </option>
          ))}
        </select>
      </div>
      {/* Table Container with Fixed Height */}
      <div className="border border-gray-200 rounded-lg overflow-hidden h-56 ">
        <div className="overflow-y-auto h-full hide-scrollbar">
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-50 z-10">
              <tr className="text-left">
                <th
                  className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-sm sm:text-base cursor-pointer text-gray-600"
                  onClick={() => handleSort("vessel")}
                >
                  Tracking Number{" "}
                  {sortField === "vessel"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-gray-600">
                  Origin Port
                </th>
                <th className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-gray-600">
                  Destination Port
                </th>
                <th
                  className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-sm sm:text-base cursor-pointer text-gray-600"
                  onClick={() => handleSort("impact")}
                >
                  Impact{" "}
                  {sortField === "impact"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th
                  className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-sm sm:text-base cursor-pointer text-gray-600"
                  onClick={() => handleSort("delay")}
                >
                  Delay
                  {sortField === "delay"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {filteredShipments.map((shipment, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(shipment)}
                >
                  <td className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
                    {shipment.shipment}
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
                    {shipment.originPort}
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
                    {shipment.destinationPort}
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
                    <span
                      className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm ${
                        shipment.impact > 7
                          ? "bg-red-500/25 text-red-500"
                          : shipment.impact > 3.5
                          ? "bg-yellow-500/25 text-yellow-500"
                          : "bg-green-500/25 text-green-500"
                      }`}
                    >
                      {shipment.impact.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
                    <span
                      className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm ${
                        shipment.delay > 10
                          ? "bg-red-500/25 text-red-500"
                          : shipment.delay > 5
                          ? "bg-yellow-500/25 text-yellow-500"
                          : "bg-green-500/25 text-green-500"
                      }`}
                    >
                      {shipment.delay} Days
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedShipment?.vessel}
        shipment={selectedShipment?.shipment}
        data={selectedShipment}
      />
    </div>
  );
}
