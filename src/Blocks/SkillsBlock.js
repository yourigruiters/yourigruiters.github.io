const SkillsBlock = ({ settings }) => {
  const isDarkMode = settings?.darkmode ?? true;

  const categories = [
    {
      name: "Front-end Development",
      skills: ["ReactJS", "VueJS", "TypeScript", "HTML/CSS/JavaScript"],
    },
    {
      name: "Teaching & Education",
      skills: [
        "Curriculum Development",
        "Student Mentoring",
        "Technical Training",
      ],
    },
    {
      name: "Project Management",
      skills: ["Agile Scrum", "Client Coordination", "Team Leadership"],
    },
    {
      name: "Communication",
      skills: [
        "Technical Writing",
        "Presentation Skills",
        "Cross-functional Collaboration",
      ],
    },
  ];

  const technologies = [
    "ReactJS",
    "VueJS",
    "TypeScript",
    "CraftCMS",
    "HTML/CSS/JavaScript",
    "GIT",
  ];

  return (
    <div
      id="skills"
      className={`min-h-screen py-16 px-6 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Skills & Expertise
          </h2>
          <p
            className={`text-lg ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            A comprehensive overview of my technical and professional
            capabilities
          </p>
        </div>

        {/* Categories Section */}
        <div className="mb-16">
          <h3
            className={`text-2xl font-semibold mb-8 ${
              isDarkMode ? "text-slate-200" : "text-slate-800"
            }`}
          >
            Core Competencies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border ${
                  isDarkMode
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-slate-200"
                } shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                <h4
                  className={`text-xl font-semibold mb-4 ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {category.name}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isDarkMode
                          ? "bg-slate-700 text-slate-300"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Section */}
        <div>
          <h3
            className={`text-2xl font-semibold mb-8 ${
              isDarkMode ? "text-slate-200" : "text-slate-800"
            }`}
          >
            Technologies
          </h3>
          <div
            className={`p-8 rounded-xl border ${
              isDarkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-slate-200"
            } shadow-lg`}
          >
            <div className="flex flex-wrap gap-4 justify-center">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                    isDarkMode
                      ? "bg-slate-700 border-slate-600 text-slate-300 hover:border-blue-400 hover:bg-slate-600"
                      : "bg-slate-50 border-slate-300 text-slate-700 hover:border-blue-500 hover:bg-blue-50"
                  }`}
                >
                  <span className="font-medium">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsBlock;
