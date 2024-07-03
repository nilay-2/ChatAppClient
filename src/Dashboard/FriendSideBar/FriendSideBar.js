import React, { Suspense, lazy } from "react";
import { styled } from "@mui/system";
import AddFriendButton from "./AddFriendButton";
import FriendsTitle from "./FriendsTitle";
import PendingInvitationList from "./PendingInvationsList/PendingInvitationList";
// import FriendsList from "./FriendsList/FriendsList";
import UserDetails from "./UserDetails/UserDetails";

const FriendsList = lazy(() => import("./FriendsList/FriendsList"));
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
      <Suspense
        fallback={
          <p style={{ color: "#f3f3f3", textAlign: "center" }}>Loading....</p>
        }
      >
        <FriendsList />
      </Suspense>
      <FriendsTitle title="Invitations" align="center" />
      <PendingInvitationList />
      <UserDetails />
    </MainContainer>
  );
}
