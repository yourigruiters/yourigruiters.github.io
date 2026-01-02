const ProjectsBlock = ({ settings }) => {
  const isDarkMode = settings?.darkmode ?? true;

  const projects = [
    {
      name: "Ubiquiti Chat Frontend",
      tech: ["React", "TypeScript", "Redux", "Socket.IO", "Sass", "Cypress"],
      status: "Completed",
      description:
        "Frontend for real-time chat application created for Ubiquiti coding challenge. Built with custom React setup, TypeScript, and Redux for state management with comprehensive testing suite.",
      features: [
        "Real-time Messaging UI",
        "TypeScript Implementation",
        "Redux State Management",
        "Custom Webpack Config",
        "E2E Testing with Cypress",
        "Mobile Responsive Design",
        "Sass Styling with BEM",
      ],
      statusColor: "green",
      githubUrl: "https://github.com/yourigruiters/React-Chat-Frontend",
    },
    {
      name: "Ubiquiti Chat Backend",
      tech: ["Express", "TypeScript", "Socket.IO", "Winston", "Mocha", "Chai"],
      status: "Completed",
      description:
        "Backend server for real-time chat application created for Ubiquiti coding challenge. Features WebSocket communication, logging, and comprehensive unit testing with proper signal handling.",
      features: [
        "WebSocket Communication",
        "TypeScript Server Implementation",
        "Winston Logging System",
        "Unit Testing with Mocha/Chai",
        "SIGINT/SIGTERM Signal Handling",
        "CORS Configuration",
        "Heroku Deployment Ready",
      ],
      statusColor: "green",
      githubUrl: "https://github.com/yourigruiters/React-Chat-Backend",
    },
    {
      name: "Full Stack Hangouts",
      tech: ["React", "Node.js", "Express", "MongoDB"],
      status: "Completed",
      description:
        "A comprehensive social platform for organizing and managing events and hangouts. Built with modern web technologies and featuring user authentication and event management.",
      features: [
        "Event Management",
        "User Authentication",
        "Real-time Updates",
        "Social Features",
        "Database Integration",
        "Responsive Design",
      ],
      statusColor: "green",
      githubUrl: "https://github.com/yourigruiters/Full-Stack-Hangouts",
    },
    {
      name: "JavaScript MMORPG",
      tech: ["JavaScript", "HTML5", "Canvas", "WebSockets"],
      status: "Discontinued",
      description:
        "A browser-based multiplayer online role-playing game built with vanilla JavaScript and HTML5 Canvas. Features real-time multiplayer gameplay, character progression, and interactive game mechanics.",
      features: [
        "Real-time Multiplayer",
        "Character Progression",
        "Interactive Gameplay",
        "Canvas Rendering",
        "WebSocket Communication",
        "Game State Management",
      ],
      statusColor: "yellow",
      githubUrl: "https://github.com/yourigruiters/JS-MMORPG",
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
      className={`items-center min-h-screen py-12 sm:py-12 md:py-16 px-4 sm:px-6 md:flex ${
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

        {/* Work Agreement Notice Banner */}
        <div
          className={`mb-8 p-4 sm:p-6 rounded-xl border ${
            isDarkMode
              ? "bg-amber-900/20 border-amber-700/50"
              : "bg-amber-50 border-amber-200"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                isDarkMode
                  ? "bg-amber-800 text-amber-200"
                  : "bg-amber-200 text-amber-800"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3
                className={`text-sm sm:text-base font-semibold mb-1 ${
                  isDarkMode ? "text-amber-200" : "text-amber-800"
                }`}
              >
                Work Agreement Notice
              </h3>
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isDarkMode ? "text-amber-300" : "text-amber-700"
                }`}
              >
                Due to work agreements and confidentiality requirements, I
                cannot showcase work-related projects. The projects displayed
                here are personal sample projects and older portfolio pieces
                available on my GitHub profile.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative p-4 sm:p-6 md:p-8 rounded-xl border ${
                isDarkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              } shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer block`}
            >
              {/* Project status badge */}
              <div
                className={`absolute -top-2 sm:-top-3 right-4 sm:right-6 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium border z-10 ${getStatusStyles(
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
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsBlock;
