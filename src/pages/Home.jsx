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
      number: "01",
    },
    {
      id: "healthy-breakfast",
      title: "Healthy Breakfast",
      description: "Nutritious recipes for a perfect start.",
      imageUrl: sunriseImage,
      path: "/", // Placeholder for now
      number: "02",
    },
    {
      id: "meditation",
      title: "Meditation",
      description: "Find your inner peace and clarity.",
      imageUrl: sunriseImage,
      path: "/", // Placeholder
      number: "03",
    },
    {
      id: "evening-walk",
      title: "Evening Walk",
      description: "Unwind after a long day.",
      imageUrl: sunriseImage,
      path: "/", // Placeholder
      number: "04",
    },
  ];

  return (
    <div className="p-4 pt-6 pb-20">
      <header className="mb-8 mt-2">
        <div className="relative p-6 bg-gradient-to-br from-indigo-50 to-white rounded-2xl border border-indigo-100 shadow-sm overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100 rounded-full blur-2xl -mr-8 -mt-8 opacity-60"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-indigo-900 tracking-tight mb-3 font-serif italic">
              From me to you.
            </h1>
            <p className="text-gray-700 leading-relaxed text-base italic">
              "A summary, a message, a logbook?.. I wouldn’t know. Name it
              however you want to name it, see it as a combination of all of
              them. This is me to you, regarding the last 6 months of my life
              with you."
            </p>
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-2">
        {homeOptions.map((option) => (
          <OptionCard
            key={option.id}
            title={option.title}
            description={option.description}
            imageUrl={option.imageUrl}
            onClick={() => navigate(option.path)}
            number={option.number}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
