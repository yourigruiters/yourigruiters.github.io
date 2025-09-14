import { useState, useRef, useEffect } from "react";

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

  return (
    <div className="h-screen w-screen overflow-hidden" ref={containerRef}>
      <div className="flex h-full">
        {/* Left Panel - Black */}
        <div
          className="bg-black flex items-center justify-center"
          style={{ width: `${leftWidth}%` }}
        >
          <div className="text-white text-2xl font-bold">
            Left Panel ({Math.round(leftWidth)}%)
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

        {/* Right Panel - White */}
        <div
          className="bg-white flex items-center justify-center border-l border-gray-300"
          style={{ width: `${100 - leftWidth}%` }}
        >
          <div className="text-black text-2xl font-bold">
            Right Panel ({Math.round(100 - leftWidth)}%)
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
