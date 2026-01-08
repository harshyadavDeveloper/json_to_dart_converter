import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import NavBar from "./components/NavBar";
import JsonToDartConverter from "./components/JsonToDartConverter";
import Home from "./pages/Home";
import About from "./pages/About";
import { Toaster } from 'react-hot-toast';
import StringCompare from "./components/StringCompare";
import JsonViewer from "./components/JsonViewerText";
import JsonViewerTabs from "./components/JsonViewerTabs";
import JwtDecoder from "./components/JwtDecoder";
import NotFound from "./pages/NotFound";

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
            <Route path="/string-compare" element={<StringCompare />} />
            <Route path="/json-viewer" element={<JsonViewerTabs />} />
            <Route path="/jwt-decoder" element={<JwtDecoder />} />
            <Route path="*" element={<NotFound />} />


            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}
