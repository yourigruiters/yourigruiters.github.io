import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Story1 from "./pages/Story1";
import Story2 from "./pages/Story2";
import Story3 from "./pages/Story3";
import Story4 from "./pages/Story4";
import Story5 from "./pages/Story5";
import Story6 from "./pages/Story6";
import Story7 from "./pages/Story7";
import Story8 from "./pages/Story8";
import Story9 from "./pages/Story9";
import Story10 from "./pages/Story10";

import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-900 flex justify-center font-sans antialiased">
      <div className="w-full max-w-[500px] bg-gray-50 min-h-[calc(100svh-2rem)] my-4 relative shadow-2xl border border-gray-200 ring-8 ring-gray-800">
        <HashRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/1" element={<Story1 />} />
            <Route path="/2" element={<Story2 />} />
            <Route path="/3" element={<Story3 />} />
            <Route path="/4" element={<Story4 />} />
            <Route path="/5" element={<Story5 />} />
            <Route path="/6" element={<Story6 />} />
            <Route path="/7" element={<Story7 />} />
            <Route path="/8" element={<Story8 />} />
            <Route path="/9" element={<Story9 />} />
            <Route path="/10" element={<Story10 />} />
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
