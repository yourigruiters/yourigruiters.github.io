import profileImage from "../media/personal.jpg";

const IntroBlock = ({ settings }) => {
  const isDarkMode = settings?.darkmode ?? true;
  const variant = settings?.variant || "Combined";

  // Define content based on variant
  const getVariantContent = () => {
    switch (variant) {
      case "Teacher":
        return {
          subtitle: "Educator & Front-end Developer",
          description: (
            <>
              <p className="mb-4 sm:mb-6">
                Motivated and adaptable individual with a strong interest in
                personal and professional development. Holds a Bachelor's degree
                in IT & Media Design as well as{" "}
                <span className="font-semibold text-purple-500">
                  IT & Education
                </span>
                , blending technical knowledge with strong communication skills.
              </p>
              <p>
                Brings over 7 years of experience in development and{" "}
                <span className="font-semibold text-purple-500">
                  2.5 years in teaching
                </span>
                .
              </p>
            </>
          ),
          labels: [
            "Teaching & Education",
            "Curriculum Development",
            "Student Mentoring",
          ],
        };
      case "Developer":
        return {
          subtitle: "Front-end Developer & Educator",
          description: (
            <>
              <p className="mb-4 sm:mb-6">
                Motivated and adaptable individual with a strong interest in
                personal and professional development. Holds a Bachelor's degree
                in{" "}
                <span className="font-semibold text-blue-500">
                  IT & Media Design
                </span>{" "}
                as well as IT & Education, blending technical knowledge with
                strong communication skills.
              </p>
              <p>
                Brings over{" "}
                <span className="font-semibold text-blue-500">
                  7 years of experience
                </span>{" "}
                in development and 2.5 years in teaching.
              </p>
            </>
          ),
          labels: ["Front-end Development", "ReactJS", "TypeScript"],
        };
      default: // Combined
        return {
          subtitle: "Front-end Developer & Educator",
          description: (
            <>
              <p className="mb-4 sm:mb-6">
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
            </>
          ),
          labels: [
            "Front-end Development",
            "Education & Teaching",
            "Project Management",
          ],
        };
    }
  };

  const content = getVariantContent();

  return (
    <div
      id="intro"
      className={`items-center min-h-screen py-12 sm:py-12 md:py-16 px-4 sm:px-6 md:flex ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Hello, I'm{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Youri Gruiters
            </span>
          </h1>

          <h2
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-6 sm:mb-8 ${
              isDarkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {content.subtitle}
          </h2>

          <div className="mb-8 flex justify-center">
            <div
              className={`relative w-32 h-32 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 shadow-xl ${
                isDarkMode ? "border-slate-400" : "border-slate-600"
              }`}
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div
            className={`max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-2 ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {content.description}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-12">
          {content.labels.map((label, index) => (
            <div
              key={index}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full border text-center ${
                isDarkMode
                  ? "bg-slate-800 border-slate-700 text-slate-300"
                  : "bg-white border-slate-200 text-slate-700"
              } shadow-lg`}
            >
              <span className="font-medium text-sm sm:text-base">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroBlock;
