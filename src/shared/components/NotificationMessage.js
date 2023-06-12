import React from "react";
import { getDateAndTime } from "../utils/dateFormatter";
const NotificationMessage = ({ invtStatus, senderName, date }) => {
  return (
    <div>
      {invtStatus === "sent" ? (
        <p>
          <span className="notify-item-username">{senderName}</span> sent you a
          friend request.
        </p>
      ) : invtStatus === "accept" ? (
        <p>
          <span className="notify-item-username">{senderName}</span> accepted
          your friend request.
        </p>
      ) : invtStatus === "reject" ? (
        <p>
          <span className="notify-item-username">{senderName}</span> rejected
          your friend request.
        </p>
      ) : (
        ""
      )}
      <p className="notification-date">
        {getDateAndTime(date, "dateAndTimeInWords")}
      </p>
    </div>
  );
};

export default NotificationMessage;
