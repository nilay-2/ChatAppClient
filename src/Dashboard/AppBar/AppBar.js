import React from "react";
import { styled } from "@mui/system";
import DropDownMenu from "./DropDownMenu";
import ChatLabel from "./ChatLabel";
import Notifications from "./Notifications";
import MessagePin from "./MessagePin";
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

export default function AppBar() {
  return (
    <MainContainer>
      <ChatLabel />
      <div style={optionsContainerStyle}>
        <MessagePin />
        <Notifications />
        <DropDownMenu />
      </div>
    </MainContainer>
  );
}
