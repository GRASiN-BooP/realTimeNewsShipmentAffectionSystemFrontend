import React from "react";

export default function ShipmentTable({ shipments = [] }) {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-md p-4 h-full">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Vessel</th>
            <th className="px-4 py-2 text-left">Origin Port</th>
            <th className="px-4 py-2 text-left">Destination Port</th>
            <th className="px-4 py-2 text-left">Impact</th>
            <th className="px-4 py-2 text-left">Delay</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{shipment.vessel}</td>
              <td className="px-4 py-2">{shipment.originPort}</td>
              <td className="px-4 py-2">{shipment.destinationPort}</td>
              <td className="px-4 py-2">{shipment.impact}</td>
              <td className="px-4 py-2">{shipment.delay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
