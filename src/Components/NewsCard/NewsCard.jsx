import React from "react";

const NewsCard = ({
  title,
  description,
  image = "/trump.jpeg",
  incidentType,
  url,
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
          src={image}
          alt={title}
          className="w-full rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <p className="text-base text-gray-700 sm:text-lg md:text-xl font-semibold inline">
            {title}
          </p>
          {incidentType && (
            <div className="mt-1">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {incidentType}
              </span>
            </div>
          )}
        </div>
        <p className="text-sm sm:text-base text-gray-600 line-clamp-3 sm:line-clamp-4 mt-1">
          {description}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
