import React from "react";

const SuccessMessage = ({ message }) => {
  if (!message) return null; // If no message, don't render

  return <div style={popupStyle}>{message}</div>;
};

// Popup style
const popupStyle = {
  position: "fixed",
  right: "20px",
  top: "20px",
  padding: "10px 20px",
  backgroundColor: "green",
  color: "white",
  borderRadius: "5px",
  zIndex: 1000,
  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
};

export default { SuccessMessage };
