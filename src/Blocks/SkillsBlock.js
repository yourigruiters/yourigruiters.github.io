const SkillsBlock = ({ settings }) => {
  const isDarkMode = settings?.darkmode ?? true;
  const variant = settings?.variant || "Combined";

  const allTechnologies = [
    "HTML",
    "CSS",
    "Javascript",
    "Typescript",
    "CraftCMS",
    "React",
    "Redux",
    "Vue",
    "Pinia",
    "GIT",
    "Rest API's",
    "GraphQL",
    "Firebase",
    "NoSQL",
    "Wordpress",
    "NodeJS",
    "Express",
    "Socket.IO",
    "MongoDB",
    "Tailwind",
    "Bootstrap",
    "PHP",
    "SQL",
    "jQuery",
    "Curriculum Development",
    "Student Mentoring",
    "Technical Training",
    "Agile Scrum",
    "Client Coordination",
    "Team Leadership",
    "Technical Writing",
    "Presentation Skills",
    "Cross-functional Collaboration",
  ];

  // Check if technology belongs to current variant
  const isTechnologyRelevant = (tech) => {
    if (variant === "Combined") {
      return true;
    } else if (variant === "Developer") {
      // Remove: Curriculum Development, Student Mentoring
      return tech !== "Curriculum Development" && tech !== "Student Mentoring";
    } else if (variant === "Teacher") {
      // Remove: CraftCMS, Vue, Pinia, Rest API's, GraphQL, Express, NodeJS, Socket.IO, MongoDB, Client Coordination, Team Leadership, Cross-functional Collaboration
      return (
        tech !== "CraftCMS" &&
        tech !== "Vue" &&
        tech !== "Pinia" &&
        tech !== "Rest API's" &&
        tech !== "GraphQL" &&
        tech !== "Express" &&
        tech !== "NodeJS" &&
        tech !== "Socket.IO" &&
        tech !== "MongoDB" &&
        tech !== "Client Coordination" &&
        tech !== "Team Leadership" &&
        tech !== "Cross-functional Collaboration"
      );
    }
    return true;
  };

  const technologies = allTechnologies;

  return (
    <div
      id="skills"
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
            Skills & Expertise
          </h2>
          <p
            className={`text-sm sm:text-base md:text-lg px-2 ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            A comprehensive overview of my technical and professional
            capabilities
          </p>
        </div>

        {/* Technologies Section */}
        <div>
          <h3
            className={`text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 md:mb-8 ${
              isDarkMode ? "text-slate-200" : "text-slate-800"
            }`}
          >
            Technologies
          </h3>
          <div
            className={`p-4 sm:p-6 md:p-8 rounded-xl border ${
              isDarkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-slate-200"
            } shadow-lg`}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-2 sm:gap-3 justify-center">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg border text-center transition-all duration-300 ${
                    isTechnologyRelevant(tech)
                      ? isDarkMode
                        ? "bg-slate-700 border-slate-600 text-slate-300"
                        : "bg-slate-50 border-slate-300 text-slate-700"
                      : isDarkMode
                      ? "bg-slate-800 border-slate-700 text-slate-500 blur-sm opacity-50"
                      : "bg-slate-100 border-slate-200 text-slate-400 blur-sm opacity-50"
                  }`}
                >
                  <span className="font-medium text-xs sm:text-sm">{tech}</span>
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
