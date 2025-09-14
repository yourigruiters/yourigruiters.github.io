import { useState, useRef, useEffect } from "react";
import data from "./data.json";

import IntroBlock from "./Blocks/IntroBlock";
import SkillsBlock from "./Blocks/SkillsBlock";
import WorkBlock from "./Blocks/WorkBlock";
import EducationBlock from "./Blocks/EducationBlock";
import ProjectsBlock from "./Blocks/ProjectsBlock";
import ContactBlock from "./Blocks/ContactBlock";

const App = () => {
  const [leftWidth, setLeftWidth] = useState(data.global.portfolioWidth);
  const [isDragging, setIsDragging] = useState(false);
  const [settings, setSettings] = useState(data.global);

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
    // Update the data object
    data.global[key] = value;
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
              placeholder="Search..."
              className="bg-gray-700 text-white px-3 py-1 rounded text-sm border border-gray-600 focus:border-gray-500 focus:outline-none flex-1 max-w-xs"
            />

            <div className="flex items-center gap-4">
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm border border-gray-600 transition-colors">
                CMD
              </button>

              <button className="text-gray-300 hover:text-white text-sm transition-colors">
                Toggle All
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="text-green-400 text-xs font-mono">
              <div className="mb-2">{"{"}</div>

              <div className="ml-4">
                <span className="text-blue-400">"global"</span>: {"{"}
                <div className="ml-4">
                  <div className="flex items-center">
                    <span className="text-blue-400">"portfolioWidth"</span>:
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
                    <span className="text-blue-400">"darkmode"</span>:
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
                    <span className="text-blue-400">"editorTheme"</span>:
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
                    <span className="text-blue-400">"variant"</span>:
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
                <span className="text-blue-400">"intro"</span>: {"{"}
                <div className="ml-4 text-gray-500">
                  <div>
                    <span className="text-blue-400">"headline"</span>:{" "}
                    <span className="text-yellow-400">
                      "{data.intro.headline}"
                    </span>
                    ,
                  </div>
                  <div>
                    <span className="text-blue-400">"subtitle"</span>:{" "}
                    <span className="text-yellow-400">
                      "{data.intro.subtitle}"
                    </span>
                    ,
                  </div>
                  <div>
                    <span className="text-blue-400">"description"</span>:{" "}
                    <span className="text-yellow-400">
                      "{data.intro.description}"
                    </span>
                    ,
                  </div>
                  <div className="text-gray-400">...</div>
                </div>
                <div>{"}"},</div>
              </div>

              <div className="ml-4">
                <span className="text-blue-400">"skills"</span>: {"{"}
                <div className="ml-4 text-gray-500">
                  <div>
                    <span className="text-blue-400">"categories"</span>: [
                  </div>
                  <div className="ml-4 text-gray-400">...</div>
                  <div>],</div>
                </div>
                <div>{"}"},</div>
              </div>

              <div className="ml-4">
                <span className="text-blue-400">"work"</span>: [
              </div>
              <div className="ml-8 text-gray-500">
                <div>{"{"}</div>
                <div className="ml-4 text-gray-400">...</div>
                <div>{"}"},</div>
              </div>
              <div className="ml-4">],</div>
            </div>

            <div className="ml-4">
              <span className="text-blue-400">"experience"</span>: {"{"}
              <div className="ml-4 text-gray-500">
                <div>
                  <span className="text-blue-400">"projects"</span>: [...],
                </div>
                <div>
                  <span className="text-blue-400">"education"</span>: [...],
                </div>
                <div>
                  <span className="text-blue-400">"certifications"</span>: [...]
                </div>
              </div>
              <div>{"}"},</div>
            </div>

            <div className="ml-4">
              <span className="text-blue-400">"contact"</span>: {"{"}
              <div className="ml-4 text-gray-500">
                <div>
                  <span className="text-blue-400">"email"</span>:{" "}
                  <span className="text-yellow-400">
                    "{data.contact.email}"
                  </span>
                  ,
                </div>
                <div>
                  <span className="text-blue-400">"phone"</span>:{" "}
                  <span className="text-yellow-400">
                    "{data.contact.phone}"
                  </span>
                  ,
                </div>
                <div>
                  <span className="text-blue-400">"social"</span>: {"{"}
                </div>
                <div className="ml-4 text-gray-400">...</div>
                <div>{"}"}</div>
              </div>
              <div>{"}"}</div>
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
