import React from "react";
import { styled } from "@mui/system";
import MainPageButton from "./MainPageButton";
import GroupListItem from "./GroupListItem";
import { connect } from "react-redux";
const MainContainer = styled("div")({
  minWidth: "72px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#202225",
});

function SideBar({ groups }) {
  return (
    <MainContainer>
      <MainPageButton />
      {groups.map((group, i) => {
        return <GroupListItem group={group} key={group?._id} />;
      })}
    </MainContainer>
  );
}

const mapStateToProps = ({ groupChat }) => {
  return {
    ...groupChat,
  };
};

export default connect(mapStateToProps)(SideBar);
