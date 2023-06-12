import React, { useState, Fragment } from "react";
import { IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "../../css/notification.css";
import NotificationItem from "../../shared/components/NotificationItem";
import { connect } from "react-redux";
function Notifications({ invtNotifications }) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const openSideBarHandler = () => {
    setOpenSidebar(!openSidebar);
  };
  return (
    <Fragment>
      <div
        // style={{ padding: "20px 0 20px 0" }}
        className="notificationNumContainer"
      >
        {invtNotifications.length ? (
          <div className="notificationNum">{invtNotifications.length}</div>
        ) : (
          ""
        )}
        <IconButton onClick={openSideBarHandler}>
          <NotificationsIcon sx={{ color: "#fff" }}></NotificationsIcon>
        </IconButton>
      </div>
      {openSidebar ? (
        <div
          style={{
            backgroundColor: "#24272e",
            width: "30%",
            height: "35%",
            position: "absolute",
            top: "7%",
            bottom: "0",
            right: "5%",
            zIndex: "10",
            boxShadow: "0px 0px 10px #232931",
            overflowY: "auto",
            padding: "4px",
          }}
        >
          {invtNotifications.map((senderDetail, i) => {
            return <NotificationItem key={i} sender={senderDetail} />;
          })}
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}

const mapStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStateToProps)(Notifications);
