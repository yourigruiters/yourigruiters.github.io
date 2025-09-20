import { useState } from "react";

const EducationBlock = ({ settings }) => {
  const isDarkMode = settings?.darkmode ?? true;
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const education = [
    {
      degree: "Bachelor of IT & Media Design (cum laude)",
      university: "Fontys University of Applied Sciences",
      location: "Eindhoven, The Netherlands",
      duration: "2014 – 2018",
      achievements: [
        "Cum Laude",
        "Media Design",
        "Technical Skills",
        "Project Management",
      ],
    },
    {
      degree: "Bachelor of IT & Education (cum laude)",
      university: "Fontys University of Applied Sciences",
      location: "Eindhoven, The Netherlands",
      duration: "2015 – 2018",
      achievements: [
        "Cum Laude",
        "Education Theory",
        "Teaching Methods",
        "Curriculum Development",
      ],
    },
    {
      degree: "Full Stack Development Bootcamp",
      university: "Salt",
      location: "Stockholm, Sweden",
      duration: "2020",
      achievements: [
        "Full Stack Development",
        "Modern Web Technologies",
        "Agile Development",
        "Industry Best Practices",
      ],
    },
    {
      degree: "IT & Management",
      university: "ROC de Leijgraaf",
      location: "Veghel, The Netherlands",
      duration: "2010 – 2014",
      achievements: [
        "IT Fundamentals",
        "Management Skills",
        "Project Coordination",
        "Business Analysis",
      ],
    },
  ];

  return (
    <div
      id="education"
      className={`min-h-screen py-12 sm:py-12 md:py-16 px-4 sm:px-6 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Education
          </h2>
          <p
            className={`text-sm sm:text-base md:text-lg px-2 ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Dual expertise in technology and education
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className={`relative p-4 sm:p-6 md:p-8 rounded-xl border ${
                isDarkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              } shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}
              onClick={() => toggleExpanded(index)}
            >
              <div className="w-full">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3 sm:mb-4">
                  <div className="flex-1">
                    <h3
                      className={`text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 group-hover:text-purple-400 transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {edu.degree}
                    </h3>
                    <h4
                      className={`text-base sm:text-lg md:text-xl font-semibold mb-1 ${
                        isDarkMode ? "text-purple-400" : "text-purple-600"
                      }`}
                    >
                      {edu.university}
                    </h4>
                    <p
                      className={`text-xs sm:text-sm ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      📍 {edu.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                        isDarkMode
                          ? "bg-slate-700 text-slate-300"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {edu.duration}
                    </div>
                    <div
                      className={`w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
                        expandedItems[index] ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 ${
                          isDarkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Collapsible content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedItems[index]
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {edu.achievements.map((achievement, achievementIndex) => (
                      <span
                        key={achievementIndex}
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                          isDarkMode
                            ? "bg-slate-700 text-slate-300"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationBlock;
