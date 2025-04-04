import React from "react";

const NewsCard = ({ title, description }) => {
  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-5 flex flex-col items-start justify-start">
      <div className="w-full flex gap-2">
        <img src="/trump.jpeg" alt="" className="w-3/4 rounded-lg" />
        <div className="flex flex-col justify-center items-center gap-2 w-full h-full">
          <button className="bg-blue-500 px-2 py-1 rounded-md text-white w-full font-roboto">
            Visit
          </button>
          <button className="bg-blue-500 px-2 py-1 rounded-md text-white w-full font-roboto">
            Visit
          </button>
        </div>
      </div>
      <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 line-clamp-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 line-clamp-3 sm:line-clamp-4">
        {description}
      </p>
    </div>
  );
};

export default NewsCard;
