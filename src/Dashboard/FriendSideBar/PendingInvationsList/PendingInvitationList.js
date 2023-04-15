import React from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import PendingInvitationListItem from "./PendingInvitationListItem";

const MainContainer = styled("div")({
  widht: "100%",
  height: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
});

function PendingInvitationList({ pendingFriendsInvitations }) {
  // console.log(pendingFriendsInvitations);
  return (
    <MainContainer>
      {pendingFriendsInvitations.map((inv) => {
        return (
          <PendingInvitationListItem
            username={inv.senderId.name}
            mail={inv.senderId.email}
            key={inv._id}
            id={inv._id}
          />
        );
      })}
    </MainContainer>
  );
}

const mapStateToProps = ({ friends }) => {
  // console.log(friends);
  return {
    ...friends,
  };
};

export default connect(mapStateToProps)(PendingInvitationList);
