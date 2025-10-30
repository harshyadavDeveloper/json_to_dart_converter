import { useState } from "react";
import { jsonToDart } from "../utils/jsonToDart";
import toast, { Toaster } from "react-hot-toast";

export default function JsonToDartConverter() {
  const [json, setJson] = useState("");
  const [rawJson, setRawJson] = useState("");
  const [dartCode, setDartCode] = useState("");
  const [className, setClassName] = useState("MyModel");
  const [formatJson, setFormatJson] = useState(false);

  const handleJsonChange = (e) => {
    const value = e.target.value;
    setJson(value);
    setRawJson(value);
  };

  const handleFormatToggle = () => {
    if (!json.trim()) {
      toast.error("Please paste some JSON first!");
      return; // 🚫 stop toggle from changing
    }

    if (!formatJson) {
      try {
        const formatted = JSON.stringify(JSON.parse(json), null, 2);
        setJson(formatted);
        setFormatJson(true);
      } catch {
        toast.error("Invalid JSON. Please fix it before formatting.");
      }
    } else {
      setJson(rawJson);
      setFormatJson(false);
    }
  };

  const handleConvert = () => {
    if (!json.trim()) {
      toast.error("Please enter JSON before converting!");
      return;
    }
    setDartCode(jsonToDart(json, className.trim() || "MyModel"));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(dartCode);
    toast.success("Dart model copied to clipboard!");
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
    <div className="flex flex-col gap-4 w-full max-w-3xl">
      <Toaster position="top-center" />

      <input
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        placeholder="Enter Dart class name (e.g. UserModel)"
        className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <textarea
        value={json}
        onChange={handleJsonChange}
        placeholder="Paste your JSON here..."
        className="w-full h-52 p-4 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {/* ✅ Format checkbox */}
      <label className="flex items-center gap-2 text-sm select-none">
        <input
          type="checkbox"
          checked={formatJson}
          onChange={handleFormatToggle}
          className="w-4 h-4 accent-blue-600 cursor-pointer"
        />
        <span>Format JSON before converting</span>
      </label>

      <button
        onClick={handleConvert}
        className="mt-2 px-8 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-medium"
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
  );
}
