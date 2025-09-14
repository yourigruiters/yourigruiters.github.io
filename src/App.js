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
                      className="bg-gray-800 text-green-400 px-2 py-1 rounded text-xs border border-gray-600 focus:border-gray-500 focus:outline-none ml-2 w-16"
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
                      className="bg-gray-800 text-green-400 px-2 py-1 rounded text-xs border border-gray-600 focus:border-gray-500 focus:outline-none ml-2"
                    >
                      <option value="true">true</option>
                      <option value="false">false</option>
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
                      className="bg-gray-800 text-green-400 px-2 py-1 rounded text-xs border border-gray-600 focus:border-gray-500 focus:outline-none ml-2"
                    >
                      <option value="Dark">"Dark"</option>
                      <option value="Light">"Light"</option>
                    </select>
                    ,
                  </div>

                  <div className="flex items-center">
                    <ColoredText color="blue">"variant"</ColoredText>:
                    <select
                      value={settings.variant}
                      onChange={(e) => updateSetting("variant", e.target.value)}
                      className="bg-gray-800 text-green-400 px-2 py-1 rounded text-xs border border-gray-600 focus:border-gray-500 focus:outline-none ml-2"
                    >
                      <option value="Teacher">"Teacher"</option>
                      <option value="Developer">"Developer"</option>
                      <option value="Combined">"Combined"</option>
                    </select>
                  </div>
                </div>
                <div>{"}"},</div>
              </div>

              <div className="ml-4">
                <Collapsible
                  bracketType="curly"
                  showComma={true}
                  label={<ColoredText color="blue">"intro"</ColoredText>}
                >
                  <div className="ml-4">
                    <div>
                      <ColoredText color="blue">"headline"</ColoredText>:{" "}
                      <ColoredText color="yellow">
                        "Hello, I'm John Doe"
                      </ColoredText>
                      ,
                    </div>
                    <div>
                      <ColoredText color="blue">"subtitle"</ColoredText>:{" "}
                      <ColoredText color="yellow">
                        "Full Stack Developer & Problem Solver"
                      </ColoredText>
                      ,
                    </div>
                    <div>
                      <ColoredText color="blue">"description"</ColoredText>:{" "}
                      <ColoredText color="yellow">
                        "I create beautiful, functional web applications that
                        solve real-world problems. With expertise in both
                        frontend and backend development, I bring ideas to life
                        through code."
                      </ColoredText>
                      ,
                    </div>
                    <div>
                      <ColoredText color="gray">...</ColoredText>
                    </div>
                  </div>
                </Collapsible>
              </div>

              <div className="ml-4">
                <Collapsible
                  bracketType="curly"
                  showComma={true}
                  label={<ColoredText color="blue">"skills"</ColoredText>}
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
                          <ColoredText color="yellow">"Frontend"</ColoredText>,
                          <ColoredText color="yellow">"Backend"</ColoredText>,
                          <ColoredText color="yellow">"DevOps"</ColoredText>
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
                          <ColoredText color="yellow">"React"</ColoredText>,
                          <ColoredText color="yellow">"Node.js"</ColoredText>,
                          <ColoredText color="yellow">"Python"</ColoredText>
                        </div>
                      </Collapsible>
                    </div>
                  </div>
                </Collapsible>
              </div>

              <div className="ml-4">
                <Collapsible
                  bracketType="square"
                  showComma={true}
                  label={<ColoredText color="blue">"work"</ColoredText>}
                >
                  <div className="ml-4">
                    <Collapsible bracketType="curly" showComma={true}>
                      <div className="ml-4">
                        <div>
                          <ColoredText color="blue">"company"</ColoredText>:{" "}
                          <ColoredText color="yellow">"Tech Corp"</ColoredText>,
                        </div>
                        <div>
                          <ColoredText color="blue">"position"</ColoredText>:{" "}
                          <ColoredText color="yellow">
                            "Senior Developer"
                          </ColoredText>
                          ,
                        </div>
                        <div>
                          <ColoredText color="blue">"duration"</ColoredText>:{" "}
                          <ColoredText color="yellow">"2020-2023"</ColoredText>
                        </div>
                      </div>
                    </Collapsible>
                    <Collapsible bracketType="curly">
                      <div className="ml-4">
                        <div>
                          <ColoredText color="blue">"company"</ColoredText>:{" "}
                          <ColoredText color="yellow">"StartupXYZ"</ColoredText>
                          ,
                        </div>
                        <div>
                          <ColoredText color="blue">"position"</ColoredText>:{" "}
                          <ColoredText color="yellow">
                            "Full Stack Developer"
                          </ColoredText>
                          ,
                        </div>
                        <div>
                          <ColoredText color="blue">"duration"</ColoredText>:{" "}
                          <ColoredText color="yellow">"2018-2020"</ColoredText>
                        </div>
                      </div>
                    </Collapsible>
                  </div>
                </Collapsible>
              </div>

              <div className="ml-4">
                <Collapsible
                  bracketType="curly"
                  label={<ColoredText color="blue">"contact"</ColoredText>}
                >
                  <div className="ml-4">
                    <div>
                      <ColoredText color="blue">"email"</ColoredText>:{" "}
                      <ColoredText color="yellow">
                        "john.doe@example.com"
                      </ColoredText>
                      ,
                    </div>
                    <div>
                      <ColoredText color="blue">"phone"</ColoredText>:{" "}
                      <ColoredText color="yellow">
                        "+1 (555) 123-4567"
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
                            <ColoredText color="blue">"github"</ColoredText>:{" "}
                            <ColoredText color="yellow">
                              "github.com/johndoe"
                            </ColoredText>
                            ,
                          </div>
                          <div>
                            <ColoredText color="blue">"linkedin"</ColoredText>:{" "}
                            <ColoredText color="yellow">
                              "linkedin.com/in/johndoe"
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
          className="overflow-y-auto border-l border-gray-300"
          style={{ width: `${100 - leftWidth}%` }}
        >
          {blocks.map((BlockComponent, index) => (
            <BlockComponent key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
