import React from "react";

const NewsCard = ({ title, description }) => {
  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md p-3 gap-2 flex flex-col items-start justify-start">
      <div className="w-full flex gap-2">
        <img src="/trump.jpeg" alt="" className="w-full rounded-lg" />
      </div>
      <div className="flex flex-col">
        <h3 className="text-base text-gray-700 sm:text-lg md:text-xl font-semibold  line-clamp-2">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 line-clamp-3 sm:line-clamp-4">
          {description}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
