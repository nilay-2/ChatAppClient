export const isMessageFromSelectedEntity = (
  currUser,
  selectedEntity,
  data,
  chatType
) => {
  switch (chatType) {
    case "DIRECT":
      const arrayOfparticipants = [];
      // console.log(currUser, selectedEntity, data);
      // get current logged in user and the selected chat user
      const currUserId = currUser.userDetails?._id;
      const selectedEntityId = selectedEntity?.id;

      // make a array which includes the above two user's IDs
      arrayOfparticipants.push(currUserId);
      arrayOfparticipants.push(selectedEntityId);

      // get the receiver and author IDs from the message data
      const authorId = data.author?._id;
      const receiverId = data?.receiver;

      // return true if the incoming message's author and receiver are either the logged in user and the selected chat user
      return (
        arrayOfparticipants.includes(authorId) &&
        arrayOfparticipants.includes(receiverId)
      );
    case "GROUP":
      // get current selected group id
      const groupId = selectedEntity?._id;

      // get incoming group id from the message data
      const incomingGroupChatGroupId = data.groupId?._id;

      return groupId === incomingGroupChatGroupId;
    default:
      break;
  }
};
