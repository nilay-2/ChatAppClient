import React from "react";
import { styled } from "@mui/system";
import ProfilePic from "../../../shared/components/ProfilePic";
import UserName from "./UserName";
import UserSettings from "./UserSettings";
import { connect } from "react-redux";
const MainContainer = styled("div")({
  height: "60px",
  display: "flex",
  alignItems: "center",
});

function UserDetails({ userDetails }) {
  return (
    <MainContainer>
      <ProfilePic />
      <UserName name={userDetails?.name} />
      <UserSettings />
    </MainContainer>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    ...auth,
  };
};

export default connect(mapStateToProps)(UserDetails);
