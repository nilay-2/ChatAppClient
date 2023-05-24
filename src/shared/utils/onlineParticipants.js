export const onlineParticipants = (participants, onlineUsers) => {
  // console.log("participants", participants, "onlineUsers", onlineUsers);
  const onlineGroupChatParticipants = participants.map((participant) => {
    if (
      onlineUsers.find(
        (onlnUsr) => onlnUsr.userId.toString() === participant._id.toString()
      )
    ) {
      return { ...participant, isOnline: true };
    } else {
      return { ...participant, isOnline: false };
    }
  });
  // console.log("online participants", onlineGroupChatParticipants);
  return onlineGroupChatParticipants;
};
