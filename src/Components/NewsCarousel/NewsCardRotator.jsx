import React, { useEffect, useState } from "react";
import NewsCard from "../NewsCard/NewsCard";

const NewsCardRotator = ({ newsItems = [], interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
    // ... add more if needed
  ];
  const trimToWords = (text, wordCount) => {
    if (!text) return "";
    const words = text.split(/\s+/);
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(" ") + "...";
  };
  // Process news items to trim titles and descriptions
  const processNewsItems = (items, isDefault = false) => {
    return items.map((item) => ({
      ...item,
      title: trimToWords(item.title, 5),
      description: trimToWords(item.description, isDefault ? 10 : 15),
    }));
  };
  const items = processNewsItems(
    newsItems.length > 0 ? newsItems : defaultNewsItems,
    newsItems.length === 0 // true if default is being used
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval]);

  const currentItem = items[currentIndex];

  return (
    <div className="w-full h-full shadow-md rounded-lg overflow-hidden bg-white px-4 py-2">
      <NewsCard
        title={currentItem.title}
        description={currentItem.description}
        image={currentItem.image}
        incidentType={currentItem.incidentType}
        url={currentItem.url}
      />
    </div>
  );
};

export default NewsCardRotator;
