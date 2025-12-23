import React from "react";
import { useNavigate } from "react-router-dom";
import OptionCard from "../components/OptionCard";
import sunriseImage from "../assets/images/sunrise.png";

const Home = () => {
  const navigate = useNavigate();

  // Hardcoded options for the home page
  const homeOptions = [
    {
      id: "morning-yoga",
      title: "Morning Yoga",
      description: "Start your day with energy and focus.",
      imageUrl: sunriseImage,
      path: "/morning-yoga",
    },
    {
      id: "healthy-breakfast",
      title: "Healthy Breakfast",
      description: "Nutritious recipes for a perfect start.",
      imageUrl: sunriseImage,
      path: "/", // Placeholder for now
    },
    {
      id: "meditation",
      title: "Meditation",
      description: "Find your inner peace and clarity.",
      imageUrl: sunriseImage,
      path: "/", // Placeholder
    },
    {
      id: "evening-walk",
      title: "Evening Walk",
      description: "Unwind after a long day.",
      imageUrl: sunriseImage,
      path: "/", // Placeholder
    },
  ];

  return (
    <div className="p-4 pt-6 pb-20">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Discover
        </h1>
        <p className="text-gray-500 mt-1">Choose your daily activity</p>
      </header>

      <div className="flex flex-col gap-2">
        {homeOptions.map((option) => (
          <OptionCard
            key={option.id}
            title={option.title}
            description={option.description}
            imageUrl={option.imageUrl}
            onClick={() => navigate(option.path)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
