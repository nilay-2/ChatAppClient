import React, { useState, Fragment } from "react";
import { IconButton } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import "../../css/notification.css";
import NotificationItem from "../../shared/components/NotificationItem";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/chatActions";
function Notifications({
  invtNotifications,
  notificationCount,
  markAsRead,
  decrementCounter,
  markAllAsRead,
}) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const openSideBarHandler = () => {
    setOpenSidebar(!openSidebar);
  };

  const markAllAsReadHandler = () => {
    markAllAsRead(0);
  };

  return (
    <Fragment>
      <div className="notificationNumContainer">
        {notificationCount ? (
          <div className="notificationNum">{notificationCount}</div>
        ) : (
          ""
        )}
        <IconButton onClick={openSideBarHandler}>
          <InboxIcon sx={{ color: "white" }} />
        </IconButton>
      </div>
      {openSidebar ? (
        <div
          style={{
            backgroundColor: "#24272e",
            width: "30%",
            height: "fit-content",
            maxHeight: "35%",
            position: "absolute",
            top: "7%",
            bottom: "0",
            right: "5%",
            zIndex: "10",
            boxShadow: "0px 0px 10px #232931",
            overflow: "auto",
            borderRadius: "5px",
          }}
        >
          <div className="notification-header">
            <div>
              <InboxIcon sx={{ color: "white" }} /> <span>Inbox</span>
            </div>
            {notificationCount ? (
              <IconButton onClick={markAllAsReadHandler}>
                <DoneAllIcon sx={{ color: "white" }} />
              </IconButton>
            ) : (
              ""
            )}
          </div>
          {invtNotifications.length ? (
            invtNotifications.map((invt, i) => {
              return (
                <NotificationItem
                  key={i}
                  id={invt?._id}
                  sender={invt?.senderId}
                  InvtStatus={invt?.InvtStatus}
                  date={invt?.date}
                  read={invt?.read}
                  markAsReadFunc={markAsRead}
                  decrementCounter={decrementCounter}
                  markAllAsRead={markAllAsRead}
                  notificationCount={notificationCount}
                />
              );
            })
          ) : (
            <div
              style={{
                color: "white",
                fontWeight: "700",
                textAlign: "center",
                margin: "8px 0",
              }}
            >
              No notifications right now
            </div>
          )}
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

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Notifications);
