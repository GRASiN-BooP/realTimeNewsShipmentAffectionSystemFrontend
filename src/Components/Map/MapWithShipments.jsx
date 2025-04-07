import React, { useState } from "react";
import Map from "./Map";

const MapWithShipments = ({ mapData, shipments, isFullScreen = false }) => {
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
    <div
      className={`relative ${
        isFullScreen ? "h-full w-full flex flex-col" : ""
      }`}
    >
      <div className={`${isFullScreen ? "flex-grow h-full" : ""}`}>
        <Map
          mapData={mapData}
          onAreaClick={handleAreaClick}
          isFullScreen={isFullScreen}
        />
      </div>

      {/* Simple Modal Implementation */}
      {selectedArea && !isFullScreen && (
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
                  <tbody>
                    {selectedArea.affectedShipments.map((shipment, index) => (
                      <tr
                        key={index}
                        className="border-t border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {shipment.vessel}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {shipment.originPort}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {shipment.destinationPort}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {shipment.impact}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {shipment.delay} days
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
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
