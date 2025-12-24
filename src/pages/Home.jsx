import React from "react";
import { useNavigate } from "react-router-dom";
import OptionCard from "../components/OptionCard";
import img1 from "../assets/images/1.JPG";
import img2 from "../assets/images/2.JPG";
import img3 from "../assets/images/3.JPG";
import img4 from "../assets/images/4.JPG";
import img5 from "../assets/images/5.JPG";
import img6 from "../assets/images/6.JPG";
import img7 from "../assets/images/7.JPG";
import img8 from "../assets/images/8.JPG";
import img9 from "../assets/images/9.JPG";
import img10 from "../assets/images/10.JPG";

const Home = () => {
  const navigate = useNavigate();

  const homeOptions = [
    {
      id: "story-1",
      title: "A simple Christmas gift",
      description:
        "Obviously someone had to send a Christmas donut to my house whilst I couldn’t really risk sending anything towards their house.",
      imageUrl: img1,
      path: "/1",
      number: "01",
    },
    {
      id: "story-2",
      title: "Summary of the last 6 months",
      description: "What a journey, ups and downs.. Still standing!",
      imageUrl: img2,
      path: "/2",
      number: "02",
    },
    {
      id: "story-3",
      title: "Meeting in Brisbane",
      description:
        "My favourite memory.. Just seeing you there at the dinner table.",
      imageUrl: img3,
      path: "/3",
      number: "03",
    },
    {
      id: "story-4",
      title: "Chatting in Sunshine Coast/London",
      description:
        "Long and deep conversations, the key to getting to know someone easily.. But then over the phone.",
      imageUrl: img4,
      path: "/4",
      number: "04",
    },
    {
      id: "story-5",
      title: "Mixture of emotions in Perth",
      description:
        "What can I say? Favourite location for sure. 10/10 will come back again!",
      imageUrl: img5,
      path: "/5",
      number: "05",
    },
    {
      id: "story-6",
      title: "Short split-up",
      description:
        "I mean.. It wasn’t really necessary to split up if you just didn’t hide my passport between the bed.",
      imageUrl: img6,
      path: "/6",
      number: "06",
    },
    {
      id: "story-7",
      title: "Traveling Asia",
      description:
        "Could have made a whole section per country we’ve visited if I wanted to..",
      imageUrl: img7,
      path: "/7",
      number: "07",
    },
    {
      id: "story-8",
      title: "A month of separation",
      description:
        "It’ll be over before we know it! Time seems to go quick already, but it also feels like I’ve been a month without you already.",
      imageUrl: img8,
      path: "/8",
      number: "08",
    },
    {
      id: "story-9",
      title: "Uncertainty of the future",
      description: "…",
      imageUrl: img9,
      path: "/9",
      number: "09",
    },
    {
      id: "story-10",
      title: "You",
      description: "My favourite.",
      imageUrl: img10,
      path: "/10",
      number: "10",
    },
  ];

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

      <div className="mt-12 mb-8 px-6 text-center">
        <p className="text-gray-600 text-lg font-serif italic leading-relaxed">
          “My heart still heats up a little whenever I see a message with your
          name pop up”
        </p>
      </div>
    </div>
  );
};

export default Home;
