import React, { useState } from "react";

export default function LiveDetection() {
  const [isStreaming, setIsStreaming] = useState(false);

  const startStream = () => {
    setIsStreaming(true);
  };

  const stopStream = async () => {
    try {
      await fetch("http://127.0.0.1:8000/stop_live", { method: "POST" });
    } catch (error) {
      console.error("Error stopping stream:", error);
    }
    setIsStreaming(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl font-bold mb-4">🚀 Live Object Detection</h1>

      {/* Control buttons */}
      <div className="flex gap-4 mb-6">
        {!isStreaming ? (
          <button
            onClick={startStream}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-xl shadow-md text-white font-semibold"
          >
            ▶ Start Detection
          </button>
        ) : (
          <button
            onClick={stopStream}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-xl shadow-md text-white font-semibold"
          >
            ⏹ Stop Detection
          </button>
        )}
      </div>

      {/* Stream display */}
      <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-lg border-2 border-gray-700">
        {isStreaming ? (
          <img
            src="http://127.0.0.1:8000/live"
            alt="Live YOLO Detection"
            className="w-full object-contain"
          />
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-400">
            Live detection stopped
          </div>
        )}
      </div>
    </div>
  );
}
