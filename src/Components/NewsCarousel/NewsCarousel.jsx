import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsCard from "../NewsCard/NewsCard";
import { motion } from "motion/react";

const NewsCarousel = ({ newsItems = [] }) => {
  const sliderRef = useRef(null);

  // Function to trim text to specified number of words
  const trimToWords = (text, wordCount) => {
    if (!text) return "";
    const words = text.split(/\s+/);
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(" ") + "...";
  };

  // Process news items to trim titles and descriptions
  const processNewsItems = (items) => {
    return items.map((item) => ({
      ...item,
      title: trimToWords(item.title, 5),
      description: trimToWords(item.description, 20),
    }));
  };

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

  const items = processNewsItems(
    newsItems.length > 0 ? newsItems : defaultNewsItems
  );

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
    ltr: true, // Enable right-to-left mode for left-to-right sliding
  };

  // Navigation functions
  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <div className="w-full h-full shadow-md rounded-lg overflow-hidden bg-white px-4 relative">
      <Slider ref={sliderRef} {...settings}>
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="h-full"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            <NewsCard
              title={item.title}
              description={item.description}
              image={item.image}
              incidentType={item.incidentType}
              url={item.url}
            />
          </motion.div>
        ))}
      </Slider>
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-5 absolute top-[95%] left-[80%] transform -translate-x-1/2 -translate-y-1/2">
        <button
          onClick={goToPrev}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 transition-colors"
          aria-label="Previous news"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 transition-colors"
          aria-label="Next news"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NewsCarousel;
