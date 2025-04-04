import React, { useState, useMemo } from "react";

export default function ShipmentTable({ shipments = [] }) {
  const [incidentFilter, setIncidentFilter] = useState("All");
  const [sortField, setSortField] = useState("delay");
  const [sortOrder, setSortOrder] = useState("asc"); // Default to ascending

  // Unique incidents for filtering
  const uniqueIncidents = [
    "All",
    ...new Set(shipments.map((s) => s.incidentType)),
  ];

  // Handle sorting
  const handleSort = (field) => {
    setSortOrder(sortField === field && sortOrder === "asc" ? "desc" : "asc");
    setSortField(field);
  };

  // Memoized filtering and sorting
  const filteredShipments = useMemo(() => {
    return shipments
      .filter((shipment) =>
        incidentFilter === "All"
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
          <thead>
            <tr className="border-b bg-gray-100 text-left">
              <th
                className="px-4 py-2 cursor-pointer"
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
          <tbody>
            {filteredShipments.map((shipment, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
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
                    {shipment.impact}
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
    </div>
  );
}
