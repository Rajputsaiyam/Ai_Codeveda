// import React, { useEffect, useState } from "react";

// export default function HistoryPage() {
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("history")) || [];
//     setHistory(stored);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-6">
//       <h1 className="text-3xl font-bold mb-6 text-blue-400">Detection History</h1>

//       {history.length === 0 ? (
//         <p className="text-gray-400">No history found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {history.map((item) => (
//             <div
//               key={item.id}
//               className="bg-gray-900/70 rounded-lg border border-gray-800 p-4 shadow-lg"
//             >
//               <img
//                 src={item.preview}
//                 alt="History preview"
//                 className="w-full h-48 object-contain border border-gray-700 rounded-md mb-3"
//               />
//               <div className="space-y-2">
//                 {item.predictions.map((det, idx) => (
//                   <div
//                     key={idx}
//                     className="flex justify-between text-sm bg-gray-800/50 p-2 rounded"
//                   >
//                     <span className="text-blue-300">{det.class}</span>
//                     <span className="text-green-400 font-mono">
//                       {(det.confidence * 100).toFixed(1)}%
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(stored);
  }, []);

  // Function to clear history
  const clearHistory = () => {
    localStorage.removeItem("history");
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-400">Detection History</h1>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg shadow-md transition"
          >
            Clear History
          </button>
        )}
      </div>

      {/* Content Section */}
      {history.length === 0 ? (
        <p className="text-gray-400">No history found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900/70 rounded-lg border border-gray-800 p-5 shadow-xl"
            >
              {/* Image Section */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-blue-300 mb-2">
                  Uploaded Image
                </h2>
                <img
                  src={item.preview}
                  alt="History preview"
                  className="w-full h-52 object-contain border border-gray-700 rounded-md"
                />
              </div>

              {/* Predictions Section */}
              <div>
                <h2 className="text-lg font-semibold text-green-300 mb-2">
                  Predictions
                </h2>
                <div className="space-y-2">
                  {item.predictions.map((det, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-sm bg-gray-800/60 p-2 rounded-lg"
                    >
                      <span className="text-blue-200">{det.class}</span>
                      <span className="text-green-400 font-mono">
                        {(det.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra Info Section */}
              {item.timestamp && (
                <p className="mt-4 text-xs text-gray-500">
                  Detected on: {new Date(item.timestamp).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
