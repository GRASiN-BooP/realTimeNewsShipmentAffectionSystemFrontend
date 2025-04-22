import React from "react";

// Define the component as a named function
function ModalComponent({ isOpen, onClose, title, data, shipment }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700">
            Shipment: {shipment} in Vessel: {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>
        {data && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-500">
                  Origin Port
                </h3>
                <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {data.originPort}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-500">
                  Destination Port
                </h3>
                <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {data.destinationPort}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-500">
                  Impact Score
                </h3>
                <div
                  className={`inline-block px-3 py-1 rounded-full text-sm ${
                    data.impact > 6.5
                      ? "bg-red-500/25 text-red-500"
                      : data.impact > 3.5
                      ? "bg-yellow-500/25 text-yellow-500"
                      : "bg-green-500/25 text-green-500"
                  }`}
                >
                  {data.impact.toFixed(1)}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-500">Delay</h3>
                <div
                  className={`inline-block px-3 py-1 rounded-full text-sm ${
                    data.delay > 3
                      ? "bg-red-500/25 text-red-500"
                      : data.delay > 1
                      ? "bg-yellow-500/25 text-yellow-500"
                      : "bg-green-500/25 text-green-500"
                  }`}
                >
                  {data.delay} Days
                </div>
              </div>
              {/* Current Coordinates */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  Current Location
                </h3>
                <div className="flex flex-wrap gap-2">
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    <span className="font-medium">Lat:</span>{" "}
                    {data.coordinates.latitude.toFixed(4)}
                  </div>
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    <span className="font-medium">Long:</span>{" "}
                    {data.coordinates.longitude.toFixed(4)}
                  </div>
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    <span className="font-medium">Location:</span>{" "}
                    {data.placeName || "Unknown"}
                  </div>
                </div>
              </div>
              {/* Incident Type */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  Incident Type
                </h3>
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {data.incidentType}
                </div>
              </div>
              {/* Shipment Incident Types (used for filtering) */}
              {data.shipmentIncidentTypes &&
                data.shipmentIncidentTypes.length > 0 && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">
                      Shipment Incident Types
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(data.shipmentIncidentTypes) ? (
                        data.shipmentIncidentTypes.map((type, index) => (
                          <span
                            key={index}
                            className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                          >
                            {type}
                          </span>
                        ))
                      ) : (
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                          {data.shipmentIncidentTypes}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              {/* Affected Areas */}
              {data.affectedAreaNames && data.affectedAreaNames.length > 0 && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">
                    Affected Areas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(data.affectedAreaNames) ? (
                      data.affectedAreaNames.map((area, index) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                        >
                          {area}
                        </span>
                      ))
                    ) : (
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {data.affectedAreaNames}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Export the component with a different name
export default ModalComponent;
