export const getSenderNotificationCount = (
  notificationArray,
  friendAuthorId
) => {
  const authorSpecificNotifications = notificationArray
    .filter((notification) => {
      let authorId;
      if (notification.chats?.author) {
        authorId = notification.chats.author;
      } else if (notification.messageId?.author) {
        authorId = notification.messageId?.author;
      }

      return authorId === friendAuthorId;
    })
    .map((notification) => notification?._id);
  return authorSpecificNotifications;
};
