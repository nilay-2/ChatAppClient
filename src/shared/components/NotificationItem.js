import React from "react";
import "../../css/notificationListItem.css";
import Avatar from "../components/Avatar";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const NotificationItem = () => {
  return (
    <div className="notify-item">
      <div className="notify-container">
        <Avatar username="Nilay" customHeight={80} customWidth={80}></Avatar>
        <p>
          <span className="notify-item-username">Nilay</span> has accepted your
          friend request
        </p>
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
