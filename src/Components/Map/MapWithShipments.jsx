import React, { useState } from "react";
import Map from "./Map";

const MapWithShipments = ({ mapData, shipments }) => {
  const [selectedArea, setSelectedArea] = useState(null);

  // Function to find affected shipments in a radius
  const getAffectedShipments = (coordinates, radius) => {
    console.log("Finding affected shipments:", {
      coordinates,
      radius,
      shipments,
    });

    if (!shipments || !Array.isArray(shipments)) {
      console.error("Invalid shipments data:", shipments);
      return [];
    }

    return shipments.filter((shipment) => {
      if (!shipment.coordinates) {
        console.warn("Shipment missing coordinates:", shipment);
        return false;
      }

      // Simple distance calculation
      const distance = Math.sqrt(
        Math.pow(shipment.coordinates[0] - coordinates[0], 2) +
          Math.pow(shipment.coordinates[1] - coordinates[1], 2)
      );

      const isAffected = distance <= radius;
      console.log("Shipment distance check:", {
        shipment: shipment.vessel || "unknown",
        distance,
        radius,
        isAffected,
      });

      return isAffected;
    });
  };

  const handleAreaClick = (coordinates, radius, type, name) => {
    console.log("Area clicked in MapWithShipments:", {
      coordinates,
      radius,
      type,
      name,
    });
    const affectedShipments = getAffectedShipments(coordinates, radius);
    console.log("Affected shipments:", affectedShipments);

    setSelectedArea({
      coordinates,
      radius,
      type,
      name,
      affectedShipments,
    });
  };

  return (
    <div className="relative">
      <Map mapData={mapData} onAreaClick={handleAreaClick} />

      {/* Simple Modal Implementation */}
      {selectedArea && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto hide-scrollbar">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-700">
                Affected Shipments in {selectedArea.name}
              </h2>
              <button
                onClick={() => setSelectedArea(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            {selectedArea.affectedShipments.length > 0 ? (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-4 py-2 text-sm font-medium text-gray-600">
                        Vessel
                      </th>
                      <th className="px-4 py-2 text-sm font-medium text-gray-600">
                        Origin Port
                      </th>
                      <th className="px-4 py-2 text-sm font-medium text-gray-600">
                        Destination Port
                      </th>
                      <th className="px-4 py-2 text-sm font-medium text-gray-600">
                        Impact
                      </th>
                      <th className="px-4 py-2 text-sm font-medium text-gray-600">
                        Delay
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-500">
                    {selectedArea.affectedShipments.map((shipment, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm">{shipment.vessel}</td>
                        <td className="px-4 py-2 text-sm">
                          {shipment.originPort}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {shipment.destinationPort}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              shipment.impact > 6.5
                                ? "bg-red-500/25 text-red-500"
                                : shipment.impact > 3.5
                                ? "bg-yellow-500/25 text-yellow-500"
                                : "bg-green-500/25 text-green-500"
                            }`}
                          >
                            {shipment.impact.toFixed(1)}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              shipment.delay > 3
                                ? "bg-red-500/25 text-red-500"
                                : shipment.delay > 1
                                ? "bg-orange-500/25 text-orange-500"
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
            ) : (
              <p className="text-gray-500">
                No shipments affected in this area.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapWithShipments;
