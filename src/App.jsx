import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import NavBar from "./components/NavBar";
import JsonToDartConverter from "./components/JsonToDartConverter";
import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white transition-colors duration-300">
        {/* <ThemeToggle /> */}

        {/* Navbar */}
        <NavBar />

        {/* Page Content */}
        <main className="flex flex-col items-center justify-center px-4 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/converter" element={<JsonToDartConverter />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
