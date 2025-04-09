import React from "react";

const NewsCard = ({
  title,
  description,
  image,
  incidentType,
  url,
  affectedAreaNames,
  shipmentIncidentTypes,
}) => {
  const handleClick = () => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <div
      className={`w-full bg-white py-3 gap-2 flex flex-col items-start justify-start ${
        url
          ? "cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          : ""
      }`}
      onClick={handleClick}
    >
      <div className="w-full h-44 flex gap-2">
        <img
          src={image || "/news.jpeg"}
          alt={title}
          className="w-full rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-base text-gray-700 sm:text-lg md:text-xl font-semibold inline">
          {title}
        </p>
        <p className="text-sm sm:text-base text-gray-600 line-clamp-3 sm:line-clamp-4 mt-1">
          {description}
        </p>
        {incidentType && (
          <div className="mt-1 gap-2 flex flex-row flex-wrap">
            {/* <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {incidentType}
            </span> */}
            {affectedAreaNames && affectedAreaNames.length > 0 && (
              <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                {Array.isArray(affectedAreaNames)
                  ? affectedAreaNames.join(", ")
                  : affectedAreaNames}
              </span>
            )}
            {shipmentIncidentTypes && shipmentIncidentTypes.length > 0 && (
              <span className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                {Array.isArray(shipmentIncidentTypes)
                  ? shipmentIncidentTypes.join(", ")
                  : shipmentIncidentTypes}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
