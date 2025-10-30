import { useState } from "react";
import { jsonToDart } from "./utils/jsonToDart";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const [json, setJson] = useState("");
  const [dartCode, setDartCode] = useState("");
  const [className, setClassName] = useState("MyModel");

  const handleConvert = () => {
    setDartCode(jsonToDart(json, className.trim() || "MyModel"));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(dartCode);
    alert("✅ Dart model copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([dartCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${className || "MyModel"}.dart`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white px-4 py-10 transition-colors duration-300">
      {/* <ThemeToggle /> */}

      <h1 className="text-3xl font-bold mb-6 text-center">
        🧩 JSON → Dart Model Converter
      </h1>

      <div className="w-full max-w-3xl flex flex-col gap-4">
        <input
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          placeholder="Enter Dart class name (e.g. UserModel)"
          className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          placeholder="Paste your JSON here..."
          className="w-full h-52 p-4 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          onClick={handleConvert}
          className="mt-2 px-8 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
        >
          Convert
        </button>

        {dartCode && (
          <div className="mt-6 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg border border-gray-300 dark:border-gray-700 transition-colors duration-300">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Generated Dart Model:</h2>
              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Copy
                </button>
                <button
                  onClick={handleDownload}
                  className="text-sm text-green-500 hover:underline"
                >
                  Download
                </button>
              </div>
            </div>

            <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
              {dartCode}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
