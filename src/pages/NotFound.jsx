import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] px-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-md"
      >
        Oops! The page you are looking for doesn’t exist or has been moved.
      </motion.p>

      <Link
        to="/"
        className="mt-6 px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
      >
        ⬅ Back to Home
      </Link>
    </div>
  );
}
