import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MorningYoga from "./pages/MorningYoga";
import Login from "./pages/Login";

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-900 flex justify-center font-sans antialiased">
      <div className="w-full max-w-[500px] bg-gray-50 min-h-screen relative shadow-2xl overflow-y-auto scrollbar-hide">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/start" element={<Home />} />
            <Route path="/morning-yoga" element={<MorningYoga />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
