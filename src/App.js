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
    const newWidth = Math.max(
      10,
      Math.min(90, dragStartWidth.current + deltaPercentage)
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

  // Block components
  const blocks = [
    IntroBlock,
    SkillsBlock,
    WorkBlock,
    EducationBlock,
    ProjectsBlock,
    ContactBlock,
  ];

  return (
    <div className="h-screen w-screen overflow-hidden" ref={containerRef}>
      <div className="flex h-full">
        <div
          className="bg-black flex flex-col"
          style={{ width: `${leftWidth}%` }}
        >
          <div className="bg-gray-800 border-b border-gray-700 p-3 flex justify-between items-center gap-4 flex-shrink-0">
            <input
              type="text"
              placeholder="Command..."
              className="bg-gray-700 text-white px-3 py-1 rounded text-sm border border-gray-600 focus:border-gray-500 focus:outline-none flex-1 max-w-xs"
            />

            <div className="flex items-center gap-4">
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm border border-gray-600 transition-colors">
                Toggle all
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="text-green-400 text-xs font-mono">
              <div className="mb-2">{"{"}</div>

              <div className="ml-4">
                <ColoredText color="blue">"global"</ColoredText>: {"{"}
                <div className="ml-4">
                  <div className="flex items-center">
                    <ColoredText color="blue">"portfolioWidth"</ColoredText>:
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
                      className="bg-gray-800 text-gray-200 px-2 py-1 rounded text-xs border border-gray-600 focus:border-gray-500 focus:outline-none ml-2 w-16"
                    />
                    ,
                  </div>

                  <div className="flex items-center">
                    <ColoredText color="blue">"darkmode"</ColoredText>:
                    <select
                      value={settings.darkmode.toString()}
                      onChange={(e) =>
                        updateSetting("darkmode", e.target.value === "true")
                      }
                      className="bg-gray-800 text-gray-200 px-2 py-1 rounded text-xs border-2 border-gray-600 focus:border-gray-500 focus:outline-none ml-2 appearance-none"
                      style={{
                        backgroundImage: "none",
                        borderImage: "none",
                        boxShadow: "none",
                        outline: "none",
                      }}
                    >
                      <option
                        value="true"
                        className="bg-gray-800 text-gray-200"
                      >
                        true
                      </option>
                      <option
                        value="false"
                        className="bg-gray-800 text-gray-200"
                      >
                        false
                      </option>
                    </select>
                    ,
                  </div>

                  <div className="flex items-center">
                    <ColoredText color="blue">"editorTheme"</ColoredText>:
                    <select
                      value={settings.editorTheme}
                      onChange={(e) =>
                        updateSetting("editorTheme", e.target.value)
                      }
                      className="bg-gray-800 text-gray-200 px-2 py-1 rounded text-xs border-2 border-gray-600 focus:border-gray-500 focus:outline-none ml-2 appearance-none"
                      style={{
                        backgroundImage: "none",
                        borderImage: "none",
                        boxShadow: "none",
                        outline: "none",
                      }}
                    >
                      <option
                        value="Dark"
                        className="bg-gray-800 text-gray-200"
                      >
                        Dark
                      </option>
                      <option
                        value="Light"
                        className="bg-gray-800 text-gray-200"
                      >
                        Light
                      </option>
                    </select>
                    ,
                  </div>

                  <div className="flex items-center">
                    <ColoredText color="blue">"variant"</ColoredText>:
                    <select
                      value={settings.variant}
                      onChange={(e) => updateSetting("variant", e.target.value)}
                      className="bg-gray-800 text-gray-200 px-2 py-1 rounded text-xs border-2 border-gray-600 focus:border-gray-500 focus:outline-none ml-2 appearance-none"
                      style={{
                        backgroundImage: "none",
                        borderImage: "none",
                        boxShadow: "none",
                        outline: "none",
                      }}
                    >
                      <option
                        value="Teacher"
                        className="bg-gray-800 text-gray-200"
                      >
                        Teacher
                      </option>
                      <option
                        value="Developer"
                        className="bg-gray-800 text-gray-200"
                      >
                        Developer
                      </option>
                      <option
                        value="Combined"
                        className="bg-gray-800 text-gray-200"
                      >
                        Combined
                      </option>
                    </select>
                  </div>
                </div>
                <div>{"}"},</div>
              </div>

              <div className="ml-4">
                <Collapsible
                  bracketType="curly"
                  showComma={true}
                  label={
                    <ColoredText
                      color="blue"
                      linkTo="intro"
                      onNavigate={navigateToBlock}
                    >
                      "intro"
                    </ColoredText>
                  }
                >
                  <div className="ml-4">
                    <div>
                      <ColoredText color="blue">"headline"</ColoredText>:{" "}
                      <ColoredText color="yellow">
                        "Hello, I'm Youri Gruiters"
                      </ColoredText>
                      ,
                    </div>
                    <div>
                      <ColoredText color="blue">"subtitle"</ColoredText>:{" "}
                      <ColoredText color="yellow">
                        "Front-end Developer & Educator"
                      </ColoredText>
                      ,
                    </div>
                    <div>
                      <ColoredText color="blue">"description"</ColoredText>:{" "}
                      <ColoredText color="yellow">
                        "Motivated and adaptable individual with a strong
                        interest in personal and professional development. Holds
                        a Bachelor's degree in IT & Media Design as well as IT &
                        Education, blending technical knowledge with strong
                        communication skills. Brings over 7 years of experience
                        in development and 2.5 years in teaching."
                      </ColoredText>
                    </div>
                  </div>
                </Collapsible>
              </div>

              <div className="ml-4">
                <Collapsible
                  bracketType="curly"
                  showComma={true}
                  label={
                    <ColoredText
                      color="blue"
                      linkTo="skills"
                      onNavigate={navigateToBlock}
                    >
                      "skills"
                    </ColoredText>
                  }
                >
                  <div className="ml-4">
                    <div>
                      <Collapsible
                        bracketType="square"
                        showComma={true}
                        label={
                          <ColoredText color="blue">"categories"</ColoredText>
                        }
                      >
                        <div className="ml-4">
                          <div>
                            <ColoredText color="yellow">
                              "Front-end Development"
                            </ColoredText>
                            ,
                          </div>
                          <div>
                            <ColoredText color="yellow">
                              "Teaching & Education"
                            </ColoredText>
                            ,
                          </div>
                          <div>
                            <ColoredText color="yellow">
                              "Project Management"
                            </ColoredText>
                            ,
                          </div>
                          <div>
                            <ColoredText color="yellow">
                              "Communication"
                            </ColoredText>
                          </div>
                        </div>
                      </Collapsible>
                    </div>
                    <div>
                      <Collapsible
                        bracketType="square"
                        label={
                          <ColoredText color="blue">"technologies"</ColoredText>
                        }
                      >
                        <div className="ml-4">
                          <div>
                            <ColoredText color="yellow">"ReactJS"</ColoredText>,
                          </div>
                          <div>
                            <ColoredText color="yellow">"VueJS"</ColoredText>,
                          </div>
                          <div>
                            <ColoredText color="yellow">
                              "TypeScript"
                            </ColoredText>
                            ,
                          </div>
                          <div>
                            <ColoredText color="yellow">"CraftCMS"</ColoredText>
                            ,
                          </div>
                          <div>
                            <ColoredText color="yellow">
                              "HTML/CSS/JavaScript"
                            </ColoredText>
                            ,
                          </div>
                          <div>
                            <ColoredText color="yellow">"GIT"</ColoredText>
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
                  label={
                    <ColoredText
                      color="blue"
                      linkTo="work"
                      onNavigate={navigateToBlock}
                    >
                      "work"
                    </ColoredText>
                  }
                >
                  <div className="ml-4">
                    <div>
                      <ColoredText color="blue">"props"</ColoredText>:{" "}
                      <Collapsible
                        bracketType="curly"
                        showComma={true}
                        isOpen={true}
                      >
                        <div className="ml-4">
                          <div>
                            <ColoredText color="blue">"show"</ColoredText>:{" "}
                            <ColoredText color="yellow">true</ColoredText>,
                          </div>
                          <div>
                            <ColoredText color="blue">"amount"</ColoredText>:{" "}
                            <ColoredText color="yellow">3</ColoredText>
                          </div>
                        </div>
                      </Collapsible>
                    </div>
                    <div>
                      <ColoredText color="blue">"data"</ColoredText>:{" "}
                      <Collapsible bracketType="square" isOpen={false}>
                        <div className="ml-4">
                          <Collapsible
                            bracketType="curly"
                            showComma={true}
                            isOpen={true}
                          >
                            <div className="ml-4">
                              <div>
                                <ColoredText color="blue">
                                  "company"
                                </ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "Happy Horizon B.V."
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">
                                  "position"
                                </ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "Front-end Developer"
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">
                                  "location"
                                </ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "Eindhoven, The Netherlands"
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">
                                  "duration"
                                </ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "April 2023 – June 2025"
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">
                                  "description"
                                </ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "Managed multiple projects simultaneously,
                                  coordinating directly with clients. Delivered
                                  dynamic development work using CraftCMS, VueJS
                                  and ReactJS frameworks."
                                </ColoredText>
                              </div>
                            </div>
                          </Collapsible>
                          <Collapsible
                            bracketType="curly"
                            showComma={true}
                            isOpen={true}
                          >
                            <div className="ml-4">
                              <div>
                                <ColoredText color="blue">
                                  "company"
                                </ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "System4"
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">
                                  "position"
                                </ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "Front-end Developer"
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">
                                  "location"
                                </ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "Uden, The Netherlands"
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">
                                  "duration"
                                </ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "September 2022 – April 2023"
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">
                                  "description"
                                </ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "Specialized in building responsive web
                                  applications using ReactJS. Collaborated in
                                  Agile Scrum teams of 4-5 developers."
                                </ColoredText>
                              </div>
                            </div>
                          </Collapsible>
                          <Collapsible bracketType="curly">
                            <div className="ml-4">
                              <div>
                                <ColoredText color="blue">
                                  "company"
                                </ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "ROC Nijmegen"
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">
                                  "position"
                                </ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "Front-end Development Teacher"
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">
                                  "location"
                                </ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "Nijmegen, The Netherlands"
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">
                                  "duration"
                                </ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "August 2021 – August 2022, August 2018 –
                                  February 2020"
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">
                                  "description"
                                </ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "Delivered courses on HTML, CSS, JavaScript,
                                  ReactJS, and GIT. Served as mentor and
                                  internship supervisor for students."
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
                  label={
                    <ColoredText
                      color="blue"
                      linkTo="education"
                      onNavigate={navigateToBlock}
                    >
                      "education"
                    </ColoredText>
                  }
                >
                  <div className="ml-4">
                    <div>
                      <ColoredText color="blue">"props"</ColoredText>:{" "}
                      <Collapsible
                        bracketType="curly"
                        showComma={true}
                        isOpen={true}
                      >
                        <div className="ml-4">
                          <div>
                            <ColoredText color="blue">"show"</ColoredText>:{" "}
                            <ColoredText color="yellow">true</ColoredText>,
                          </div>
                          <div>
                            <ColoredText color="blue">"amount"</ColoredText>:{" "}
                            <ColoredText color="yellow">2</ColoredText>
                          </div>
                        </div>
                      </Collapsible>
                    </div>
                    <div>
                      <ColoredText color="blue">"data"</ColoredText>:{" "}
                      <Collapsible bracketType="square" isOpen={false}>
                        <div className="ml-4">
                          <Collapsible
                            bracketType="curly"
                            showComma={true}
                            isOpen={true}
                          >
                            <div className="ml-4">
                              <div>
                                <ColoredText color="blue">"degree"</ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "Bachelor of IT & Media Design (cum laude)"
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">
                                  "university"
                                </ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "Fontys University of Applied Sciences"
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">
                                  "location"
                                </ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "Eindhoven, The Netherlands"
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">
                                  "duration"
                                </ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "2014 – 2018"
                                </ColoredText>
                              </div>
                            </div>
                          </Collapsible>
                          <Collapsible bracketType="curly">
                            <div className="ml-4">
                              <div>
                                <ColoredText color="blue">"degree"</ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "Bachelor of IT & Education (cum laude)"
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">
                                  "university"
                                </ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "Fontys University of Applied Sciences"
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">
                                  "location"
                                </ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "Eindhoven, The Netherlands"
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">
                                  "duration"
                                </ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "2015 – 2018"
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
                  label={
                    <ColoredText
                      color="blue"
                      linkTo="projects"
                      onNavigate={navigateToBlock}
                    >
                      "projects"
                    </ColoredText>
                  }
                >
                  <div className="ml-4">
                    <div>
                      <ColoredText color="blue">"props"</ColoredText>:{" "}
                      <Collapsible
                        bracketType="curly"
                        showComma={true}
                        isOpen={true}
                      >
                        <div className="ml-4">
                          <div>
                            <ColoredText color="blue">"show"</ColoredText>:{" "}
                            <ColoredText color="yellow">true</ColoredText>,
                          </div>
                          <div>
                            <ColoredText color="blue">"amount"</ColoredText>:{" "}
                            <ColoredText color="yellow">2</ColoredText>
                          </div>
                        </div>
                      </Collapsible>
                    </div>
                    <div>
                      <ColoredText color="blue">"data"</ColoredText>:{" "}
                      <Collapsible bracketType="square" isOpen={false}>
                        <div className="ml-4">
                          <Collapsible
                            bracketType="curly"
                            showComma={true}
                            isOpen={true}
                          >
                            <div className="ml-4">
                              <div>
                                <ColoredText color="blue">"name"</ColoredText>:{" "}
                                <ColoredText color="yellow">
                                  "Portfolio Website"
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">"tech"</ColoredText>:{" "}
                                <ColoredText color="yellow">
                                  "React, Tailwind"
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">"status"</ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "Completed"
                                </ColoredText>
                              </div>
                            </div>
                          </Collapsible>
                          <Collapsible bracketType="curly">
                            <div className="ml-4">
                              <div>
                                <ColoredText color="blue">"name"</ColoredText>:{" "}
                                <ColoredText color="yellow">
                                  "E-commerce App"
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">"tech"</ColoredText>:{" "}
                                <ColoredText color="yellow">
                                  "Node.js, MongoDB"
                                </ColoredText>
                                ,
                              </div>
                              <div>
                                <ColoredText color="blue">"status"</ColoredText>
                                :{" "}
                                <ColoredText color="yellow">
                                  "In Progress"
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
                  label={
                    <ColoredText
                      color="blue"
                      linkTo="contact"
                      onNavigate={navigateToBlock}
                    >
                      "contact"
                    </ColoredText>
                  }
                >
                  <div className="ml-4">
                    <div>
                      <ColoredText color="blue">"email"</ColoredText>:{" "}
                      <ColoredText color="yellow">
                        "youriroc@gmail.com"
                      </ColoredText>
                      ,
                    </div>
                    <div>
                      <ColoredText color="blue">"phone"</ColoredText>:{" "}
                      <ColoredText color="yellow">"0424513249"</ColoredText>,
                    </div>
                    <div>
                      <ColoredText color="blue">"location"</ColoredText>:{" "}
                      <ColoredText color="yellow">
                        "Brisbane, Australia"
                      </ColoredText>
                      ,
                    </div>
                    <div>
                      <Collapsible
                        bracketType="curly"
                        label={<ColoredText color="blue">"social"</ColoredText>}
                      >
                        <div className="ml-4">
                          <div>
                            <ColoredText color="blue">"linkedin"</ColoredText>:{" "}
                            <ColoredText color="yellow">
                              "https://nl.linkedin.com/in/yourigruiters"
                            </ColoredText>
                          </div>
                        </div>
                      </Collapsible>
                    </div>
                  </div>
                </Collapsible>
              </div>
            </div>

            <div>{"}"}</div>
          </div>
        </div>

        <div
          className="w-1 bg-gray-400 hover:bg-gray-600 cursor-col-resize flex-shrink-0 relative group"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute inset-y-0 -left-1 -right-1 bg-transparent group-hover:bg-gray-200 opacity-50"></div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-8 bg-gray-600 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <div
          ref={rightPanelRef}
          className="overflow-y-auto border-l border-gray-300"
          style={{ width: `${100 - leftWidth}%` }}
        >
          {blocks.map((BlockComponent, index) => {
            const blockName = BlockComponent.name
              .toLowerCase()
              .replace("block", "");
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
