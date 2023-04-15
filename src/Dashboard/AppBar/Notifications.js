import React from "react";
import { IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "../../css/notification.css";
export default function Notifications() {
  return (
    <div
      style={{ padding: "20px 0 20px 0" }}
      className="notificationNumContainer"
    >
      <div className="notificationNum">2</div>
      <IconButton>
        <NotificationsIcon sx={{ color: "#fff" }}></NotificationsIcon>
      </IconButton>
    </div>
  );
}
