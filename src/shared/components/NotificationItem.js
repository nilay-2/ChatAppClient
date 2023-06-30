import React, { useState, useEffect } from "react";
import "../../css/notificationListItem.css";
import Avatar from "./Avatar";
import { IconButton } from "@mui/material";
import NotificationMessage from "./NotificationMessage";
import DoneIcon from "@mui/icons-material/Done";
const NotificationItem = ({
  sender,
  InvtStatus,
  date,
  read,
  id,
  markAsReadFunc,
  notificationCount,
}) => {
  const markAsReadHandler = (id) => {
    markAsReadFunc(id, notificationCount - 1);
  };

  return (
    <div className="notify-item">
      <div className="notify-container">
        <Avatar
          username={sender?.name}
          customHeight={42}
          customWidth={42}
        ></Avatar>
        <NotificationMessage
          senderName={sender?.name}
          date={date}
          invtStatus={InvtStatus}
        />
      </div>
      {!read ? (
        <div className="close-btn">
          <IconButton
            onClick={() => {
              markAsReadHandler(id);
            }}
          >
            <DoneIcon sx={{ color: "white" }} fontSize="small" />
          </IconButton>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NotificationItem;
