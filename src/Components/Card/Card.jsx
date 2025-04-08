import React, { useState, useEffect, Component } from "react";
import { useSpring } from "motion/react";

export default function Card(props) {
  const bgcolor =
    props.state === "danger"
      ? "bg-red-500/15"
      : props.state === "caution"
      ? "bg-yellow-500/15"
      : "bg-blue-500/15";
  const color =
    props.state === "danger"
      ? "text-red-500"
      : props.state === "caution"
      ? "text-yellow-500"
      : "text-blue-500";
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
    <div className="bg-white rounded-lg p-2 flex flex-row w-full items-center justify-around text-center gap-2 shadow-md">
      <div
        className={`${bgcolor} w-16 h-16 flex items-center justify-center rounded-lg  ${color} text-5xl font-bold`}
      >
        {displayCount}
      </div>
      <div className="flex flex-col items-end justify-center h-min">
        {props.mySvg}
        <p className="text-sm font-semibold text-gray-500">{props.title}</p>
      </div>
    </div>
  );
}
