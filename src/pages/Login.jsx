import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validName = ["luxmi", "laxmi"].includes(name.toLowerCase().trim());
    const validDate = date === "2025-07-12";

    if (validName && validDate) {
      navigate("/start");
    } else {
      setError(true);
      setTimeout(() => setError(false), 500); // Reset error state after animation
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-50">
      <div
        className={`w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 transition-transform ${
          error
            ? "animate-shake border-2 border-red-400"
            : "border border-gray-100"
        }`}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome</h1>
          <p className="text-gray-500 text-sm mt-2">
            Please verify your details to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-gray-400"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
