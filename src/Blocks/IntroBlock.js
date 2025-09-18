import { useContext } from "react";

const IntroBlock = ({ settings }) => {
  const isDarkMode = settings?.darkmode ?? true;

  return (
    <div
      id="intro"
      className={`min-h-screen py-16 px-6 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1
            className={`text-5xl md:text-6xl font-bold mb-6 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Hello, I'm{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Youri Gruiters
            </span>
          </h1>

          <h2
            className={`text-2xl md:text-3xl font-semibold mb-8 ${
              isDarkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Front-end Developer & Educator
          </h2>

          <div
            className={`max-w-3xl mx-auto text-lg leading-relaxed ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            <p className="mb-6">
              Motivated and adaptable individual with a strong interest in
              personal and professional development. Holds a Bachelor's degree
              in{" "}
              <span className="font-semibold text-blue-500">
                IT & Media Design
              </span>{" "}
              as well as{" "}
              <span className="font-semibold text-purple-500">
                IT & Education
              </span>
              , blending technical knowledge with strong communication skills.
            </p>
            <p>
              Brings over{" "}
              <span className="font-semibold text-blue-500">
                7 years of experience
              </span>{" "}
              in development and{" "}
              <span className="font-semibold text-purple-500">
                2.5 years in teaching
              </span>
              .
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <div
            className={`px-6 py-3 rounded-full border ${
              isDarkMode
                ? "bg-slate-800 border-slate-700 text-slate-300"
                : "bg-white border-slate-200 text-slate-700"
            } shadow-lg`}
          >
            <span className="font-medium">Front-end Development</span>
          </div>
          <div
            className={`px-6 py-3 rounded-full border ${
              isDarkMode
                ? "bg-slate-800 border-slate-700 text-slate-300"
                : "bg-white border-slate-200 text-slate-700"
            } shadow-lg`}
          >
            <span className="font-medium">Education & Teaching</span>
          </div>
          <div
            className={`px-6 py-3 rounded-full border ${
              isDarkMode
                ? "bg-slate-800 border-slate-700 text-slate-300"
                : "bg-white border-slate-200 text-slate-700"
            } shadow-lg`}
          >
            <span className="font-medium">Project Management</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroBlock;
