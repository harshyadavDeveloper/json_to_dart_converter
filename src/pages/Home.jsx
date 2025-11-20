import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500 px-6">
      {/* Animated gradient background blob */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 opacity-20 rounded-full blur-3xl animate-pulse"></div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          DevTools by Harsh
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          A lightweight suite of tools for developers — convert JSON to Dart models, visualize data, compare text, and more — all in one place.
        </p>

        <Link
          to="/converter"
          className="px-8 py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
        >
          🚀 Start Converting
        </Link>
      </motion.div>

      {/* Tools Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full z-10"
      >
        {[
          {
            title: "JSON → Dart Converter",
            desc: "Instantly create Dart models with null safety.",
            link: "/converter",
          },
          {
            title: "JSON Viewer (Coming Soon)",
            desc: "Format, view, and navigate complex JSON data.",
            link: "#",
          },
          {
            title: "Text Compare (Coming Soon)",
            desc: "Compare two code snippets or text blocks visually.",
            link: "/string-compare",
          },
        ].map((tool, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all cursor-pointer"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {tool.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">{tool.desc}</p>
            {tool.link !== "#" ? (
              <Link
                to={tool.link}
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                Open →
              </Link>
            ) : (
              <span className="text-gray-400 italic">Coming soon</span>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-sm text-gray-500 dark:text-gray-400 z-10">
        Built with ❤️ using React + Tailwind + Framer Motion
      </footer>
    </div>
  );
}
