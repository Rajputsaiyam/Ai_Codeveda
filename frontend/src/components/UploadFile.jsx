
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Rocket } from "lucide-react";
import API from "../api.js";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/predict/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-space-dark text-white p-6 flex flex-col items-center justify-center">
      <motion.h1
        className="text-5xl font-bold mb-6 text-space-blue drop-shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        🚀 Space Station AI Upload
      </motion.h1>

      <motion.div
        className="bg-space-dark border-2 border-space-purple/50 rounded-2xl shadow-xl p-8 w-full max-w-lg text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-space-blue/50 rounded-xl cursor-pointer hover:bg-space-blue/10 transition">
          <Upload className="text-space-blue mb-2" size={40} />
          <span className="text-space-silver">
            {file ? file.name : "Click to select a file"}
          </span>
          <input type="file" onChange={handleFileChange} className="hidden" />
        </label>

        <motion.button
          className="mt-6 px-6 py-3 bg-gradient-to-r from-space-blue to-space-purple rounded-lg text-lg font-semibold flex items-center justify-center gap-2 hover:scale-105 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUpload}
        >
          <Rocket size={20} /> Upload & Analyze
        </motion.button>
      </motion.div>

      {result && (
        <motion.div
          className="mt-10 bg-space-dark border-2 border-green-400/50 rounded-2xl shadow-lg p-6 w-full max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            ✅ Prediction Result
          </h2>
          <pre className="bg-black/40 p-4 rounded-lg text-left text-sm text-space-silver overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </motion.div>
      )}
    </div>
  );
};

export default UploadFile;
