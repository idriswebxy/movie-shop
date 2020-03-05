import React from "react";

const SpinnerPage = () => {
  return (
    <div
      className="spinner-border"
      role="status"
      style={{ width: "200px", height: "200px", margin: "auto", display: "flex" }}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SpinnerPage;
