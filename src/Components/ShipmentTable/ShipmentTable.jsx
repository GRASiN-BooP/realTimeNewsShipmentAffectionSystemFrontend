import React, { useState, useMemo } from "react";
import Modal from "../Modal/Modal";

export default function ShipmentTable({ shipments = [] }) {
  const [incidentFilter, setIncidentFilter] = useState("Sort By News");
  const [sortField, setSortField] = useState("delay");
  const [sortOrder, setSortOrder] = useState("asc"); // Default to ascending
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Unique incidents for filtering
  const uniqueIncidents = [
    "Sort By News",
    ...new Set(shipments.map((s) => s.incidentType)),
  ];

  // Handle sorting
  const handleSort = (field) => {
    setSortOrder(sortField === field && sortOrder === "asc" ? "desc" : "asc");
    setSortField(field);
  };

  // Handle row click
  const handleRowClick = (shipment) => {
    setSelectedShipment(shipment);
    setIsModalOpen(true);
  };

  // Memoized filtering and sorting
  const filteredShipments = useMemo(() => {
    return shipments
      .filter((shipment) =>
        incidentFilter === "Sort By News"
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
    <div className="flex-1 bg-white rounded-lg shadow-md p-4 h-full">
      {/* Incident Filter Dropdown */}
      <div className="mb-4 flex justify-between">
        <select
          className="p-2 border rounded"
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
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="text-gray-700">
            <tr className="border-b bg-gray-100 text-left">
              <th
                className="px-4 py-2 cursor-pointe"
                onClick={() => handleSort("vessel")}
              >
                Vessel{" "}
                {sortField === "vessel"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th className="px-4 py-2">Origin Port</th>
              <th className="px-4 py-2">Destination Port</th>
              <th
                className="px-4 py-2 cursor-pointer"
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
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("delay")}
              >
                Delay{" "}
                {sortField === "delay" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {filteredShipments.map((shipment, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(shipment)}
              >
                <td className="px-4 py-2">{shipment.vessel}</td>
                <td className="px-4 py-2">{shipment.originPort}</td>
                <td className="px-4 py-2">{shipment.destinationPort}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      shipment.impact > 6.5
                        ? "bg-red-500 text-white"
                        : shipment.impact > 3.5
                        ? "bg-orange-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {shipment.impact.toFixed(1)}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      shipment.delay > 3
                        ? "bg-red-500 text-white"
                        : shipment.delay > 1
                        ? "bg-orange-500 text-white"
                        : "bg-green-500 text-white"
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

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedShipment && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedShipment.vessel}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-600">
                  Origin Port
                </h3>
                <p className="text-lg">{selectedShipment.originPort}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600">
                  Destination Port
                </h3>
                <p className="text-lg">{selectedShipment.destinationPort}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600">
                  Impact Score
                </h3>
                <p className="text-lg">{selectedShipment.impact.toFixed(1)}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600">Delay</h3>
                <p className="text-lg">{selectedShipment.delay} Days</p>
              </div>
            </div>
            {/* Add more details here as needed */}
          </div>
        )}
      </Modal>
    </div>
  );
}
