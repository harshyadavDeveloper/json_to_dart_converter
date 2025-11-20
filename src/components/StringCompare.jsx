import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { highlightDiff } from "../utils/highlightDiff";

export default function StringCompare() {
  const [str1, setStr1] = useState("");
  const [str2, setStr2] = useState("");
  const [result, setResult] = useState(null);

  const handleCompare = () => {
    if (!str1.trim() || !str2.trim()) {
      toast.error("Please enter both strings");
      return;
    }

    const diff = highlightDiff(str1, str2);
    setResult(diff);

    if (diff.areEqual) {
      toast.success("Strings match! 🎉");
    } else {
      toast.error("Strings do not match ❌");
    }
  };

  const handleClear = () => {
    setStr1("");
    setStr2("");
    setResult(null);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-5 p-2">
      <Toaster position="top-center" />

      {/* Input boxes */}
      <div className="flex gap-4">
        <textarea
          value={str1}
          onChange={(e) => setStr1(e.target.value)}
          placeholder="Enter text 1..."
          className="w-1/2 h-36 p-4 rounded-lg bg-gray-200 dark:bg-gray-800 
          text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 outline-none"
        />

        <textarea
          value={str2}
          onChange={(e) => setStr2(e.target.value)}
          placeholder="Enter text 2..."
          className="w-1/2 h-36 p-4 rounded-lg bg-gray-200 dark:bg-gray-800 
          text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 outline-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleCompare}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Compare
        </button>

        <button
          onClick={handleClear}
          className="px-6 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white 
          rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
        >
          Clear
        </button>
      </div>

      {/* RESULTS */}
      {result && (
        <>
          {result.areEqual ? (
            // 🟢 SUCCESS CONTAINER
            <div className="mt-4 p-4 rounded-lg bg-green-200 dark:bg-green-800 
            text-green-900 dark:text-green-100 border border-green-400 dark:border-green-700">
              <p className="text-center font-semibold text-lg">
                ✅ The two texts are identical!
              </p>
            </div>
          ) : (
            // ❌ DIFFERENCE VIEW
            <div className="flex mt-4 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="w-1/2 p-4 bg-gray-100 dark:bg-gray-900 
              text-gray-900 dark:text-white whitespace-pre-wrap">
                <div
                  dangerouslySetInnerHTML={{ __html: result.left }}
                  className="break-words text-sm"
                />
              </div>

              <div className="w-1/2 p-4 bg-gray-100 dark:bg-gray-900 
              text-gray-900 dark:text-white whitespace-pre-wrap border-l border-gray-300 dark:border-gray-700">
                <div
                  dangerouslySetInnerHTML={{ __html: result.right }}
                  className="break-words text-sm"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
