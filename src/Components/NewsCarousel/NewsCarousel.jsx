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
      title: "Port Strike in Singapore",
      description: "A major strike at Singapore port is causing severe delays.",
      image: "/trump.jpeg",
    },
    {
      id: 2,
      title: "Tsunami Warning in Japan",
      description:
        "Recent tsunami warnings in Japan are affecting shipping routes in the Pacific.",
      image: "/trump.jpeg",
    },
    {
      id: 3,
      title: "New Shipping Regulations",
      description:
        "New international shipping regulations will take effect next month.",
      image: "/trump.jpeg",
    },
    {
      id: 4,
      title: "Global Supply Chain Update",
      description:
        "Latest developments in global supply chain disruptions and solutions.",
      image: "/trump.jpeg",
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
    <div className="w-full h-full shadow-md rounded-lg overflow-hidden bg-white px-4">
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
            />
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default NewsCarousel;
