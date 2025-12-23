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
import Story11 from "./pages/Story11";
import Story12 from "./pages/Story12";
import Story13 from "./pages/Story13";
import Story14 from "./pages/Story14";
import Story15 from "./pages/Story15";
import Story16 from "./pages/Story16";
import Story17 from "./pages/Story17";
import Story18 from "./pages/Story18";
import Story19 from "./pages/Story19";
import Story20 from "./pages/Story20";

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-900 flex justify-center font-sans antialiased">
      <div className="w-full max-w-[500px] bg-gray-50 min-h-[calc(100svh-2rem)] my-4 relative shadow-2xl border border-gray-200 ring-8 ring-gray-800">
        <HashRouter>
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
            <Route path="/11" element={<Story11 />} />
            <Route path="/12" element={<Story12 />} />
            <Route path="/13" element={<Story13 />} />
            <Route path="/14" element={<Story14 />} />
            <Route path="/15" element={<Story15 />} />
            <Route path="/16" element={<Story16 />} />
            <Route path="/17" element={<Story17 />} />
            <Route path="/18" element={<Story18 />} />
            <Route path="/19" element={<Story19 />} />
            <Route path="/20" element={<Story20 />} />
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
