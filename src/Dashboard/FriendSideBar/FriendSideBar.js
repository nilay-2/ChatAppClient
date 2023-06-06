import React from "react";
import { styled } from "@mui/system";
import AddFriendButton from "./AddFriendButton";
import FriendsTitle from "./FriendsTitle";
import PendingInvitationList from "./PendingInvationsList/PendingInvitationList";
import FriendsList from "./FriendsList/FriendsList";
import UserDetails from "./UserDetails/UserDetails";
const MainContainer = styled("div")({
  // width: "224px",
  minWidth: "250px",
  minHeight: "100vh",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  // alignItems: "center",
  padding: "5px",
  backgroundColor: "#2f3136",
  boxSizing: "border-box",
});
export default function FriendSideBar() {
  return (
    <MainContainer>
      <AddFriendButton />
      <FriendsTitle title="Private messages" align="center" />
      <FriendsList />
      <FriendsTitle title="Invitations" align="center" />
      <PendingInvitationList />
      <UserDetails />
    </MainContainer>
  );
}
