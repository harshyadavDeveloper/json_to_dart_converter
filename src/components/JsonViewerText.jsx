import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { formatJson } from "../utils/jsonViewer";

export default function JsonViewer() {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [rawInput, setRawInput] = useState("");
  const [expanded, setExpanded] = useState(true);

  const handleFormat = () => {
    if (!input.trim()) {
      toast.error("Please paste some JSON!");
      return;
    }

    try {
      const pretty = formatJson(input);
      setFormatted(pretty);
      setRawInput(input);
      toast.success("JSON formatted successfully!");
    } catch {
      toast.error("Invalid JSON. Please fix errors.");
    }
  };

  const handleToggleExpand = () => {
    if (!formatted) return;

    try {
      const parsed = JSON.parse(rawInput);
      setExpanded(!expanded);

      const pretty = JSON.stringify(parsed, expanded ? null : 0, expanded ? 2 : 0);
      setFormatted(pretty);
    } catch {
      toast.error("Unexpected error while toggling view.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formatted);
    toast.success("JSON copied!");
  };

  const handleDownload = () => {
    const blob = new Blob([formatted], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-3xl">
      <Toaster position="top-center" />

      {/* Input JSON */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your JSON here..."
        className="w-full h-56 p-4 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleFormat}
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-medium"
        >
          View JSON
        </button>

        {formatted && (
          <button
            onClick={handleToggleExpand}
            className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition text-white font-medium"
          >
            {expanded ? "Collapse All" : "Expand All"}
          </button>
        )}
      </div>

      {/* Output */}
      {formatted && (
        <div className="mt-4 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg border border-gray-300 dark:border-gray-700 transition-colors duration-300">

          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">JSON Output Viewer</h2>

            <div className="flex gap-4">
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

          <pre className="text-sm overflow-x-auto whitespace-pre-wrap max-h-[400px]">
            {formatted}
          </pre>
        </div>
      )}
    </div>
  );
}
