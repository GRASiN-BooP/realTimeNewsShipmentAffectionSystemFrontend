import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsCard from "../NewsCard/NewsCard";
import { motion } from "motion/react";

const NewsCarousel = ({ newsItems = [] }) => {
  // Default news items if none provided
  const defaultNewsItems = [
    {
      id: 1,
      title: "Severe Weather Alert: Typhoon Approaching East Asia",
      description:
        "A powerful typhoon is expected to hit the East Asian shipping routes, affecting vessels in the Shanghai and Tokyo regions. Multiple carriers have announced delays.",
      image: "/trump.jpeg",
      incidentType: "Typhoon in East Asia",
    },
    {
      id: 2,
      title: "Port Congestion Crisis in Singapore",
      description:
        "Singapore's port is experiencing severe congestion with waiting times exceeding 7 days. This is causing significant delays for vessels in the region.",
      image: "/trump.jpeg",
      incidentType: "Port Congestion in Singapore",
    },
    {
      id: 3,
      title: "Mediterranean Shipping Disruptions",
      description:
        "Ongoing geopolitical tensions in the Mediterranean are causing shipping disruptions. Vessels are being rerouted, adding 5-10 days to transit times.",
      image: "/trump.jpeg",
      incidentType: "Mediterranean Shipping Disruptions",
    },
    {
      id: 4,
      title: "Mumbai Port Operations Impacted by Labor Strike",
      description:
        "A labor strike at Mumbai Port has entered its third day, affecting cargo operations and causing delays for vessels in the region.",
      image: "/trump.jpeg",
      incidentType: "Labor Strike at Mumbai Port",
    },
    {
      id: 5,
      title: "Hong Kong Shipping Lanes Affected by Fog",
      description:
        "Dense fog in Hong Kong waters has forced the closure of shipping lanes, causing delays for vessels in the region.",
      image: "/trump.jpeg",
      incidentType: "Fog in Hong Kong Waters",
    },
    {
      id: 6,
      title: "Delhi Logistics Hub Facing Infrastructure Challenges",
      description:
        "Recent infrastructure issues at the Delhi logistics hub are causing delays in cargo processing and affecting regional supply chains.",
      image: "/trump.jpeg",
      incidentType: "Infrastructure Issues in Delhi",
    },
  ];

  const items = newsItems.length > 0 ? newsItems : defaultNewsItems;

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    adaptiveHeight: true,
    fade: false,
    cssEase: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    rtl: true, // Enable right-to-left mode for left-to-right sliding
  };

  return (
    <div className="w-full h-full md:h-80 shadow-md rounded-lg overflow-hidden bg-white px-4">
      <Slider {...settings}>
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="h-full"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <NewsCard
              title={item.title}
              description={item.description}
              image={item.image}
              incidentType={item.incidentType}
            />
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default NewsCarousel;
