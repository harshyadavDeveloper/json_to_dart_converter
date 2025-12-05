import { useState } from "react";
import JsonViewerText from "./JsonViewerText";
import JsonViewerDiagram from "./JsonViewerDiagram";

export default function JsonViewerTabs() {
  const [activeTab, setActiveTab] = useState("text");

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 dark:border-gray-700 mb-4">
        <button
          onClick={() => setActiveTab("text")}
          className={`
            px-6 py-2 font-medium transition
            ${activeTab === "text"
              ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-400 hover:text-blue-500"}
          `}
        >
          Text View
        </button>

        <button
          onClick={() => setActiveTab("diagram")}
          className={`
            px-6 py-2 font-medium transition
            ${activeTab === "diagram"
              ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-400 hover:text-blue-500"}
          `}
        >
          Diagram View
        </button>
      </div>

      {/* Views */}
      <div className="mt-4">
        {activeTab === "text" && <JsonViewerText />}
        {activeTab === "diagram" && <JsonViewerDiagram />}
      </div>
    </div>
  );
}
