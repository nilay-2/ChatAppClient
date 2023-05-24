import React from "react";
import { styled } from "@mui/system";
import DropDownMenu from "./DropDownMenu";
import ChatLabel from "./ChatLabel";
import Notifications from "./Notifications";
import MessagePin from "./MessagePin";
import GroupParticipants from "./GroupParticipants";
import { connect } from "react-redux";
const MainContainer = styled("div")({
  height: "48px",
  borderBottom: "1px solid black",
  backgroundColor: "#36393f",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 15px",
});

const optionsContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

function AppBar({ chatType, chosenChatDetails }) {
  return (
    <MainContainer>
      <ChatLabel />
      <div style={optionsContainerStyle}>
        {chosenChatDetails !== null ? (
          <>
            {chatType === "GROUP" ? <GroupParticipants /> : ""}
            <MessagePin />
          </>
        ) : (
          ""
        )}
        <Notifications />
        <DropDownMenu />
      </div>
    </MainContainer>
  );
}

const mapStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStateToProps)(AppBar);
