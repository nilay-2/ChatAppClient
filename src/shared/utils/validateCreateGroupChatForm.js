export const validateCreateGroupChatForm = ({ groupName, friendsAdded }) => {
  if (groupName === "" || friendsAdded.length === 0) return true;
  else return false;
};
