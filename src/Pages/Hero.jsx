import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useUser } from "../Context/User";

export default function Hero() {
  const { user } = useUser();
  return (
    <div className="w-full flex flex-col h-screen items-center">
      <Navbar />
      <div className="w-full h-full flex flex-col md:flex-row justify-center items-center mt-16 px-5 md:px-14 py-10 gap-5">
        <div id="info" className="flex-1 flex flex-col items-center">
          <div className="flex flex-col items-start justify-start max-w-2xl gap-2">
            <p className="text-xl font-bold font-roboto text-gray-400">
              SUPPY CHAIN AUTOMATION
            </p>
            <p className="text-6xl font-bold font-roboto text-gray-900">
              Welcome to GoTrack
            </p>
            <p className="text-7xl font-semibold font-roboto text-gocomet">
              AI powered visibility system
            </p>
            <p className="text-gray-400 font-roboto text-xl">
              <span className="font-semibold">STAY AHEAD</span> Real-Time
              Shipment Disruption Alerts Stay Informed, Minimize Delays, and
              Keep Your Cargo Moving!
            </p>
            <Link
              to={`${user ? "/dashboard" : "/authenticate"}`}
              className="text-white px-4 py-2 rounded-md bg-linear-to-r from-blue-950/90 to-gocomet"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div id="visuals" className="flex-1 flex flex-col items-center">
          <div className="w-full h-64 flex flex-col items-center justify-center relative">
            <img
              src="/platform.svg"
              alt="platform"
              className="absolute top-0 left-0"
            />
            <motion.img
              src="/plane.svg"
              alt="plane"
              initial={{ opacity: 0, x: 100, y: 0 }}
              animate={{ opacity: 1, y: -80 }}
              transition={{
                duration: 2,
                opacity: {
                  time: [0, 0.1],
                  duration: 2,
                },
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
            />
            <motion.img
              src="/truck.svg"
              alt="truck"
              initial={{ opacity: 0, x: -200, y: 140 }}
              animate={{ opacity: 1, x: 0, y: 25 }}
              transition={{
                duration: 2,
                opacity: {
                  time: [0, 0.1],
                  duration: 2,
                },
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
            />
            <motion.img
              src="/ship.svg"
              alt="ship"
              initial={{ opacity: 0, x: 25, y: 10 }}
              animate={{ opacity: 1, x: -100, y: 90 }}
              transition={{
                duration: 2,
                opacity: {
                  time: [0, 0.1],
                  duration: 2,
                },
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
