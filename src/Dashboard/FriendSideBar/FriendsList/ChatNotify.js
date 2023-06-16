import React from "react";

const ChatNotify = ({ notifications }) => {
  return (
    <div
      style={{
        position: "absolute",
        right: "12px",
        height: "20px",
        width: "20px",
        borderRadius: "50%",
        color: "white",
        backgroundColor: "#D70040",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {notifications.length}
    </div>
  );
};

export default ChatNotify;
