const EducationBlock = ({ settings }) => {
  const isDarkMode = settings?.darkmode ?? true;

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
  ];

  return (
    <div
      id="education"
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
            Education
          </h2>
          <p
            className={`text-lg ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Dual expertise in technology and education
          </p>
        </div>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-xl border ${
                isDarkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              } shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              {/* Degree icon */}
              <div
                className={`absolute -top-4 left-8 w-8 h-8 rounded-full flex items-center justify-center ${
                  isDarkMode ? "bg-purple-500" : "bg-purple-500"
                }`}
              >
                <span className="text-white font-bold text-sm">🎓</span>
              </div>

              <div className="pt-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                  <div>
                    <h3
                      className={`text-2xl font-bold mb-2 ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {edu.degree}
                    </h3>
                    <h4
                      className={`text-xl font-semibold mb-1 ${
                        isDarkMode ? "text-purple-400" : "text-purple-600"
                      }`}
                    >
                      {edu.university}
                    </h4>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      📍 {edu.location}
                    </p>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-medium mt-2 md:mt-0 ${
                      isDarkMode
                        ? "bg-slate-700 text-slate-300"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {edu.duration}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {edu.achievements.map((achievement, achievementIndex) => (
                    <span
                      key={achievementIndex}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isDarkMode
                          ? "bg-purple-900 text-purple-300 border border-purple-700"
                          : "bg-purple-100 text-purple-700 border border-purple-200"
                      }`}
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div
          className={`mt-12 p-6 rounded-xl border text-center ${
            isDarkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-slate-200"
          } shadow-lg`}
        >
          <h3
            className={`text-lg font-semibold mb-2 ${
              isDarkMode ? "text-slate-200" : "text-slate-800"
            }`}
          >
            Dual Degree Achievement
          </h3>
          <p
            className={`text-sm ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Successfully completed two bachelor's degrees simultaneously,
            demonstrating exceptional time management and dedication to both
            technical excellence and educational expertise.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationBlock;
