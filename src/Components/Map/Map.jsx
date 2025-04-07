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
    danger: { coordinates: [], names: [], radius: [] },
    caution: { coordinates: [], names: [], radius: [] },
  },
  onAreaClick,
  isFullScreen = false,
}) => {
  const [tooltip, setTooltip] = useState({
    show: false,
    content: "",
    coordinates: [0, 0],
  });

  const statusLegends = [
    { name: "Caution", color: "#FFA500" },
    { name: "Danger", color: "#FF0000" },
  ];

  const handleAreaClick = (coordinates, radius, type, name) => {
    console.log("Map area clicked:", { coordinates, radius, type, name });
    if (onAreaClick) {
      onAreaClick(coordinates, radius, type, name);
    }
  };

  // Ensure mapData has the required structure
  const safeMapData = {
    danger: mapData?.danger || { coordinates: [], names: [], radius: [] },
    caution: mapData?.caution || { coordinates: [], names: [], radius: [] },
  };

  return (
    <div
      className={`w-full ${
        isFullScreen
          ? "h-full"
          : "bg-white rounded-2xl shadow-md p-2 sm:p-3 md:p-4"
      }`}
    >
      <div
        className={`relative w-full overflow-hidden ${
          isFullScreen
            ? "h-full"
            : "rounded- before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] before:pointer-events-none before:z-10"
        }`}
      >
        <ComposableMap
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: isFullScreen ? 300 : 220,
          }}
          style={{
            backgroundColor: "hsl(197, 100%, 85%)",
            backgroundImage:
              "radial-gradient(circle at center, hsl(197, 100%, 90%) 0%, hsl(197, 100%, 80%) 100%)",
            borderRadius: isFullScreen ? "0" : "1rem",
            height: isFullScreen ? "100vh" : "auto",
            width: "100%",
          }}
        >
          <ZoomableGroup zoom={isFullScreen ? 1.2 : 1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  // Generate various shades of white
                  const hue = 0; // Neutral hue
                  const saturation = 0; // No saturation for whites
                  const lightness = 95 + Math.random() * 5; // 95-100% lightness for whites
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
                      safeMapData.danger.names[index]
                    )
                  }
                  onMouseEnter={() =>
                    setTooltip({
                      show: true,
                      content: safeMapData.danger.names[index],
                      coordinates: coord,
                    })
                  }
                  onMouseLeave={() =>
                    setTooltip({
                      show: false,
                      content: "",
                      coordinates: [0, 0],
                    })
                  }
                  style={{
                    cursor: "pointer",
                    transition: "all 250ms",
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
                      safeMapData.caution.names[index]
                    )
                  }
                  onMouseEnter={() =>
                    setTooltip({
                      show: true,
                      content: safeMapData.caution.names[index],
                      coordinates: coord,
                    })
                  }
                  onMouseLeave={() =>
                    setTooltip({
                      show: false,
                      content: "",
                      coordinates: [0, 0],
                    })
                  }
                  style={{
                    cursor: "pointer",
                    transition: "all 250ms",
                  }}
                />
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
        {tooltip.show && !isFullScreen && (
          <div
            style={{
              position: "absolute",
              top: `${tooltip.coordinates[1]}px`,
              left: `${tooltip.coordinates[0]}px`,
              transform: "translate(-50%, -130%)",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "white",
              padding: "5px 10px",
              borderRadius: "4px",
              fontSize: "12px",
              pointerEvents: "none",
              zIndex: 1000,
            }}
          >
            {tooltip.content}
          </div>
        )}
      </div>
      {!isFullScreen && (
        <div className="flex justify-center mt-2 gap-4">
          {statusLegends.map((legend) => (
            <div key={legend.name} className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: legend.color }}
              ></div>
              <span className="text-xs text-gray-600">{legend.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Map;
