export const getGroupSpecificNotification = (notificaions, groupId) => {
  const groupSpecificNotification = notificaions
    .filter((notification) => {
      if (groupId === notification.groupMessageId?.groupId) return notification;
    })
    .map((notify) => notify?._id);
  return groupSpecificNotification;
};
