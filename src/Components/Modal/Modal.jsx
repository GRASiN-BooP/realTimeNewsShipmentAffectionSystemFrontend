import React from "react";

export default function Modal({ isOpen, onClose, title, data }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>
        {data && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-500">
                Origin Port
              </h3>
              <p className="text-lg text-gray-600">{data.originPort}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500">
                Destination Port
              </h3>
              <p className="text-lg text-gray-600">{data.destinationPort}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500">
                Impact Score
              </h3>
              <p className="text-lg text-gray-600">{data.impact.toFixed(1)}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500">Delay</h3>
              <p className="text-lg text-gray-600">{data.delay} Days</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
