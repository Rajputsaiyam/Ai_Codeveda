import React, { useState } from "react";
import { predictVideo } from "../api";

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await predictVideo(formData);
      setResult(res.data.video_path);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Predict</button>
      {result && <p>Video saved at: {result}</p>}
    </div>
  );
};

export default UploadVideo;
