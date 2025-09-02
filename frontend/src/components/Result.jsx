import React from "react";

const Results = ({ results }) => {
  if (!results) return <p>No predictions yet.</p>;

  return (
    <div>
      <h2>Prediction Results</h2>
      <p>File: {results.filename}</p>
      <ul>
        {results.detections.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
