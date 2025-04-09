import React from "react";

export default function NoCodeDashboard() {
  const authToken = localStorage.getItem("token");
  return (
    <div className="w-full h-screen">
      <iframe
        src={`https://gocomet.retool.com/apps/Untitled?authToken=${authToken}`}
        className="w-full h-full border-0"
        title="Gocomet Dashboard"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
