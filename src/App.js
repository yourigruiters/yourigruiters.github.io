import { useState, useRef, useEffect } from "react";

import IntroBlock from "./Blocks/IntroBlock";
import SkillsBlock from "./Blocks/SkillsBlock";
import WorkBlock from "./Blocks/WorkBlock";
import EducationBlock from "./Blocks/EducationBlock";
import ProjectsBlock from "./Blocks/ProjectsBlock";
import ContactBlock from "./Blocks/ContactBlock";
import ColoredText from "./components/ColoredText";
import Collapsible from "./components/Collapsible";

const App = () => {
  const [leftWidth, setLeftWidth] = useState(25);
  const [isDragging, setIsDragging] = useState(false);
  const [settings, setSettings] = useState({
    portfolioWidth: 25,
    darkmode: true,
    editorTheme: "Dark",
    variant: "Developer",
  });

  const [blockSettings, setBlockSettings] = useState({
    intro: { show: true },
    skills: { show: true },
    work: { show: true, amount: 3 },
    education: { show: true, amount: 2 },
    projects: { show: true, amount: 2 },
    contact: { show: true },
  });

  const [collapsibleStates, setCollapsibleStates] = useState({
    global: false,
    intro: false,
    skills: false,
    work: false,
    education: false,
    projects: false,
    contact: false,
  });

  const [commandInput, setCommandInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobilePanel, setActiveMobilePanel] = useState("left"); // "left" or "right"

  const containerRef = useRef(null);
  const dragStartX = useRef(0);
  const dragStartWidth = useRef(0);
  const rightPanelRef = useRef(null);
  const blockRefs = useRef({});

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartWidth.current = leftWidth;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const deltaX = e.clientX - dragStartX.current;
    const deltaPercentage = (deltaX / containerRect.width) * 100;
    const newWidth = Math.floor(
      Math.max(10, Math.min(90, dragStartWidth.current + deltaPercentage))
    );

    setLeftWidth(newWidth);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";

    // Update settings when dragging stops
    updateSetting("portfolioWidth", leftWidth);
  };

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
  };

  const updateBlockSetting = (blockName, key, value) => {
    const newBlockSettings = { ...blockSettings };
    newBlockSettings[blockName] = {
      ...newBlockSettings[blockName],
      [key]: value,
    };
    setBlockSettings(newBlockSettings);
  };

  const updateCollapsibleState = (collapsibleName, isOpen) => {
    setCollapsibleStates((prev) => ({
      ...prev,
      [collapsibleName]: isOpen,
    }));
  };

  const toggleAllCollapsibles = () => {
    const allOpen = Object.values(collapsibleStates).every(
      (state) => state === true
    );
    const newState = !allOpen;

    setCollapsibleStates({
      global: newState,
      intro: newState,
      skills: newState,
      work: newState,
      education: newState,
      projects: newState,
      contact: newState,
    });
  };

  // Command suggestions based on current state
  const getCommandSuggestions = () => {
    const suggestions = [
      {
        text: "Toggle darkmode",
        action: () => updateSetting("darkmode", !settings.darkmode),
      },
      {
        text: "Toggle editor theme",
        action: () =>
          updateSetting(
            "editorTheme",
            settings.editorTheme === "Dark" ? "Light" : "Dark"
          ),
      },
    ];

    // Add variant options (only show the 2 that are not currently selected)
    const currentVariant = settings.variant;
    const allVariants = ["Developer", "Teacher", "Combined"];
    const otherVariants = allVariants.filter((v) => v !== currentVariant);

    otherVariants.forEach((variant) => {
      suggestions.push({
        text: `Change variant to ${variant}`,
        action: () => updateSetting("variant", variant),
      });
    });

    return suggestions;
  };

  const executeCommand = (commandText) => {
    const suggestions = getCommandSuggestions();
    const command = suggestions.find(
      (s) => s.text.toLowerCase() === commandText.toLowerCase()
    );
    if (command) {
      command.action();
    }
  };

  const handleCommandInputChange = (e) => {
    const value = e.target.value;
    setCommandInput(value);
    setShowSuggestions(true); // Always show suggestions when typing
    setSelectedSuggestionIndex(-1);
  };

  const handleCommandKeyDown = (e) => {
    const suggestions = getCommandSuggestions();
    const filteredSuggestions = suggestions.filter((s) =>
      s.text.toLowerCase().includes(commandInput.toLowerCase())
    );

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (
        selectedSuggestionIndex >= 0 &&
        selectedSuggestionIndex < filteredSuggestions.length
      ) {
        const selectedCommand = filteredSuggestions[selectedSuggestionIndex];
        executeCommand(selectedCommand.text);
        setCommandInput("");
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  const handleSuggestionClick = (commandText) => {
    executeCommand(commandText);
    setCommandInput("");
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  // Helper function to get current theme
  const getCurrentTheme = () =>
    settings.editorTheme === "Light" ? "light" : "dark";

  // Mobile detection and panel switching
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const switchMobilePanel = () => {
    setActiveMobilePanel((prev) => (prev === "left" ? "right" : "left"));
  };

  const navigateToBlock = (blockName) => {
    const blockRef = blockRefs.current[blockName];
    if (blockRef && rightPanelRef.current) {
      blockRef.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, leftWidth]);

  // Block components with their names
  const blocks = [
    { component: IntroBlock, name: "intro" },
    { component: SkillsBlock, name: "skills" },
    { component: WorkBlock, name: "work" },
    { component: EducationBlock, name: "education" },
    { component: ProjectsBlock, name: "projects" },
    { component: ContactBlock, name: "contact" },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden" ref={containerRef}>
      <div className={`h-full ${isMobile ? "relative" : "flex"}`}>
        <div
          className={`flex flex-col overflow-x-hidden ${
            settings.editorTheme === "Light" ? "bg-gray-50" : "bg-black"
          } ${
            isMobile
              ? `absolute inset-0 ${
                  activeMobilePanel === "left"
                    ? "z-20 left-0 w-[90%]"
                    : "z-10 left-0 w-[10%] opacity-50"
                }`
              : ""
          }`}
          style={{
            width: isMobile
              ? activeMobilePanel === "left"
                ? "90%"
                : "100%"
              : `${leftWidth}%`,
          }}
          onClick={
            isMobile && activeMobilePanel === "right"
              ? switchMobilePanel
              : undefined
          }
        >
          <div
            className={`border-b p-3 flex justify-between items-center gap-4 flex-shrink-0 ${
              settings.editorTheme === "Light"
                ? "bg-gray-200 border-gray-300"
                : "bg-gray-800 border-gray-700"
            }`}
          >
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="Command..."
                value={commandInput}
                onChange={handleCommandInputChange}
                onKeyDown={handleCommandKeyDown}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                className={`px-3 py-1 rounded text-sm border focus:outline-none w-full ${
                  settings.editorTheme === "Light"
                    ? "bg-white text-gray-800 border-gray-300 focus:border-gray-400"
                    : "bg-gray-700 text-white border-gray-600 focus:border-gray-500"
                }`}
              />
              {showSuggestions && (
                <div
                  className={`absolute top-full left-0 right-0 mt-1 border rounded text-sm shadow-lg z-50 max-h-48 overflow-y-auto ${
                    settings.editorTheme === "Light"
                      ? "bg-white border-gray-300"
                      : "bg-gray-800 border-gray-600"
                  }`}
                >
                  {(() => {
                    const filteredSuggestions = getCommandSuggestions().filter(
                      (s) =>
                        s.text
                          .toLowerCase()
                          .includes(commandInput.toLowerCase())
                    );

                    if (filteredSuggestions.length === 0) {
                      return (
                        <div
                          className={`px-3 py-2 ${
                            settings.editorTheme === "Light"
                              ? "text-gray-600"
                              : "text-gray-400"
                          }`}
                        >
                          No commands matching
                        </div>
                      );
                    }

                    return filteredSuggestions.map((suggestion, index) => (
                      <div
                        key={suggestion.text}
                        className={`px-3 py-2 cursor-pointer ${
                          settings.editorTheme === "Light"
                            ? `text-gray-800 hover:bg-gray-100 ${
                                index === selectedSuggestionIndex
                                  ? "bg-gray-100"
                                  : ""
                              }`
                            : `text-white hover:bg-gray-700 ${
                                index === selectedSuggestionIndex
                                  ? "bg-gray-700"
                                  : ""
                              }`
                        }`}
                        onClick={() => handleSuggestionClick(suggestion.text)}
                      >
                        {suggestion.text}
                      </div>
                    ));
                  })()}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleAllCollapsibles}
                className={`px-3 py-1 rounded text-sm border transition-colors duration-150 ${
                  settings.editorTheme === "Light"
                    ? "bg-white hover:bg-gray-100 text-gray-800 border-gray-300"
                    : "bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                }`}
              >
                {Object.values(collapsibleStates).every(
                  (state) => state === true
                )
                  ? "Close all"
                  : "Open all"}
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
            <div
              className={`text-xs font-mono break-words overflow-wrap-anywhere ${
                settings.editorTheme === "Light"
                  ? "text-green-600"
                  : "text-green-400"
              }`}
            >
              <div className="mb-2">{"{"}</div>

              <div className="ml-4">
                <Collapsible
                  bracketType="curly"
                  showComma={true}
                  isOpen={collapsibleStates.global}
                  onToggle={(isOpen) =>
                    updateCollapsibleState("global", isOpen)
                  }
                  theme={getCurrentTheme()}
                  label={
                    <>
                      <ColoredText color="blue" theme={getCurrentTheme()}>
                        global
                      </ColoredText>
                      :
                    </>
                  }
                >
                  <div className="ml-4">
                    <div className="flex items-center">
                      <ColoredText color="blue" theme={getCurrentTheme()}>
                        portfolioWidth
                      </ColoredText>
                      :
                      <input
                        type="number"
                        min="10"
                        max="90"
                        value={settings.portfolioWidth}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setLeftWidth(value);
                          updateSetting("portfolioWidth", value);
                        }}
                        className={`px-2 py-1 rounded text-xs border focus:outline-none ml-2 w-16 ${
                          settings.editorTheme === "Light"
                            ? "bg-white text-gray-800 border-gray-300 focus:border-gray-400"
                            : "bg-gray-800 text-gray-200 border-gray-600 focus:border-gray-500"
                        }`}
                      />
                      ,
                    </div>

                    <div className="flex items-center">
                      <ColoredText color="blue" theme={getCurrentTheme()}>
                        darkmode
                      </ColoredText>
                      :
                      <select
                        value={settings.darkmode.toString()}
                        onChange={(e) =>
                          updateSetting("darkmode", e.target.value === "true")
                        }
                        className={`px-2 py-1 rounded text-xs border-2 focus:outline-none ml-2 appearance-none ${
                          settings.editorTheme === "Light"
                            ? "bg-white text-gray-800 border-gray-300 focus:border-gray-400"
                            : "bg-gray-800 text-gray-200 border-gray-600 focus:border-gray-500"
                        }`}
                        style={{
                          backgroundImage: "none",
                          borderImage: "none",
                          boxShadow: "none",
                          outline: "none",
                        }}
                      >
                        <option
                          value="true"
                          className={
                            settings.editorTheme === "Light"
                              ? "bg-white text-gray-800"
                              : "bg-gray-800 text-gray-200"
                          }
                        >
                          true
                        </option>
                        <option
                          value="false"
                          className={
                            settings.editorTheme === "Light"
                              ? "bg-white text-gray-800"
                              : "bg-gray-800 text-gray-200"
                          }
                        >
                          false
                        </option>
                      </select>
                      ,
                    </div>

                    <div className="flex items-center">
                      <ColoredText color="blue" theme={getCurrentTheme()}>
                        editorTheme
                      </ColoredText>
                      :
                      <select
                        value={settings.editorTheme}
                        onChange={(e) =>
                          updateSetting("editorTheme", e.target.value)
                        }
                        className={`px-2 py-1 rounded text-xs border-2 focus:outline-none ml-2 appearance-none ${
                          settings.editorTheme === "Light"
                            ? "bg-white text-gray-800 border-gray-300 focus:border-gray-400"
                            : "bg-gray-800 text-gray-200 border-gray-600 focus:border-gray-500"
                        }`}
                        style={{
                          backgroundImage: "none",
                          borderImage: "none",
                          boxShadow: "none",
                          outline: "none",
                        }}
                      >
                        <option
                          value="Dark"
                          className={
                            settings.editorTheme === "Light"
                              ? "bg-white text-gray-800"
                              : "bg-gray-800 text-gray-200"
                          }
                        >
                          Dark
                        </option>
                        <option
                          value="Light"
                          className={
                            settings.editorTheme === "Light"
                              ? "bg-white text-gray-800"
                              : "bg-gray-800 text-gray-200"
                          }
                        >
                          Light
                        </option>
                      </select>
                      ,
                    </div>

                    <div className="flex items-center">
                      <ColoredText color="blue" theme={getCurrentTheme()}>
                        variant
                      </ColoredText>
                      :
                      <select
                        value={settings.variant}
                        onChange={(e) =>
                          updateSetting("variant", e.target.value)
                        }
                        className={`px-2 py-1 rounded text-xs border-2 focus:outline-none ml-2 appearance-none ${
                          settings.editorTheme === "Light"
                            ? "bg-white text-gray-800 border-gray-300 focus:border-gray-400"
                            : "bg-gray-800 text-gray-200 border-gray-600 focus:border-gray-500"
                        }`}
                        style={{
                          backgroundImage: "none",
                          borderImage: "none",
                          boxShadow: "none",
                          outline: "none",
                        }}
                      >
                        <option
                          value="Teacher"
                          className={
                            settings.editorTheme === "Light"
                              ? "bg-white text-gray-800"
                              : "bg-gray-800 text-gray-200"
                          }
                        >
                          Teacher
                        </option>
                        <option
                          value="Developer"
                          className={
                            settings.editorTheme === "Light"
                              ? "bg-white text-gray-800"
                              : "bg-gray-800 text-gray-200"
                          }
                        >
                          Developer
                        </option>
                        <option
                          value="Combined"
                          className={
                            settings.editorTheme === "Light"
                              ? "bg-white text-gray-800"
                              : "bg-gray-800 text-gray-200"
                          }
                        >
                          Combined
                        </option>
                      </select>
                    </div>
                  </div>
                </Collapsible>
              </div>

              <div className="ml-4">
                <Collapsible
                  bracketType="curly"
                  showComma={true}
                  isOpen={collapsibleStates.intro}
                  onToggle={(isOpen) => updateCollapsibleState("intro", isOpen)}
                  theme={getCurrentTheme()}
                  label={
                    <>
                      <ColoredText
                        color="blue"
                        linkTo="intro"
                        onNavigate={navigateToBlock}
                      >
                        intro
                      </ColoredText>
                      :
                    </>
                  }
                >
                  <div className="ml-4">
                    <div>
                      <ColoredText color="blue" theme={getCurrentTheme()}>
                        props
                      </ColoredText>
                      :{" "}
                      <Collapsible
                        bracketType="curly"
                        showComma={true}
                        isOpen={false}
                      >
                        <div className="ml-4">
                          <div className="flex items-center">
                            <ColoredText color="blue" theme={getCurrentTheme()}>
                              show
                            </ColoredText>
                            :
                            <select
                              value={blockSettings.intro.show.toString()}
                              onChange={(e) =>
                                updateBlockSetting(
                                  "intro",
                                  "show",
                                  e.target.value === "true"
                                )
                              }
                              className={`px-2 py-1 rounded text-xs border-2 focus:outline-none ml-2 appearance-none ${
                                settings.editorTheme === "Light"
                                  ? "bg-white text-gray-800 border-gray-300 focus:border-gray-400"
                                  : "bg-gray-800 text-gray-200 border-gray-600 focus:border-gray-500"
                              }`}
                              style={{
                                backgroundImage: "none",
                                borderImage: "none",
                                boxShadow: "none",
                                outline: "none",
                              }}
                            >
                              <option
                                value="true"
                                className={
                                  settings.editorTheme === "Light"
                                    ? "bg-white text-gray-800"
                                    : "bg-gray-800 text-gray-200"
                                }
                              >
                                true
                              </option>
                              <option
                                value="false"
                                className={
                                  settings.editorTheme === "Light"
                                    ? "bg-white text-gray-800"
                                    : "bg-gray-800 text-gray-200"
                                }
                              >
                                false
                              </option>
                            </select>
                          </div>
                        </div>
                      </Collapsible>
                    </div>
                    <div>
                      <ColoredText color="blue" theme={getCurrentTheme()}>
                        data
                      </ColoredText>
                      :{" "}
                      <Collapsible bracketType="curly" isOpen={false}>
                        <div className="ml-4">
                          <div>
                            <ColoredText color="blue" theme={getCurrentTheme()}>
                              headline
                            </ColoredText>
                            :{" "}
                            <ColoredText
                              color="yellow"
                              theme={getCurrentTheme()}
                            >
                              Hello, I'm Youri Gruiters
                            </ColoredText>
                            ,
                          </div>
                          <div>
                            <ColoredText color="blue" theme={getCurrentTheme()}>
                              subtitle
                            </ColoredText>
                            :{" "}
                            <ColoredText
                              color="yellow"
                              theme={getCurrentTheme()}
                            >
                              Front-end Developer & Educator
                            </ColoredText>
                            ,
                          </div>
                          <div>
                            <ColoredText color="blue" theme={getCurrentTheme()}>
                              description
                            </ColoredText>
                            :{" "}
                            <ColoredText
                              color="yellow"
                              theme={getCurrentTheme()}
                            >
                              Motivated and adaptable individual with a strong
                              interest in personal and professional development.
                              Holds a Bachelor's degree in IT & Media Design as
                              well as IT & Education, blending technical
                              knowledge with strong communication skills. Brings
                              over 7 years of experience in development and 2.5
                              years in teaching.
                            </ColoredText>
                          </div>
                        </div>
                      </Collapsible>
                    </div>
                  </div>
                </Collapsible>
              </div>

              <div className="ml-4">
                <Collapsible
                  bracketType="curly"
                  showComma={true}
                  isOpen={collapsibleStates.skills}
                  onToggle={(isOpen) =>
                    updateCollapsibleState("skills", isOpen)
                  }
                  theme={getCurrentTheme()}
                  label={
                    <>
                      <ColoredText
                        color="blue"
                        linkTo="skills"
                        onNavigate={navigateToBlock}
                      >
                        skills
                      </ColoredText>
                      :
                    </>
                  }
                >
                  <div className="ml-4">
                    <div>
                      <ColoredText color="blue" theme={getCurrentTheme()}>
                        props
                      </ColoredText>
                      :{" "}
                      <Collapsible
                        bracketType="curly"
                        showComma={true}
                        isOpen={false}
                      >
                        <div className="ml-4">
                          <div className="flex items-center">
                            <ColoredText color="blue" theme={getCurrentTheme()}>
                              show
                            </ColoredText>
                            :
                            <select
                              value={blockSettings.skills.show.toString()}
                              onChange={(e) =>
                                updateBlockSetting(
                                  "skills",
                                  "show",
                                  e.target.value === "true"
                                )
                              }
                              className={`px-2 py-1 rounded text-xs border-2 focus:outline-none ml-2 appearance-none ${
                                settings.editorTheme === "Light"
                                  ? "bg-white text-gray-800 border-gray-300 focus:border-gray-400"
                                  : "bg-gray-800 text-gray-200 border-gray-600 focus:border-gray-500"
                              }`}
                              style={{
                                backgroundImage: "none",
                                borderImage: "none",
                                boxShadow: "none",
                                outline: "none",
                              }}
                            >
                              <option
                                value="true"
                                className={
                                  settings.editorTheme === "Light"
                                    ? "bg-white text-gray-800"
                                    : "bg-gray-800 text-gray-200"
                                }
                              >
                                true
                              </option>
                              <option
                                value="false"
                                className={
                                  settings.editorTheme === "Light"
                                    ? "bg-white text-gray-800"
                                    : "bg-gray-800 text-gray-200"
                                }
                              >
                                false
                              </option>
                            </select>
                          </div>
                        </div>
                      </Collapsible>
                    </div>
                    <div>
                      <ColoredText color="blue" theme={getCurrentTheme()}>
                        data
                      </ColoredText>
                      :{" "}
                      <Collapsible bracketType="curly" isOpen={false}>
                        <div className="ml-4">
                          <div>
                            <Collapsible
                              bracketType="square"
                              showComma={true}
                              label={
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  categories
                                </ColoredText>
                              }
                            >
                              <div className="ml-4">
                                <div>
                                  <ColoredText
                                    color="yellow"
                                    theme={getCurrentTheme()}
                                  >
                                    Front-end Development
                                  </ColoredText>
                                  ,
                                </div>
                                <div>
                                  <ColoredText
                                    color="yellow"
                                    theme={getCurrentTheme()}
                                  >
                                    Teaching & Education
                                  </ColoredText>
                                  ,
                                </div>
                                <div>
                                  <ColoredText
                                    color="yellow"
                                    theme={getCurrentTheme()}
                                  >
                                    Project Management
                                  </ColoredText>
                                  ,
                                </div>
                                <div>
                                  <ColoredText
                                    color="yellow"
                                    theme={getCurrentTheme()}
                                  >
                                    Communication
                                  </ColoredText>
                                </div>
                              </div>
                            </Collapsible>
                          </div>
                          <div>
                            <Collapsible
                              bracketType="square"
                              label={
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  technologies
                                </ColoredText>
                              }
                            >
                              <div className="ml-4">
                                <div>
                                  <ColoredText
                                    color="yellow"
                                    theme={getCurrentTheme()}
                                  >
                                    ReactJS
                                  </ColoredText>
                                  ,
                                </div>
                                <div>
                                  <ColoredText
                                    color="yellow"
                                    theme={getCurrentTheme()}
                                  >
                                    VueJS
                                  </ColoredText>
                                  ,
                                </div>
                                <div>
                                  <ColoredText
                                    color="yellow"
                                    theme={getCurrentTheme()}
                                  >
                                    TypeScript
                                  </ColoredText>
                                  ,
                                </div>
                                <div>
                                  <ColoredText
                                    color="yellow"
                                    theme={getCurrentTheme()}
                                  >
                                    CraftCMS
                                  </ColoredText>
                                  ,
                                </div>
                                <div>
                                  <ColoredText
                                    color="yellow"
                                    theme={getCurrentTheme()}
                                  >
                                    HTML/CSS/JavaScript
                                  </ColoredText>
                                  ,
                                </div>
                                <div>
                                  <ColoredText
                                    color="yellow"
                                    theme={getCurrentTheme()}
                                  >
                                    GIT
                                  </ColoredText>
                                </div>
                              </div>
                            </Collapsible>
                          </div>
                        </div>
                      </Collapsible>
                    </div>
                  </div>
                </Collapsible>
              </div>

              <div className="ml-4">
                <Collapsible
                  bracketType="curly"
                  showComma={true}
                  isOpen={collapsibleStates.work}
                  onToggle={(isOpen) => updateCollapsibleState("work", isOpen)}
                  theme={getCurrentTheme()}
                  label={
                    <>
                      <ColoredText
                        color="blue"
                        linkTo="work"
                        onNavigate={navigateToBlock}
                      >
                        work
                      </ColoredText>
                      :
                    </>
                  }
                >
                  <div className="ml-4">
                    <div>
                      <ColoredText color="blue" theme={getCurrentTheme()}>
                        props
                      </ColoredText>
                      :{" "}
                      <Collapsible
                        bracketType="curly"
                        showComma={true}
                        isOpen={false}
                      >
                        <div className="ml-4">
                          <div className="flex items-center">
                            <ColoredText color="blue" theme={getCurrentTheme()}>
                              show
                            </ColoredText>
                            :
                            <select
                              value={blockSettings.work.show.toString()}
                              onChange={(e) =>
                                updateBlockSetting(
                                  "work",
                                  "show",
                                  e.target.value === "true"
                                )
                              }
                              className={`px-2 py-1 rounded text-xs border-2 focus:outline-none ml-2 appearance-none ${
                                settings.editorTheme === "Light"
                                  ? "bg-white text-gray-800 border-gray-300 focus:border-gray-400"
                                  : "bg-gray-800 text-gray-200 border-gray-600 focus:border-gray-500"
                              }`}
                              style={{
                                backgroundImage: "none",
                                borderImage: "none",
                                boxShadow: "none",
                                outline: "none",
                              }}
                            >
                              <option
                                value="true"
                                className={
                                  settings.editorTheme === "Light"
                                    ? "bg-white text-gray-800"
                                    : "bg-gray-800 text-gray-200"
                                }
                              >
                                true
                              </option>
                              <option
                                value="false"
                                className={
                                  settings.editorTheme === "Light"
                                    ? "bg-white text-gray-800"
                                    : "bg-gray-800 text-gray-200"
                                }
                              >
                                false
                              </option>
                            </select>
                            ,
                          </div>
                          <div className="flex items-center">
                            <ColoredText color="blue" theme={getCurrentTheme()}>
                              amount
                            </ColoredText>
                            :
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={blockSettings.work.amount}
                              onChange={(e) =>
                                updateBlockSetting(
                                  "work",
                                  "amount",
                                  parseInt(e.target.value)
                                )
                              }
                              className={`px-2 py-1 rounded text-xs border focus:outline-none ml-2 w-16 ${
                                settings.editorTheme === "Light"
                                  ? "bg-white text-gray-800 border-gray-300 focus:border-gray-400"
                                  : "bg-gray-800 text-gray-200 border-gray-600 focus:border-gray-500"
                              }`}
                            />
                          </div>
                        </div>
                      </Collapsible>
                    </div>
                    <div>
                      <ColoredText color="blue" theme={getCurrentTheme()}>
                        data
                      </ColoredText>
                      :{" "}
                      <Collapsible bracketType="square" isOpen={false}>
                        <div className="ml-4">
                          <Collapsible
                            bracketType="curly"
                            showComma={true}
                            isOpen={false}
                          >
                            <div className="ml-4">
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  company
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  Happy Horizon B.V.
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  position
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  Front-end Developer
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  location
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  Eindhoven, The Netherlands
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  duration
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  April 2023 – June 2025
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  description
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  Managed multiple projects simultaneously,
                                  coordinating directly with clients. Delivered
                                  dynamic development work using CraftCMS, VueJS
                                  and ReactJS frameworks.
                                </ColoredText>
                              </div>
                            </div>
                          </Collapsible>
                          <Collapsible
                            bracketType="curly"
                            showComma={true}
                            isOpen={false}
                          >
                            <div className="ml-4">
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  company
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  System4
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  position
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  Front-end Developer
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  location
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  Uden, The Netherlands
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  duration
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  September 2022 – April 2023
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  description
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  Specialized in building responsive web
                                  applications using ReactJS. Collaborated in
                                  Agile Scrum teams of 4-5 developers.
                                </ColoredText>
                              </div>
                            </div>
                          </Collapsible>
                          <Collapsible bracketType="curly">
                            <div className="ml-4">
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  company
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  ROC Nijmegen
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  position
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  Front-end Development Teacher
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  location
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  Nijmegen, The Netherlands
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  duration
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  August 2021 – August 2022, August 2018 –
                                  February 2020
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  description
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  Delivered courses on HTML, CSS, JavaScript,
                                  ReactJS, and GIT. Served as mentor and
                                  internship supervisor for students.
                                </ColoredText>
                              </div>
                            </div>
                          </Collapsible>
                        </div>
                      </Collapsible>
                    </div>
                  </div>
                </Collapsible>
              </div>

              <div className="ml-4">
                <Collapsible
                  bracketType="curly"
                  showComma={true}
                  isOpen={collapsibleStates.education}
                  onToggle={(isOpen) =>
                    updateCollapsibleState("education", isOpen)
                  }
                  theme={getCurrentTheme()}
                  label={
                    <>
                      <ColoredText
                        color="blue"
                        linkTo="education"
                        onNavigate={navigateToBlock}
                      >
                        education
                      </ColoredText>
                      :
                    </>
                  }
                >
                  <div className="ml-4">
                    <div>
                      <ColoredText color="blue" theme={getCurrentTheme()}>
                        props
                      </ColoredText>
                      :{" "}
                      <Collapsible
                        bracketType="curly"
                        showComma={true}
                        isOpen={false}
                      >
                        <div className="ml-4">
                          <div className="flex items-center">
                            <ColoredText color="blue" theme={getCurrentTheme()}>
                              show
                            </ColoredText>
                            :
                            <select
                              value={blockSettings.education.show.toString()}
                              onChange={(e) =>
                                updateBlockSetting(
                                  "education",
                                  "show",
                                  e.target.value === "true"
                                )
                              }
                              className={`px-2 py-1 rounded text-xs border-2 focus:outline-none ml-2 appearance-none ${
                                settings.editorTheme === "Light"
                                  ? "bg-white text-gray-800 border-gray-300 focus:border-gray-400"
                                  : "bg-gray-800 text-gray-200 border-gray-600 focus:border-gray-500"
                              }`}
                              style={{
                                backgroundImage: "none",
                                borderImage: "none",
                                boxShadow: "none",
                                outline: "none",
                              }}
                            >
                              <option
                                value="true"
                                className={
                                  settings.editorTheme === "Light"
                                    ? "bg-white text-gray-800"
                                    : "bg-gray-800 text-gray-200"
                                }
                              >
                                true
                              </option>
                              <option
                                value="false"
                                className={
                                  settings.editorTheme === "Light"
                                    ? "bg-white text-gray-800"
                                    : "bg-gray-800 text-gray-200"
                                }
                              >
                                false
                              </option>
                            </select>
                            ,
                          </div>
                          <div className="flex items-center">
                            <ColoredText color="blue" theme={getCurrentTheme()}>
                              amount
                            </ColoredText>
                            :
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={blockSettings.education.amount}
                              onChange={(e) =>
                                updateBlockSetting(
                                  "education",
                                  "amount",
                                  parseInt(e.target.value)
                                )
                              }
                              className={`px-2 py-1 rounded text-xs border focus:outline-none ml-2 w-16 ${
                                settings.editorTheme === "Light"
                                  ? "bg-white text-gray-800 border-gray-300 focus:border-gray-400"
                                  : "bg-gray-800 text-gray-200 border-gray-600 focus:border-gray-500"
                              }`}
                            />
                          </div>
                        </div>
                      </Collapsible>
                    </div>
                    <div>
                      <ColoredText color="blue" theme={getCurrentTheme()}>
                        data
                      </ColoredText>
                      :{" "}
                      <Collapsible bracketType="square" isOpen={false}>
                        <div className="ml-4">
                          <Collapsible
                            bracketType="curly"
                            showComma={true}
                            isOpen={false}
                          >
                            <div className="ml-4">
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  degree
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  Bachelor of IT & Media Design (cum laude)
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  "university"
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  Fontys University of Applied Sciences
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  location
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  Eindhoven, The Netherlands
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  duration
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  2014 – 2018
                                </ColoredText>
                              </div>
                            </div>
                          </Collapsible>
                          <Collapsible bracketType="curly">
                            <div className="ml-4">
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  degree
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  Bachelor of IT & Education (cum laude)
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  "university"
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  Fontys University of Applied Sciences
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  location
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  Eindhoven, The Netherlands
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  duration
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  2015 – 2018
                                </ColoredText>
                              </div>
                            </div>
                          </Collapsible>
                        </div>
                      </Collapsible>
                    </div>
                  </div>
                </Collapsible>
              </div>

              <div className="ml-4">
                <Collapsible
                  bracketType="curly"
                  showComma={true}
                  isOpen={collapsibleStates.projects}
                  onToggle={(isOpen) =>
                    updateCollapsibleState("projects", isOpen)
                  }
                  theme={getCurrentTheme()}
                  label={
                    <>
                      <ColoredText
                        color="blue"
                        linkTo="projects"
                        onNavigate={navigateToBlock}
                      >
                        projects
                      </ColoredText>
                      :
                    </>
                  }
                >
                  <div className="ml-4">
                    <div>
                      <ColoredText color="blue" theme={getCurrentTheme()}>
                        props
                      </ColoredText>
                      :{" "}
                      <Collapsible
                        bracketType="curly"
                        showComma={true}
                        isOpen={false}
                      >
                        <div className="ml-4">
                          <div className="flex items-center">
                            <ColoredText color="blue" theme={getCurrentTheme()}>
                              show
                            </ColoredText>
                            :
                            <select
                              value={blockSettings.projects.show.toString()}
                              onChange={(e) =>
                                updateBlockSetting(
                                  "projects",
                                  "show",
                                  e.target.value === "true"
                                )
                              }
                              className={`px-2 py-1 rounded text-xs border-2 focus:outline-none ml-2 appearance-none ${
                                settings.editorTheme === "Light"
                                  ? "bg-white text-gray-800 border-gray-300 focus:border-gray-400"
                                  : "bg-gray-800 text-gray-200 border-gray-600 focus:border-gray-500"
                              }`}
                              style={{
                                backgroundImage: "none",
                                borderImage: "none",
                                boxShadow: "none",
                                outline: "none",
                              }}
                            >
                              <option
                                value="true"
                                className={
                                  settings.editorTheme === "Light"
                                    ? "bg-white text-gray-800"
                                    : "bg-gray-800 text-gray-200"
                                }
                              >
                                true
                              </option>
                              <option
                                value="false"
                                className={
                                  settings.editorTheme === "Light"
                                    ? "bg-white text-gray-800"
                                    : "bg-gray-800 text-gray-200"
                                }
                              >
                                false
                              </option>
                            </select>
                            ,
                          </div>
                          <div className="flex items-center">
                            <ColoredText color="blue" theme={getCurrentTheme()}>
                              amount
                            </ColoredText>
                            :
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={blockSettings.projects.amount}
                              onChange={(e) =>
                                updateBlockSetting(
                                  "projects",
                                  "amount",
                                  parseInt(e.target.value)
                                )
                              }
                              className={`px-2 py-1 rounded text-xs border focus:outline-none ml-2 w-16 ${
                                settings.editorTheme === "Light"
                                  ? "bg-white text-gray-800 border-gray-300 focus:border-gray-400"
                                  : "bg-gray-800 text-gray-200 border-gray-600 focus:border-gray-500"
                              }`}
                            />
                          </div>
                        </div>
                      </Collapsible>
                    </div>
                    <div>
                      <ColoredText color="blue" theme={getCurrentTheme()}>
                        data
                      </ColoredText>
                      :{" "}
                      <Collapsible bracketType="square" isOpen={false}>
                        <div className="ml-4">
                          <Collapsible
                            bracketType="curly"
                            showComma={true}
                            isOpen={false}
                          >
                            <div className="ml-4">
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  name
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  Portfolio Website
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  tech
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  React, Tailwind
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  status
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  Completed
                                </ColoredText>
                              </div>
                            </div>
                          </Collapsible>
                          <Collapsible bracketType="curly">
                            <div className="ml-4">
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  name
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  E-commerce App
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  tech
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  Node.js, MongoDB
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  status
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  In Progress
                                </ColoredText>
                              </div>
                            </div>
                          </Collapsible>
                        </div>
                      </Collapsible>
                    </div>
                  </div>
                </Collapsible>
              </div>

              <div className="ml-4">
                <Collapsible
                  bracketType="curly"
                  isOpen={collapsibleStates.contact}
                  onToggle={(isOpen) =>
                    updateCollapsibleState("contact", isOpen)
                  }
                  theme={getCurrentTheme()}
                  label={
                    <>
                      <ColoredText
                        color="blue"
                        linkTo="contact"
                        onNavigate={navigateToBlock}
                      >
                        contact
                      </ColoredText>
                      :
                    </>
                  }
                >
                  <div className="ml-4">
                    <div>
                      <ColoredText color="blue" theme={getCurrentTheme()}>
                        props
                      </ColoredText>
                      :{" "}
                      <Collapsible
                        bracketType="curly"
                        showComma={true}
                        isOpen={false}
                      >
                        <div className="ml-4">
                          <div className="flex items-center">
                            <ColoredText color="blue" theme={getCurrentTheme()}>
                              show
                            </ColoredText>
                            :
                            <select
                              value={blockSettings.contact.show.toString()}
                              onChange={(e) =>
                                updateBlockSetting(
                                  "contact",
                                  "show",
                                  e.target.value === "true"
                                )
                              }
                              className={`px-2 py-1 rounded text-xs border-2 focus:outline-none ml-2 appearance-none ${
                                settings.editorTheme === "Light"
                                  ? "bg-white text-gray-800 border-gray-300 focus:border-gray-400"
                                  : "bg-gray-800 text-gray-200 border-gray-600 focus:border-gray-500"
                              }`}
                              style={{
                                backgroundImage: "none",
                                borderImage: "none",
                                boxShadow: "none",
                                outline: "none",
                              }}
                            >
                              <option
                                value="true"
                                className={
                                  settings.editorTheme === "Light"
                                    ? "bg-white text-gray-800"
                                    : "bg-gray-800 text-gray-200"
                                }
                              >
                                true
                              </option>
                              <option
                                value="false"
                                className={
                                  settings.editorTheme === "Light"
                                    ? "bg-white text-gray-800"
                                    : "bg-gray-800 text-gray-200"
                                }
                              >
                                false
                              </option>
                            </select>
                          </div>
                        </div>
                      </Collapsible>
                    </div>
                    <div>
                      <ColoredText color="blue" theme={getCurrentTheme()}>
                        data
                      </ColoredText>
                      :{" "}
                      <Collapsible bracketType="curly" isOpen={false}>
                        <div className="ml-4">
                          <div>
                            <ColoredText color="blue" theme={getCurrentTheme()}>
                              email
                            </ColoredText>
                            :{" "}
                            <ColoredText
                              color="yellow"
                              theme={getCurrentTheme()}
                            >
                              youriroc@gmail.com
                            </ColoredText>
                            ,
                          </div>
                          <div>
                            <ColoredText color="blue" theme={getCurrentTheme()}>
                              phone
                            </ColoredText>
                            :{" "}
                            <ColoredText
                              color="yellow"
                              theme={getCurrentTheme()}
                            >
                              0424513249
                            </ColoredText>
                            ,
                          </div>
                          <div>
                            <ColoredText color="blue" theme={getCurrentTheme()}>
                              location
                            </ColoredText>
                            :{" "}
                            <ColoredText
                              color="yellow"
                              theme={getCurrentTheme()}
                            >
                              Brisbane, Australia
                            </ColoredText>
                            ,
                          </div>
                          <div>
                            <Collapsible
                              bracketType="curly"
                              label={
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  social
                                </ColoredText>
                              }
                            >
                              <div className="ml-4">
                                <div>
                                  <ColoredText
                                    color="blue"
                                    theme={getCurrentTheme()}
                                  >
                                    linkedin
                                  </ColoredText>
                                  :{" "}
                                  <ColoredText
                                    color="yellow"
                                    theme={getCurrentTheme()}
                                  >
                                    https://nl.linkedin.com/in/yourigruiters
                                  </ColoredText>
                                </div>
                              </div>
                            </Collapsible>
                          </div>
                        </div>
                      </Collapsible>
                    </div>
                  </div>
                </Collapsible>
              </div>
            </div>

            <div className="text-green-400 text-xs font-mono break-words overflow-wrap-anywhere">
              {"}"}
            </div>
          </div>
        </div>

        {!isMobile && (
          <div
            className="w-1 bg-gray-400 hover:bg-gray-600 cursor-col-resize flex-shrink-0 relative group"
            onMouseDown={handleMouseDown}
          >
            <div className="absolute inset-y-0 -left-1 -right-1 bg-transparent group-hover:bg-gray-200 opacity-50"></div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-8 bg-gray-600 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        )}

        <div
          ref={rightPanelRef}
          className={`overflow-y-auto ${
            isMobile
              ? `absolute inset-0 ${
                  activeMobilePanel === "right"
                    ? "z-20 left-[10%] w-[90%]"
                    : "z-10 right-0 w-[10%] opacity-50"
                }`
              : "border-l border-gray-300"
          }`}
          style={{
            width: isMobile
              ? activeMobilePanel === "right"
                ? "90%"
                : "100%"
              : `${100 - leftWidth}%`,
          }}
          onClick={
            isMobile && activeMobilePanel === "left"
              ? switchMobilePanel
              : undefined
          }
        >
          {blocks.map((block, index) => {
            const { component: BlockComponent, name: blockName } = block;

            // Only render block if show is true
            if (!blockSettings[blockName]?.show) {
              return null;
            }

            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) {
                    blockRefs.current[blockName] = el;
                  }
                }}
              >
                <BlockComponent />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
