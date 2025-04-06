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
  const [tooltip, setTooltip] = useState({
    show: false,
    content: "",
    coordinates: [0, 0],
  });

  const statusLegends = [
    { name: "Caution", color: "#FFA500" },
    { name: "Danger", color: "#FF0000" },
  ];
  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-2 sm:p-3 md:p-4">
      <div className="relative w-full overflow-hidden rounded- before:content-[''] before:absolute before:inset-0 before:rounded-md before:shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] before:pointer-events-none before:z-10">
        <ComposableMap
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 220,
          }}
          style={{
            backgroundColor: "hsl(210, 60%, 60%)",
            backgroundImage:
              "radial-gradient(circle at center, hsl(210, 50%, 65%) 0%, hsl(210, 65%, 55%) 100%)",
            borderRadius: "1rem",
          }}
        >
          <ZoomableGroup zoom={1}>
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
        {/* Overlay Legend */}
        <div className="absolute bottom-4 left-4 bg-white/70 p-2 rounded-lg shadow-md">
          <div className="flex flex-col">
            {statusLegends.map((status, index) => (
              <div
                key={index}
                className="flex items-center text-gray-800 gap-2"
              >
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
