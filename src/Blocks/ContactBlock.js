const ContactBlock = ({ settings }) => {
  const isDarkMode = settings?.darkmode ?? true;

  const contactInfo = {
    email: "youriroc@gmail.com",
    phone: "0424513249",
    location: "Perth, Australia",
    linkedin: "https://nl.linkedin.com/in/yourigruiters",
    instagram: "https://www.instagram.com/youri.gruiters",
  };

  return (
    <div
      id="contact"
      className={`items-center min-h-screen py-12 sm:py-12 md:py-16 px-4 sm:px-6 md:flex ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Get In Touch
          </h2>
          <p
            className={`text-sm sm:text-base md:text-lg px-2 ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Ready to collaborate or have a question? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 md:mb-16">
          {/* Contact Information */}
          <div
            className={`p-4 sm:p-6 md:p-8 rounded-xl border ${
              isDarkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-slate-200"
            } shadow-lg`}
          >
            <h3
              className={`text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Contact Information
            </h3>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isDarkMode ? "bg-blue-600" : "bg-blue-500"
                  }`}
                >
                  <span className="text-white text-lg sm:text-xl">📧</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs sm:text-sm font-medium ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Email
                  </p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className={`text-sm sm:text-base md:text-lg font-semibold hover:text-blue-400 transition-colors duration-300 break-all ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isDarkMode ? "bg-green-600" : "bg-green-500"
                  }`}
                >
                  <span className="text-white text-lg sm:text-xl">📱</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs sm:text-sm font-medium ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Phone
                  </p>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className={`text-sm sm:text-base md:text-lg font-semibold hover:text-green-400 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isDarkMode ? "bg-purple-600" : "bg-purple-500"
                  }`}
                >
                  <span className="text-white text-lg sm:text-xl">📍</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs sm:text-sm font-medium ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Location
                  </p>
                  <p
                    className={`text-sm sm:text-base md:text-lg font-semibold ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {contactInfo.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div
            className={`p-4 sm:p-6 md:p-8 rounded-xl border ${
              isDarkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-slate-200"
            } shadow-lg`}
          >
            <h3
              className={`text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Connect With Me
            </h3>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isDarkMode ? "bg-blue-700" : "bg-blue-600"
                  }`}
                >
                  <span className="text-white text-lg sm:text-xl flex items-center justify-center pb-0 md:pb-2">
                    💼
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs sm:text-sm font-medium ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    LinkedIn
                  </p>
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm sm:text-base md:text-lg font-semibold hover:text-blue-400 transition-colors duration-300 break-all ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isDarkMode ? "bg-pink-600" : "bg-pink-500"
                  }`}
                >
                  <span className="text-white text-lg sm:text-xl flex items-center justify-center pb-0 md:pb-2">
                    📷
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs sm:text-sm font-medium ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Instagram
                  </p>
                  <a
                    href={contactInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm sm:text-base md:text-lg font-semibold hover:text-pink-400 transition-colors duration-300 break-all ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Follow on Instagram
                  </a>
                </div>
              </div>

              <div
                className={`p-3 sm:p-4 rounded-lg border ${
                  isDarkMode
                    ? "bg-slate-700 border-slate-600"
                    : "bg-slate-50 border-slate-300"
                }`}
              >
                <p
                  className={`text-xs sm:text-sm ${
                    isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  💡 <strong>Available for:</strong> casual positions on a
                  'working holiday visa' in Australia.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className={`p-4 sm:p-6 md:p-8 rounded-xl border text-center ${
            isDarkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-slate-200"
          } shadow-lg`}
        >
          <h3
            className={`text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Let's Build Something Amazing Together
          </h3>
          <p
            className={`text-sm sm:text-base md:text-lg mb-6 sm:mb-8 px-2 ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Whether you're looking for a developer, educator, or someone to
            bring your ideas to life, I'm here to help make it happen.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href={`mailto:${contactInfo.email}`}
              className={`px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                isDarkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              } shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
            >
              Send Email
            </a>
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 border-2 text-sm sm:text-base ${
                isDarkMode
                  ? "border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
                  : "border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white"
              } shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBlock;
