import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MorningYoga from "./pages/MorningYoga";
import Login from "./pages/Login";

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-900 flex justify-center font-sans antialiased">
      <div className="w-full max-w-[500px] bg-gray-50 h-[calc(100vh-2rem)] my-4 rounded-3xl relative shadow-2xl overflow-y-auto scrollbar-hide border border-gray-200 ring-8 ring-gray-800">
        <HashRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/start" element={<Home />} />
            <Route path="/morning-yoga" element={<MorningYoga />} />
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
