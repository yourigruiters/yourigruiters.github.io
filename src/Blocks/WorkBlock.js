import { useState, useEffect } from "react";

const WorkBlock = ({ settings, blockSettings }) => {
  const isDarkMode = settings?.darkmode ?? true;
  const variant = settings?.variant || "Combined";
  const showOnlyFullTime = blockSettings?.work?.showOnlyFullTime ?? true;

  const workExperience = [
    {
      company: "Happy Horizon B.V.",
      position: "Front-end Developer",
      location: "Eindhoven, The Netherlands",
      duration: "April 2023 – June 2025",
      description:
        "Managed multiple projects simultaneously, coordinating directly with clients. Delivered dynamic development work using CraftCMS, VueJS and ReactJS frameworks.",
      highlights: [
        "Client Coordination",
        "Multi-project Management",
        "CraftCMS",
        "VueJS",
        "ReactJS",
      ],
      isFullTime: true,
    },
    {
      company: "System4",
      position: "Front-end Developer",
      location: "Uden, The Netherlands",
      duration: "September 2022 – April 2023",
      description:
        "Specialized in building responsive web applications using ReactJS. Collaborated in Agile Scrum teams of 4-5 developers.",
      highlights: [
        "ReactJS",
        "Agile Scrum",
        "Team Collaboration",
        "Responsive Design",
      ],
      isFullTime: true,
    },
    {
      company: "ROC Nijmegen",
      position: "Front-end Development Teacher",
      location: "Nijmegen, The Netherlands",
      duration: "August 2021 – August 2022",
      description:
        "Delivered courses on HTML, CSS, JavaScript, ReactJS, and GIT. Served as mentor and internship supervisor for students.",
      highlights: [
        "Teaching",
        "Curriculum Development",
        "Student Mentoring",
        "Technical Training",
      ],
      isFullTime: true,
    },
    {
      company: "Ubiquiti",
      position: "Front-end Developer",
      location: "Stockholm, Sweden",
      duration: "September 2020 – July 2021",
      description:
        "Contributed to development of UniFi Portal, UniFi Network, and internal component libraries. Utilized ReactJS and TypeScript in a large, collaborative development team.",
      highlights: [
        "ReactJS",
        "TypeScript",
        "Component Libraries",
        "Cross-functional Teamwork",
        "Scalable Solutions",
      ],
      isFullTime: true,
    },
    {
      company: "ROC Nijmegen",
      position: "Front-end Development Teacher",
      location: "Nijmegen, The Netherlands",
      duration: "August 2018 – February 2020",
      description:
        "Delivered courses on HTML, CSS, JavaScript, ReactJS, and GIT. Served as mentor and internship supervisor for students.",
      highlights: [
        "Teaching",
        "Curriculum Development",
        "Student Mentoring",
        "Technical Training",
      ],
      isFullTime: true,
    },
    {
      company: "Ceed Learning",
      position: "Web Developer & Multimedia Designer",
      location: "Johannesburg, South Africa",
      duration: "August 2018 – August 2019",
      description:
        "Designed, developed, and maintained Ceed Learning's website and e-learning platform. Worked part-time alongside teaching duties, balancing multiple responsibilities effectively.",
      highlights: [
        "Web Development",
        "E-learning Platform",
        "Multimedia Design",
        "Part-time Work",
        "Multi-tasking",
      ],
      isFullTime: false,
    },
  ];

  // Filter work experience based on showOnlyFullTime prop
  const filteredWorkExperience = showOnlyFullTime
    ? workExperience.filter((job) => job.isFullTime)
    : workExperience;

  // Initialize expanded items based on variant
  const getInitialExpandedItems = () => {
    const initial = {};
    filteredWorkExperience.forEach((job, index) => {
      if (variant === "Teacher") {
        // Open teaching jobs by default (ROC Nijmegen positions)
        initial[index] = job.position.toLowerCase().includes("teacher");
      } else if (variant === "Developer") {
        // Open development jobs by default (all non-teaching positions)
        initial[index] = !job.position.toLowerCase().includes("teacher");
      } else {
        // Combined: keep everything closed by default
        initial[index] = false;
      }
    });
    return initial;
  };

  const [expandedItems, setExpandedItems] = useState(getInitialExpandedItems());

  // Update expanded items when variant or showOnlyFullTime changes
  useEffect(() => {
    setExpandedItems(getInitialExpandedItems());
  }, [variant, showOnlyFullTime]);

  const toggleExpanded = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div
      id="work"
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
            Professional Experience
          </h2>
          <p
            className={`text-sm sm:text-base md:text-lg px-2 ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            A journey through my career in development and education
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {filteredWorkExperience.map((job, index) => (
            <div
              key={index}
              className={`relative p-4 sm:p-6 rounded-xl border ${
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
                      className={`text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 group-hover:text-blue-400 transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {job.position}
                    </h3>
                    <h4
                      className={`text-base sm:text-lg md:text-xl font-semibold mb-1 ${
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {job.company}
                    </h4>
                    <p
                      className={`text-xs sm:text-sm ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      📍 {job.location}
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
                      {job.duration}
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
                  <p
                    className={`text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 ${
                      isDarkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {job.highlights.map((highlight, highlightIndex) => (
                      <span
                        key={highlightIndex}
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                          isDarkMode
                            ? "bg-slate-700 text-slate-300"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {highlight}
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

export default WorkBlock;
