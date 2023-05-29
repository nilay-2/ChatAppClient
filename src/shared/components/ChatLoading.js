import React from "react";
import "../../css/chatLoading.css";
const ChatLoading = () => {
  return (
    <div className="container">
      <section className="chat">
        <figure className="chat-avatar loading"></figure>
        <div className="chat-content">
          <div className="chat-text--small loading"></div>
          <div className="chat-text--large loading"></div>
        </div>
      </section>
    </div>
  );
};

export default ChatLoading;
