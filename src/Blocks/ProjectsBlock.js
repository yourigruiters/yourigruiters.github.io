import { useState } from "react";
import { createPortal } from "react-dom";
import project1img from "../media/project1.png";
import project2img from "../media/project2.png";
import project3img from "../media/project3.png";

const ProjectsBlock = ({ settings }) => {
  const isDarkMode = settings?.darkmode ?? true;
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      name: "Aurelion",
      tech: [
        "React",
        "Vite",
        "TypeScript",
        "Redux Toolkit",
        "Tailwind CSS",
        "React Router",
      ],
      status: "Online | Desktop screens",
      description:
        "A simplified city-builder and management game built with React, Redux, and TypeScript. Manage resources, construct buildings, and grow your settlement in a dangerous world. The game architecture has been refined to allow for seamless extension.",
      fullDescription: `<p><b>Aurelion</b> is a sophisticated city-builder and settlement management simulation designed to challenge strategic thinking within a minimalist, web-based interface. Developed using <b>React</b> and <b>TypeScript</b>, the project leverages <b>Redux</b> for complex state management, ensuring that resource gathering, building construction, and population growth remain synchronized in real-time. Players must balance the expansion of their colony with the harsh realities of a dangerous world, making critical decisions on resource allocation to ensure the survival of their citizens.</p><p>The technical architecture of Aurelion focuses on <b>scalability and modularity</b>. By utilizing a refined Redux store, the game efficiently handles high-frequency updates to the game state without sacrificing performance. The codebase is strictly typed with TypeScript, reducing runtime errors and making the logic behind the simulation robust. This foundation was specifically engineered to allow for seamless extensions, such as new building types, weather systems, or advanced AI behaviors, making it a powerful example of how modern web technologies can be applied to game development.</p>`,
      image: project3img,
      features: [
        "Resource Management",
        "City Building",
        "Population Management",
        "Dynamic Events",
        "Daily Activities",
        "Progression System",
        "Modular architecture",
      ],
      statusColor: "blue",
      type: "website",
      githubUrl: "https://aurelion.yourigruiters.com",
    },
    {
      name: "React Firebase Chat App",
      tech: [
        "React",
        "TypeScript",
        "Firebase",
        "Tailwind CSS",
        "Vite",
        "React Router",
      ],
      status: "Online",
      description:
        "A modern, real-time chat application built with React, TypeScript, and Firebase. This application features secure user authentication, real-time messaging, and support for both public and private (password-protected) chat rooms.",
      fullDescription: `<p>The <b>React Firebase Chat App</b> is a high-performance, real-time communication platform that demonstrates the power of <b>Serverless architecture</b>. Built with <b>React</b> and <b>TypeScript</b> on the frontend, it utilizes <b>Firebase</b> for its backend services, including <b>Firestore</b> for instantaneous message delivery and <b>Firebase Auth</b> for secure user management. The application provides a sleek, modern UI where users can engage in seamless conversations without the need for manual page refreshes, mimicking the fluid experience of industry-standard messaging tools.</p><p>Security and versatility are at the core of this project. Beyond basic global chat, the app features a sophisticated <b>room management system</b> that supports both public discussions and private, password-protected chat rooms. This demonstrates a deep implementation of Firebase security rules and real-time data filtering. By integrating <b>TypeScript</b>, the project ensures that the data flow between the Firebase database and the React components is safe and predictable, providing a professional-grade solution for real-time social interaction.</p>`,
      image: project2img,
      features: [
        "Google Authentication",
        "Real-time Messaging",
        "Password-protected Rooms",
        "Search Functionality",
        "Admin Privileges",
        "Responsive Design",
      ],
      statusColor: "blue",
      type: "website",
      githubUrl: "https://chat.yourigruiters.com",
    },
    {
      name: "Full Stack Hangouts",
      tech: ["React", "Node.js", "Express", "MongoDB"],
      status: "Github",
      description:
        "A comprehensive social platform for organizing and managing events and hangouts. Built with modern web technologies and featuring user authentication and event management.",
      fullDescription: `<p><b>Full Stack Hangouts</b> is a comprehensive social coordination platform designed to bridge the gap between digital planning and real-world events. Developed as a <b>full-stack solution</b>, this application provides a centralized hub for users to create, discover, and manage "hangouts." Whether it’s a casual meet-up or a structured event, the platform handles the complexities of <b>user authentication</b> and <b>event lifecycle management</b>, allowing organizers to focus on the experience rather than the logistics.</p><p>The project showcases a complete <b>MVC (Model-View-Controller) pattern</b>, integrating a responsive frontend with a robust backend API. Users can create personalized profiles, manage their event attendance, and interact with a dynamic feed of upcoming activities. From a developer’s perspective, Full Stack Hangouts serves as a testament to <b>modern web engineering</b>, utilizing industry-standard practices for data persistence and secure API communication. It is a highly functional tool designed to foster community engagement through a clean, intuitive, and mobile-friendly interface.</p>`,
      image: project1img,
      features: [
        "Event Management",
        "User Authentication",
        "Real-time Updates",
        "Social Features",
        "Interactive Video Features",
        "Queue Management",
      ],
      statusColor: "green",
      type: "repository",
      githubUrl: "https://github.com/yourigruiters/Full-Stack-Hangouts",
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

  const getTypeButtonStyles = (type) => {
    if (type === "website") {
      return isDarkMode
        ? "bg-blue-900 text-blue-300 border-blue-700"
        : "bg-blue-100 text-blue-700 border-blue-300";
    }
    return isDarkMode
      ? "bg-green-900 text-green-300 border-green-700"
      : "bg-green-100 text-green-700 border-green-300";
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
                Work Agreement Notice and personal projects
              </h3>
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isDarkMode ? "text-amber-300" : "text-amber-700"
                }`}
              >
                Due to work agreements and confidentiality requirements, I
                cannot showcase work-related projects. The projects displayed
                here are personal sample projects and older portfolio pieces
                available on my GitHub profile. These range from smaller
                prototypes to larger applications, specifically created to
                showcase my understanding of different development languages and
                concepts.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => setSelectedProject(project)}
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
                  project.statusColor,
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
      </div>

      {/* Modal View */}
      {selectedProject &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-slate-900/60 transition-opacity cursor-pointer"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Content */}
            <div
              className={`relative w-full max-w-4xl max-h-[90dvh] overflow-y-auto rounded-2xl shadow-2xl z-10 ${
                isDarkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              } border flex flex-col`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className={`sticky top-0 z-20 flex justify-between items-center p-4 sm:p-6 border-b ${
                  isDarkMode
                    ? "bg-slate-800 border-slate-700 text-white"
                    : "bg-white border-slate-200 text-slate-900"
                } rounded-t-2xl`}
              >
                <h3 className="text-xl sm:text-2xl font-bold">
                  {selectedProject.name}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode
                      ? "hover:bg-slate-700 text-slate-400 hover:text-white"
                      : "hover:bg-slate-100 text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-6 flex-1">
                {/* Status & Tech Stack */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles(
                      selectedProject.status,
                      selectedProject.statusColor,
                    )}`}
                  >
                    {selectedProject.status}
                  </span>
                  {selectedProject.tech.map((tech, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isDarkMode
                          ? "bg-slate-700 text-slate-300"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Image Section */}
                {selectedProject.image ? (
                  <div className="mb-6">
                    <div
                      className={`aspect-video rounded-lg overflow-hidden border w-full ${
                        isDarkMode ? "border-slate-700" : "border-slate-200"
                      }`}
                    >
                      <img
                        src={selectedProject.image}
                        alt={`${selectedProject.name} screenshot`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className={`w-full aspect-video sm:aspect-[21/9] rounded-xl flex items-center justify-center mb-6 border-2 border-dashed ${
                      isDarkMode
                        ? "border-slate-700 bg-slate-800/50 text-slate-500"
                        : "border-slate-300 bg-slate-50 text-slate-400"
                    }`}
                  >
                    <span className="text-sm font-medium">
                      Project image will appear here
                    </span>
                  </div>
                )}

                {/* Full Description */}
                <div
                  className={`mb-8 space-y-4 ${
                    isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  <h4
                    className={`text-sm font-semibold uppercase tracking-wider ${
                      isDarkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    About the Project
                  </h4>
                  {selectedProject.fullDescription ? (
                    <div
                      className={`leading-relaxed text-sm sm:text-base [&>p]:mb-4 [&>p:last-child]:mb-0 [&_strong]:font-semibold ${
                        isDarkMode
                          ? "[&_strong]:text-white"
                          : "[&_strong]:text-slate-900"
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: selectedProject.fullDescription,
                      }}
                    />
                  ) : (
                    <p className="leading-relaxed whitespace-pre-line text-sm sm:text-base">
                      {selectedProject.description}
                    </p>
                  )}
                </div>

                {/* Features List */}
                <div className="mb-6">
                  <h4
                    className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
                      isDarkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            isDarkMode ? "text-blue-400" : "text-blue-600"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span
                          className={`text-sm sm:text-base ${
                            isDarkMode ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div
                className={`p-4 sm:p-6 border-t flex justify-end gap-4 rounded-b-2xl ${
                  isDarkMode
                    ? "bg-slate-800/90 border-slate-700"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                {selectedProject.type && selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center px-6 py-2.5 rounded-lg font-semibold border transition-all duration-300 hover:-translate-y-0.5 shadow-sm hover:shadow ${getTypeButtonStyles(
                      selectedProject.type,
                    )}`}
                  >
                    {selectedProject.type === "website"
                      ? "Go to Website"
                      : "Go to Repository"}
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default ProjectsBlock;
