import React from "react";
import { motion } from "motion/react";
import MapWithShipments from "../Map/MapWithShipments";

const FullPageMap = ({ mapData, shipments, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-white flex flex-col"
    >
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          aria-label="Close full-screen map"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="w-full h-full flex-grow">
        <MapWithShipments
          mapData={mapData}
          shipments={shipments}
          isFullScreen={true}
        />
      </div>
    </motion.div>
  );
};

export default FullPageMap;
