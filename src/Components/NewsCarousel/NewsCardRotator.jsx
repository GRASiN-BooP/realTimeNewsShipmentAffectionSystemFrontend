import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NewsCard from "../NewsCard/NewsCard";

const NewsCardRotator = ({ newsItems = [], interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showCard, setShowCard] = useState(true);
  const defaultNewsItems = [
    {
      id: 1,
      title: "Severe Weather Alert: Typhoon Approaching East Asia",
      description:
        "A powerful typhoon is expected to hit the East Asian shipping routes, affecting vessels in the Shanghai and Tokyo regions. Multiple carriers have announced delays.",
      image: "/news.jpeg",
      incidentType: "Typhoon in East Asia",
    },
    {
      id: 2,
      title: "Port Congestion Crisis in Singapore",
      description:
        "Singapore's port is experiencing severe congestion with waiting times exceeding 7 days. This is causing significant delays for vessels in the region.",
      image: "/news.jpeg",
      incidentType: "Port Congestion in Singapore",
    },
    // ... add more if needed
  ];

  const trimToWords = (text, wordCount) => {
    if (!text) return "";
    const words = text.split(/\s+/);
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(" ") + "...";
  };

  const processNewsItems = (items, isDefault = false) => {
    return items.map((item) => ({
      ...item,
      title: trimToWords(item.title, 4),
      description: trimToWords(item.description, isDefault ? 10 : 10),
    }));
  };

  const items = processNewsItems(
    newsItems.length > 0 ? newsItems : defaultNewsItems,
    newsItems.length === 0
  );

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      handleCardChange((currentIndex + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval, autoPlay, currentIndex]);

  const handleCardChange = (newIndex) => {
    setShowCard(false);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setShowCard(true);
    }, 200); // duration of fade-out
  };

  const goToNext = () => {
    setAutoPlay(false);
    handleCardChange((currentIndex + 1) % items.length);
  };

  const goToPrev = () => {
    setAutoPlay(false);
    handleCardChange(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  };

  const currentItem = items[currentIndex];

  return (
    <div className="w-full h-full relative shadow-md rounded-lg overflow-hidden bg-white px-4 py-2">
      <AnimatePresence mode="wait">
        {showCard && (
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <NewsCard
              title={currentItem.title}
              description={currentItem.description}
              image={currentItem.image}
              incidentType={currentItem.incidentType}
              url={currentItem.url}
              affectedAreaNames={currentItem.affectedAreaNames}
              shipmentIncidentTypes={currentItem.shipmentIncidentTypes}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center gap-5 absolute bottom-2 right-4">
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

export default NewsCardRotator;
