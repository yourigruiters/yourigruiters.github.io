const ProjectsBlock = ({ settings }) => {
  const isDarkMode = settings?.darkmode ?? true;

  const projects = [
    {
      name: "Portfolio Website",
      tech: ["React", "Tailwind"],
      status: "Completed",
      description:
        "A modern, responsive portfolio website showcasing professional experience and skills. Features dynamic theming, interactive components, and optimized performance.",
      features: [
        "Responsive Design",
        "Dynamic Theming",
        "Interactive UI",
        "Performance Optimized",
      ],
      statusColor: "green",
    },
    {
      name: "E-commerce App",
      tech: ["Node.js", "MongoDB"],
      status: "In Progress",
      description:
        "Full-stack e-commerce application with user authentication, product management, and payment integration. Built with modern web technologies and best practices.",
      features: [
        "User Authentication",
        "Product Management",
        "Payment Integration",
        "Admin Dashboard",
      ],
      statusColor: "blue",
    },
  ];

  const getStatusStyles = (status, statusColor) => {
    if (isDarkMode) {
      return {
        green: "bg-green-900 text-green-300 border-green-700",
        blue: "bg-blue-900 text-blue-300 border-blue-700",
        yellow: "bg-yellow-900 text-yellow-300 border-yellow-700",
      }[statusColor];
    } else {
      return {
        green: "bg-green-100 text-green-700 border-green-300",
        blue: "bg-blue-100 text-blue-700 border-blue-300",
        yellow: "bg-yellow-100 text-yellow-700 border-yellow-300",
      }[statusColor];
    }
  };

  return (
    <div
      id="projects"
      className={`min-h-screen py-8 sm:py-12 md:py-16 px-4 sm:px-6 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Featured Projects
          </h2>
          <p
            className={`text-sm sm:text-base md:text-lg px-2 ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            A showcase of my development work and technical capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`relative p-4 sm:p-6 md:p-8 rounded-xl border ${
                isDarkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              } shadow-lg hover:shadow-xl transition-shadow duration-300 group`}
            >
              {/* Project status badge */}
              <div
                className={`absolute -top-2 sm:-top-3 right-4 sm:right-6 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium border ${getStatusStyles(
                  project.status,
                  project.statusColor
                )}`}
              >
                {project.status}
              </div>

              <div className="mb-4 sm:mb-6">
                <h3
                  className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  } group-hover:text-blue-400 transition-colors duration-300`}
                >
                  {project.name}
                </h3>

                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                        isDarkMode
                          ? "bg-slate-700 text-slate-300"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p
                  className={`text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 ${
                    isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  {project.description}
                </p>
              </div>

              <div>
                <h4
                  className={`text-xs sm:text-sm font-semibold mb-2 sm:mb-3 ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Key Features:
                </h4>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {project.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${
                        isDarkMode
                          ? "bg-slate-700 text-slate-300 border-slate-600"
                          : "bg-slate-50 text-slate-700 border-slate-300"
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover effect overlay */}
              <div
                className={`absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-400 transition-colors duration-300 ${
                  isDarkMode
                    ? "group-hover:bg-blue-900/10"
                    : "group-hover:bg-blue-50/50"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div
          className={`mt-8 sm:mt-12 md:mt-16 p-4 sm:p-6 md:p-8 rounded-xl border text-center ${
            isDarkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-slate-200"
          } shadow-lg`}
        >
          <h3
            className={`text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Interested in my work?
          </h3>
          <p
            className={`text-sm sm:text-base md:text-lg mb-4 sm:mb-6 px-2 ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            I'm always excited to take on new challenges and create amazing
            digital experiences.
          </p>
          <button
            className={`px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
              isDarkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            } shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
          >
            Let's Work Together
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsBlock;
