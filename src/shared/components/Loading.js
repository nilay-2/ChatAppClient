import React from "react";
import "../../css/Loading.css";
const Loading = () => {
  const circles = document.querySelectorAll(".circle");
  circles.forEach((circle) => circle.classList.add("bounce-animation"));
  return (
    <div className="dot-container">
      <div className="dot dot-flashing"></div>
    </div>
  );
};

export default Loading;
