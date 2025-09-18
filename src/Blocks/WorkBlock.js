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
      className={`min-h-screen py-16 px-6 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Professional Experience
          </h2>
          <p
            className={`text-lg ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            A journey through my career in development and education
          </p>
        </div>

        <div className="space-y-8">
          {workExperience.map((job, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-xl border ${
                isDarkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              } shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              {/* Timeline indicator */}
              <div
                className={`absolute left-6 top-8 w-4 h-4 rounded-full border-4 ${
                  isDarkMode
                    ? "bg-blue-500 border-slate-800"
                    : "bg-blue-500 border-white"
                }`}
              />

              <div className="ml-12">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3
                      className={`text-2xl font-bold mb-2 ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {job.position}
                    </h3>
                    <h4
                      className={`text-xl font-semibold mb-1 ${
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {job.company}
                    </h4>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      📍 {job.location}
                    </p>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-medium mt-2 md:mt-0 ${
                      isDarkMode
                        ? "bg-slate-700 text-slate-300"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {job.duration}
                  </div>
                </div>

                <p
                  className={`text-base leading-relaxed mb-4 ${
                    isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {job.highlights.map((highlight, highlightIndex) => (
                    <span
                      key={highlightIndex}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
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
