const EducationBlock = ({ settings, blockSettings }) => {
  const isDarkMode = settings?.darkmode ?? true;
  const variant = settings?.variant || "Combined";
  const showOnlyUniversityDegrees =
    blockSettings?.education?.showOnlyUniversityDegrees ?? false;

  const education = [
    {
      degree: "Full Stack Development Bootcamp",
      university: "Salt",
      location: "Stockholm, Sweden",
      duration: "2020",
      type: "developer",
    },
    {
      degree: "Bachelor of IT & Education",
      university: "Fontys University of Applied Sciences",
      location: "Eindhoven, The Netherlands",
      duration: "2015 – 2018",
      type: "teacher",
      cumLaude: true,
    },
    {
      degree: "Bachelor of IT & Media Design",
      university: "Fontys University of Applied Sciences",
      location: "Eindhoven, The Netherlands",
      duration: "2014 – 2018",
      type: "developer",
      cumLaude: true,
    },
    {
      degree: "IT & Management",
      university: "ROC de Leijgraaf",
      location: "Veghel, The Netherlands",
      duration: "2010 – 2014",
      type: "developer",
    },
  ];

  // Filter education based on showOnlyUniversityDegrees prop and variant
  const filteredEducation = education.filter((edu) => {
    // First apply the university degree filter if active
    if (
      showOnlyUniversityDegrees &&
      !edu.degree.toLowerCase().includes("bachelor")
    ) {
      return false;
    }

    // Then apply the variant filter
    if (variant === "Teacher") {
      return edu.type === "teacher";
    } else if (variant === "Developer") {
      return edu.type === "developer";
    }
    // "Combined" or any other value shows everything
    return true;
  });

  return (
    <div
      id="education"
      className={`items-center min-h-screen py-12 sm:py-12 md:py-16 px-4 sm:px-6 md:flex ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      }`}
    >
      <div className="w-full max-w-4xl mx-auto">
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
          {filteredEducation.map((edu, index) => (
            <div
              key={index}
              className={`p-4 sm:p-6 md:p-8 rounded-xl border ${
                isDarkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              } shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                <div className="flex-1">
                  <h3
                    className={`text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 ${
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
                <div className="flex flex-col items-end gap-1 mt-2 lg:mt-0">
                  <div
                    className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                      isDarkMode
                        ? "bg-slate-700 text-slate-300"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {edu.duration}
                  </div>
                  {edu.cumLaude && (
                    <div
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                        isDarkMode
                          ? "bg-purple-900 text-purple-300 border border-purple-700"
                          : "bg-purple-100 text-purple-700 border border-purple-200"
                      }`}
                    >
                      Cum Laude
                    </div>
                  )}
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
