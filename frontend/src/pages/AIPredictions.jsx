

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Image as ImageIcon,
  Video,
  Play,
  Pause,
  Stars,
  Rocket,
  Trash2,
  Download,
  History,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// ✅ Detection Results Component (Canvas with Bounding Boxes + Text List)
function DetectionResults({ preview, predictions }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!preview || predictions.length === 0) return;

    const img = new Image();
    img.src = preview;

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");

      // Match canvas size to image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Draw bounding boxes
      predictions.forEach((det) => {
        const [xMin, yMin, xMax, yMax] = det.box;
        const width = xMax - xMin;
        const height = yMax - yMin;

        // 🔴 Box in RED
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.strokeRect(xMin, yMin, width, height);

        // Label
        const label = `${det.class} (${(det.confidence * 100).toFixed(1)}%)`;
        ctx.font = "16px Arial";
        ctx.fillStyle = "red";
        ctx.fillText(label, xMin, yMin > 20 ? yMin - 5 : yMin + 15);
      });
    };
  }, [preview, predictions]);

  // ✅ Download canvas as image
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "detection_result.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  if (!predictions.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <p>No detections yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-4 space-y-6 w-full">
      {/* Canvas with bounding boxes */}
      <canvas
        ref={canvasRef}
        className="max-w-full border border-gray-700 rounded-lg"
      />

      {/* Buttons under canvas */}
      <div className="flex gap-4 w-full justify-center">
        <button
          onClick={handleDownload}
          className="py-2 px-4 rounded-lg bg-green-600 hover:bg-green-500 text-white flex items-center justify-center gap-2 shadow-md"
        >
          <Download className="h-5 w-5" />
          Download Result
        </button>
      </div>

      {/* Text list of detections */}
      <div className="w-full space-y-3">
        {predictions.map((det, idx) => (
          <div
            key={idx}
            className="bg-gray-800/50 p-3 rounded-lg border-l-4 border-red-500 flex justify-between"
          >
            <span className="text-red-300 font-semibold">{det.class}</span>
            <span className="text-green-400 font-mono">
              {(det.confidence * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AIPredictions() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [preview, setPreview] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null);
  const navigate = useNavigate();

  // File selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setFileType(file.type.startsWith("video/") ? "video" : "image");
    setPreview(URL.createObjectURL(file));
    setPredictions([]);
  };

  // Call backend
const handleAnalyze = async () => {
  if (!selectedFile) return alert("Please upload a file first!");

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    setLoading(true);
    const endpoint =
      fileType === "video"
        ? `${import.meta.env.API_BASE_URL}/predict/video`
        : `${import.meta.env.API_BASE_URL}/predict/image`;

    const res = await axios.post(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setPredictions(res.data.detections || []);
  } catch (err) {
    console.error("Upload failed:", err);
    alert("Prediction failed! Check backend logs.");
  } finally {
    setLoading(false);
  }
};


  // Save result to history
  useEffect(() => {
    if (predictions.length > 0 && preview) {
      const newEntry = {
        id: Date.now(),
        preview,
        predictions,
      };

      const history = JSON.parse(localStorage.getItem("history")) || [];
      history.unshift(newEntry);

      localStorage.setItem("history", JSON.stringify(history));
    }
  }, [predictions]);

  // Clear uploaded file & results
  const handleClear = () => {
    setSelectedFile(null);
    setFileType(null);
    setPreview(null);
    setPredictions([]);
  };

  // Toggle video playback
  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-blue-950/30 to-gray-950 z-0"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center">
        {/* HEADER */}
        <motion.header
          className="text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Rocket className="text-blue-400 mr-3 h-10 w-10" />
            <h1 className="text-4xl md:text-5xl font-bold holographic">
              Space Station AI Detection
            </h1>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Upload images or videos for advanced object detection powered by
            orbital AI systems.
          </p>
        </motion.header>

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload + Preview */}
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="bg-gray-900/70 rounded-xl p-6 border border-gray-800 shadow-2xl">
              {preview ? (
                <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-700 mb-6 flex items-center justify-center">
                  {fileType === "video" ? (
                    <div className="relative w-full h-full">
                      <video
                        ref={videoRef}
                        className="w-full h-full object-contain"
                        src={preview}
                      />
                      <button
                        onClick={toggleVideoPlayback}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20"
                      >
                        {isPlaying ? (
                          <Pause size={32} className="text-white" />
                        ) : (
                          <Play size={32} className="text-white" />
                        )}
                      </button>
                    </div>
                  ) : (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              ) : (
                <label
                  htmlFor="fileUpload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-blue-400 transition-colors mb-6"
                >
                  <ImageIcon className="w-12 h-12 text-blue-400 mb-4" />
                  <Video className="w-12 h-12 text-purple-400 mb-2" />
                  <span className="text-gray-400">
                    Click to upload image or video
                  </span>
                </label>
              )}

              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
                id="fileUpload"
              />

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 mt-4 justify-center">
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !selectedFile}
                  className="flex-1 min-w-[150px] py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white flex items-center justify-center gap-2 shadow-md"
                >
                  <Rocket className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
                  {loading ? "Analyzing..." : "Launch Analysis"}
                </button>

                {selectedFile && (
                  <button
                    onClick={handleClear}
                    className="flex-1 min-w-[150px] py-3 px-4 rounded-lg bg-red-600 hover:bg-red-500 text-white flex items-center justify-center gap-2 shadow-md"
                  >
                    <Trash2 className="h-5 w-5" />
                    Clear
                  </button>
                )}

                <button
                  onClick={() => navigate("/history")}
                  className="flex-1 min-w-[150px] py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 shadow-md"
                >
                  <History className="h-5 w-5" />
                  History
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="bg-gray-900/70 rounded-xl p-6 border border-gray-800 shadow-2xl">
              <h2 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
                <Stars className="h-5 w-5" />
                Detection Results
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Objects identified in your file
              </p>

              {/* Bounding box canvas + text list */}
              <DetectionResults preview={preview} predictions={predictions} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
