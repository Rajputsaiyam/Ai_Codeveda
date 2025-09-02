import React, { useState, useEffect } from "react";

export default function DetectionViewer({ apiResponse }) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const imageUrl = `http://localhost:8000/${apiResponse.output_dir}/${apiResponse.filename}`;

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
    };
  }, [imageUrl]);

  return (
    <div className="relative inline-block">
      {/* Original Image */}
      <img src={imageUrl} alt="Detected" className="w-full" />

      {/* Overlay bounding boxes */}
      {apiResponse.detections.map((det, index) => {
        const [x1, y1, x2, y2] = det.box;
        const boxStyle = {
          left: `${(x1 / imageSize.width) * 100}%`,
          top: `${(y1 / imageSize.height) * 100}%`,
          width: `${((x2 - x1) / imageSize.width) * 100}%`,
          height: `${((y2 - y1) / imageSize.height) * 100}%`
        };

        return (
          <div
            key={index}
            className="absolute border-2 border-red-500 text-white text-xs bg-red-500 bg-opacity-70"
            style={boxStyle}
          >
            {det.class} ({(det.confidence * 100).toFixed(1)}%)
          </div>
        );
      })}
    </div>
  );
}
