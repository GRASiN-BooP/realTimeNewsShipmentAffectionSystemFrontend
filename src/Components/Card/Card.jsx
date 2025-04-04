import React, { useState, useEffect } from "react";
import { useSpring } from "motion/react";

export default function Card(props) {
  const color =
    props.state === "danger"
      ? "bg-red-500"
      : props.state === "caution"
      ? "bg-yellow-500"
      : "bg-blue-500";
  const [displayCount, setDisplayCount] = useState(0);
  const springCount = useSpring(0, {
    bounce: 0,
    duration: 1000,
  });
  springCount.on("change", (value) => {
    setDisplayCount(Math.round(value));
  });
  useEffect(() => {
    springCount.set(props.count);
  }, [props.count]);
  return (
    <div className="bg-white min-h-16 h-full rounded-lg p-2 flex md:flex-row flex-col items-center justify-between gap-2 shadow-md md:text-right text-center">
      <div
        className={`${color} w-10 flex items-center justify-center rounded-full p-1 text-white text-2xl font-bold`}
      >
        {displayCount}
      </div>
      <p className="text-xl font-bold text-gray-900">{props.title}</p>
    </div>
  );
}
