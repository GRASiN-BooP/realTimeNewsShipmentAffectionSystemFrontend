import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const Map = ({ mapData }) => {
  const [zoom, setZoom] = useState(1);
  const [tooltip, setTooltip] = useState({
    show: false,
    content: "",
    coordinates: [0, 0],
  });

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom * 1.5, 8));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom / 1.5, 1));
  };

  const statusLegends = [
    { name: "Caution", color: "#FFA500" },
    { name: "Danger", color: "#FF0000" },
  ];
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-2 sm:p-3 md:p-4">
      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
        Map View
      </h2>
      <div className="relative w-full  before:content-[''] before:absolute before:inset-0 before:rounded-lg before:shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] before:pointer-events-none before:z-10">
        <ComposableMap
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 220,
          }}
          style={{
            backgroundColor: "hsl(210, 80%, 40%)",
            backgroundImage:
              "radial-gradient(circle at center, hsl(210, 70%, 45%) 0%, hsl(210, 85%, 35%) 100%)",
          }}
        >
          <ZoomableGroup zoom={zoom}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  // Generate a neutral color with slight variations
                  const hue = 40 + (Math.random() * 20 - 10); // Base beige (40) with ±10 variation
                  const saturation = 20 + Math.random() * 10; // 20-30% saturation
                  const lightness = 85 + Math.random() * 5; // 85-90% lightness
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={`hsl(${hue}, ${saturation}%, ${lightness}%)`}
                      stroke="#FFFFFF"
                      strokeWidth={0.5}
                      style={{
                        default: {
                          outline: "none",
                          transition: "all 250ms",
                        },
                        hover: {
                          outline: "none",
                          fill: `hsl(${hue}, ${saturation + 5}%, ${
                            lightness - 5
                          }%)`,
                          transition: "all 250ms",
                        },
                        pressed: {
                          outline: "none",
                          fill: `hsl(${hue}, ${saturation + 10}%, ${
                            lightness - 10
                          }%)`,
                          transition: "all 250ms",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
            {/* Danger Markers */}
            {mapData.danger.coordinates.map((coord, index) => (
              <Marker key={`danger-${index}`} coordinates={coord}>
                <circle
                  r={mapData.danger.radius[index]}
                  fill="#FF0000"
                  fillOpacity={0.3}
                  stroke="#FF0000"
                  strokeWidth={2}
                  onMouseEnter={() => {
                    setTooltip({
                      show: true,
                      content: mapData.danger.names[index],
                      coordinates: coord,
                    });
                  }}
                  onMouseLeave={() => {
                    setTooltip({
                      show: false,
                      content: "",
                      coordinates: [0, 0],
                    });
                  }}
                />
              </Marker>
            ))}
            {/* Caution Markers */}
            {mapData.caution.coordinates.map((coord, index) => (
              <Marker key={`caution-${index}`} coordinates={coord}>
                <circle
                  r={mapData.caution.radius[index]}
                  fill="#FFA500"
                  fillOpacity={0.3}
                  stroke="#FFA500"
                  strokeWidth={2}
                  onMouseEnter={() => {
                    setTooltip({
                      show: true,
                      content: mapData.caution.names[index],
                      coordinates: coord,
                    });
                  }}
                  onMouseLeave={() => {
                    setTooltip({
                      show: false,
                      content: "",
                      coordinates: [0, 0],
                    });
                  }}
                />
              </Marker>
            ))}
            {/* Tooltip Marker */}
            {tooltip.show && (
              <Marker coordinates={tooltip.coordinates}>
                <g
                  transform="translate(-20, -20)"
                  className="pointer-events-none"
                >
                  <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-medium"
                  >
                    {tooltip.content}
                  </text>
                </g>
              </Marker>
            )}
          </ZoomableGroup>
        </ComposableMap>
        {/* Overlay Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="px-2 sm:px-3 py-1 bg-black text-white rounded hover:bg-blue-600 text-sm sm:text-base"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="px-2 sm:px-3 py-1 bg-black text-white rounded hover:bg-blue-600 text-sm sm:text-base"
          >
            -
          </button>
        </div>
        {/* Overlay Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 p-2 rounded-lg shadow-md">
          <h3 className="text-base sm:text-lg font-medium mb-2">
            Status Legends
          </h3>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {statusLegends.map((status, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                  style={{ backgroundColor: status.color }}
                />
                <span className="text-sm sm:text-base">{status.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
