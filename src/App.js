import { useState, useRef, useEffect } from "react";

import IntroBlock from "./Blocks/IntroBlock";
import SkillsBlock from "./Blocks/SkillsBlock";
import WorkBlock from "./Blocks/WorkBlock";
import EducationBlock from "./Blocks/EducationBlock";
import ProjectsBlock from "./Blocks/ProjectsBlock";
import ContactBlock from "./Blocks/ContactBlock";
import ColoredText from "./components/ColoredText";
import Collapsible from "./components/Collapsible";

// localStorage utility functions
const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn(`Failed to save ${key} to localStorage:`, error);
  }
};

const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Failed to load ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Function to filter technologies based on variant
const getFilteredTechnologies = (variant) => {
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

  if (variant === "Combined") {
    return allTechnologies;
  } else if (variant === "Developer") {
    // Remove: Curriculum Development, Student Mentoring
    return allTechnologies.filter(
      (tech) =>
        tech !== "Curriculum Development" && tech !== "Student Mentoring"
    );
  } else if (variant === "Teacher") {
    // Remove: CraftCMS, Vue, Pinia, Rest API's, GraphQL, Express, NodeJS, Socket.IO, MongoDB, Client Coordination, Team Leadership, Cross-functional Collaboration
    return allTechnologies.filter(
      (tech) =>
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
  return allTechnologies;
};

const App = () => {
  const [leftWidth, setLeftWidth] = useState(35);
  const [isDragging, setIsDragging] = useState(false);
  const [settings, setSettings] = useState({
    portfolioWidth: 35,
    darkmode: true,
    editorTheme: "Dark",
    variant: "Combined",
  });

  const [blockSettings, setBlockSettings] = useState({
    intro: { show: true },
    skills: { show: true },
    work: { show: true, showOnlyFullTime: true },
    education: { show: true, showOnlyUniversityDegrees: true },
    projects: { show: true, amount: 2 },
    contact: { show: true },
  });

  const [collapsibleStates, setCollapsibleStates] = useState({
    global: true,
    intro: false,
    skills: false,
    work: false,
    education: false,
    projects: false,
    contact: false,
  });

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
    saveToLocalStorage("portfolioLeftWidth", newWidth);
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
    saveToLocalStorage("portfolioSettings", newSettings);
  };

  const updateBlockSetting = (blockName, key, value) => {
    const newBlockSettings = { ...blockSettings };
    newBlockSettings[blockName] = {
      ...newBlockSettings[blockName],
      [key]: value,
    };
    setBlockSettings(newBlockSettings);
    saveToLocalStorage("portfolioBlockSettings", newBlockSettings);
  };

  const updateCollapsibleState = (collapsibleName, isOpen) => {
    setCollapsibleStates((prev) => {
      const newStates = {
        ...prev,
        [collapsibleName]: isOpen,
      };
      saveToLocalStorage("portfolioCollapsibleStates", newStates);
      return newStates;
    });
  };

  const toggleAllCollapsibles = () => {
    const allOpen = Object.values(collapsibleStates).every(
      (state) => state === true
    );
    const newState = !allOpen;

    const newCollapsibleStates = {
      global: newState,
      intro: newState,
      skills: newState,
      work: newState,
      education: newState,
      projects: newState,
      contact: newState,
    };

    setCollapsibleStates(newCollapsibleStates);
    saveToLocalStorage("portfolioCollapsibleStates", newCollapsibleStates);
  };

  // Command suggestions based on current state
  const getCommandSuggestions = () => {
    const suggestions = [];

    // Add mobile-specific portfolio command as first option
    if (isMobile) {
      suggestions.push({
        text: "Show portfolio",
        action: () => {
          setActiveMobilePanel("right");
        },
      });
    }

    suggestions.push(
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
      }
    );

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

  const handleCommandClick = () => {
    setShowSuggestions(!showSuggestions);
    setSelectedSuggestionIndex(-1);
  };

  const handleSuggestionClick = (commandText) => {
    executeCommand(commandText);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  // Helper function to get current theme
  const getCurrentTheme = () =>
    settings.editorTheme === "Light" ? "light" : "dark";

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = loadFromLocalStorage("portfolioSettings", {
      portfolioWidth: 35,
      darkmode: true,
      editorTheme: "Dark",
      variant: "Combined",
    });

    const savedBlockSettings = loadFromLocalStorage("portfolioBlockSettings", {
      intro: { show: true },
      skills: { show: true },
      work: { show: true, showOnlyFullTime: true },
      education: { show: true, showOnlyUniversityDegrees: true },
      projects: { show: true, amount: 2 },
      contact: { show: true },
    });

    const savedCollapsibleStates = loadFromLocalStorage(
      "portfolioCollapsibleStates",
      {
        global: true,
        intro: false,
        skills: false,
        work: false,
        education: false,
        projects: false,
        contact: false,
      }
    );

    const savedLeftWidth = loadFromLocalStorage("portfolioLeftWidth", 35);

    setSettings(savedSettings);
    setBlockSettings(savedBlockSettings);
    setCollapsibleStates(savedCollapsibleStates);
    setLeftWidth(savedLeftWidth);
  }, []);

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
    <div
      className={`h-screen w-screen overflow-hidden ${
        isMobile ? "mobile-viewport" : ""
      }`}
      ref={containerRef}
    >
      <div className={`h-full ${isMobile ? "relative" : "flex"}`}>
        <div
          className={`flex flex-col overflow-x-hidden ${
            settings.editorTheme === "Light" ? "bg-slate-50" : "bg-black"
          } ${
            isMobile
              ? `absolute inset-0 ${
                  activeMobilePanel === "left"
                    ? "z-20 left-0 w-[90%]"
                    : "z-10 left-0 w-[10%] opacity-50 hover:opacity-70 cursor-pointer transition-opacity duration-200 pointer-events-none"
                }`
              : ""
          }`}
          style={{
            width: isMobile
              ? activeMobilePanel === "left"
                ? "90%"
                : "100%"
              : `${leftWidth}%`,
            ...(isMobile &&
              activeMobilePanel === "right" && { pointerEvents: "auto" }),
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
                ? "bg-slate-100 border-slate-300"
                : "bg-gray-800 border-gray-700"
            }`}
          >
            <div className="relative flex-1 max-w-xs">
              <button
                onClick={handleCommandClick}
                className={`px-3 py-1 rounded text-sm border focus:outline-none w-full text-left ${
                  settings.editorTheme === "Light"
                    ? "bg-white text-slate-800 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                    : "bg-gray-700 text-white border-gray-600 hover:border-gray-500 hover:bg-gray-600"
                }`}
              >
                Command
              </button>
              {showSuggestions && (
                <div
                  className={`absolute top-full left-0 right-0 mt-1 border rounded text-sm shadow-lg z-50 max-h-48 overflow-y-auto ${
                    settings.editorTheme === "Light"
                      ? "bg-white border-slate-300"
                      : "bg-gray-800 border-gray-600"
                  }`}
                >
                  {getCommandSuggestions().map((suggestion, index) => (
                    <div
                      key={suggestion.text}
                      className={`px-3 py-2 cursor-pointer ${
                        settings.editorTheme === "Light"
                          ? `text-slate-800 hover:bg-slate-100 ${
                              index === selectedSuggestionIndex
                                ? "bg-slate-100"
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
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleAllCollapsibles}
                className={`px-3 py-1 rounded text-sm border transition-colors duration-150 ${
                  settings.editorTheme === "Light"
                    ? "bg-white hover:bg-slate-100 text-slate-800 border-slate-300"
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
                  ? "text-indigo-600"
                  : "text-green-400"
              }`}
            >
              <div className="mb-2">{"{"}</div>

              <div className="ml-4">
                <div
                  ref={(el) => {
                    if (el) {
                      blockRefs.current.global = el;
                    }
                  }}
                >
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
                        <ColoredText
                          color="blue"
                          theme={getCurrentTheme()}
                          linkTo="global"
                          onNavigate={navigateToBlock}
                        >
                          global
                        </ColoredText>
                        :
                      </>
                    }
                  >
                    <div className="ml-4">
                      {!isMobile && (
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
                                ? "bg-white text-slate-800 border-slate-300 focus:border-slate-400"
                                : "bg-gray-800 text-gray-200 border-gray-600 focus:border-gray-500"
                            }`}
                          />
                          ,
                        </div>
                      )}

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
                              ? "bg-white text-slate-800 border-slate-300 focus:border-slate-400"
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
                                ? "bg-white text-slate-800"
                                : "bg-gray-800 text-gray-200"
                            }
                          >
                            true
                          </option>
                          <option
                            value="false"
                            className={
                              settings.editorTheme === "Light"
                                ? "bg-white text-slate-800"
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
                              ? "bg-white text-slate-800 border-slate-300 focus:border-slate-400"
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
                                ? "bg-white text-slate-800"
                                : "bg-gray-800 text-gray-200"
                            }
                          >
                            Dark
                          </option>
                          <option
                            value="Light"
                            className={
                              settings.editorTheme === "Light"
                                ? "bg-white text-slate-800"
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
                              ? "bg-white text-slate-800 border-slate-300 focus:border-slate-400"
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
                                ? "bg-white text-slate-800"
                                : "bg-gray-800 text-gray-200"
                            }
                          >
                            Teacher
                          </option>
                          <option
                            value="Developer"
                            className={
                              settings.editorTheme === "Light"
                                ? "bg-white text-slate-800"
                                : "bg-gray-800 text-gray-200"
                            }
                          >
                            Developer
                          </option>
                          <option
                            value="Combined"
                            className={
                              settings.editorTheme === "Light"
                                ? "bg-white text-slate-800"
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
                        theme={getCurrentTheme()}
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
                            ,
                          </div>
                          <div>
                            <ColoredText color="blue" theme={getCurrentTheme()}>
                              keywords
                            </ColoredText>
                            :{" "}
                            <Collapsible bracketType="curly" isOpen={false}>
                              <div className="ml-4">
                                <div>
                                  <ColoredText
                                    color="blue"
                                    theme={getCurrentTheme()}
                                  >
                                    combined
                                  </ColoredText>
                                  :{" "}
                                  <Collapsible
                                    bracketType="square"
                                    isOpen={true}
                                  >
                                    <div className="ml-4">
                                      <ColoredText
                                        color="yellow"
                                        theme={getCurrentTheme()}
                                      >
                                        Front-end Development
                                      </ColoredText>
                                      ,
                                      <ColoredText
                                        color="yellow"
                                        theme={getCurrentTheme()}
                                      >
                                        Education & Teaching
                                      </ColoredText>
                                      ,
                                      <ColoredText
                                        color="yellow"
                                        theme={getCurrentTheme()}
                                      >
                                        Project Management
                                      </ColoredText>
                                    </div>
                                  </Collapsible>
                                  ,
                                </div>
                                <div>
                                  <ColoredText
                                    color="blue"
                                    theme={getCurrentTheme()}
                                  >
                                    developer
                                  </ColoredText>
                                  :{" "}
                                  <Collapsible
                                    bracketType="square"
                                    isOpen={true}
                                  >
                                    <div className="ml-4">
                                      <ColoredText
                                        color="yellow"
                                        theme={getCurrentTheme()}
                                      >
                                        Front-end Development
                                      </ColoredText>
                                      ,
                                      <ColoredText
                                        color="yellow"
                                        theme={getCurrentTheme()}
                                      >
                                        Full-stack Development
                                      </ColoredText>
                                      ,
                                      <ColoredText
                                        color="yellow"
                                        theme={getCurrentTheme()}
                                      >
                                        Technical Leadership
                                      </ColoredText>
                                    </div>
                                  </Collapsible>
                                  ,
                                </div>
                                <div>
                                  <ColoredText
                                    color="blue"
                                    theme={getCurrentTheme()}
                                  >
                                    teacher
                                  </ColoredText>
                                  :{" "}
                                  <Collapsible
                                    bracketType="square"
                                    isOpen={true}
                                  >
                                    <div className="ml-4">
                                      <ColoredText
                                        color="yellow"
                                        theme={getCurrentTheme()}
                                      >
                                        Education & Teaching
                                      </ColoredText>
                                      ,
                                      <ColoredText
                                        color="yellow"
                                        theme={getCurrentTheme()}
                                      >
                                        Student Mentoring
                                      </ColoredText>
                                      ,
                                      <ColoredText
                                        color="yellow"
                                        theme={getCurrentTheme()}
                                      >
                                        Curriculum Development
                                      </ColoredText>
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
                        theme={getCurrentTheme()}
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
                        data
                      </ColoredText>
                      :{" "}
                      <Collapsible bracketType="curly" isOpen={false}>
                        <div className="ml-4">
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
                                    color="blue"
                                    theme={getCurrentTheme()}
                                  >
                                    showAll
                                  </ColoredText>
                                  :{" "}
                                  <ColoredText
                                    color="green"
                                    theme={getCurrentTheme()}
                                    autoQuotes={false}
                                  >
                                    true
                                  </ColoredText>
                                  ,
                                </div>
                                <div>
                                  <ColoredText
                                    color="blue"
                                    theme={getCurrentTheme()}
                                  >
                                    blurIrrelevant
                                  </ColoredText>
                                  :{" "}
                                  <ColoredText
                                    color="green"
                                    theme={getCurrentTheme()}
                                    autoQuotes={false}
                                  >
                                    true
                                  </ColoredText>
                                  ,
                                </div>
                                <div>
                                  <ColoredText
                                    color="blue"
                                    theme={getCurrentTheme()}
                                  >
                                    categories
                                  </ColoredText>
                                  :{" "}
                                  <Collapsible
                                    bracketType="curly"
                                    isOpen={false}
                                  >
                                    <div className="ml-4">
                                      <div>
                                        <ColoredText
                                          color="blue"
                                          theme={getCurrentTheme()}
                                        >
                                          combined
                                        </ColoredText>
                                        :{" "}
                                        <Collapsible
                                          bracketType="square"
                                          isOpen={true}
                                        >
                                          <div className="ml-4">
                                            <ColoredText
                                              color="yellow"
                                              theme={getCurrentTheme()}
                                            >
                                              *
                                            </ColoredText>
                                          </div>
                                        </Collapsible>
                                        ,
                                      </div>
                                      <div>
                                        <ColoredText
                                          color="blue"
                                          theme={getCurrentTheme()}
                                        >
                                          developer
                                        </ColoredText>
                                        :{" "}
                                        <Collapsible
                                          bracketType="square"
                                          isOpen={false}
                                        >
                                          <div className="ml-4">
                                            <ColoredText
                                              color="yellow"
                                              theme={getCurrentTheme()}
                                            >
                                              Curriculum Development
                                            </ColoredText>
                                            ,
                                            <ColoredText
                                              color="yellow"
                                              theme={getCurrentTheme()}
                                            >
                                              Student Mentoring
                                            </ColoredText>
                                          </div>
                                        </Collapsible>
                                        ,
                                      </div>
                                      <div>
                                        <ColoredText
                                          color="blue"
                                          theme={getCurrentTheme()}
                                        >
                                          teacher
                                        </ColoredText>
                                        :{" "}
                                        <Collapsible
                                          bracketType="square"
                                          isOpen={false}
                                        >
                                          <div className="ml-4">
                                            <ColoredText
                                              color="yellow"
                                              theme={getCurrentTheme()}
                                            >
                                              CraftCMS
                                            </ColoredText>
                                            ,
                                            <ColoredText
                                              color="yellow"
                                              theme={getCurrentTheme()}
                                            >
                                              Vue
                                            </ColoredText>
                                            ,
                                            <ColoredText
                                              color="yellow"
                                              theme={getCurrentTheme()}
                                            >
                                              Pinia
                                            </ColoredText>
                                            ,
                                            <ColoredText
                                              color="yellow"
                                              theme={getCurrentTheme()}
                                            >
                                              Rest API's
                                            </ColoredText>
                                            ,
                                            <ColoredText
                                              color="yellow"
                                              theme={getCurrentTheme()}
                                            >
                                              GraphQL
                                            </ColoredText>
                                            ,
                                            <ColoredText
                                              color="yellow"
                                              theme={getCurrentTheme()}
                                            >
                                              Express
                                            </ColoredText>
                                            ,
                                            <ColoredText
                                              color="yellow"
                                              theme={getCurrentTheme()}
                                            >
                                              NodeJS
                                            </ColoredText>
                                            ,
                                            <ColoredText
                                              color="yellow"
                                              theme={getCurrentTheme()}
                                            >
                                              Socket.IO
                                            </ColoredText>
                                            ,
                                            <ColoredText
                                              color="yellow"
                                              theme={getCurrentTheme()}
                                            >
                                              MongoDB
                                            </ColoredText>
                                            ,
                                            <ColoredText
                                              color="yellow"
                                              theme={getCurrentTheme()}
                                            >
                                              Client Coordination
                                            </ColoredText>
                                            ,
                                            <ColoredText
                                              color="yellow"
                                              theme={getCurrentTheme()}
                                            >
                                              Team Leadership
                                            </ColoredText>
                                            ,
                                            <ColoredText
                                              color="yellow"
                                              theme={getCurrentTheme()}
                                            >
                                              Cross-functional Collaboration
                                            </ColoredText>
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
                        theme={getCurrentTheme()}
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
                        isOpen={true}
                      >
                        <div className="ml-4">
                          <div className="flex items-center">
                            <ColoredText color="blue" theme={getCurrentTheme()}>
                              showOnlyFullTime
                            </ColoredText>
                            :
                            <select
                              value={blockSettings.work.showOnlyFullTime.toString()}
                              onChange={(e) =>
                                updateBlockSetting(
                                  "work",
                                  "showOnlyFullTime",
                                  e.target.value === "true"
                                )
                              }
                              className={`px-2 py-1 rounded text-xs border-2 focus:outline-none ml-2 appearance-none ${
                                settings.editorTheme === "Light"
                                  ? "bg-white text-slate-800 border-slate-300 focus:border-slate-400"
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
                                    ? "bg-white text-slate-800"
                                    : "bg-gray-800 text-gray-200"
                                }
                              >
                                true
                              </option>
                              <option
                                value="false"
                                className={
                                  settings.editorTheme === "Light"
                                    ? "bg-white text-slate-800"
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
                      <Collapsible bracketType="square" isOpen={true}>
                        <div className="ml-4">
                          <Collapsible bracketType="curly" showComma={true}>
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
                                  Led front-end development for multiple client
                                  projects, managing end-to-end delivery from
                                  concept to deployment. Coordinated directly
                                  with stakeholders to understand requirements
                                  and deliver custom solutions using CraftCMS,
                                  VueJS, and ReactJS. Successfully managed
                                  project timelines and maintained high code
                                  quality standards while meeting client
                                  expectations.
                                </ColoredText>
                              </div>
                            </div>
                          </Collapsible>
                          <Collapsible bracketType="curly" showComma={true}>
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
                                  Developed high-performance, responsive web
                                  applications using ReactJS with focus on user
                                  experience and performance optimization.
                                  Collaborated effectively in Agile Scrum teams
                                  of 4-5 developers, participating in daily
                                  standups, sprint planning, and code reviews.
                                  Contributed to architectural decisions and
                                  implemented best practices for scalable
                                  front-end development.
                                </ColoredText>
                              </div>
                            </div>
                          </Collapsible>
                          <Collapsible bracketType="curly" showComma={true}>
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
                                  August 2021 – August 2022
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
                                  Designed and delivered comprehensive front-end
                                  development curriculum covering modern web
                                  technologies including HTML5, CSS3, JavaScript
                                  ES6+, ReactJS, and version control with GIT.
                                  Mentored students through hands-on projects
                                  and provided guidance for internship
                                  placements. Created engaging learning
                                  materials and practical exercises that
                                  prepared students for real-world development
                                  challenges.
                                </ColoredText>
                              </div>
                            </div>
                          </Collapsible>
                          <Collapsible bracketType="curly" showComma={true}>
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
                                  Ubiquiti
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
                                  Stockholm, Sweden
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
                                  September 2020 – July 2021
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
                                  Contributed to the development of UniFi Portal
                                  and UniFi Network, enterprise-grade networking
                                  management platforms used by millions of users
                                  worldwide. Built reusable component libraries
                                  and maintained high code quality standards
                                  using ReactJS and TypeScript. Collaborated
                                  with cross-functional teams in a fast-paced,
                                  large-scale development environment,
                                  implementing features that directly impacted
                                  user experience and platform performance.
                                </ColoredText>
                              </div>
                            </div>
                          </Collapsible>
                          <Collapsible bracketType="curly" showComma={true}>
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
                                  Ceed Learning
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
                                  Web Developer & Multimedia Designer
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
                                  Johannesburg, South Africa
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
                                  August 2018 – August 2019
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
                                  Designed, developed, and maintained Ceed
                                  Learning's comprehensive website and
                                  e-learning platform, creating an engaging
                                  digital learning environment for students.
                                  Implemented multimedia content integration and
                                  responsive design principles to ensure optimal
                                  user experience across devices. Successfully
                                  managed part-time development responsibilities
                                  alongside full-time teaching duties,
                                  demonstrating strong time management and
                                  multitasking abilities.
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
                                  August 2018 – February 2020
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
                                  Established and developed the front-end
                                  development curriculum from the ground up,
                                  teaching students modern web technologies
                                  including HTML5, CSS3, JavaScript, ReactJS,
                                  and GIT. Supervised student internships and
                                  provided career guidance, helping students
                                  transition into professional development
                                  roles. Created interactive learning
                                  experiences and maintained up-to-date course
                                  content reflecting industry best practices.
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
                        theme={getCurrentTheme()}
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
                        isOpen={true}
                      >
                        <div className="ml-4">
                          <div className="flex items-center">
                            <ColoredText color="blue" theme={getCurrentTheme()}>
                              showOnlyUniversityDegrees
                            </ColoredText>
                            :
                            <select
                              value={blockSettings.education.showOnlyUniversityDegrees.toString()}
                              onChange={(e) =>
                                updateBlockSetting(
                                  "education",
                                  "showOnlyUniversityDegrees",
                                  e.target.value === "true"
                                )
                              }
                              className={`px-2 py-1 rounded text-xs border-2 focus:outline-none ml-2 appearance-none ${
                                settings.editorTheme === "Light"
                                  ? "bg-white text-slate-800 border-slate-300 focus:border-slate-400"
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
                                    ? "bg-white text-slate-800"
                                    : "bg-gray-800 text-gray-200"
                                }
                              >
                                true
                              </option>
                              <option
                                value="false"
                                className={
                                  settings.editorTheme === "Light"
                                    ? "bg-white text-slate-800"
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
                      <Collapsible bracketType="square" isOpen={true}>
                        <div className="ml-4">
                          <Collapsible bracketType="curly" showComma={true}>
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
                                  Bachelor of IT & Media Design
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
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  cumLaude
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="green"
                                  theme={getCurrentTheme()}
                                  autoQuotes={false}
                                >
                                  true
                                </ColoredText>
                              </div>
                            </div>
                          </Collapsible>
                          <Collapsible bracketType="curly" showComma={true}>
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
                                  Bachelor of IT & Education
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
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  cumLaude
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="green"
                                  theme={getCurrentTheme()}
                                  autoQuotes={false}
                                >
                                  true
                                </ColoredText>
                              </div>
                            </div>
                          </Collapsible>
                          <Collapsible bracketType="curly" showComma={true}>
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
                                  Full Stack Development Bootcamp
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
                                  Salt
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
                                  Stockholm, Sweden
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
                                  2020
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
                                  IT & Management
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
                                  ROC de Leijgraaf
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
                                  Veghel, The Netherlands
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
                                  2010 – 2014
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
                        theme={getCurrentTheme()}
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
                        data
                      </ColoredText>
                      :{" "}
                      <Collapsible bracketType="square" isOpen={true}>
                        <div className="ml-4">
                          <Collapsible bracketType="curly" showComma={true}>
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
                                  Ubiquiti Chat Frontend
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
                                  React, TypeScript, Redux, Socket.IO, Sass,
                                  Cypress
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
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  githubUrl
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  https://github.com/yourigruiters/React-Chat-Frontend
                                </ColoredText>
                              </div>
                            </div>
                          </Collapsible>
                          <Collapsible bracketType="curly" showComma={true}>
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
                                  Ubiquiti Chat Backend
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
                                  Express, TypeScript, Socket.IO, Winston,
                                  Mocha, Chai
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
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  githubUrl
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  https://github.com/yourigruiters/React-Chat-Backend
                                </ColoredText>
                              </div>
                            </div>
                          </Collapsible>
                          <Collapsible bracketType="curly" showComma={true}>
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
                                  Full Stack Hangouts
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
                                  React, Node.js, Express, MongoDB
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
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  githubUrl
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  https://github.com/yourigruiters/Full-Stack-Hangouts
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
                                  JavaScript MMORPG
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
                                  JavaScript, HTML5, Canvas, WebSockets
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
                                  Discontinued
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText
                                  color="blue"
                                  theme={getCurrentTheme()}
                                >
                                  githubUrl
                                </ColoredText>
                                :{" "}
                                <ColoredText
                                  color="yellow"
                                  theme={getCurrentTheme()}
                                >
                                  https://github.com/yourigruiters/JS-MMORPG
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
                        theme={getCurrentTheme()}
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
                              Perth, Australia
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
                                  ,
                                </div>
                                <div>
                                  <ColoredText
                                    color="blue"
                                    theme={getCurrentTheme()}
                                  >
                                    instagram
                                  </ColoredText>
                                  :{" "}
                                  <ColoredText
                                    color="yellow"
                                    theme={getCurrentTheme()}
                                  >
                                    https://www.instagram.com/youri.gruiters
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

            <div
              className={`text-xs font-mono break-words overflow-wrap-anywhere ${
                settings.editorTheme === "Light"
                  ? "text-indigo-600"
                  : "text-green-400"
              }`}
            >
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
                    : "z-10 right-0 w-[10%] opacity-50 hover:opacity-70 cursor-pointer transition-opacity duration-200 pointer-events-none"
                }`
              : "border-l border-gray-300"
          }`}
          style={{
            width: isMobile
              ? activeMobilePanel === "right"
                ? "90%"
                : "100%"
              : `${100 - leftWidth}%`,
            ...(isMobile &&
              activeMobilePanel === "left" && { pointerEvents: "auto" }),
          }}
          onClick={
            isMobile && activeMobilePanel === "left"
              ? switchMobilePanel
              : undefined
          }
        >
          {blocks.map((block, index) => {
            const { component: BlockComponent, name: blockName } = block;

            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) {
                    blockRefs.current[blockName] = el;
                  }
                }}
              >
                <BlockComponent
                  settings={settings}
                  blockSettings={blockSettings}
                />
              </div>
            );
          })}

          {/* Copyright Bar */}
          <div
            className={`py-4 px-4 border-t ${
              settings.darkmode
                ? "bg-slate-900 border-slate-700"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className="max-w-4xl mx-auto text-center">
              <p
                className={`text-sm ${
                  settings.darkmode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                © {new Date().getFullYear()} Youri Gruiters. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
