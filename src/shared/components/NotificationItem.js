import React, { useState, useEffect } from "react";
import "../../css/notificationListItem.css";
import Avatar from "../components/Avatar";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NotificationMessage from "./NotificationMessage";
const NotificationItem = ({ sender }) => {
  return (
    <div className="notify-item">
      <div className="notify-container">
        <Avatar
          username={sender.senderId?.name}
          customHeight={80}
          customWidth={80}
        ></Avatar>
        <NotificationMessage
          senderName={sender.senderId?.name}
          date={sender?.date}
          invtStatus={sender?.InvtStatus}
        />
      </div>
      <div className="close-btn">
        <IconButton>
          <CloseIcon sx={{ color: "white" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default NotificationItem;
