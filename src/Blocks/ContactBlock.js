const ContactBlock = ({ settings }) => {
  const isDarkMode = settings?.darkmode ?? true;

  const contactInfo = {
    email: "youriroc@gmail.com",
    phone: "0424513249",
    location: "Perth, Australia",
    linkedin: "https://nl.linkedin.com/in/yourigruiters",
  };

  return (
    <div
      id="contact"
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
            Get In Touch
          </h2>
          <p
            className={`text-lg ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Ready to collaborate or have a question? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Contact Information */}
          <div
            className={`p-8 rounded-xl border ${
              isDarkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-slate-200"
            } shadow-lg`}
          >
            <h3
              className={`text-2xl font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDarkMode ? "bg-blue-600" : "bg-blue-500"
                  }`}
                >
                  <span className="text-white text-xl">📧</span>
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Email
                  </p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className={`text-lg font-semibold hover:text-blue-400 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDarkMode ? "bg-green-600" : "bg-green-500"
                  }`}
                >
                  <span className="text-white text-xl">📱</span>
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Phone
                  </p>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className={`text-lg font-semibold hover:text-green-400 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDarkMode ? "bg-purple-600" : "bg-purple-500"
                  }`}
                >
                  <span className="text-white text-xl">📍</span>
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Location
                  </p>
                  <p
                    className={`text-lg font-semibold ${
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
            className={`p-8 rounded-xl border ${
              isDarkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-slate-200"
            } shadow-lg`}
          >
            <h3
              className={`text-2xl font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Connect With Me
            </h3>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDarkMode ? "bg-blue-700" : "bg-blue-600"
                  }`}
                >
                  <span className="text-white text-xl">💼</span>
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    LinkedIn
                  </p>
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-lg font-semibold hover:text-blue-400 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border ${
                  isDarkMode
                    ? "bg-slate-700 border-slate-600"
                    : "bg-slate-50 border-slate-300"
                }`}
              >
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  💡 <strong>Available for:</strong> Full-time positions,
                  freelance projects, consulting opportunities, and technical
                  mentorship.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className={`p-8 rounded-xl border text-center ${
            isDarkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-slate-200"
          } shadow-lg`}
        >
          <h3
            className={`text-3xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Let's Build Something Amazing Together
          </h3>
          <p
            className={`text-lg mb-8 ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Whether you're looking for a developer, educator, or someone to
            bring your ideas to life, I'm here to help make it happen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${contactInfo.email}`}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
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
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 border-2 ${
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
