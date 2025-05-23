import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const Map = ({
  mapData = {
    danger: { coordinates: [], names: [], radius: [], incidentIds: [] },
    caution: { coordinates: [], names: [], radius: [], incidentIds: [] },
  },
  onAreaClick,
}) => {
  const [tooltip, setTooltip] = useState({
    show: false,
    content: "",
    coordinates: [0, 0],
  });

  const statusLegends = [
    { name: "Slightly Affected", color: "#FFA500" },
    { name: "Severely Affected", color: "#FF0000" },
  ];

  const handleAreaClick = (coordinates, radius, type, name, index) => {
    // console.log("Map area clicked:", {
    //   coordinates,
    //   radius,
    //   type,
    //   name,
    //   index,
    // });
    if (onAreaClick) {
      onAreaClick(coordinates, radius, type, name, index);
    }
  };

  // Ensure mapData has the required structure
  const safeMapData = {
    danger: mapData?.danger || {
      coordinates: [],
      names: [],
      radius: [],
      incidentIds: [],
    },
    caution: mapData?.caution || {
      coordinates: [],
      names: [],
      radius: [],
      incidentIds: [],
    },
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-2 sm:p-3 md:p-4">
      <div className="relative w-full overflow-hidden rounded- before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] before:pointer-events-none before:z-10">
        <ComposableMap
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 220,
          }}
          style={{
            backgroundColor: "hsl(197, 100%, 85%)",
            backgroundImage:
              "radial-gradient(circle at center, hsl(197, 100%, 90%) 0%, hsl(197, 100%, 80%) 100%)",
            borderRadius: "1rem",
          }}
        >
          <ZoomableGroup zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  // Generate various shades of light green
                  const hue = 120; // Green hue
                  const saturation = 15; // Low saturation for subtle green
                  const lightness = 95 + Math.random() * 5; // 95-100% lightness for light green
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
                          fill: `hsl(${hue}, ${saturation}%, ${
                            lightness - 2
                          }%)`,
                          transition: "all 250ms",
                        },
                        pressed: {
                          outline: "none",
                          fill: `hsl(${hue}, ${saturation}%, ${
                            lightness - 4
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
            {safeMapData.danger.coordinates.map((coord, index) => (
              <Marker key={`danger-${index}`} coordinates={coord}>
                <circle
                  r={safeMapData.danger.radius[index]}
                  fill="#FF0000"
                  fillOpacity={0.3}
                  stroke="#FF0000"
                  strokeWidth={2}
                  onClick={() =>
                    handleAreaClick(
                      coord,
                      safeMapData.danger.radius[index],
                      "danger",
                      safeMapData.danger.names[index],
                      index
                    )
                  }
                  onMouseEnter={() => {
                    setTooltip({
                      show: true,
                      content: safeMapData.danger.names[index],
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
            {safeMapData.caution.coordinates.map((coord, index) => (
              <Marker key={`caution-${index}`} coordinates={coord}>
                <circle
                  r={safeMapData.caution.radius[index]}
                  fill="#FFA500"
                  fillOpacity={0.3}
                  stroke="#FFA500"
                  strokeWidth={2}
                  onClick={() =>
                    handleAreaClick(
                      coord,
                      safeMapData.caution.radius[index],
                      "caution",
                      safeMapData.caution.names[index],
                      index
                    )
                  }
                  onMouseEnter={() => {
                    setTooltip({
                      show: true,
                      content: safeMapData.caution.names[index],
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
