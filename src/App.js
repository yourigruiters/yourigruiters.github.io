import { useState, useRef, useEffect } from "react";
import IntroBlock from "./Blocks/IntroBlock";
import SkillsBlock from "./Blocks/SkillsBlock";
import WorkBlock from "./Blocks/WorkBlock";
import EducationBlock from "./Blocks/EducationBlock";
import ProjectsBlock from "./Blocks/ProjectsBlock";
import ContactBlock from "./Blocks/ContactBlock";

const App = () => {
  const [leftWidth, setLeftWidth] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const dragStartX = useRef(0);
  const dragStartWidth = useRef(0);

  const snapPoints = [25, 50, 75];
  const snapThreshold = 5; // pixels

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

    // Snap to nearest snap point
    const nearestSnap = snapPoints.reduce((prev, curr) =>
      Math.abs(curr - leftWidth) < Math.abs(prev - leftWidth) ? curr : prev
    );

    if (Math.abs(nearestSnap - leftWidth) <= snapThreshold) {
      setLeftWidth(nearestSnap);
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
        {/* Left Panel - Black with scrollable content */}
        <div
          className="bg-black overflow-y-auto"
          style={{ width: `${leftWidth}%` }}
        >
          <div className="p-8 text-white">
            <h1 className="text-4xl font-bold mb-6">Black Panel Content</h1>
            <div className="space-y-4">
              {Array.from({ length: 50 }, (_, i) => (
                <div key={i} className="p-4 bg-gray-800 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Section {i + 1}
                  </h2>
                  <p className="text-gray-300">
                    This is some sample content for section {i + 1}. Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p className="text-gray-300 mt-2">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resizable Divider */}
        <div
          className="w-1 bg-gray-400 hover:bg-gray-600 cursor-col-resize flex-shrink-0 relative group"
          onMouseDown={handleMouseDown}
        >
          {/* Visual indicator */}
          <div className="absolute inset-y-0 -left-1 -right-1 bg-transparent group-hover:bg-gray-200 opacity-50"></div>

          {/* Drag handle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-8 bg-gray-600 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        {/* Right Panel - White with 6 colored blocks */}
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
