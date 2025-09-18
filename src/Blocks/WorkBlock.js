const WorkBlock = ({ settings }) => {
  const isDarkMode = settings?.darkmode ?? true;

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
    },
    {
      company: "ROC Nijmegen",
      position: "Front-end Development Teacher",
      location: "Nijmegen, The Netherlands",
      duration: "August 2021 – August 2022, August 2018 – February 2020",
      description:
        "Delivered courses on HTML, CSS, JavaScript, ReactJS, and GIT. Served as mentor and internship supervisor for students.",
      highlights: [
        "Teaching",
        "Curriculum Development",
        "Student Mentoring",
        "Technical Training",
      ],
    },
  ];

  return (
    <div
      id="work"
      className={`min-h-screen py-8 sm:py-12 md:py-16 px-4 sm:px-6 ${
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
          {workExperience.map((job, index) => (
            <div
              key={index}
              className={`relative p-4 sm:p-6 rounded-xl border ${
                isDarkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              } shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              {/* Timeline indicator */}
              <div
                className={`absolute left-4 sm:left-6 top-6 sm:top-8 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 sm:border-4 ${
                  isDarkMode
                    ? "bg-blue-500 border-slate-800"
                    : "bg-blue-500 border-white"
                }`}
              />

              <div className="ml-8 sm:ml-12">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3 sm:mb-4">
                  <div className="flex-1">
                    <h3
                      className={`text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 ${
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
                  <div
                    className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium mt-2 lg:mt-0 self-start ${
                      isDarkMode
                        ? "bg-slate-700 text-slate-300"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {job.duration}
                  </div>
                </div>

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
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkBlock;
