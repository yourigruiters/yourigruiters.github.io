import React from "react";
import { useNavigate } from "react-router-dom";
import OptionCard from "../components/OptionCard";
import sunriseImage from "../assets/images/sunrise.png";

const Home = () => {
  const navigate = useNavigate();

  const homeOptions = Array.from({ length: 20 }, (_, i) => {
    const num = i + 1;
    const paddedNum = num < 10 ? `0${num}` : `${num}`;
    return {
      id: `story-${num}`,
      title: `Story ${num}`,
      description: "Description pending...",
      imageUrl: sunriseImage,
      path: `/${num}`,
      number: paddedNum,
    };
  });

  // Custom edits for first story as per user original content
  homeOptions[0] = {
    id: "morning-yoga",
    title: "Morning Yoga",
    description: "Start your day with energy and focus.",
    imageUrl: sunriseImage,
    path: "/1",
    number: "01",
  };

  return (
    <div className="p-4 pt-6 pb-6">
      <header className="mb-10 mt-6 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">
          From me to you.
        </h1>
        <div className="flex justify-center">
          <p className="text-gray-800 text-xl font-serif italic leading-relaxed max-w-sm">
            "A summary, a message, a logbook?.. I wouldn’t know. Name it however
            you want to name it, see it as a combination of all of them. This is
            me to you, regarding the last 6 months of my life with you."
          </p>
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
