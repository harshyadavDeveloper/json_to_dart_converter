import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import JsonCodeBlock from "../components/JsonCodeBlock";

import { decodeJwt } from "../utils/jwtDecoder";

export default function JwtDecoder() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState(null);

  const handleDecode = () => {
    if (!token.trim()) {
      toast.error("Please paste a JWT token");
      return;
    }

    try {
      const result = decodeJwt(token.trim());
      setDecoded(result);
    } catch (error) {
      setDecoded(null);
      toast.error(error.message || "Invalid JWT token");
    }
  };

  const handleCopy = (data) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-3xl">
      <Toaster position="top-center" />

      <textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Paste JWT token here..."
        className="w-full h-32 p-4 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
      />

      <button
        onClick={handleDecode}
        className="px-8 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-medium"
      >
        Decode
      </button>

      {decoded && (
        <div className="mt-6 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg border border-gray-300 dark:border-gray-700 transition-colors duration-300 space-y-4">
          {/* Header */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Header</h2>
              <button
                onClick={() => handleCopy(decoded.header)}
                className="text-sm text-blue-500 hover:underline"
              >
                Copy
              </button>
            </div>
            <JsonCodeBlock data={decoded.header} />

          </div>

          {/* Payload */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Payload</h2>
              <button
                onClick={() => handleCopy(decoded.payload)}
                className="text-sm text-blue-500 hover:underline"
              >
                Copy
              </button>
            </div>
           <JsonCodeBlock data={decoded.payload} />

          </div>

          {/* Expiry */}
          {decoded.expiry && (
            <div
              className={`p-3 rounded-lg text-sm ${
                decoded.expired
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              }`}
            >
              Expiry: {decoded.expiry.toLocaleString()}
              <br />
              Status: {decoded.expired ? "Expired" : "Valid"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
