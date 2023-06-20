import React, { useEffect } from "react";
import { styled } from "@mui/system";
import MainPageButton from "./MainPageButton";
import GroupListItem from "./GroupListItem";
import { connect } from "react-redux";
import { getGroupSpecificNotification } from "../../shared/utils/groupSpecificNotification";
const MainContainer = styled("div")({
  minWidth: "72px",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#202225",
  minHeight: "100vh",
});

function SideBar({ groups, groupNotifications }) {
  useEffect(() => {
    console.log(groupNotifications);
  }, [groupNotifications]);
  return (
    <MainContainer>
      <MainPageButton />
      {groups.map((group, i) => {
        return (
          <GroupListItem
            group={group}
            key={group?._id}
            id={group?._id}
            notifications={getGroupSpecificNotification(
              groupNotifications,
              group?._id
            )}
          />
        );
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
